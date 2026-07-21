import { useEffect, useMemo, useState } from "react";
import { LoadingState } from "./States";
import { useAuth } from "../contexts/AuthContext";
import { canManage } from "../lib/permissions";
import {
  AVALIACAO_DB_STORAGE_KEY,
  CONTRATOS_FORM_STORAGE_KEY,
  ESTOQUE_STATE_STORAGE_KEY,
  FRETES_STORAGE_KEY,
  getEmbeddedStorageKeysForModule,
  loadEmbeddedStorageSnapshot,
} from "../services/embeddedSync";
import { supabaseAnonKey, supabaseUrl } from "../services/supabase";
import type { ModuleKey } from "../types";

type EmbeddedHtmlToolPageProps = {
  title: string;
  moduleKey: ModuleKey;
  loadHtml: () => Promise<string>;
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
  body.supply-embedded-estoque_obras #loginPage {
    display: none !important;
  }

  body.supply-embedded-frota .hero {
    display: none !important;
  }

  body.supply-embedded-fretes {
    overflow-x: hidden !important;
  }

  body.supply-embedded-fretes .container,
  body.supply-embedded-fretes main,
  body.supply-embedded-fretes .section {
    width: 100% !important;
    max-width: none !important;
  }

  body.supply-embedded-fretes .tabs {
    position: sticky !important;
    top: 0 !important;
    z-index: 40 !important;
    display: flex !important;
    overflow-x: auto !important;
    gap: 8px !important;
    padding: 8px !important;
    background: rgba(255, 255, 255, .96) !important;
    border-bottom: 1px solid #e2e8f0 !important;
    box-shadow: 0 8px 20px rgba(15, 23, 42, .08) !important;
  }

  html[data-theme="dark"] body.supply-embedded-fretes .tabs {
    background: rgba(7, 17, 31, .96) !important;
    border-color: #1f3350 !important;
    box-shadow: 0 10px 24px rgba(0, 0, 0, .36) !important;
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
  sync: {
    supabaseUrl: string;
    supabaseAnonKey: string;
    accessToken: string;
    contractFormStorageKey: string;
    freightStorageKey: string;
    stockStateKey: string;
    evaluationDbKey: string;
    sharedStateKeys: string[];
  };
};

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
  window.currentUser = window.SEEL_CURRENT_USER;
  window.supplyFlowUser = window.SEEL_CURRENT_USER;

  Object.keys(sharedStorage).forEach(function(key) {
    try {
      window.localStorage.setItem(key, JSON.stringify(sharedStorage[key]));
    } catch (err) {}
  });

  var nativeStorageSetItem = Storage.prototype.setItem;
  var nativeStorageRemoveItem = Storage.prototype.removeItem;
  var syncTimers = {};
  var knownFreightIds = {};
  var initialFreights = Array.isArray(sharedStorage[syncConfig.freightStorageKey]) ? sharedStorage[syncConfig.freightStorageKey] : [];
  initialFreights.forEach(function(item) {
    if (item && item.id) knownFreightIds[String(item.id)] = true;
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

  function freightRecord(item) {
    if (!item || typeof item !== "object" || !item.id) return null;
    return {
      id: String(item.id),
      payload: item,
      email_solicitante: String(item.emailSolicitante || item.email_solicitante || ""),
      status: String(item.status || "")
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

  function canSyncSharedState(key) {
    if (!canManage || !Array.isArray(syncConfig.sharedStateKeys) || syncConfig.sharedStateKeys.indexOf(key) < 0) return false;
    if (moduleKey === "contratos" && key === syncConfig.contractFormStorageKey && !isSuperAdmin) return false;
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

  function syncStorageWrite(key, value) {
    var isSharedStateKey = Array.isArray(syncConfig.sharedStateKeys) && syncConfig.sharedStateKeys.indexOf(key) >= 0;
    var isDedicatedRowKey = key === syncConfig.freightStorageKey || key === syncConfig.stockStateKey || key === syncConfig.evaluationDbKey;
    if (!isSharedStateKey && !isDedicatedRowKey) return;
    window.clearTimeout(syncTimers[key]);
    syncTimers[key] = window.setTimeout(function() {
      var payload = parseStoragePayload(value);
      if (key === syncConfig.freightStorageKey) syncFreightRows(payload);
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

  function applyContratosRules() {
    if (isSuperAdmin) return;
    hide("button[data-tab='editor'], #editorView");
    if (document.getElementById("editorView") && !document.getElementById("editorView").classList.contains("hidden")) {
      if (typeof window.switchTab === "function") window.switchTab("kanban");
      else document.getElementById("editorView").classList.add("hidden");
    }
    guard("saveFormSpec", "Apenas super_admin pode alterar a estrutura do formulario.");
    guard("renderEditor", "Apenas super_admin pode acessar o editor do formulario.");
    guard("setEditorSection", "Apenas super_admin pode editar secoes do formulario.");
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

  function applyRules() {
    if (applying || !document.body) return;
    applying = true;
    try {
      document.body.classList.add("supply-embedded", "supply-embedded-" + moduleKey);
      document.body.dataset.supplyRole = ctx.role || "viewer";
      document.body.dataset.supplyCanManage = canManage ? "true" : "false";

      if (moduleKey === "frota") applyFrotaRules();
      if (moduleKey === "contratos") applyContratosRules();
      if (moduleKey === "fretes") applyFretesRules();
      if (moduleKey === "estoque_obras") applyEstoqueRules();
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

export function EmbeddedHtmlToolPage({ title, moduleKey, loadHtml }: EmbeddedHtmlToolPageProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [sharedStorage, setSharedStorage] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { session, profile, obras } = useAuth();

  useEffect(() => {
    let active = true;
    setHtml(null);
    setSharedStorage(null);
    setError(null);

    Promise.all([loadHtml(), loadEmbeddedStorageSnapshot(moduleKey)])
      .then(([content, snapshot]) => {
        if (!active) return;
        setHtml(content);
        setSharedStorage(snapshot);
      })
      .catch(() => {
        if (active) setError("Nao foi possivel carregar este modulo.");
      });

    return () => {
      active = false;
    };
  }, [loadHtml, moduleKey]);

  const srcDoc = useMemo(() => {
    if (!html || !sharedStorage) return undefined;
    const baseHref = new URL(import.meta.env.BASE_URL || "/", window.location.origin).toString();
    return withEmbeddedShell(html, baseHref, {
      module: moduleKey,
      role: profile?.role || "viewer",
      canManage: canManage(profile?.role, moduleKey),
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
      sharedStorage,
      sync: {
        supabaseUrl: supabaseUrl || "",
        supabaseAnonKey: supabaseAnonKey || "",
        accessToken: session?.access_token || "",
        contractFormStorageKey: CONTRATOS_FORM_STORAGE_KEY,
        freightStorageKey: FRETES_STORAGE_KEY,
        stockStateKey: ESTOQUE_STATE_STORAGE_KEY,
        evaluationDbKey: AVALIACAO_DB_STORAGE_KEY,
        sharedStateKeys: getEmbeddedStorageKeysForModule(moduleKey).filter((key) => key !== FRETES_STORAGE_KEY),
      },
    });
  }, [html, moduleKey, obras, profile, session, sharedStorage]);

  if (error) {
    return (
      <section className="state-panel">
        <h2>{error}</h2>
        <p>Atualize a pagina e tente novamente.</p>
      </section>
    );
  }

  if (!srcDoc) return <LoadingState label={`Carregando ${title}...`} />;

  return (
    <div className="embedded-tool-page">
      <iframe
        className="embedded-tool-frame"
        title={title}
        srcDoc={srcDoc}
        sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
