import { useEffect, useRef, useState } from "react";
import { BellRing, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { invalidateAsyncData } from "../../hooks";
import { canManage, canView } from "../../lib/permissions";
import { listEntities } from "../../services/entities";
import { supabase } from "../../services/supabase";
import type { Orcamento, Profile } from "../../types";
import { formatDateTimeBr, getOrcamentoComments, type OrcamentoComment } from "../orcamentos/model";

type CommentEvent = {
  id: string;
  at: string;
  title: string;
  message: string;
  author: string;
};

export function AlertNotificationBell() {
  const { profile } = useAuth();
  const location = useLocation();
  const [unread, setUnread] = useState(0);
  const [toasts, setToasts] = useState<CommentEvent[]>([]);
  const initializedRef = useRef(false);
  const lastSeenRef = useRef("");
  const lastDataSignatureRef = useRef("");
  const storageKey = profile?.id ? `supply-flow:alerts:last-seen:${profile.id}` : "";

  useEffect(() => {
    if (location.pathname === "/alertas") setUnread(0);
  }, [location.pathname]);

  useEffect(() => {
    initializedRef.current = false;
    lastSeenRef.current = "";
    lastDataSignatureRef.current = "";
    setUnread(0);
    setToasts([]);
  }, [storageKey]);

  useEffect(() => {
    if (!profile || !canView(profile, "alertas")) return;
    const currentProfile = profile;
    let stopped = false;

    async function check() {
      try {
        const rows = await listEntities("orcamentos");
        if (stopped) return;
        const events = collectReceivedCommentEvents(rows, currentProfile).sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
        const latestAt = events[events.length - 1]?.at || "";
        const dataSignature = buildDataSignature(rows);

        if (!initializedRef.current) {
          initializedRef.current = true;
          lastDataSignatureRef.current = dataSignature;
          const stored = storageKey ? window.localStorage.getItem(storageKey) || "" : "";
          lastSeenRef.current = stored || latestAt;
          if (!stored && storageKey && latestAt) window.localStorage.setItem(storageKey, latestAt);
          return;
        }

        const lastSeen = lastSeenRef.current;
        const fresh = events.filter((event) => event.at > lastSeen);
        const dataChanged = dataSignature !== lastDataSignatureRef.current;
        if (dataChanged) lastDataSignatureRef.current = dataSignature;

        if (fresh.length) {
          const nextSeen = fresh[fresh.length - 1].at;
          lastSeenRef.current = nextSeen;
          if (storageKey) window.localStorage.setItem(storageKey, nextSeen);
          setUnread((current) => (location.pathname === "/alertas" ? 0 : current + fresh.length));
          setToasts((current) => [...fresh.slice(-3), ...current].slice(0, 3));
        }

        if ((fresh.length || dataChanged) && location.pathname === "/alertas") {
          invalidateAsyncData(["alertas:orcamentos"]);
        }
      } catch (err) {
        console.warn("Nao foi possivel verificar notificacoes de orcamento.", err);
      }
    }

    void check();
    const timer = window.setInterval(check, 20_000);
    const channel = supabase
      ?.channel(`supply-flow-orcamento-alerts-${currentProfile.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "orcamentos" }, () => {
        void check();
      })
      .subscribe();

    return () => {
      stopped = true;
      window.clearInterval(timer);
      if (channel) void supabase?.removeChannel(channel);
    };
  }, [location.pathname, profile, storageKey]);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((current) => current.slice(0, -1)), 8000);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  if (!profile || !canView(profile, "alertas")) return null;

  return (
    <>
      <NavLink className="icon-button alert-bell" to="/alertas" aria-label="Alertas" title="Alertas" onClick={() => setUnread(0)}>
        <BellRing size={18} />
        {unread ? <span>{unread > 9 ? "9+" : unread}</span> : null}
      </NavLink>
      {toasts.length ? (
        <div className="alert-toast-stack" role="status" aria-live="polite">
          {toasts.map((toast) => (
            <article key={toast.id} className="alert-toast">
              <button type="button" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))} aria-label="Fechar notificacao">
                <X size={14} />
              </button>
              <span>{formatDateTimeBr(toast.at)}</span>
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
              <small>{toast.author}</small>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

function collectReceivedCommentEvents(rows: Orcamento[], profile: Profile): CommentEvent[] {
  return rows
    .filter((item) => canSeeThread(item, profile))
    .flatMap((item) =>
      getOrcamentoComments(item)
        .filter((comment) => isReceivedComment(comment, profile))
        .map((comment) => ({
          id: comment.id || `${item.id}-${comment.at}-${comment.authorEmail || ""}`,
          at: comment.at,
          title: `Comentario em ${item.numero_proposta || "orcamento"}`,
          message: comment.text,
          author: comment.authorName || comment.authorEmail || "Supply Flow",
        }))
    )
    .filter((event) => event.at && event.message);
}

function canSeeThread(item: Orcamento, profile: Profile) {
  if (canManage(profile, "orcamentos")) return true;
  if (item.criado_por && item.criado_por === profile.id) return true;
  return Boolean(item.email_solicitante && profile.email && item.email_solicitante.toLowerCase() === profile.email.toLowerCase());
}

function isReceivedComment(comment: OrcamentoComment, profile: Profile) {
  const authorEmail = String(comment.authorEmail || "").toLowerCase();
  if (authorEmail && authorEmail === profile.email.toLowerCase()) return false;
  return true;
}

function buildDataSignature(rows: Orcamento[]) {
  return rows
    .map((item) => `${item.id}:${item.updated_at || item.created_at || ""}:${getOrcamentoComments(item).length}`)
    .sort()
    .join("|");
}
