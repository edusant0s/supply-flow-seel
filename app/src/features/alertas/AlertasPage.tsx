import { useMemo, useState } from "react";
import { BellRing, CheckCircle2, Clock3, MessageSquare, Search, Send } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { invalidateAsyncData, useAsyncData } from "../../hooks";
import { normalizeText } from "../../lib/format";
import { canManage } from "../../lib/permissions";
import { listEntities } from "../../services/entities";
import { appendOrcamentoComment } from "../../services/orcamentos";
import type { Orcamento } from "../../types";
import {
  formatDateTimeBr,
  getAssignedTo,
  getOrcamentoComments,
  type OrcamentoComment,
} from "../orcamentos/model";
import { phaseLabel } from "../orcamentos/sla";

type AlertThread = {
  item: Orcamento;
  comments: OrcamentoComment[];
  latest: OrcamentoComment;
};

export function AlertasPage() {
  const { profile } = useAuth();
  const canSeeAll = canManage(profile, "orcamentos");
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("orcamentos"), [], { cacheKey: "alertas:orcamentos" });
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const threads = useMemo(() => {
    return (data || [])
      .filter((item) => canSeeAlertThread(item, profile?.id, profile?.email, canSeeAll))
      .map((item): AlertThread | null => {
        const comments = getOrcamentoComments(item).sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
        const latest = comments[comments.length - 1];
        return latest ? { item, comments, latest } : null;
      })
      .filter((thread): thread is AlertThread => Boolean(thread))
      .sort((a, b) => new Date(b.latest.at).getTime() - new Date(a.latest.at).getTime());
  }, [canSeeAll, data, profile?.email, profile?.id]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return threads;
    return threads.filter(({ item, comments }) =>
      normalizeText(
        [
          item.numero_proposta,
          item.nome_solicitante,
          item.email_solicitante,
          item.cliente,
          item.local_obra,
          getAssignedTo(item),
          comments.map((comment) => `${comment.authorName} ${comment.text}`).join(" "),
        ].join(" ")
      ).includes(q)
    );
  }, [query, threads]);

  const selected = filtered.find((thread) => thread.item.id === selectedId) || filtered[0] || null;
  const requesterReplies = threads.reduce((sum, thread) => sum + thread.comments.filter((comment) => comment.source === "solicitante").length, 0);
  const adminComments = threads.reduce((sum, thread) => sum + thread.comments.filter((comment) => comment.source === "admin").length, 0);

  async function sendReply() {
    const text = reply.trim();
    if (!selected || !text) return;
    setSending(true);
    setMessage("");
    try {
      await appendOrcamentoComment(selected.item.id, text);
      setReply("");
      setMessage("Resposta enviada.");
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      await refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Nao foi possivel enviar a resposta.");
    } finally {
      setSending(false);
    }
  }

  if (loading) return <LoadingState label="Carregando alertas" />;
  if (error) return <EmptyState title="Falha ao carregar alertas" description={error} />;

  return (
    <div className="page-stack alertas-page">
      <section className="module-command-bar alertas-hero">
        <div>
          <span className="eyebrow">Supply Flow SEEL</span>
          <h2>Central de alertas</h2>
          <p>Comentarios de orcamentos, respostas dos solicitantes e historico de comunicacao em um unico lugar.</p>
        </div>
        <div className="module-command-bar__actions">
          <span className="module-command-bar__badge">
            <BellRing size={16} />
            {canSeeAll ? "Visao administrativa" : "Minhas solicitacoes"}
          </span>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Conversas" value={threads.length} icon={MessageSquare} tone="blue" />
        <KpiCard title="Comentarios admin" value={adminComments} icon={BellRing} tone="warning" />
        <KpiCard title="Respostas solicitante" value={requesterReplies} icon={Send} tone="success" />
        <KpiCard title="Atualizadas hoje" value={threads.filter((thread) => thread.latest.at.slice(0, 10) === new Date().toISOString().slice(0, 10)).length} icon={Clock3} tone="blue" />
      </section>

      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar proposta, solicitante, obra, atribuido ou comentario" />
        </label>
      </section>

      {!threads.length ? (
        <EmptyState title="Nenhum alerta por enquanto" description="Os comentarios feitos nas solicitacoes de orcamento aparecem aqui automaticamente." />
      ) : (
        <section className="alertas-layout">
          <div className="panel alertas-list-panel">
            <DataTable
              data={filtered}
              columns={[
                { key: "proposta", label: "Proposta", render: (thread) => thread.item.numero_proposta || "-" },
                { key: "solicitante", label: "Solicitante", render: (thread) => thread.item.nome_solicitante || "-" },
                { key: "fase", label: "Fase", render: (thread) => phaseLabel(thread.item.status || "nao_iniciado") },
                { key: "ultimo", label: "Ultimo comentario", render: (thread) => thread.latest.text.slice(0, 90) },
                { key: "data", label: "Data", render: (thread) => formatDateTimeBr(thread.latest.at) },
                {
                  key: "acao",
                  label: "",
                  render: (thread) => (
                    <button className="table-action" type="button" onClick={() => setSelectedId(thread.item.id)}>
                      Abrir
                    </button>
                  ),
                },
              ]}
            />
          </div>

          <aside className="panel alertas-thread-panel">
            {selected ? (
              <>
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">Conversa</span>
                    <h2>{selected.item.numero_proposta || "Sem proposta"}</h2>
                    <p>{selected.item.cliente || selected.item.local_obra || "Orcamento"}</p>
                  </div>
                </div>

                <div className="alertas-thread-meta">
                  <span>{phaseLabel(selected.item.status || "nao_iniciado")}</span>
                  <span>Atribuido a: {getAssignedTo(selected.item) || "-"}</span>
                  <span>Solicitante: {selected.item.nome_solicitante || "-"}</span>
                </div>

                <div className="alertas-thread">
                  {selected.comments.map((comment) => {
                    const own = profile?.email && comment.authorEmail?.toLowerCase() === profile.email.toLowerCase();
                    return (
                      <article key={comment.id} className={own ? "alertas-message alertas-message--own" : "alertas-message"}>
                        <div>
                          <strong>{comment.authorName || "Supply Flow"}</strong>
                          <span>{formatDateTimeBr(comment.at)}</span>
                        </div>
                        <p>{comment.text}</p>
                        <small>{comment.source === "solicitante" ? "Resposta do solicitante" : "Comentario administrativo"}</small>
                      </article>
                    );
                  })}
                </div>

                <div className="alertas-reply">
                  <label>
                    Responder
                    <textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Escreva sua resposta para esta conversa." />
                  </label>
                  {message ? <div className={message.includes("Nao") || message.includes("Sem") ? "form-error" : "form-note"}>{message}</div> : null}
                  <div className="form-actions">
                    <button className="primary-button" type="button" onClick={sendReply} disabled={sending || !reply.trim()}>
                      {sending ? <Clock3 size={16} /> : <CheckCircle2 size={16} />}
                      {sending ? "Enviando..." : "Enviar resposta"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="muted-box">Selecione uma conversa.</div>
            )}
          </aside>
        </section>
      )}
    </div>
  );
}

function canSeeAlertThread(item: Orcamento, userId: string | undefined, email: string | undefined, canSeeAll: boolean) {
  if (canSeeAll) return true;
  if (userId && item.criado_por === userId) return true;
  return Boolean(email && item.email_solicitante?.toLowerCase() === email.toLowerCase());
}
