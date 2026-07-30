import { useEffect, useMemo, useRef, useState } from "react";
import { LoadingState } from "./States";
import { useAuth } from "../contexts/AuthContext";
import { canManage } from "../lib/permissions";
import {
  AVALIACAO_DB_STORAGE_KEY,
  CADASTRO_MATERIAIS_FORM_STORAGE_KEY,
  CADASTRO_MATERIAIS_STORAGE_KEY,
  CONTRATOS_FORM_STORAGE_KEY,
  CONTRATOS_REQUESTS_STORAGE_KEY,
  ESTOQUE_STATE_STORAGE_KEY,
  FORNECEDORES_CADASTRO_STORAGE_KEY,
  FORNECEDORES_MAP_STORAGE_KEY,
  FRETES_STORAGE_KEY,
  NOTA_FISCAL_FORM_STORAGE_KEY,
  NOTA_FISCAL_STORAGE_KEY,
  getEmbeddedStorageKeysForModule,
  listFornecedorMapSuppliers,
  loadEmbeddedStorageSnapshot,
} from "../services/embeddedSync";
import { supabaseAnonKey, supabaseUrl } from "../services/supabase";
import type { ModuleKey } from "../types";

type EmbeddedHtmlToolPageProps = {
  title: string;
  moduleKey: ModuleKey;
  loadHtml: () => Promise<string>;
  loadSupplierMapBase?: boolean;
};

const embeddedChromeCss = `
  html, body {
    min-height: 100%;
    background: #f1f5f9 !important;
  }

  body {
    margin: 0 !important;
    color: #0f172a;
  }

  body::before {
    opacity: .32 !important;
  }

  .container,
  .topbar-content,
  .topbar-inner,
  main,
  .main,
  .admin-main,
  .content {
    max-width: none !important;
  }

  body > header,
  header.topbar,
  .topbar {
    top: 0 !important;
    box-shadow: 0 8px 24px rgba(15, 23, 42, .08) !important;
  }

  .card,
  .panel,
  .section,
  .stat,
  .kpi,
  .modal,
  .supplier,
  .order-card,
  .freight-card,
  .vehicle-card,
  .chart-card,
  .table-wrap {
    border-radius: 8px !important;
  }

  button,
  input,
  select,
  textarea,
  .tab,
  .chip,
  .badge,
  .pill,
  .status {
    border-radius: 8px !important;
  }

  body.supply-embedded {
    font-size: 14px !important;
    overflow-x: hidden !important;
    padding: 0 !important;
    background: #f0f7fa !important;
    color: #081b23 !important;
    font-family: Roboto, "Segoe UI", Arial, sans-serif !important;
  }

  body.supply-embedded h1,
  body.supply-embedded h2,
  body.supply-embedded h3,
  body.supply-embedded h4 {
    color: #081b23 !important;
    letter-spacing: 0 !important;
  }

  body.supply-embedded .card,
  body.supply-embedded .panel,
  body.supply-embedded .section,
  body.supply-embedded .stat,
  body.supply-embedded .kpi,
  body.supply-embedded .analytics-card,
  body.supply-embedded .chart-card,
  body.supply-embedded .table-wrap,
  body.supply-embedded .table-panel,
  body.supply-embedded .toolbar,
  body.supply-embedded .toolbar-panel,
  body.supply-embedded .filters,
  body.supply-embedded .kanban-column,
  body.supply-embedded .col,
  body.supply-embedded .supplier,
  body.supply-embedded .order-card,
  body.supply-embedded .freight-card,
  body.supply-embedded .vehicle-card,
  body.supply-embedded .analysis-card,
  body.supply-embedded .summary-card,
  body.supply-embedded .insight-card {
    border: 1px solid #d1e1e8 !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 24px rgba(10, 46, 61, .1) !important;
  }

  body.supply-embedded .kpi,
  body.supply-embedded .stat,
  body.supply-embedded .kpi-card,
  body.supply-embedded .stat-card {
    border-left: 3px solid #fcc800 !important;
  }

  body.supply-embedded .col,
  body.supply-embedded .kanban-column {
    background: #f7fbfd !important;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.8) !important;
  }

  body.supply-embedded button,
  body.supply-embedded .btn,
  body.supply-embedded .primary,
  body.supply-embedded input,
  body.supply-embedded select,
  body.supply-embedded textarea {
    border-radius: 8px !important;
    font-size: 13px !important;
  }

  body.supply-embedded input,
  body.supply-embedded select,
  body.supply-embedded textarea {
    border: 1px solid #d1e1e8 !important;
    background: #ffffff !important;
    color: #081b23 !important;
  }

  body.supply-embedded button,
  body.supply-embedded .btn,
  body.supply-embedded .primary {
    min-height: 38px !important;
    border: 1px solid #1b6d8e !important;
    background: #1b6d8e !important;
    color: #ffffff !important;
    box-shadow: none !important;
    font-weight: 850 !important;
  }

  body.supply-embedded .secondary,
  body.supply-embedded .btn.secondary,
  body.supply-embedded button.secondary {
    background: #ffffff !important;
    color: #0a2e3d !important;
    border-color: #d1e1e8 !important;
  }

  html[data-theme="dark"],
  html[data-theme="dark"] body {
    background: #07111f !important;
    color: #e5edf7 !important;
  }

  html[data-theme="dark"] .card,
  html[data-theme="dark"] .panel,
  html[data-theme="dark"] .section,
  html[data-theme="dark"] .stat,
  html[data-theme="dark"] .kpi,
  html[data-theme="dark"] .modal,
  html[data-theme="dark"] .modal-content,
  html[data-theme="dark"] .modal-body,
  html[data-theme="dark"] .drawer,
  html[data-theme="dark"] .supplier,
  html[data-theme="dark"] .order-card,
  html[data-theme="dark"] .freight-card,
  html[data-theme="dark"] .vehicle-card,
  html[data-theme="dark"] .chart-card,
  html[data-theme="dark"] .table-wrap,
  html[data-theme="dark"] .table-panel,
  html[data-theme="dark"] .toolbar,
  html[data-theme="dark"] .toolbar-panel,
  html[data-theme="dark"] .filters,
  html[data-theme="dark"] .kanban-column,
  html[data-theme="dark"] .col,
  html[data-theme="dark"] .detail-box,
  html[data-theme="dark"] .detail-section,
  html[data-theme="dark"] .detail-answer,
  html[data-theme="dark"] .detail-kv,
  html[data-theme="dark"] .empty,
  html[data-theme="dark"] .empty-col,
  html[data-theme="dark"] .notice {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
    color: #e5edf7 !important;
  }

  /* The 5 embedded tools (Frota, Contratos, Fretes, Estoque, Avaliacao) each use their
     own bespoke class names for dashboard/report panels (powerbi-kpi, analytics-card,
     bi-card, dashboard-filter-panel, etc). The text-color rules below already recolor
     any h1-h4/strong/b/p/span/small/label/td to a light tone, but that only reads
     correctly if the panel behind it is also dark - otherwise the text goes light on
     an unconverted white background and becomes unreadable. Catch all of them by
     naming convention instead of hand-listing every module's classes. */
  html[data-theme="dark"] [class*="card"],
  html[data-theme="dark"] [class*="panel"],
  html[data-theme="dark"] [class*="kpi"],
  html[data-theme="dark"] [class*="analytics"],
  html[data-theme="dark"] [class*="insight"],
  html[data-theme="dark"] [class*="summary"],
  html[data-theme="dark"] .powerbi-dashboard,
  html[data-theme="dark"] .powerbi-visual,
  html[data-theme="dark"] .dashboard-chart-stage {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
  }

  html[data-theme="dark"] input,
  html[data-theme="dark"] select,
  html[data-theme="dark"] textarea,
  html[data-theme="dark"] .tab,
  html[data-theme="dark"] .chip,
  html[data-theme="dark"] .badge,
  html[data-theme="dark"] .pill,
  html[data-theme="dark"] .tag,
  html[data-theme="dark"] .status,
  html[data-theme="dark"] .control,
  html[data-theme="dark"] .btn,
  html[data-theme="dark"] .secondary,
  html[data-theme="dark"] .search,
  html[data-theme="dark"] .file,
  html[data-theme="dark"] .file-chip,
  html[data-theme="dark"] .timer,
  html[data-theme="dark"] .sla-box,
  html[data-theme="dark"] .info-box {
    background: #10233f !important;
    border-color: #1f3350 !important;
    color: #e5edf7 !important;
  }

  html[data-theme="dark"] h1,
  html[data-theme="dark"] h2,
  html[data-theme="dark"] h3,
  html[data-theme="dark"] h4,
  html[data-theme="dark"] strong,
  html[data-theme="dark"] b,
  html[data-theme="dark"] .card-title,
  html[data-theme="dark"] .col-title,
  html[data-theme="dark"] .panel-title,
  html[data-theme="dark"] .supplier-name,
  html[data-theme="dark"] .kpi-value,
  html[data-theme="dark"] .stat strong,
  html[data-theme="dark"] .kpi strong {
    color: #f6f9fd !important;
  }

  html[data-theme="dark"] p,
  html[data-theme="dark"] span,
  html[data-theme="dark"] small,
  html[data-theme="dark"] label,
  html[data-theme="dark"] td,
  html[data-theme="dark"] .muted,
  html[data-theme="dark"] .hint,
  html[data-theme="dark"] .sub,
  html[data-theme="dark"] .card-line,
  html[data-theme="dark"] .card-desc,
  html[data-theme="dark"] .panel-sub,
  html[data-theme="dark"] .col-subtitle,
  html[data-theme="dark"] .detail-answer div,
  html[data-theme="dark"] .detail-answer small {
    color: #b7c6d9 !important;
  }

  html[data-theme="dark"] th {
    background: #132845 !important;
    color: #b7c6d9 !important;
    border-color: #1f3350 !important;
  }

  html[data-theme="dark"] button.primary,
  html[data-theme="dark"] .btn.primary,
  html[data-theme="dark"] .primary {
    background: #ffe61c !important;
    color: #07111f !important;
    border-color: #ffe61c !important;
  }

  html[data-theme="dark"] input::placeholder,
  html[data-theme="dark"] textarea::placeholder {
    color: #8fa3ba !important;
  }

  body.supply-embedded-frota > header.topbar,
  body.supply-embedded-fretes > header,
  body.supply-embedded-fornecedores .sf-topbar,
  body.supply-embedded-estoque_obras #loginPage {
    display: none !important;
  }

  body.supply-embedded-frota .hero {
    display: none !important;
  }

  body.supply-embedded-fornecedores .sf-app,
  body.supply-embedded-fornecedores .sf-workspace {
    background: transparent !important;
  }

  body.supply-embedded-fornecedores .sf-page-head {
    width: 100% !important;
    margin: 0 0 12px !important;
    padding: 15px !important;
    border: 1px solid #d1e1e8 !important;
    border-left: 4px solid #fcc800 !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 24px rgba(10, 46, 61, .1) !important;
  }

  body.supply-embedded-fornecedores .sf-page-head h1 {
    color: #081b23 !important;
    font-size: 1.15rem !important;
    line-height: 1.1 !important;
  }

  body.supply-embedded-fornecedores .sf-page-head p {
    max-width: 760px !important;
    color: #526771 !important;
    font-size: .86rem !important;
  }

  body.supply-embedded-fornecedores .sf-eyebrow {
    color: #1b6d8e !important;
    font-size: .68rem !important;
    font-weight: 900 !important;
  }

  body.supply-embedded-fornecedores .sf-primary-action {
    min-height: 40px !important;
    border: 1px solid #1b6d8e !important;
    border-radius: 8px !important;
    background: #1b6d8e !important;
    color: #ffffff !important;
    box-shadow: none !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head {
    background: #0d1b2e !important;
    border-color: #1f3350 !important;
    border-left-color: #fcc800 !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, .26) !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head h1 {
    color: #f6f9fd !important;
  }

  html[data-theme="dark"] body.supply-embedded-fornecedores .sf-page-head p {
    color: #b7c6d9 !important;
  }

  body.supply-embedded .container,
  body.supply-embedded .topbar-content,
  body.supply-embedded .topbar-inner,
  body.supply-embedded main,
  body.supply-embedded .main,
  body.supply-embedded .admin-main,
  body.supply-embedded .content,
  body.supply-embedded-fretes .container,
  body.supply-embedded-fretes main,
  body.supply-embedded-fretes .section {
    width: 100% !important;
    max-width: none !important;
  }

  body.supply-embedded main,
  body.supply-embedded .main,
  body.supply-embedded .admin-main {
    padding: 12px !important;
  }

  body.supply-embedded .tabs,
  body.supply-embedded .sf-module-tabs,
  body.supply-embedded .nav-tabs,
  body.supply-embedded .tabbar,
  body.supply-embedded [role="tablist"] {
    position: sticky !important;
    top: 0 !important;
    z-index: 40 !important;
    display: flex !important;
    align-items: center !important;
    overflow-x: auto !important;
    gap: 8px !important;
    padding: 8px !important;
    background: rgba(255, 255, 255, .96) !important;
    border-bottom: 1px solid #e2e8f0 !important;
    box-shadow: 0 8px 20px rgba(15, 23, 42, .08) !important;
    scrollbar-width: thin !important;
    -webkit-overflow-scrolling: touch !important;
  }

  body.supply-embedded .tabs > *,
  body.supply-embedded .sf-module-tabs > *,
  body.supply-embedded .nav-tabs > *,
  body.supply-embedded .tabbar > *,
  body.supply-embedded [role="tablist"] > * {
    flex: 0 0 auto !important;
  }

  body.supply-embedded .tab,
  body.supply-embedded .tabs button,
  body.supply-embedded .sf-module-tabs button,
  body.supply-embedded .nav-tabs button,
  body.supply-embedded [role="tab"],
  body.supply-embedded [data-tab],
  body.supply-embedded [data-page] {
    min-height: 36px !important;
    padding: 8px 12px !important;
    border-radius: 8px !important;
    border: 1px solid #dbe5ee !important;
    background: #ffffff !important;
    color: #17324a !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    line-height: 1.15 !important;
    white-space: nowrap !important;
  }

  body.supply-embedded .tab.active,
  body.supply-embedded .tabs button.active,
  body.supply-embedded .sf-module-tabs button.active,
  body.supply-embedded .nav-tabs button.active,
  body.supply-embedded [aria-selected="true"] {
    background: #ffe119 !important;
    border-color: #ffe119 !important;
    color: #07111f !important;
  }

  html[data-theme="dark"] body.supply-embedded .tabs,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs,
  html[data-theme="dark"] body.supply-embedded .nav-tabs,
  html[data-theme="dark"] body.supply-embedded .tabbar,
  html[data-theme="dark"] body.supply-embedded [role="tablist"] {
    background: rgba(7, 17, 31, .96) !important;
    border-color: #1f3350 !important;
    box-shadow: 0 10px 24px rgba(0, 0, 0, .36) !important;
  }

  html[data-theme="dark"] body.supply-embedded .tab,
  html[data-theme="dark"] body.supply-embedded .tabs button,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs button,
  html[data-theme="dark"] body.supply-embedded .nav-tabs button,
  html[data-theme="dark"] body.supply-embedded [role="tab"],
  html[data-theme="dark"] body.supply-embedded [data-tab],
  html[data-theme="dark"] body.supply-embedded [data-page] {
    background: #10233f !important;
    border-color: #1f3350 !important;
    color: #dbe7f4 !important;
  }

  html[data-theme="dark"] body.supply-embedded .tab.active,
  html[data-theme="dark"] body.supply-embedded .tabs button.active,
  html[data-theme="dark"] body.supply-embedded .sf-module-tabs button.active,
  html[data-theme="dark"] body.supply-embedded .nav-tabs button.active,
  html[data-theme="dark"] body.supply-embedded [aria-selected="true"] {
    background: #ffe119 !important;
    border-color: #ffe119 !important;
    color: #07111f !important;
  }

  body.supply-embedded-fretes .section {
    scroll-margin-top: 64px !important;
  }

  body.supply-embedded [data-supply-hidden="true"] {
    display: none !important;
  }

  body.supply-embedded .supply-disabled-action {
    opacity: .48 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
  }

  body.supply-embedded-estoque_obras #appPage.hidden {
    display: block !important;
  }

  @media (max-width: 760px) {
    body > header,
    header.topbar,
    .topbar {
      position: relative !important;
    }

    body.supply-embedded main,
    body.supply-embedded .main,
    body.supply-embedded .admin-main {
      padding: 8px !important;
    }

    body.supply-embedded .tabs,
    body.supply-embedded .sf-module-tabs,
    body.supply-embedded .nav-tabs,
    body.supply-embedded .tabbar,
    body.supply-embedded [role="tablist"] {
      top: 0 !important;
      padding: 7px !important;
      gap: 6px !important;
    }
  }
`;

type EmbeddedContext = {
  module: ModuleKey;
  role: string;
  canManage: boolean;
  user: {
    nome: string;
    email: string;
  };
  obras: Array<{
    id: string;
    nome: string;
    codigo: string | null;
    centro_custo: string | null;
  }>;
  sharedStorage: Record<string, unknown>;
  supplierMapBase: Array<Record<string, unknown>>;
  integrations: {
    googleMapsApiKey: string;
  };
  sync: {
    supabaseUrl: string;
    supabaseAnonKey: string;
    accessToken: string;
    contractFormStorageKey: string;
    contractRequestsStorageKey: string;
    freightStorageKey: string;
    notaFiscalStorageKey: string;
    notaFiscalFormStorageKey: string;
    supplierRegistrationStorageKey: string;
    supplierMapStorageKey: string;
    stockStateKey: string;
    evaluationDbKey: string;
    materialRegistrationStorageKey: string;
    materialRegistrationFormStorageKey: string;
    sharedStateKeys: string[];
  };
};

type EmbeddedPageCacheEntry = {
  html: string;
  sharedStorage: Record<string, unknown>;
  supplierMapBase: Array<Record<string, unknown>>;
  stale?: boolean;
};

const embeddedPageCache = new Map<string, EmbeddedPageCacheEntry>();
const embeddedToolInvalidationEvent = "supply-flow:embedded-tool-cache-invalidated";

type EmbeddedToolInvalidationOptions = {
  notifyActive?: boolean;
};

export function invalidateEmbeddedToolCache(moduleKey?: ModuleKey, options: EmbeddedToolInvalidationOptions = {}) {
  Array.from(embeddedPageCache.entries()).forEach(([key, entry]) => {
    if (!moduleKey || key.startsWith(`${moduleKey}:`)) {
      embeddedPageCache.set(key, { ...entry, stale: true });
    }
  });
  if (options.notifyActive && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(embeddedToolInvalidationEvent, { detail: { moduleKey } }));
  }
}

function mergeCachedLocalStorage(moduleKey: ModuleKey, snapshot: Record<string, unknown>) {
  if (typeof window === "undefined") return snapshot;
  const next = { ...snapshot };
  getEmbeddedStorageKeysForModule(moduleKey).forEach((key) => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw && next[key] === undefined) next[key] = JSON.parse(raw);
    } catch {
      // Local embedded state is only a session cache; keep the Supabase snapshot if parsing fails.
    }
  });
  return next;
}

function withEmbeddedShell(html: string, baseHref: string, context: EmbeddedContext) {
  const injection = `<base href="${baseHref}"><style>${embeddedChromeCss}</style>${embeddedGovernanceScript(context)}`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${injection}`);
  }
  return `<!doctype html><html lang="pt-BR"><head>${injection}</head><body>${html}</body></html>`;
}

function embeddedGovernanceScript(context: EmbeddedContext) {
  const safeContext = JSON.stringify(context).replace(/</g, "\\u003c");
  return `<script>
window.SUPPLY_FLOW_CONTEXT=${safeContext};
(function(){
  var ctx = window.SUPPLY_FLOW_CONTEXT || {};
  var moduleKey = ctx.module || "";
  var canManage = !!ctx.canManage;
  var isSuperAdmin = ctx.role === "super_admin";
  var sharedStorage = ctx.sharedStorage || {};
  var integrations = ctx.integrations || {};
  var syncConfig = ctx.sync || {};
  var applying = false;
  var stockLogged = false;
  var hostUser = ctx.user || {};
  window.SEEL_CURRENT_USER = {
    name: hostUser.nome || "",
    nome: hostUser.nome || "",
    email: hostUser.email || "",
    userEmail: hostUser.email || ""
  };
  window.SEEL_USER = window.SEEL_CURRENT_USER;
  window.PLATFORM_USER = window.SEEL_CURRENT_USER;
  window.SUPPLY_FLOW_USER = window.SEEL_CURRENT_USER;
  window.currentUser = window.SEEL_CURRENT_USER;
  window.supplyFlowUser = window.SEEL_CURRENT_USER;
  window.SUPPLY_FLOW_GOOGLE_MAPS_API_KEY = String(integrations.googleMapsApiKey || "").trim();
  window.SUPPLY_FLOW_SUPABASE_CONNECTED = Boolean(syncConfig.supabaseUrl && syncConfig.supabaseAnonKey && syncConfig.accessToken);
  window.SUPPLY_FLOW_SUPPLIER_MAP_BASE = Array.isArray(ctx.supplierMapBase) ? ctx.supplierMapBase : [];

  function writeSharedStorageSnapshot(source, dispatchEvents) {
    if (!source || typeof source !== "object") return;
    Object.keys(source).forEach(function(key) {
      try {
        var serialized = JSON.stringify(source[key]);
        if (nativeStorageSetItem) nativeStorageSetItem.call(window.localStorage, key, serialized);
        else window.localStorage.setItem(key, serialized);
        if (dispatchEvents) {
          try {
            window.dispatchEvent(new StorageEvent("storage", {
              key: key,
              newValue: serialized,
              storageArea: window.localStorage
            }));
          } catch (eventError) {
            window.dispatchEvent(new CustomEvent("supply-flow:shared-storage-updated", { detail: { key: key } }));
          }
        }
      } catch (err) {}
    });
  }

  function updateHostContext(nextContext) {
    if (!nextContext || typeof nextContext !== "object") return;
    ctx = Object.assign({}, ctx, nextContext);
    syncConfig = Object.assign({}, syncConfig, nextContext.sync || {});
    integrations = Object.assign({}, integrations, nextContext.integrations || {});
    sharedStorage = nextContext.sharedStorage && typeof nextContext.sharedStorage === "object" ? nextContext.sharedStorage : sharedStorage;
    canManage = !!ctx.canManage;
    isSuperAdmin = ctx.role === "super_admin";
    hostUser = ctx.user || hostUser || {};
    window.SEEL_CURRENT_USER = {
      name: hostUser.nome || "",
      nome: hostUser.nome || "",
      email: hostUser.email || "",
      userEmail: hostUser.email || ""
    };
    window.SEEL_USER = window.SEEL_CURRENT_USER;
    window.PLATFORM_USER = window.SEEL_CURRENT_USER;
    window.SUPPLY_FLOW_USER = window.SEEL_CURRENT_USER;
    window.currentUser = window.SEEL_CURRENT_USER;
    window.supplyFlowUser = window.SEEL_CURRENT_USER;
    window.SUPPLY_FLOW_GOOGLE_MAPS_API_KEY = String(integrations.googleMapsApiKey || "").trim();
    window.SUPPLY_FLOW_SUPABASE_CONNECTED = Boolean(syncConfig.supabaseUrl && syncConfig.supabaseAnonKey && syncConfig.accessToken);
    writeSharedStorageSnapshot(sharedStorage, true);
    applyRules();
  }

  window.addEventListener("message", function(event) {
    var message = event && event.data;
    if (!message || message.type !== "supply-flow:context-update") return;
    updateHostContext(message.context || {});
  });

  writeSharedStorageSnapshot(sharedStorage, false);

  var nativeStorageSetItem = Storage.prototype.setItem;
  var nativeStorageRemoveItem = Storage.prototype.removeItem;
  var syncTimers = {};
  var knownFreightIds = {};
  var initialFreights = Array.isArray(sharedStorage[syncConfig.freightStorageKey]) ? sharedStorage[syncConfig.freightStorageKey] : [];
  initialFreights.forEach(function(item) {
    if (item && item.id) knownFreightIds[String(item.id)] = true;
  });
  var knownNotaFiscalIds = {};
  var initialNotaFiscalRows = Array.isArray(sharedStorage[syncConfig.notaFiscalStorageKey]) ? sharedStorage[syncConfig.notaFiscalStorageKey] : [];
  initialNotaFiscalRows.forEach(function(item, index) {
    var id = notaFiscalRecordId(item, index);
    if (id) knownNotaFiscalIds[id] = true;
  });
  var knownStockOrderIds = {};
  var initialStockState = sharedStorage[syncConfig.stockStateKey] && typeof sharedStorage[syncConfig.stockStateKey] === "object"
    ? sharedStorage[syncConfig.stockStateKey]
    : {};
  var initialStockOrders = Array.isArray(initialStockState.orders) ? initialStockState.orders : [];
  initialStockOrders.forEach(function(item) {
    if (item && item.id) knownStockOrderIds[String(item.id)] = true;
  });
  var knownEvaluationIds = {};
  var initialEvaluationDb = sharedStorage[syncConfig.evaluationDbKey] && typeof sharedStorage[syncConfig.evaluationDbKey] === "object"
    ? sharedStorage[syncConfig.evaluationDbKey]
    : {};
  var initialEvaluations = Array.isArray(initialEvaluationDb.evaluations) ? initialEvaluationDb.evaluations : [];
  initialEvaluations.forEach(function(item) {
    if (item && item.id) knownEvaluationIds[String(item.id)] = true;
  });
  var knownSupplierRegistrationIds = {};
  var initialSupplierRegistrations = Array.isArray(sharedStorage[syncConfig.supplierRegistrationStorageKey])
    ? sharedStorage[syncConfig.supplierRegistrationStorageKey]
    : [];
  initialSupplierRegistrations.forEach(function(item, index) {
    var id = supplierRegistrationRecordId(item, index);
    if (id) knownSupplierRegistrationIds[id] = true;
  });
  var knownMaterialRegistrationIds = {};
  var initialMaterialRegistrations = Array.isArray(sharedStorage[syncConfig.materialRegistrationStorageKey])
    ? sharedStorage[syncConfig.materialRegistrationStorageKey]
    : [];
  initialMaterialRegistrations.forEach(function(item, index) {
    var id = materialRegistrationRecordId(item, index);
    if (id) knownMaterialRegistrationIds[id] = true;
  });
  var knownContractDbIds = {};
  var knownContractCodes = {};
  var syncingContractStorage = false;
  var initialContracts = Array.isArray(sharedStorage[syncConfig.contractRequestsStorageKey]) ? sharedStorage[syncConfig.contractRequestsStorageKey] : [];
  initialContracts.forEach(function(item) {
    var dbId = item && (item.__supplyContratoDbId || item.dbId || item.supabaseId);
    if (dbId) knownContractDbIds[String(dbId)] = true;
    var code = item && (item.codigo_embutido || item.id);
    if (code) knownContractCodes[String(code)] = true;
  });

  function parseStoragePayload(value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  function syncHeaders(extra) {
    if (!syncConfig.supabaseUrl || !syncConfig.supabaseAnonKey || !syncConfig.accessToken) return null;
    return Object.assign({
      apikey: syncConfig.supabaseAnonKey,
      Authorization: "Bearer " + syncConfig.accessToken,
      "Content-Type": "application/json"
    }, extra || {});
  }

  function syncUrl(path) {
    return String(syncConfig.supabaseUrl || "").replace(/\\/$/, "") + path;
  }

  function postgrestRequest(path, options) {
    var headers = syncHeaders(options && options.headers);
    if (!headers) return Promise.resolve(false);
    return fetch(syncUrl(path), Object.assign({}, options, { headers: headers })).then(function(response) {
      if (!response.ok) throw new Error("Falha ao sincronizar dados: " + response.status);
      return true;
    }).catch(function(error) {
      console.warn(error.message || error);
      return false;
    });
  }

  function postgrestJson(path, options) {
    var headers = syncHeaders(options && options.headers);
    if (!headers) return Promise.resolve(null);
    return fetch(syncUrl(path), Object.assign({}, options, { headers: headers })).then(function(response) {
      if (!response.ok) throw new Error("Falha ao sincronizar dados: " + response.status);
      return response.text().then(function(text) {
        if (!text) return null;
        try {
          return JSON.parse(text);
        } catch (err) {
          return null;
        }
      });
    }).catch(function(error) {
      console.warn(error.message || error);
      return null;
    });
  }

  function supplierMapCategories(item) {
    if (Array.isArray(item && item.categories)) return item.categories.map(firstFilled).filter(Boolean);
    return String(firstFilled(item && item.categories, item && item.categoria, item && item.produto_servico))
      .split(/[|,;/]+/)
      .map(function(value) { return value.trim(); })
      .filter(Boolean);
  }

  function supplierMapRegistrationActive(value) {
    var status = normalizeEmbeddedText(value);
    return status === "sim" || status === "ativo" || status === "cadastro ativo";
  }

  function supplierMapNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    var parsed = Number(String(value).replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function supplierMapPayload(item, categories) {
    var previous = item && item.payload && typeof item.payload === "object" && !Array.isArray(item.payload) ? item.payload : {};
    return Object.assign({}, previous, {
      contato: firstFilled(item && item.contact, previous.contato, previous.Contato),
      observacoes: firstFilled(item && item.notes, previous.observacoes, previous.Observacoes),
      categorias: categories,
      registration: firstFilled(item && item.registration),
      locationPrecision: firstFilled(item && item.locationPrecision),
      sourceSheets: Array.isArray(item && item.sourceSheets) ? item.sourceSheets : [],
      __embedded_supplier_map: item
    });
  }

  function supplierMapRecord(item) {
    if (!item || typeof item !== "object") return null;
    var categories = supplierMapCategories(item);
    var id = firstFilled(item.__supplyFornecedorDbId, isUuid(item.id) ? item.id : "");
    var record = {
      codigo: firstFilled(item.code, item.codigo) || null,
      nome: firstFilled(item.name, item.nome, "Fornecedor sem nome"),
      categoria: categories.join(", ") || null,
      produto_servico: firstFilled(item.productService, item.produto_servico, item.notes) || null,
      cidade: firstFilled(item.city, item.cidade) || null,
      uf: firstFilled(item.uf).toUpperCase() || null,
      regiao: firstFilled(item.region, item.regiao) || null,
      telefone: firstFilled(item.phone, item.telefone) || null,
      email: firstFilled(item.email) || null,
      site: firstFilled(item.site) || null,
      cadastro_ativo: supplierMapRegistrationActive(item.registration),
      latitude: supplierMapNumber(item.latitude),
      longitude: supplierMapNumber(item.longitude),
      payload: supplierMapPayload(item, categories)
    };
    if (id) record.id = id;
    return record;
  }

  function supplierMapIdentityKey(value) {
    return normalizeEmbeddedText([
      value && (value.nome || value.name),
      value && (value.cidade || value.city),
      value && value.uf
    ].join("|"));
  }

  function mergeSupplierMapIds(items, returnedRows) {
    if (!Array.isArray(items) || !Array.isArray(returnedRows) || !returnedRows.length) return;
    var byId = {};
    var byCode = {};
    var byIdentity = {};
    returnedRows.forEach(function(row) {
      if (!row || !row.id) return;
      byId[String(row.id)] = row;
      if (row.codigo) byCode[String(row.codigo)] = row;
      byIdentity[supplierMapIdentityKey(row)] = row;
    });

    items.forEach(function(item) {
      if (!item || typeof item !== "object") return;
      var match =
        byId[String(item.__supplyFornecedorDbId || item.id || "")] ||
        byCode[String(item.code || item.codigo || "")] ||
        byIdentity[supplierMapIdentityKey(item)];
      if (!match || !match.id) return;
      item.id = match.id;
      item.__supplyFornecedorDbId = match.id;
      if (match.codigo && !item.code) item.code = match.codigo;
    });
  }

  function syncSupplierMapRows(items) {
    if (!canManage) {
      alert("Apenas administradores de suprimentos podem alterar a base de fornecedores.");
      return Promise.resolve(false);
    }
    var rows = Array.isArray(items) ? items : [];
    var records = rows.map(supplierMapRecord).filter(Boolean);
    var withId = records.filter(function(record) { return record.id; });
    var withCode = records.filter(function(record) { return !record.id && record.codigo; });
    var inserts = records.filter(function(record) { return !record.id && !record.codigo; });
    var tasks = [];

    if (withId.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(withId)
      }));
    }
    if (withCode.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores?on_conflict=codigo", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(withCode)
      }));
    }
    if (inserts.length) {
      tasks.push(postgrestJson("/rest/v1/fornecedores", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(inserts)
      }));
    }

    return Promise.all(tasks).then(function(results) {
      var returned = [];
      results.forEach(function(result) {
        if (Array.isArray(result)) returned = returned.concat(result);
      });
      mergeSupplierMapIds(rows, returned);
      return true;
    });
  }

  function deleteSupplierMapRecord(id) {
    if (!canManage) {
      alert("Apenas administradores de suprimentos podem excluir fornecedores.");
      return Promise.resolve(false);
    }
    var target = firstFilled(id);
    var path = isUuid(target)
      ? "/rest/v1/fornecedores?id=eq." + encodeURIComponent(target)
      : "/rest/v1/fornecedores?codigo=eq." + encodeURIComponent(target);
    return postgrestRequest(path, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  window.SUPPLY_FLOW_SUPPLIER_MAP_BRIDGE = {
    getAll: function() { return Promise.resolve([]); },
    putMany: syncSupplierMapRows,
    put: function(item) { return syncSupplierMapRows([item]); },
    delete: deleteSupplierMapRecord
  };

  function freightRecord(item) {
    if (!item || typeof item !== "object" || !item.id) return null;
    return {
      id: String(item.id),
      payload: item,
      email_solicitante: String(item.emailSolicitante || item.email_solicitante || ""),
      status: String(item.status || "")
    };
  }

  function notaFiscalRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    if (item.id !== undefined && item.id !== null && String(item.id).trim()) return String(item.id);
    if (item.code !== undefined && item.code !== null && String(item.code).trim()) return "nf_" + compactHash(String(item.code));
    return stableRecordId("nf_simples", item, index);
  }

  function notaFiscalRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) payload.requesterEmail = hostEmail;
      if (hostName) payload.requesterName = hostName;
    }

    var requesterEmail = firstFilled(payload.requesterEmail, payload.email_solicitante, hostEmail);
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;

    var id = notaFiscalRecordId(payload, index);
    payload.id = id;

    return {
      id: id,
      payload: payload,
      codigo: firstFilled(payload.code, payload.codigo, id),
      solicitante: firstFilled(payload.requesterName, payload.solicitante, hostName),
      email_solicitante: requesterEmail,
      centro_custo: firstFilled(payload.issuerDepartment, payload.recipientDepartment, payload.centro_custo),
      status: firstFilled(payload.status, "N\\u00e3o Iniciado"),
      prioridade: firstFilled(payload.priority, "Normal")
    };
  }

  function stableRecordId(prefix, item, index) {
    if (item && item.id !== undefined && item.id !== null && String(item.id).trim()) return String(item.id);
    var source = "";
    try {
      source = JSON.stringify(item || {});
    } catch (err) {
      source = String(Date.now()) + "_" + String(index || 0);
    }
    var hash = 0;
    for (var i = 0; i < source.length; i++) {
      hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0;
    }
    return prefix + "_" + Math.abs(hash) + "_" + String(index || 0);
  }

  function stockOrderRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    if (!canManage && hostEmail) {
      payload.requesterEmail = hostEmail;
      payload.requester = hostEmail;
      if (hostUser.nome) payload.requesterName = hostUser.nome;
    }
    var requesterEmail = String(payload.requesterEmail || payload.requester || "").trim();
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;
    return {
      id: stableRecordId("estoque_pedido", payload, index),
      payload: payload,
      requester_email: requesterEmail,
      obra: String(payload.worksite || payload.obra || ""),
      status: String(payload.status || "")
    };
  }

  function supplierEvaluationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var evaluatorEmail = String(payload.avaliadorEmail || payload.evaluatorEmail || payload.emailAvaliador || hostEmail || "").trim();
    if (!canManage && hostEmail && evaluatorEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;
    payload.avaliadorEmail = evaluatorEmail;
    return {
      id: stableRecordId("avaliacao", payload, index),
      payload: payload,
      cycle_id: String(payload.cycleId || payload.cycle_id || ""),
      supplier_id: String(payload.supplierId || payload.supplier_id || ""),
      obra: String(payload.obra || ""),
      fornecedor: String(payload.fornecedor || ""),
      avaliador_email: evaluatorEmail
    };
  }

  function compactHash(value) {
    var source = String(value || "");
    var hash = 0;
    for (var i = 0; i < source.length; i++) {
      hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(36);
  }

  function supplierRegistrationRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    var values = item.values && typeof item.values === "object" ? item.values : {};
    return firstFilled(
      item.__supplyFornecedorCadastroDbId,
      "forcad_" + compactHash([
        item.id,
        values.requestId,
        item.createdAt,
        values.requesterEmail,
        hostUser.email,
        index
      ].join("|"))
    );
  }

  function supplierRegistrationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var values = item.values && typeof item.values === "object" ? Object.assign({}, item.values) : {};
    var payload = Object.assign({}, item, { values: values });
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) {
        payload.requesterEmail = hostEmail;
        values.requesterEmail = hostEmail;
      }
      if (hostName) {
        payload.requesterName = hostName;
        values.requesterName = hostName;
      }
    }

    var id = supplierRegistrationRecordId(payload, index);
    payload.__supplyFornecedorCadastroDbId = id;
    payload.values = values;

    return {
      id: id,
      payload: payload,
      email_solicitante: firstFilled(payload.requesterEmail, values.requesterEmail, hostEmail),
      obra: firstFilled(payload.costCenter, values.costCenter),
      fornecedor: firstFilled(payload.supplierName, values.supplierName, "Fornecedor sem nome"),
      status: firstFilled(payload.stage, "Solicitacao Recebida")
    };
  }

  function materialRegistrationRecordId(item, index) {
    if (!item || typeof item !== "object") return "";
    return firstFilled(
      item.__supplyCadastroMateriaisDbId,
      item.id,
      item.code ? "mat_" + compactHash(String(item.code)) : "",
      stableRecordId("cadastro_materiais", item, index)
    );
  }

  function materialRegistrationRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var payload = Object.assign({}, item);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();

    if (!canManage) {
      if (hostEmail) payload.requesterEmail = hostEmail;
      if (hostName) payload.requesterName = hostName;
    }

    var requesterEmail = firstFilled(payload.requesterEmail, payload.email_solicitante, hostEmail);
    if (!canManage && hostEmail && requesterEmail.toLowerCase() !== hostEmail.toLowerCase()) return null;

    var id = materialRegistrationRecordId(payload, index);
    payload.id = firstFilled(payload.id, id);
    payload.__supplyCadastroMateriaisDbId = id;

    return {
      id: id,
      payload: payload,
      codigo: firstFilled(payload.code, payload.codigo, id),
      solicitante: firstFilled(payload.requesterName, payload.solicitante, hostName),
      email_solicitante: requesterEmail,
      centro_custo: firstFilled(payload.issuerDepartment, payload.recipientDepartment, payload.centro_custo),
      status: firstFilled(payload.status, "Nao Iniciado"),
      prioridade: firstFilled(payload.priority, "Normal")
    };
  }

  function normalizeEmbeddedText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function firstFilled() {
    for (var i = 0; i < arguments.length; i++) {
      var text = String(arguments[i] == null ? "" : arguments[i]).trim();
      if (text) return text;
    }
    return "";
  }

  function dateOnly(value) {
    var text = firstFilled(value);
    var match = text.match(/^\\d{4}-\\d{2}-\\d{2}/);
    return match ? match[0] : "";
  }

  function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
  }

  function detailedContractStatus(value) {
    var status = normalizeEmbeddedText(value);
    if (!status) return "N\\u00e3o Iniciado";
    if (status.indexOf("aprovado") >= 0 || status.indexOf("finalizado") >= 0) return "Aprovado no Compor";
    if (status.indexOf("compor") >= 0 || status.indexOf("cadastro") >= 0) return "Em Cadastro no Compor";
    if (status.indexOf("assinado") >= 0) return "Contrato Assinado";
    if (status.indexOf("assinatura") >= 0) return "Enviado para Assinatura";
    if (status.indexOf("validacao") >= 0 || status.indexOf("analise") >= 0 || status.indexOf("aguardando") >= 0) return "Aguardando Valida\\u00e7\\u00e3o";
    if (status.indexOf("elaboracao") >= 0) return "Em Elabora\\u00e7\\u00e3o";
    if (status.indexOf("solicitado") >= 0 || status.indexOf("iniciado") >= 0) return "N\\u00e3o Iniciado";
    return firstFilled(value, "N\\u00e3o Iniciado");
  }

  function contractCode(item, index) {
    return firstFilled(item && item.codigo_embutido, item && item.id, stableRecordId("contrato", item, index));
  }

  function resolveContratoObraId(item) {
    if (item && item.__supplyObraId && isUuid(item.__supplyObraId)) return String(item.__supplyObraId);
    var data = item && item.data && typeof item.data === "object" ? item.data : {};
    var target = normalizeEmbeddedText(firstFilled(
      data.obra,
      data.nome_obra,
      data.centro_obra,
      data.centro_departamento,
      item && item.obra,
      item && item.centro
    ));
    var obras = Array.isArray(ctx.obras) ? ctx.obras : [];
    var match = obras.find(function(obra) {
      var values = [obra.id, obra.nome, obra.codigo, obra.centro_custo].map(normalizeEmbeddedText).filter(Boolean);
      return values.some(function(value) {
        return target === value || (target && value && (target.indexOf(value) >= 0 || value.indexOf(target) >= 0));
      });
    });
    if (match && match.id) return String(match.id);
    if (!canManage && obras.length === 1 && obras[0].id) return String(obras[0].id);
    return null;
  }

  function contractRecord(item, index) {
    if (!item || typeof item !== "object") return null;
    var data = item.data && typeof item.data === "object" ? Object.assign({}, item.data) : {};
    var code = contractCode(item, index);
    var hostEmail = String(hostUser.email || "").trim();
    var hostName = String(hostUser.nome || "").trim();
    if (!canManage) {
      if (hostEmail) {
        item.email = hostEmail;
        data.email = hostEmail;
      }
      if (hostName) {
        item.solicitante = hostName;
        data.solicitante = hostName;
      }
    }
    var centro = firstFilled(item.centro, data.centro_obra, data.centro_departamento);
    var tipo = firstFilled(item.tipo, data.tipo_documento_obra, data.tipo_documento_departamento, data.tipo_contrato, "Solicitacao");
    var urgencia = firstFilled(item.urgencia, data.prazo_urgencia, "NORMAL - 5 DIAS UTEIS");
    var deadline = dateOnly(firstFilled(item.dataLimite, data.data_limite_atendimento));
    var status = detailedContractStatus(item.status);
    var dbId = firstFilled(item.__supplyContratoDbId, item.dbId, item.supabaseId);
    var payloadRequest = Object.assign({}, item, {
      id: firstFilled(item.id, code),
      codigo_embutido: code,
      __supplyContratoDbId: dbId || undefined,
      __supplyObraId: resolveContratoObraId(item) || undefined,
      data: data
    });
    var payload = Object.assign({}, data, {
      canal: "embedded_contracts",
      codigo_embutido: code,
      embedded_request_id: code,
      __embedded_contract_request: payloadRequest,
      observacoesResponsavel: firstFilled(item.observacoesResponsavel, data.observacoesResponsavel),
      solicitacaoComErro: Boolean(item.solicitacaoComErro || data.solicitacaoComErro)
    });
    var record = {
      codigo_embutido: code,
      obra_id: resolveContratoObraId(item),
      solicitante: firstFilled(item.solicitante, data.solicitante, hostName),
      email_solicitante: firstFilled(item.email, data.email, hostEmail),
      centro_custo: centro,
      tipo_documento: tipo,
      urgencia: urgencia,
      prazo_urgencia: deadline || null,
      status: status,
      fase_compor: status,
      payload: payload
    };
    if (isUuid(dbId)) record.id = dbId;
    return record;
  }

  function deleteContractRecord(id) {
    return postgrestRequest("/rest/v1/contratos?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function mergeContractIdsIntoStorage(rows, returnedRows) {
    if (!Array.isArray(rows) || !Array.isArray(returnedRows) || !returnedRows.length || !syncConfig.contractRequestsStorageKey) return;
    var byCode = {};
    returnedRows.forEach(function(row) {
      if (row && row.codigo_embutido && row.id) byCode[String(row.codigo_embutido)] = row;
    });
    var changed = false;
    var nextRows = rows.map(function(item, index) {
      if (!item || typeof item !== "object") return item;
      var code = contractCode(item, index);
      var match = byCode[code];
      if (!match || item.__supplyContratoDbId === match.id) return item;
      changed = true;
      return Object.assign({}, item, {
        codigo_embutido: code,
        __supplyContratoDbId: match.id,
        __supplyObraId: match.obra_id || item.__supplyObraId || ""
      });
    });
    if (!changed) return;
    syncingContractStorage = true;
    try {
      nativeStorageSetItem.call(window.localStorage, syncConfig.contractRequestsStorageKey, JSON.stringify(nextRows));
    } catch (err) {
    } finally {
      syncingContractStorage = false;
    }
  }

  function syncContractRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.contractRequestsStorageKey || syncingContractStorage) return;
    var records = rows.map(contractRecord).filter(Boolean);
    var nextDbIds = {};
    var nextCodes = {};
    records.forEach(function(record) {
      if (record.id) nextDbIds[String(record.id)] = true;
      if (record.codigo_embutido) nextCodes[String(record.codigo_embutido)] = true;
    });

    if (canManage) {
      var tasks = [];
      var recordsWithId = records.filter(function(record) { return record.id; });
      var recordsWithoutId = records.filter(function(record) { return !record.id; });
      if (recordsWithId.length) {
        tasks.push(postgrestJson("/rest/v1/contratos?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(recordsWithId)
        }));
      }
      if (recordsWithoutId.length) {
        tasks.push(postgrestJson("/rest/v1/contratos?on_conflict=codigo_embutido", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(recordsWithoutId)
        }));
      }
      Object.keys(knownContractDbIds).forEach(function(id) {
        if (!nextDbIds[id]) tasks.push(deleteContractRecord(id));
      });
      Promise.all(tasks).then(function(results) {
        var returned = [];
        results.forEach(function(result) {
          if (Array.isArray(result)) returned = returned.concat(result);
        });
        mergeContractIdsIntoStorage(rows, returned);
        knownContractDbIds = {};
        knownContractCodes = {};
        records.forEach(function(record) {
          if (record.id) knownContractDbIds[String(record.id)] = true;
          if (record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
        });
        returned.forEach(function(record) {
          if (record && record.id) knownContractDbIds[String(record.id)] = true;
          if (record && record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
        });
      });
      return;
    }

    var newRecords = records.filter(function(record) {
      var dbId = record.id && knownContractDbIds[String(record.id)];
      var code = record.codigo_embutido && knownContractCodes[String(record.codigo_embutido)];
      return !dbId && !code;
    }).map(function(record) {
      var next = Object.assign({}, record);
      delete next.id;
      return next;
    });
    if (!newRecords.length) return;
    postgrestJson("/rest/v1/contratos", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(newRecords)
    }).then(function(returned) {
      if (!Array.isArray(returned)) return;
      mergeContractIdsIntoStorage(rows, returned);
      returned.forEach(function(record) {
        if (record && record.id) knownContractDbIds[String(record.id)] = true;
        if (record && record.codigo_embutido) knownContractCodes[String(record.codigo_embutido)] = true;
      });
    });
  }

  function deleteFreightRecord(id) {
    return postgrestRequest("/rest/v1/fretes_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncFreightRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.freightStorageKey) return;
    var records = rows.map(freightRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/fretes_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownFreightIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteFreightRecord(id));
      });
      Promise.all(tasks).then(function() { knownFreightIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownFreightIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/fretes_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownFreightIds[record.id] = true; });
    });
  }

  function deleteNotaFiscalRecord(id) {
    return postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncNotaFiscalRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.notaFiscalStorageKey) return;
    var records = rows.map(notaFiscalRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownNotaFiscalIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteNotaFiscalRecord(id));
      });
      Promise.all(tasks).then(function() { knownNotaFiscalIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownNotaFiscalIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/nf_simples_remessa_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownNotaFiscalIds[record.id] = true; });
    });
  }

  function deleteStockOrderRecord(id) {
    return postgrestRequest("/rest/v1/estoque_obras_pedidos?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncStockState(state) {
    if (!state || typeof state !== "object") {
      if (canManage) syncSharedState(syncConfig.stockStateKey, null);
      return;
    }

    var orders = Array.isArray(state.orders) ? state.orders : [];
    var stateWithoutOrders = Object.assign({}, state, { orders: [] });
    if (canManage) syncSharedState(syncConfig.stockStateKey, stateWithoutOrders);

    var records = orders.map(stockOrderRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/estoque_obras_pedidos?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownStockOrderIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteStockOrderRecord(id));
      });
      Promise.all(tasks).then(function() { knownStockOrderIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownStockOrderIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/estoque_obras_pedidos", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownStockOrderIds[record.id] = true; });
    });
  }

  function deleteSupplierEvaluationRecord(id) {
    return postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncSupplierEvaluationDb(db) {
    if (!db || typeof db !== "object") {
      if (canManage) {
        syncSharedState(syncConfig.evaluationDbKey, null);
        Object.keys(knownEvaluationIds).forEach(deleteSupplierEvaluationRecord);
        knownEvaluationIds = {};
      }
      return;
    }

    var evaluations = Array.isArray(db.evaluations) ? db.evaluations : [];
    var dbWithoutEvaluations = Object.assign({}, db, { evaluations: [] });
    if (canManage) syncSharedState(syncConfig.evaluationDbKey, dbWithoutEvaluations);

    var records = evaluations.map(supplierEvaluationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownEvaluationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteSupplierEvaluationRecord(id));
      });
      Promise.all(tasks).then(function() { knownEvaluationIds = nextIds; });
      return;
    }

    if (!records.length) return;
    postgrestRequest("/rest/v1/avaliacao_fornecedores_avaliacoes?on_conflict=cycle_id,supplier_id,avaliador_email", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(records)
    }).then(function(ok) {
      if (!ok) return;
      records.forEach(function(record) { knownEvaluationIds[record.id] = true; });
    });
  }

  function deleteSupplierRegistrationRecord(id) {
    return postgrestRequest("/rest/v1/fornecedores_cadastros?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncSupplierRegistrationRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.supplierRegistrationStorageKey) return;
    var records = rows.map(supplierRegistrationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/fornecedores_cadastros?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownSupplierRegistrationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteSupplierRegistrationRecord(id));
      });
      Promise.all(tasks).then(function() { knownSupplierRegistrationIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownSupplierRegistrationIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/fornecedores_cadastros", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownSupplierRegistrationIds[record.id] = true; });
    });
  }

  function deleteMaterialRegistrationRecord(id) {
    return postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes?id=eq." + encodeURIComponent(id), {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
  }

  function syncMaterialRegistrationRows(rows) {
    if (!Array.isArray(rows) || !syncConfig.materialRegistrationStorageKey) return;
    var records = rows.map(materialRegistrationRecord).filter(Boolean);
    var nextIds = {};
    records.forEach(function(record) { nextIds[record.id] = true; });

    if (canManage) {
      var tasks = [];
      if (records.length) {
        tasks.push(postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(records)
        }));
      }
      Object.keys(knownMaterialRegistrationIds).forEach(function(id) {
        if (!nextIds[id]) tasks.push(deleteMaterialRegistrationRecord(id));
      });
      Promise.all(tasks).then(function() { knownMaterialRegistrationIds = nextIds; });
      return;
    }

    var newRecords = records.filter(function(record) { return !knownMaterialRegistrationIds[record.id]; });
    if (!newRecords.length) return;
    postgrestRequest("/rest/v1/cadastro_materiais_solicitacoes", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(newRecords)
    }).then(function(ok) {
      if (!ok) return;
      newRecords.forEach(function(record) { knownMaterialRegistrationIds[record.id] = true; });
    });
  }

  function canSyncSharedState(key) {
    if (!canManage || !Array.isArray(syncConfig.sharedStateKeys) || syncConfig.sharedStateKeys.indexOf(key) < 0) return false;
    if (moduleKey === "contratos" && key === syncConfig.contractFormStorageKey && !isSuperAdmin) return false;
    if (moduleKey === "nota_fiscal" && key === syncConfig.notaFiscalFormStorageKey && !isSuperAdmin) return false;
    if (moduleKey === "cadastro_materiais" && key === syncConfig.materialRegistrationFormStorageKey && !isSuperAdmin) return false;
    return true;
  }

  function syncSharedState(key, payload) {
    if (!canSyncSharedState(key)) return;
    postgrestRequest("/rest/v1/embedded_app_state?on_conflict=storage_key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        storage_key: key,
        module_key: moduleKey,
        payload: payload
      })
    });
  }

  window.SUPPLY_FLOW_SYNC_SHARED_STATE = function(key, payload) {
    syncSharedState(String(key || ""), payload);
  };

  function syncStorageWrite(key, value) {
    var isSharedStateKey = Array.isArray(syncConfig.sharedStateKeys) && syncConfig.sharedStateKeys.indexOf(key) >= 0;
    var isDedicatedRowKey =
      key === syncConfig.freightStorageKey ||
      key === syncConfig.notaFiscalStorageKey ||
      key === syncConfig.supplierRegistrationStorageKey ||
      key === syncConfig.materialRegistrationStorageKey ||
      key === syncConfig.stockStateKey ||
      key === syncConfig.evaluationDbKey ||
      key === syncConfig.contractRequestsStorageKey;
    if (!isSharedStateKey && !isDedicatedRowKey) return;
    window.clearTimeout(syncTimers[key]);
    syncTimers[key] = window.setTimeout(function() {
      var payload = parseStoragePayload(value);
      if (key === syncConfig.contractRequestsStorageKey) syncContractRows(payload);
      else if (key === syncConfig.freightStorageKey) syncFreightRows(payload);
      else if (key === syncConfig.notaFiscalStorageKey) syncNotaFiscalRows(payload);
      else if (key === syncConfig.supplierRegistrationStorageKey) syncSupplierRegistrationRows(payload);
      else if (key === syncConfig.materialRegistrationStorageKey) syncMaterialRegistrationRows(payload);
      else if (key === syncConfig.stockStateKey) syncStockState(payload);
      else if (key === syncConfig.evaluationDbKey) syncSupplierEvaluationDb(payload);
      else syncSharedState(key, payload);
    }, 350);
  }

  Storage.prototype.setItem = function(key, value) {
    nativeStorageSetItem.call(this, key, value);
    if (this === window.localStorage) syncStorageWrite(String(key), String(value));
  };

  Storage.prototype.removeItem = function(key) {
    nativeStorageRemoveItem.call(this, key);
    if (this === window.localStorage) syncStorageWrite(String(key), "null");
  };

  function syncInitialSharedStorage() {
    if (!canManage || !sharedStorage || typeof sharedStorage !== "object") return;
    Object.keys(sharedStorage).forEach(function(key) {
      try {
        syncStorageWrite(key, JSON.stringify(sharedStorage[key]));
      } catch (err) {}
    });
  }

  function syncTheme() {
    var theme = "dark";
    try {
      theme = window.parent.document.documentElement.dataset.theme || "dark";
    } catch (err) {
      try {
        theme = window.localStorage.getItem("supply-flow:theme") || "dark";
      } catch (storageErr) {
        theme = "dark";
      }
    }
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function hide(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      if (el.getAttribute("data-supply-hidden") === "true") return;
      el.setAttribute("data-supply-hidden", "true");
      el.style.display = "none";
    });
  }

  function disable(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      el.disabled = true;
      el.setAttribute("aria-disabled", "true");
      el.classList.add("supply-disabled-action");
    });
  }

  function guard(name, message) {
    var current = window[name];
    if (typeof current !== "function" || current.__supplyGuarded) return;
    var blocked = function() {
      alert(message);
      return false;
    };
    blocked.__supplyGuarded = true;
    window[name] = blocked;
  }

  function labelButtons() {
    document.querySelectorAll(".booking-button, .reserve-btn").forEach(function(button) {
      var text = (button.textContent || "").toUpperCase();
      if (text.indexOf("RESERVAR") >= 0 || text.indexOf("LOCAR") >= 0) {
        button.textContent = "CONSULTAR";
      }
    });
    document.querySelectorAll(".booking-button").forEach(function(button) {
      button.setAttribute("onclick", "openTabById('frotaTab')");
    });
  }

  function consultFleetCard(id) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".vehicle-card .reserve-btn"));
    var button = buttons.find(function(item) {
      return (item.getAttribute("onclick") || "").indexOf(id) >= 0;
    });
    var card = button ? button.closest(".vehicle-card") : null;
    if (!card) {
      alert("Consulta disponivel apenas nos cards visiveis da frota.");
      return false;
    }
    card.classList.add("compact-open");
    var details = card.querySelector("button[onclick*='toggleCardDetails']");
    if (details) details.textContent = "Ocultar detalhes";
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  function applyFrotaRules() {
    labelButtons();
    if (canManage) return;

    hide("button[onclick*='cadastroTab'], button[onclick*='importacaoTab'], button[onclick*='medicoesTab'], button[onclick*='multasTab']");
    hide("button[onclick*='editVehicle'], button[onclick*='makeAvailable'], button[onclick*='deleteVehicle'], button[onclick*='deleteFine'], #deleteSelectedVehicleButton, #cancelEdit, #saveVehicleButton, #saveApiSettingsButton");
    hide("#importGrid, #fineForm, .api-actions, .quick-actions button[onclick*='cadastroTab']");
    disable("#vehicleForm input, #vehicleForm select, #vehicleForm textarea, #fineForm input, #fineForm select, #fineForm textarea");

    if (typeof window.quickReserve === "function" && !window.quickReserve.__supplyConsultOnly) {
      window.quickReserve = function(id) { return consultFleetCard(id); };
      window.quickReserve.__supplyConsultOnly = true;
    }

    guard("editVehicle", "Apenas super_admin pode editar a frota.");
    guard("makeAvailable", "Apenas super_admin pode movimentar a frota.");
    guard("deleteCurrentVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteSelectedVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteVehicle", "Apenas super_admin pode excluir veiculos.");
    guard("deleteFine", "Apenas super_admin pode excluir multas.");
    guard("importInitialSpreadsheet", "Apenas super_admin pode importar a planilha da frota.");
    guard("syncMeasurements", "Apenas super_admin pode sincronizar medicoes.");
    guard("syncArvalFines", "Apenas super_admin pode sincronizar multas.");
    guard("saveApiSettings", "Apenas super_admin pode alterar integracoes.");
  }

  function applyFretesRules() {
    if (canManage) return;

    hide("button[onclick*='dashboard'], button[onclick*='history'], button[onclick*='editor']");
    hide(".header-actions, button[onclick*='editBasic'], button[onclick*='deleteFreight'], button[onclick*='addQuote'], button[onclick*='selectBestQuote'], button[onclick*='deleteQuote']");
    hide("#dashboard, #history, #editor, #googlePlacesConfig, .quotation-actions, .quotation-form-card, .form-editor-tools, .form-editor-actions, .freight-form-error-check, [data-action='edit'], [data-action='email-quote'], [data-action='email-correction'], #detailResponsibleNoteSave, .responsible-note-save-button");
    disable(".phase-select, .form-error-checkbox, .freight-oc-input, .responsible-note-detail-input, .freight-responsible-note-input, select[onchange*='changePhase']");

    guard("changePhase", "Apenas super_admin pode mudar fases de frete.");
    guard("editBasic", "Apenas super_admin pode editar fretes.");
    guard("startFreightEdit", "Apenas super_admin pode editar fretes.");
    guard("deleteFreight", "Apenas super_admin pode excluir fretes.");
    guard("toggleFreightFormError", "Apenas super_admin pode marcar formulario com erro.");
    guard("addQuoteToSelectedFreight", "Apenas super_admin pode gerenciar cotacoes.");
    guard("selectBestQuote", "Apenas super_admin pode aprovar cotacoes.");
    guard("deleteQuote", "Apenas super_admin pode excluir cotacoes.");
    guard("addFreightFormSection", "Apenas super_admin pode editar o formulario.");
    guard("addFreightFormField", "Apenas super_admin pode editar o formulario.");
    guard("moveFreightFormItem", "Apenas super_admin pode editar o formulario.");
    guard("deleteFreightFormItem", "Apenas super_admin pode editar o formulario.");
    guard("restoreDefaultFreightForm", "Apenas super_admin pode editar o formulario.");
    guard("clearAllData", "Apenas super_admin pode limpar dados.");
    guard("loadDemoData", "Apenas super_admin pode carregar exemplos.");
  }

  function applyNotaFiscalRules() {
    if (!isSuperAdmin) {
      hide("button[data-view='editor'], #view-editor");
      guard("saveCurrentEditorField", "Apenas super_admin pode editar o formulario de NF.");
      guard("resetCurrentEditorField", "Apenas super_admin pode editar o formulario de NF.");
      guard("resetAllEditorFields", "Apenas super_admin pode editar o formulario de NF.");
      guard("syncIntegratedWorkLists", "Apenas super_admin pode editar o formulario de NF.");
    }

    if (canManage) return;

    hide("button[data-view='dashboard'], button[data-view='base'], button[data-view='editor'], #view-dashboard, #view-base, #view-editor");
    hide("#baseNew, #quickExport, #exportCsv, #detailEdit, #detailDelete, #detailDeadline, #saveDetailNote");
    disable(".phase-select, #detailNote");
    document.querySelectorAll(".nf-card").forEach(function(card) {
      card.setAttribute("draggable", "false");
    });

    var activeBlocked = ["view-dashboard", "view-base", "view-editor"].some(function(id) {
      var view = document.getElementById(id);
      return view && view.classList.contains("active");
    });
    if (activeBlocked) {
      if (typeof window.showView === "function") window.showView("kanban");
      else {
        ["view-dashboard", "view-base", "view-editor"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.remove("active");
        });
      }
    }

    guard("changePhase", "Apenas administradores de suprimentos podem alterar fases de NF.");
    guard("moveRelative", "Apenas administradores de suprimentos podem alterar fases de NF.");
    guard("editRequest", "Apenas administradores de suprimentos podem editar solicita\\u00e7\\u00f5es de NF.");
    guard("deleteRequest", "Apenas administradores de suprimentos podem excluir solicita\\u00e7\\u00f5es de NF.");
    guard("exportCsv", "Apenas administradores de suprimentos podem exportar a base de NF.");
  }

  function applyContratosRules() {
    if (!isSuperAdmin) {
      hide("button[data-tab='editor'], #editorView");
      if (document.getElementById("editorView") && !document.getElementById("editorView").classList.contains("hidden")) {
        if (typeof window.switchTab === "function") window.switchTab("kanban");
        else document.getElementById("editorView").classList.add("hidden");
      }
      guard("saveFormSpec", "Apenas super_admin pode alterar a estrutura do formulario.");
      guard("renderEditor", "Apenas super_admin pode acessar o editor do formulario.");
      guard("setEditorSection", "Apenas super_admin pode editar secoes do formulario.");
    }

    if (canManage) return;

    hide("button[data-tab='dashboard'], button[data-tab='report'], button[data-tab='import'], #dashboardView, #reportView, #importView");
    hide(".contract-card-observation, .contract-error-toggle, .contract-phase-selector-wrap, .contract-edit-btn, .detail-edit-actions, #clearData");
    disable(".contract-phase-select, .contract-card-observation textarea, .contract-error-toggle input");

    var blockedView = ["dashboardView", "reportView", "importView", "editorView"].some(function(id) {
      var view = document.getElementById(id);
      return view && !view.classList.contains("hidden");
    });
    if (blockedView) {
      if (typeof window.switchTab === "function") window.switchTab("kanban");
      else {
        ["dashboardView", "reportView", "importView", "editorView"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.add("hidden");
        });
      }
    }

    guard("setReqStage", "Apenas administradores de contratos podem mudar fases.");
    guard("moveReq", "Apenas administradores de contratos podem mudar fases.");
    guard("startRequestEdit", "Apenas administradores de contratos podem editar solicitacoes.");
    guard("toggleContractRequestError", "Apenas administradores de contratos podem marcar erro na solicitacao.");
    guard("persistContractResponsibleObservation", "Apenas administradores de contratos podem registrar observacoes.");
    guard("queueContractObservationSave", "Apenas administradores de contratos podem registrar observacoes.");
    guard("bindLegacyImport", "Apenas administradores de contratos podem importar historico.");
  }

  function stockLogin() {
    if (moduleKey !== "estoque_obras" || stockLogged || typeof window.login !== "function") return;
    stockLogged = true;
    window.login(canManage ? "admin" : "requester");
  }

  function applyEstoqueRules() {
    stockLogin();
    hide("#loginPage, button[onclick='logout()']");
    if (canManage) return;
    hide("button[onclick*='config'], button[onclick*='estoque'], button[onclick*='kanban'], button[onclick*='agenda']");
    guard("quickQty", "Apenas super_admin ou almoxarife pode movimentar estoque.");
    guard("openItem", "Apenas super_admin ou almoxarife pode editar itens.");
    guard("changeStatus", "Apenas super_admin ou almoxarife pode alterar pedidos.");
    guard("deliverOrder", "Apenas super_admin ou almoxarife pode baixar pedidos.");
    guard("saveOrder", "Apenas super_admin ou almoxarife pode salvar pedidos.");
  }

  function applyAvaliacaoRules() {
    if (canManage) return;
    hide("button[data-page='admin'], button[data-page='dashboard'], button[data-page='historico'], #page-admin, #page-dashboard, #page-historico");
    var active = document.querySelector(".page.active");
    if (active && active.id !== "page-avaliacao") {
      if (typeof window.showPage === "function") window.showPage("avaliacao");
      else {
        document.querySelectorAll(".page").forEach(function(page) { page.classList.remove("active"); });
        var evaluation = document.getElementById("page-avaliacao");
        if (evaluation) evaluation.classList.add("active");
      }
    }
    guard("createCycle", "Apenas super_admin pode administrar ciclos.");
    guard("setSelectedCycleStatus", "Apenas super_admin pode administrar ciclos.");
    guard("deleteSelectedCycle", "Apenas super_admin pode excluir ciclos.");
    guard("importSheet", "Apenas super_admin pode importar fornecedores.");
    guard("importBothTables", "Apenas super_admin pode importar fornecedores.");
    guard("importBackup", "Apenas super_admin pode restaurar backups.");
    guard("clearAll", "Apenas super_admin pode apagar a base.");
  }

  function setSupplierMapReadOnlyModal() {
    hide("#deleteBtn, .modal-foot button[onclick='saveSupplier()']");
    disable("#supplierForm input, #supplierForm select, #supplierForm textarea");
    var title = document.getElementById("modalTitle");
    if (title && normalizeEmbeddedText(title.textContent).indexOf("editar") >= 0) {
      title.textContent = "Detalhes do fornecedor";
    }
  }

  function wrapSupplierMapModal() {
    if (typeof window.openSupplierModal !== "function" || window.openSupplierModal.__supplyReadonlyWrapped) return;
    var nativeOpenSupplierModal = window.openSupplierModal;
    window.openSupplierModal = function() {
      var result = nativeOpenSupplierModal.apply(this, arguments);
      window.setTimeout(setSupplierMapReadOnlyModal, 0);
      return result;
    };
    window.openSupplierModal.__supplyReadonlyWrapped = true;
  }

  function applyFornecedorMapRules() {
    hide(".sf-topbar, .sf-page-head");

    if (canManage) return;

    hide("button[data-view='import'], #view-import, .sf-header-action.primary, .sf-primary-action, button[onclick='openSupplierModal()']");
    document.querySelectorAll("button[onclick^=\\"openSupplierModal('\\"]").forEach(function(button) {
      button.textContent = "\\u2139";
      button.setAttribute("title", "Detalhes");
      button.setAttribute("aria-label", "Detalhes do fornecedor");
    });

    var importView = document.getElementById("view-import");
    if (importView && importView.classList.contains("active")) {
      if (typeof window.switchView === "function") window.switchView("suppliers");
      else importView.classList.remove("active");
    }

    wrapSupplierMapModal();
    setSupplierMapReadOnlyModal();
    guard("saveSupplier", "Apenas administradores de suprimentos podem salvar fornecedores.");
    guard("deleteCurrentSupplier", "Apenas administradores de suprimentos podem excluir fornecedores.");
    guard("handleImport", "Apenas administradores de suprimentos podem importar fornecedores.");
  }

  function applyFornecedorCadastroRules() {
    hide(".sf-topbar");

    if (!canManage) {
      hide("button[data-tab='dashboard'], button[data-tab='import'], button[data-tab='editor'], #view-dashboard, #view-import, #view-editor");
      hide("#btnDemo, #btnClearAll, #btnImportJson, #btnExportJson, .stage-actions, .supplier-phase-selector-wrap, .supplier-detail-phase-selector");
      hide(".modal-actions button[onclick*='moveStage'], .modal-actions button[onclick*='resetTimer'], .modal-actions button[onclick*='editDeadline'], .modal-actions button[onclick*='deleteItem']");
      hide(".responsible-actions, .attachment-item button");
      disable(".phase-select, .supplier-detail-phase-selector select, #responsibleNote, #responsibleFiles");

      var activeBlocked = ["view-dashboard", "view-import", "view-editor"].some(function(id) {
        var view = document.getElementById(id);
        return view && !view.classList.contains("hidden");
      });
      if (activeBlocked) {
        if (typeof window.switchTab === "function") window.switchTab("kanban");
        else {
          ["view-dashboard", "view-import", "view-editor"].forEach(function(id) {
            var view = document.getElementById(id);
            if (view) view.classList.add("hidden");
          });
        }
      }

      guard("moveStage", "Apenas administradores de suprimentos podem mudar fases.");
      guard("changeSupplierPhase", "Apenas administradores de suprimentos podem mudar fases.");
      guard("resetTimer", "Apenas administradores de suprimentos podem alterar cronometros.");
      guard("editDeadline", "Apenas administradores de suprimentos podem alterar prazos.");
      guard("deleteItem", "Apenas administradores de suprimentos podem excluir cadastros.");
      guard("saveResponsibleNote", "Apenas administradores de suprimentos podem registrar observacoes internas.");
      guard("handleResponsibleFiles", "Apenas administradores de suprimentos podem anexar documentacao interna.");
      guard("removeResponsibleFile", "Apenas administradores de suprimentos podem remover anexos internos.");
      guard("supplierRunLegacyImport", "Apenas administradores de suprimentos podem importar base antiga.");
      guard("clearAll", "Apenas administradores de suprimentos podem limpar dados.");
    }

    if (!isSuperAdmin) {
      hide("button[data-tab='editor'], #view-editor");
      guard("saveSchema", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addSection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addQuestion", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("applySection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteSection", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("removeQuestion", "Apenas super_admin pode editar a estrutura do formulario.");
    }
  }

  function applyCadastroMateriaisRules() {
    if (!isSuperAdmin) {
      hide("button[data-view='editor'], #view-editor");
      guard("saveCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("resetCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteCurrentEditorField", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("resetAllEditorFields", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("saveProductsEditorV5", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("addProductFieldV7", "Apenas super_admin pode editar a estrutura do formulario.");
      guard("deleteProductFieldV7", "Apenas super_admin pode editar a estrutura do formulario.");
    }

    if (canManage) return;

    hide("button[data-view='dashboard'], button[data-view='base'], button[data-view='editor'], #view-dashboard, #view-base, #view-editor");
    hide("button[onclick*='deleteRequest'], button[onclick*='editRequest'], .table-actions button:not([data-action='detail'])");
    disable(".phase-select");
    document.querySelectorAll(".nf-card").forEach(function(card) {
      card.setAttribute("draggable", "false");
    });

    var activeBlocked = ["view-dashboard", "view-base", "view-editor"].some(function(id) {
      var view = document.getElementById(id);
      return view && view.classList.contains("active");
    });
    if (activeBlocked) {
      if (typeof window.showView === "function") window.showView("kanban");
      else {
        ["view-dashboard", "view-base", "view-editor"].forEach(function(id) {
          var view = document.getElementById(id);
          if (view) view.classList.remove("active");
        });
      }
    }

    guard("changePhase", "Apenas administradores de suprimentos podem mudar fases.");
    guard("moveRelative", "Apenas administradores de suprimentos podem mudar fases.");
    guard("editRequest", "Apenas administradores de suprimentos podem editar solicitacoes.");
    guard("deleteRequest", "Apenas administradores de suprimentos podem excluir solicitacoes.");
    guard("exportCsv", "Apenas administradores de suprimentos podem exportar a base.");
  }

  function applyRules() {
    if (applying || !document.body) return;
    applying = true;
    try {
      document.body.classList.add("supply-embedded", "supply-embedded-" + moduleKey);
      document.body.dataset.supplyRole = ctx.role || "viewer";
      document.body.dataset.supplyCanManage = canManage ? "true" : "false";
      document.body.dataset.supplySupabase = window.SUPPLY_FLOW_SUPABASE_CONNECTED ? "connected" : "offline";

      if (moduleKey === "frota") applyFrotaRules();
      if (moduleKey === "contratos") applyContratosRules();
      if (moduleKey === "fretes") applyFretesRules();
      if (moduleKey === "nota_fiscal") applyNotaFiscalRules();
      if (moduleKey === "fornecedores") {
        if (document.getElementById("sfAppMap")) applyFornecedorMapRules();
        else applyFornecedorCadastroRules();
      }
      if (moduleKey === "estoque_obras") applyEstoqueRules();
      if (moduleKey === "cadastro_materiais") applyCadastroMateriaisRules();
      if (moduleKey === "avaliacao_fornecedores") applyAvaliacaoRules();
    } finally {
      applying = false;
    }
  }

  ready(function() {
    syncTheme();
    applyRules();
    var observer = new MutationObserver(function() { applyRules(); });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(syncInitialSharedStorage, 900);
    window.setInterval(syncTheme, 1000);
    window.setTimeout(applyRules, 250);
    window.setTimeout(applyRules, 900);
    window.setTimeout(applyRules, 1800);
  });
})();
</script>`;
}

export function EmbeddedHtmlToolPage({ title, moduleKey, loadHtml, loadSupplierMapBase = false }: EmbeddedHtmlToolPageProps) {
  const { session, profile, obras } = useAuth();
  const cacheKey = `${moduleKey}:${session?.user.id || "anon"}:${loadSupplierMapBase ? "suppliers" : "base"}`;
  const cached = embeddedPageCache.get(cacheKey);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const srcDocVersionRef = useRef<string | null>(null);
  const [html, setHtml] = useState<string | null>(() => cached?.html ?? null);
  const [sharedStorage, setSharedStorage] = useState<Record<string, unknown> | null>(() => cached?.sharedStorage ?? null);
  const [supplierMapBase, setSupplierMapBase] = useState<Array<Record<string, unknown>> | null>(() => cached?.supplierMapBase ?? null);
  const [error, setError] = useState<string | null>(null);
  const [reloadAttempt, setReloadAttempt] = useState(0);
  const [dataRefreshAttempt, setDataRefreshAttempt] = useState(0);
  const [srcDoc, setSrcDoc] = useState<string | undefined>(undefined);
  const baseHref = useMemo(() => new URL(import.meta.env.BASE_URL || "/", window.location.origin).toString(), []);

  const embeddedContext = useMemo<EmbeddedContext>(
    () => ({
      module: moduleKey,
      role: profile?.role || "viewer",
      canManage: canManage(profile, moduleKey),
      user: {
        nome: profile?.nome || "",
        email: profile?.email || "",
      },
      obras: obras.map((obra) => ({
        id: obra.id,
        nome: obra.nome,
        codigo: obra.codigo,
        centro_custo: obra.centro_custo,
      })),
      sharedStorage: sharedStorage || {},
      supplierMapBase: supplierMapBase || [],
      integrations: {
        googleMapsApiKey: moduleKey === "fretes" ? String(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "").trim() : "",
      },
      sync: {
        supabaseUrl: supabaseUrl || "",
        supabaseAnonKey: supabaseAnonKey || "",
        accessToken: session?.access_token || "",
        contractFormStorageKey: CONTRATOS_FORM_STORAGE_KEY,
        contractRequestsStorageKey: CONTRATOS_REQUESTS_STORAGE_KEY,
        freightStorageKey: FRETES_STORAGE_KEY,
        notaFiscalStorageKey: NOTA_FISCAL_STORAGE_KEY,
        notaFiscalFormStorageKey: NOTA_FISCAL_FORM_STORAGE_KEY,
        supplierRegistrationStorageKey: FORNECEDORES_CADASTRO_STORAGE_KEY,
        supplierMapStorageKey: FORNECEDORES_MAP_STORAGE_KEY,
        stockStateKey: ESTOQUE_STATE_STORAGE_KEY,
        evaluationDbKey: AVALIACAO_DB_STORAGE_KEY,
        materialRegistrationStorageKey: CADASTRO_MATERIAIS_STORAGE_KEY,
        materialRegistrationFormStorageKey: CADASTRO_MATERIAIS_FORM_STORAGE_KEY,
        sharedStateKeys: getEmbeddedStorageKeysForModule(moduleKey).filter(
          (key) =>
            key !== FRETES_STORAGE_KEY &&
            key !== NOTA_FISCAL_STORAGE_KEY &&
            key !== CONTRATOS_REQUESTS_STORAGE_KEY &&
            key !== FORNECEDORES_CADASTRO_STORAGE_KEY &&
            key !== CADASTRO_MATERIAIS_STORAGE_KEY
        ),
      },
    }),
    [moduleKey, obras, profile, session?.access_token, sharedStorage, supplierMapBase]
  );

  useEffect(() => {
    let active = true;
    const forceAssetReload = reloadAttempt > 0;
    const cachedEntry = forceAssetReload ? undefined : embeddedPageCache.get(cacheKey);

    if (cachedEntry) {
      const nextSharedStorage = mergeCachedLocalStorage(moduleKey, cachedEntry.sharedStorage);
      embeddedPageCache.set(cacheKey, { ...cachedEntry, sharedStorage: nextSharedStorage });
      setHtml(cachedEntry.html);
      setSharedStorage(nextSharedStorage);
      setSupplierMapBase(cachedEntry.supplierMapBase);
      setError(null);
      if (!cachedEntry.stale && dataRefreshAttempt === 0) {
        return () => {
          active = false;
        };
      }
    }

    if (!cachedEntry) {
      setHtml(null);
      setSharedStorage(null);
      setSupplierMapBase(null);
    }
    setError(null);

    Promise.all([
      cachedEntry?.html && !forceAssetReload ? Promise.resolve(cachedEntry.html) : loadHtml(),
      loadEmbeddedStorageSnapshot(moduleKey),
      loadSupplierMapBase ? listFornecedorMapSuppliers() : Promise.resolve(null),
    ])
      .then(([content, snapshot, supplierMapRows]) => {
        if (!active) return;
        const nextSupplierMapBase = Array.isArray(supplierMapRows) ? supplierMapRows : cachedEntry?.supplierMapBase || [];
        embeddedPageCache.set(cacheKey, {
          html: content,
          sharedStorage: snapshot,
          supplierMapBase: nextSupplierMapBase,
          stale: false,
        });
        setHtml(content);
        setSharedStorage(snapshot);
        setSupplierMapBase(nextSupplierMapBase);
      })
      .catch(() => {
        if (active) setError("Nao foi possivel carregar este modulo.");
      });

    return () => {
      active = false;
    };
  }, [cacheKey, dataRefreshAttempt, loadHtml, loadSupplierMapBase, moduleKey, reloadAttempt]);

  useEffect(() => {
    function handleEmbeddedInvalidation(event: Event) {
      const targetModule = (event as CustomEvent<{ moduleKey?: ModuleKey }>).detail?.moduleKey;
      if (targetModule && targetModule !== moduleKey) return;
      setDataRefreshAttempt((value) => value + 1);
    }

    window.addEventListener(embeddedToolInvalidationEvent, handleEmbeddedInvalidation);
    return () => window.removeEventListener(embeddedToolInvalidationEvent, handleEmbeddedInvalidation);
  }, [moduleKey]);

  useEffect(() => {
    if (!html || !sharedStorage || supplierMapBase === null) {
      setSrcDoc(undefined);
      srcDocVersionRef.current = null;
      return;
    }

    const nextVersion = `${cacheKey}:${reloadAttempt}`;
    if (srcDocVersionRef.current === nextVersion) return;
    srcDocVersionRef.current = nextVersion;
    setSrcDoc(withEmbeddedShell(html, baseHref, embeddedContext));
  }, [baseHref, cacheKey, embeddedContext, html, reloadAttempt, sharedStorage, supplierMapBase]);

  useEffect(() => {
    if (!srcDoc) return;
    frameRef.current?.contentWindow?.postMessage({ type: "supply-flow:context-update", context: embeddedContext }, window.location.origin);
  }, [embeddedContext, srcDoc]);

  const renderedSrcDoc = useMemo(() => {
    if (srcDoc) return srcDoc;
    if (!html || !sharedStorage || supplierMapBase === null) return undefined;
    return withEmbeddedShell(html, baseHref, embeddedContext);
  }, [baseHref, embeddedContext, html, sharedStorage, srcDoc, supplierMapBase]);

  if (error) {
    return (
      <section className="state-panel">
        <h2>{error}</h2>
        <p>O modulo nao foi derrubado; apenas a carga do asset falhou. Tente novamente sem precisar sair da tela.</p>
        <button
          className="secondary-button"
          type="button"
          onClick={() => {
            embeddedPageCache.delete(cacheKey);
            setReloadAttempt((value) => value + 1);
          }}
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  if (!renderedSrcDoc) return <LoadingState label={`Carregando ${title}...`} />;

  return (
    <div className="embedded-tool-page">
      <iframe
        ref={frameRef}
        className="embedded-tool-frame"
        title={title}
        srcDoc={renderedSrcDoc}
        onLoad={() => frameRef.current?.contentWindow?.postMessage({ type: "supply-flow:context-update", context: embeddedContext }, window.location.origin)}
        sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
