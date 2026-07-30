import { useEffect } from "react";
import { invalidateEmbeddedToolCache } from "./components/EmbeddedHtmlToolPage";
import { invalidateAsyncData } from "./hooks";
import { supabase } from "./services/supabase";
import type { ModuleKey } from "./types";

type RealtimePayload = {
  new?: Record<string, unknown>;
  old?: Record<string, unknown>;
};

type RealtimeTarget = {
  cacheKeys?: string[];
  modules?: ModuleKey[];
};

const realtimeTables = [
  "profiles",
  "user_obras",
  "obras",
  "requisicoes",
  "orcamentos",
  "contratos",
  "fornecedores",
  "importacoes",
  "embedded_app_state",
  "fretes_solicitacoes",
  "nf_simples_remessa_solicitacoes",
  "estoque_obras_pedidos",
  "cadastro_materiais_solicitacoes",
  "avaliacao_fornecedores_avaliacoes",
  "fornecedores_cadastros",
] as const;

const tableTargets: Record<(typeof realtimeTables)[number], RealtimeTarget> = {
  profiles: { cacheKeys: ["profiles"] },
  user_obras: { cacheKeys: ["user_obras", "obras", "requisicoes", "dashboard:summary"] },
  obras: { cacheKeys: ["obras", "dashboard:summary"] },
  requisicoes: { cacheKeys: ["requisicoes", "dashboard:summary"] },
  orcamentos: { cacheKeys: ["orcamentos", "alertas:orcamentos", "dashboard:summary"] },
  contratos: { cacheKeys: ["dashboard:summary"], modules: ["contratos"] },
  fornecedores: { cacheKeys: ["fornecedores", "dashboard:summary"], modules: ["fornecedores"] },
  importacoes: { cacheKeys: ["importacoes", "dashboard:summary"] },
  embedded_app_state: { cacheKeys: ["dashboard:summary"] },
  fretes_solicitacoes: { cacheKeys: ["dashboard:summary"], modules: ["fretes"] },
  nf_simples_remessa_solicitacoes: { cacheKeys: ["dashboard:summary"], modules: ["nota_fiscal", "fretes"] },
  estoque_obras_pedidos: { cacheKeys: ["dashboard:summary"], modules: ["estoque_obras", "fretes"] },
  cadastro_materiais_solicitacoes: { cacheKeys: ["dashboard:summary"], modules: ["cadastro_materiais"] },
  avaliacao_fornecedores_avaliacoes: { cacheKeys: ["dashboard:summary"], modules: ["avaliacao_fornecedores"] },
  fornecedores_cadastros: { cacheKeys: ["dashboard:summary"], modules: ["fornecedores"] },
};

const moduleKeys: ModuleKey[] = [
  "dashboard",
  "alertas",
  "requisicoes",
  "orcamentos",
  "contratos",
  "fretes",
  "nota_fiscal",
  "estoque_obras",
  "cadastro_materiais",
  "frota",
  "fornecedores",
  "avaliacao_fornecedores",
  "importacoes",
  "usuarios",
  "settings",
];

export function useSupplyFlowRealtime({
  enabled,
  currentUserId,
  refreshProfile,
}: {
  enabled: boolean;
  currentUserId?: string;
  refreshProfile?: () => Promise<void>;
}) {
  useEffect(() => {
    const client = supabase;
    if (!enabled || !client) return;

    let stopped = false;
    let flushTimer: number | undefined;
    const pendingCacheKeys = new Set<string>();
    const pendingModules = new Set<ModuleKey>();

    function scheduleFlush() {
      if (flushTimer) window.clearTimeout(flushTimer);
      flushTimer = window.setTimeout(() => {
        const cacheKeys = Array.from(pendingCacheKeys);
        const modules = Array.from(pendingModules);
        pendingCacheKeys.clear();
        pendingModules.clear();

        if (cacheKeys.length) invalidateAsyncData(cacheKeys, { clearCache: true });
        modules.forEach((moduleKey) => invalidateEmbeddedToolCache(moduleKey, { notifyActive: true }));
      }, 650);
    }

    function queueRefresh(table: (typeof realtimeTables)[number], payload: RealtimePayload) {
      const target = resolveTarget(table, payload);
      target.cacheKeys?.forEach((key) => pendingCacheKeys.add(key));
      target.modules?.forEach((moduleKey) => pendingModules.add(moduleKey));

      const affectedUserId = getPayloadId(payload);
      if ((table === "profiles" || table === "user_obras") && currentUserId && affectedUserId === currentUserId) {
        void refreshProfile?.();
      }

      scheduleFlush();
    }

    let channel = client.channel("supply-flow-global-realtime");
    realtimeTables.forEach((table) => {
      channel = channel.on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
        if (!stopped) queueRefresh(table, payload as RealtimePayload);
      });
    });

    channel.subscribe((status) => {
      if (status === "CHANNEL_ERROR") {
        console.warn("Realtime do Supply Flow indisponivel. A aplicacao continua funcionando com atualizacao manual.");
      }
    });

    return () => {
      stopped = true;
      if (flushTimer) window.clearTimeout(flushTimer);
      void client.removeChannel(channel);
    };
  }, [currentUserId, enabled, refreshProfile]);
}

function resolveTarget(table: (typeof realtimeTables)[number], payload: RealtimePayload): RealtimeTarget {
  if (table !== "embedded_app_state") return tableTargets[table];

  const moduleKey = getModuleKey(payload);
  return {
    cacheKeys: moduleKey === "orcamentos" ? ["dashboard:summary", "orcamentos:form-spec"] : tableTargets.embedded_app_state.cacheKeys,
    modules: moduleKey ? [moduleKey] : undefined,
  };
}

function getModuleKey(payload: RealtimePayload): ModuleKey | null {
  const rawModuleKey = String(payload.new?.module_key || payload.old?.module_key || "");
  return moduleKeys.includes(rawModuleKey as ModuleKey) ? (rawModuleKey as ModuleKey) : null;
}

function getPayloadId(payload: RealtimePayload) {
  return String(payload.new?.id || payload.old?.id || payload.new?.user_id || payload.old?.user_id || "");
}
