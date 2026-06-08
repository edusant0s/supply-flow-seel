/* global React, ReactDOM, XLSX */

const { useEffect, useMemo, useRef, useState } = React;

const STORAGE_KEY = "kanban_orcamentos_solicitacoes_v3";

const STATUSES = [
  { id: "nao_iniciado", label: "Não iniciado" },
  { id: "em_cotacao", label: "Em Cotação" },
  { id: "finalizado", label: "Finalizado" },
  { id: "pausado", label: "Pausado" },
];

const TIMER_ACTIVE_STATUSES = ["nao_iniciado", "em_cotacao"];

const TIPO_ORCAMENTO_OPTIONS = [
  "Orçamento Inicial (Pré-BID)",
  "Pós-Aceite Verbal - Obra Ganha (Renegociação)",
  "Renegociação Orçamento (Pré-BID)",
];

function nowIso() {
  return new Date().toISOString();
}

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm() {
  return {
    dataSolicitacao: getTodayIso(),
    nomeSolicitante: "",
    emailSolicitante: "",
    numeroProposta: "",
    nomeObra: "",
    cliente: "",
    localObra: "",
    tipoOrcamento: "",
    dataEntregaCotacoes: "",
    anexos: [],
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        nome: file.name,
        tamanho: file.size,
        tipo: file.type || "Arquivo",
        dataUrl: String(reader.result || ""),
      });
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function makePhaseHistory(status, timestamp = nowIso()) {
  return {
    nao_iniciado: status === "nao_iniciado" ? timestamp : null,
    em_cotacao: status === "em_cotacao" ? timestamp : null,
    finalizado: status === "finalizado" ? timestamp : null,
    pausado: status === "pausado" ? timestamp : null,
  };
}

function normalizeLegacyCard(card) {
  const createdAt = card.createdAt || nowIso();
  const status = card.status || "nao_iniciado";
  const phaseEnteredAt = card.phaseEnteredAt || createdAt;
  const phaseDurationsMs = card.phaseDurationsMs || {
    nao_iniciado: 0,
    em_cotacao: 0,
    finalizado: 0,
    pausado: 0,
  };
  const phaseHistory = card.phaseHistory || makePhaseHistory(status, phaseEnteredAt);

  return {
    ...card,
    createdAt,
    phaseEnteredAt,
    phaseDurationsMs,
    phaseHistory,
    valorFinal: Number(card.valorFinal || 0),
    saving: Number(card.saving || 0),
    quantidadeReq: Number(card.quantidadeReq || 0),
    spendInput: card.spendInput ?? (card.valorFinal ? String(card.valorFinal) : ""),
    savingInput: card.savingInput ?? (card.saving ? String(card.saving) : ""),
    quantidadeReqInput: card.quantidadeReqInput ?? (card.quantidadeReq ? String(card.quantidadeReq) : ""),
    anexos: Array.isArray(card.anexos) ? card.anexos : [],
  };
}

const SAMPLE_DATA = [
  normalizeLegacyCard({
    id: "Pp-001-26",
    numeroProposta: "Pp-001-26",
    nomeSolicitante: "Mariana Alves",
    emailSolicitante: "mariana@empresa.com",
    nomeObra: "Obra Alpha",
    cliente: "Cliente A",
    localObra: "São Paulo/SP",
    tipoOrcamento: "Orçamento Inicial (Pré-BID)",
    dataSolicitacao: "2026-05-20",
    dataEntregaCotacoes: "2026-06-05",
    fornecedor: "A definir",
    valorInicial: 0,
    valorFinal: 0,
    saving: 0,
    quantidadeReq: 0,
    prioridade: "Normal",
    status: "nao_iniciado",
    anexos: [],
    observacoes: "Solicitação de exemplo.",
  }),
  normalizeLegacyCard({
    id: "Pp-002-26",
    numeroProposta: "Pp-002-26",
    nomeSolicitante: "Carlos Lima",
    emailSolicitante: "carlos@empresa.com",
    nomeObra: "Obra Beta",
    cliente: "Cliente B",
    localObra: "Campinas/SP",
    tipoOrcamento: "Pós-Aceite Verbal - Obra Ganha (Renegociação)",
    dataSolicitacao: "2026-05-18",
    dataEntregaCotacoes: "2026-06-12",
    fornecedor: "ABC Serviços",
    valorInicial: 0,
    valorFinal: 0,
    saving: 0,
    quantidadeReq: 0,
    prioridade: "Normal",
    status: "em_cotacao",
    anexos: [],
    observacoes: "Spend e saving devem ser preenchidos manualmente quando finalizado.",
  }),
];

function normalizeKey(key) {
  return String(key ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getField(row, aliases, fallback = "") {
  const entries = Object.entries(row);
  for (const alias of aliases) {
    const found = entries.find(([key]) => normalizeKey(key) === normalizeKey(alias));
    if (found && found[1] !== undefined && found[1] !== null) return String(found[1]).trim();
  }
  return fallback;
}

function normalizeProposalNumber(value, fallback) {
  const text = String(value ?? "").trim();
  if (!text) return fallback;
  const match = text.match(/pp[-\s]?([0-9]{1,3})[-\s]?([0-9]{2})/i);
  if (!match) return text;
  return `Pp-${match[1].padStart(3, "0")}-${match[2]}`;
}

function buildFallbackProposalNumber(index) {
  const currentYear = String(new Date().getFullYear()).slice(-2);
  return `Pp-${String(index + 1).padStart(3, "0")}-${currentYear}`;
}

function normalizeStatus(value) {
  const raw = normalizeKey(value);
  if (!raw) return "nao_iniciado";
  if (raw.includes("nao") || raw.includes("novo") || raw.includes("iniciado")) return "nao_iniciado";
  if (raw.includes("cotacao") || raw.includes("orc") || raw.includes("analise") || raw.includes("fornecedor")) return "em_cotacao";
  if (raw.includes("final") || raw.includes("conclu") || raw.includes("aprov") || raw.includes("recus") || raw.includes("reprov")) return "finalizado";
  if (raw.includes("paus") || raw.includes("suspens") || raw.includes("hold")) return "pausado";
  return STATUSES.some((item) => item.id === raw) ? raw : "nao_iniciado";
}

function parseMoney(value) {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const text = String(value).trim().replace(/R\$/gi, "").replace(/\s/g, "");
  if (!text) return 0;
  const normalized = text.includes(",") ? text.replace(/[.]/g, "").replace(",", ".") : text.replace(/,/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatExcelDate(value) {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      return `${String(parsed.y).padStart(4, "0")}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
    }
  }
  const text = String(value).trim();
  if (!text) return "";
  const isoMatch = text.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  const brMatch = text.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/);
  if (brMatch) {
    const dd = brMatch[1].padStart(2, "0");
    const mm = brMatch[2].padStart(2, "0");
    const yyyy = brMatch[3].length === 2 ? `20${brMatch[3]}` : brMatch[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  return text;
}

function displayDate(value) {
  if (!value) return "Sem data";
  const text = String(value);
  const isoMatch = text.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/);
  return isoMatch ? `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}` : text;
}

function dateToTime(value) {
  if (!value) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(`${value}T00:00:00`).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

function daysBetween(startIso, endIso) {
  const start = dateToTime(startIso);
  const end = dateToTime(endIso);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.ceil((end - start) / 86400000);
}

function getTrafficLight(card, todayIso = getTodayIso()) {
  const deliveryDate = card.dataEntregaCotacoes;
  if (!deliveryDate) return "cinza";
  if (card.status === "finalizado") return "verde";
  const daysToDelivery = daysBetween(todayIso, deliveryDate);
  if (daysToDelivery < 0) return "vermelho";
  if (daysToDelivery <= 7) return "amarelo";
  return "verde";
}

function getTrafficLabel(light) {
  return {
    verde: "Dentro do prazo",
    amarelo: "Entrega próxima",
    vermelho: "Atrasado",
    cinza: "Sem data de entrega",
  }[light];
}

function getTrafficClass(light) {
  return {
    verde: "bg-emerald-500",
    amarelo: "bg-amber-400",
    vermelho: "bg-red-500",
    cinza: "bg-slate-300",
  }[light];
}

function getCardBorderClass(card) {
  const light = getTrafficLight(card);
  if (light === "vermelho") return "border-red-400";
  if (light === "amarelo") return "border-amber-400";
  if (light === "verde") return "border-emerald-400";
  return "border-slate-200";
}

function getColumnHeaderClass(statusId) {
  if (statusId === "nao_iniciado") return "bg-rose-600 text-white";
  return "bg-slate-700 text-white";
}

function getColumnSubtitle(statusId) {
  const subtitles = {
    nao_iniciado: "Aguardando início",
    em_cotacao: "Buscando fornecedores",
    finalizado: "Concluído",
    pausado: "Aguardando retomada",
  };
  return subtitles[statusId] || "";
}

function getStatusStepLabel(statusId) {
  const labels = {
    nao_iniciado: "ATENÇÃO",
    em_cotacao: "1º PASSO",
    finalizado: "2º PASSO",
    pausado: "PAUSADO",
  };
  return labels[statusId] || "";
}

function getSemaphorePriority(card) {
  const light = getTrafficLight(card);

  if (light === "vermelho") return 1;
  if (light === "amarelo") return 2;
  if (light === "verde") return 3;
  return 4;
}

function getPriorityLabel(card) {
  const light = getTrafficLight(card);

  if (light === "vermelho") return "Prioridade 1 · Atrasado";
  if (light === "amarelo") return "Prioridade 2 · Próximo do prazo";
  if (light === "verde") return "Prioridade 3 · Dentro do prazo";
  return "Prioridade 4 · Sem data";
}

function sortCardsBySemaphorePriority(cards) {
  return [...cards].sort((a, b) => {
    const priorityDiff = getSemaphorePriority(a) - getSemaphorePriority(b);
    if (priorityDiff !== 0) return priorityDiff;

    const deliveryDiff = dateToTime(a.dataEntregaCotacoes) - dateToTime(b.dataEntregaCotacoes);
    if (deliveryDiff !== 0) return deliveryDiff;

    const requestDiff = dateToTime(a.dataSolicitacao) - dateToTime(b.dataSolicitacao);
    if (requestDiff !== 0) return requestDiff;

    return String(a.numeroProposta || "").localeCompare(String(b.numeroProposta || ""));
  });
}

function durationParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function formatDuration(ms) {
  const { days, hours, minutes, seconds } = durationParts(ms);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function shouldCountTimer(statusId) {
  return TIMER_ACTIVE_STATUSES.includes(statusId);
}

function getPhaseElapsedMs(card, statusId, nowMs = Date.now()) {
  const base = Number(card.phaseDurationsMs?.[statusId] || 0);

  if (!shouldCountTimer(statusId)) {
    return base;
  }

  if (card.status === statusId && card.phaseEnteredAt) {
    const entered = new Date(card.phaseEnteredAt).getTime();
    if (Number.isFinite(entered)) return base + Math.max(0, nowMs - entered);
  }

  return base;
}

function getCurrentPhaseElapsedMs(card, nowMs = Date.now()) {
  return getPhaseElapsedMs(card, card.status, nowMs);
}

function getAveragePhaseMs(cards, statusId, nowMs = Date.now()) {
  const relevant = cards.filter((card) => card.phaseHistory?.[statusId] || card.status === statusId || Number(card.phaseDurationsMs?.[statusId] || 0) > 0);
  if (!relevant.length) return 0;
  const total = relevant.reduce((sum, card) => sum + getPhaseElapsedMs(card, statusId, nowMs), 0);
  return total / relevant.length;
}

function safeLoadCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SAMPLE_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeLegacyCard) : SAMPLE_DATA;
  } catch {
    return SAMPLE_DATA;
  }
}

function mapRowsToCards(rows) {
  return rows
    .filter((row) => Object.values(row).some((value) => String(value ?? "").trim()))
    .map((row, index) => {
      const fallbackProposal = buildFallbackProposalNumber(index);
      const numeroProposta = normalizeProposalNumber(
        getField(row, ["numero proposta", "número proposta", "numero da proposta", "número da proposta", "proposta", "pp", "id", "codigo", "código"], fallbackProposal),
        fallbackProposal
      );

      const status = normalizeStatus(getField(row, ["status", "situacao", "situação", "etapa"], "novo"));
      const createdAt = nowIso();
      const nomeObra = getField(row, ["nome da obra", "obra", "projeto"], "Solicitação sem descrição");
      const rawDataSolicitacao = getField(row, ["data solicitacao", "data solicitação", "data da solicitacao", "data da solicitação", "data de solicitacao", "data de solicitação", "data", "criado em", "abertura"], "");
      const rawDataEntrega = getField(row, ["data da entrega das cotacoes", "data da entrega das cotações", "data entrega cotacoes", "data entrega cotações", "data entrega", "data de entrega", "entrega", "prazo", "data limite", "vencimento", "deadline"], "");

      return normalizeLegacyCard({
        id: numeroProposta,
        numeroProposta,
        nomeSolicitante: getField(row, ["nome do solicitante", "solicitante", "responsavel", "responsável", "requisitante"], "Não informado"),
        emailSolicitante: getField(row, ["email do solicitante", "e-mail do solicitante", "email", "e-mail"], ""),
        nomeObra,
        cliente: getField(row, ["cliente"], ""),
        localObra: getField(row, ["local da obra", "local", "endereco", "endereço"], ""),
        tipoOrcamento: getField(row, ["tipo de orçamento", "tipo de orcamento", "tipo"], ""),
        dataSolicitacao: formatExcelDate(rawDataSolicitacao) || getTodayIso(),
        dataEntregaCotacoes: formatExcelDate(rawDataEntrega),
        fornecedor: getField(row, ["fornecedor", "vendor", "empresa"], "A definir"),
        valorInicial: 0,
        valorFinal: 0,
        saving: 0,
        quantidadeReq: 0,
        prioridade: getField(row, ["prioridade", "urgencia", "urgência"], "Normal"),
        status,
        observacoes: getField(row, ["observacoes", "observações", "obs", "comentario", "comentário", "comentarios", "comentários", "notas"], ""),
        anexos: [],
        createdAt,
        phaseEnteredAt: createdAt,
        phaseHistory: makePhaseHistory(status, createdAt),
      });
    });
}

function App() {
  const [page, setPage] = useState("formulario");
  const [cards, setCards] = useState(safeLoadCards);
  const [form, setForm] = useState(emptyForm());
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("todas");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [dateFilterType, setDateFilterType] = useState("solicitacao");
  const [draggedId, setDraggedId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [tick, setTick] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTick((current) => current + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const nowMs = useMemo(() => Date.now(), [tick]);

  const sortedCards = useMemo(() => {
    return sortCardsBySemaphorePriority(cards);
  }, [cards, tick]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedCards.filter((card) => {
      const matchesQuery =
        !q ||
        [
          card.id,
          card.numeroProposta,
          card.nomeSolicitante,
          card.emailSolicitante,
          card.nomeObra,
          card.cliente,
          card.localObra,
          card.tipoOrcamento,
          card.fornecedor,
          card.observacoes,
        ].join(" ").toLowerCase().includes(q);

      const matchesPriority = priorityFilter === "todas" || normalizeKey(card.prioridade) === normalizeKey(priorityFilter);
      const dateToFilter = dateFilterType === "solicitacao" ? card.dataSolicitacao : card.dataEntregaCotacoes;
      const matchesStartDate = !startDateFilter || (dateToFilter && dateToFilter >= startDateFilter);
      const matchesEndDate = !endDateFilter || (dateToFilter && dateToFilter <= endDateFilter);
      return matchesQuery && matchesPriority && matchesStartDate && matchesEndDate;
    });
  }, [sortedCards, query, priorityFilter, startDateFilter, endDateFilter, dateFilterType]);

  const metrics = useMemo(() => {
    const total = cards.length;
    const finalizados = cards.filter((card) => card.status === "finalizado").length;
    const emCotacao = cards.filter((card) => card.status === "em_cotacao").length;
    const pausados = cards.filter((card) => card.status === "pausado").length;
    const atrasados = cards.filter((card) => getTrafficLight(card) === "vermelho").length;
    const spend = cards.reduce((sum, card) => sum + Number(card.valorFinal || 0), 0);
    const saving = cards.reduce((sum, card) => sum + Number(card.saving || 0), 0);
    const quantidadeReq = cards.reduce((sum, card) => sum + Number(card.quantidadeReq || 0), 0);
    return { total, finalizados, emCotacao, pausados, atrasados, spend, saving, quantidadeReq, quantidadeLinhas: cards.length };
  }, [cards]);

  const phaseAverages = useMemo(() => {
    const result = {};
    STATUSES.forEach((status) => {
      result[status.id] = getAveragePhaseMs(cards, status.id, nowMs);
    });
    return result;
  }, [cards, nowMs]);

  const priorities = useMemo(() => Array.from(new Set(cards.map((card) => card.prioridade).filter(Boolean))), [cards]);

  const selectedCard = useMemo(() => {
    return cards.find((card) => card.id === selectedCardId) || null;
  }, [cards, selectedCardId]);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleFormFiles(event) {
    const selectedFiles = Array.from(event.target.files || []);

    try {
      const files = await Promise.all(selectedFiles.map(readFileAsDataUrl));
      updateForm("anexos", files);
    } catch (err) {
      setError("Não foi possível ler um ou mais arquivos anexados.");
    }
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    const numeroProposta = normalizeProposalNumber(form.numeroProposta, buildFallbackProposalNumber(cards.length));
    const createdAt = nowIso();
    const newCard = normalizeLegacyCard({
      id: numeroProposta,
      numeroProposta,
      nomeSolicitante: form.nomeSolicitante,
      emailSolicitante: form.emailSolicitante,
      nomeObra: form.nomeObra,
      cliente: form.cliente,
      localObra: form.localObra,
      tipoOrcamento: form.tipoOrcamento,
      dataSolicitacao: form.dataSolicitacao || getTodayIso(),
      dataEntregaCotacoes: form.dataEntregaCotacoes,
      fornecedor: "A definir",
      valorInicial: 0,
      valorFinal: 0,
      saving: 0,
      quantidadeReq: 0,
      prioridade: "Normal",
      status: "nao_iniciado",
      observacoes: "",
      anexos: form.anexos,
      createdAt,
      phaseEnteredAt: createdAt,
      phaseHistory: makePhaseHistory("nao_iniciado", createdAt),
    });

    setCards((current) => [newCard, ...current]);
    setForm(emptyForm());
    setSuccessMessage(`Solicitação ${numeroProposta} criada e enviada para o Kanban.`);
    setPage("kanban");
  }

  async function handleFile(event) {
    setError("");
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
      const importedCards = mapRowsToCards(rows);
      if (!importedCards.length) {
        setError("A planilha foi lida, mas nenhuma linha válida foi encontrada.");
        return;
      }
      setCards(importedCards);
      setSuccessMessage("Planilha importada com sucesso.");
    } catch (err) {
      setError("Não foi possível importar a planilha. Verifique se o arquivo é .xlsx, .xls ou .csv.");
    } finally {
      event.target.value = "";
    }
  }

  function moveCard(cardId, nextStatus) {
    const movedAt = nowIso();
    const movedAtMs = new Date(movedAt).getTime();

    setCards((current) =>
      current.map((card) => {
        if (card.id !== cardId || card.status === nextStatus) return card;

        const previousStatus = card.status;
        const enteredAtMs = new Date(card.phaseEnteredAt || card.createdAt || movedAt).getTime();
        const elapsedInPreviousPhase =
          shouldCountTimer(previousStatus) && Number.isFinite(enteredAtMs)
            ? Math.max(0, movedAtMs - enteredAtMs)
            : 0;

        return normalizeLegacyCard({
          ...card,
          status: nextStatus,
          phaseEnteredAt: movedAt,
          phaseDurationsMs: {
            ...card.phaseDurationsMs,
            [previousStatus]: Number(card.phaseDurationsMs?.[previousStatus] || 0) + elapsedInPreviousPhase,
          },
          phaseHistory: {
            ...card.phaseHistory,
            [nextStatus]: card.phaseHistory?.[nextStatus] || movedAt,
          },
        });
      })
    );

    setDraggedId(null);
  }

  function updateCardFinancials(cardId, field, value) {
    setCards((current) =>
      current.map((card) => {
        if (card.id !== cardId) return card;

        if (field === "quantidadeReq") {
          const quantity = Math.max(0, Math.floor(Number(String(value).replace(/[^0-9]/g, "")) || 0));
          return {
            ...card,
            quantidadeReqInput: value,
            quantidadeReq: quantity,
          };
        }

        const amount = parseMoney(value);
        return {
          ...card,
          [field === "spend" ? "spendInput" : "savingInput"]: value,
          [field === "spend" ? "valorFinal" : "saving"]: amount,
        };
      })
    );
  }

  function resetCardTimer(cardId) {
    const resetAt = nowIso();

    setCards((current) =>
      current.map((card) => {
        if (card.id !== cardId) return card;

        return normalizeLegacyCard({
          ...card,
          phaseEnteredAt: resetAt,
          phaseDurationsMs: {
            nao_iniciado: 0,
            em_cotacao: 0,
            finalizado: 0,
            pausado: 0,
          },
          phaseHistory: makePhaseHistory(card.status, resetAt),
        });
      })
    );
  }

  function removeCard(cardId) {
    setCards((current) => current.filter((card) => card.id !== cardId));
    setSelectedCardId((current) => (current === cardId ? null : current));
  }

  function clearDateFilters() {
    setStartDateFilter("");
    setEndDateFilter("");
  }

  function clearAllData() {
    if (!window.confirm("Tem certeza que deseja apagar tudo? Isso removerá todas as solicitações, arquivos anexados, filtros e dados salvos neste navegador.")) return;

    setCards([]);
    setSelectedCardId(null);
    setQuery("");
    setPriorityFilter("todas");
    setStartDateFilter("");
    setEndDateFilter("");
    setDateFilterType("solicitacao");
    setError("");
    setSuccessMessage("Tudo foi limpo.");
    localStorage.removeItem(STORAGE_KEY);
  }

  function exportXlsx() {
    const rows = cards.map((card) => {
      const semaforo = getTrafficLight(card);
      const row = {
        "Número da Proposta": card.numeroProposta,
        "Data da Solicitação": displayDate(card.dataSolicitacao),
        "Nome do Solicitante": card.nomeSolicitante,
        "Email do Solicitante": card.emailSolicitante,
        "Nome da Obra": card.nomeObra,
        Cliente: card.cliente,
        "Local da Obra": card.localObra,
        "Tipo de Orçamento": card.tipoOrcamento,
        "Data da Entrega das Cotações": displayDate(card.dataEntregaCotacoes),
        Spend: formatCurrency(Number(card.valorFinal || 0)),
        Saving: formatCurrency(Number(card.saving || 0)),
        "Quantidade de linhas de REQ": Number(card.quantidadeReq || 0),
        Semáforo: getTrafficLabel(semaforo),
        Status: STATUSES.find((status) => status.id === card.status)?.label || card.status,
        "Tempo na fase atual": formatDuration(getCurrentPhaseElapsedMs(card, nowMs)),
        "Qtd. Arquivos": card.anexos?.length || 0,
        Arquivos: (card.anexos || []).map((file) => file.nome).join(", "),
      };
      STATUSES.forEach((status) => {
        row[`Tempo em ${status.label}`] = formatDuration(getPhaseElapsedMs(card, status.id, nowMs));
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Solicitacoes");
    XLSX.writeFile(workbook, "kanban-solicitacoes-orcamento.xlsx");
  }

  return (
    <div className="min-h-screen border-t-[6px] border-company-blue bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <a href="index.html" className="hidden h-12 items-center rounded-lg border border-slate-100 bg-slate-50 px-2 sm:flex" title="Voltar ao painel">
                <img src="Logo Seel.png" alt="Seel" className="max-h-9 w-auto object-contain" />
              </a>
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">Solicitações de orçamento</div>
                <h1 className="text-2xl font-black tracking-tight text-company-blue sm:text-3xl">Formulário + Kanban</h1>
                <p className="mt-2 max-w-2xl text-slate-600">Fluxo de orçamento com formulário de entrada, priorização por prazo, temporizador por fase e exportação XLSX.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="index.html" className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50">Painel</a>
              <button onClick={() => setPage("formulario")} className={`rounded-lg px-4 py-2 font-medium ${page === "formulario" ? "bg-company-blue text-white" : "bg-slate-100 text-slate-700"}`}>Formulário</button>
              <button onClick={() => setPage("kanban")} className={`rounded-lg px-4 py-2 font-medium ${page === "kanban" ? "bg-company-blue text-white" : "bg-slate-100 text-slate-700"}`}>Kanban</button>
            </div>
          </div>
        </header>

        {successMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">✅ {successMessage}</div>}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">⚠️ {error}</div>}

        {page === "formulario" ? (
          <FormularioPage form={form} updateForm={updateForm} handleFormFiles={handleFormFiles} handleSubmitForm={handleSubmitForm} />
        ) : (
          <KanbanPage
            cards={cards}
            filteredCards={filteredCards}
            metrics={metrics}
            phaseAverages={phaseAverages}
            priorities={priorities}
            query={query}
            setQuery={setQuery}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            startDateFilter={startDateFilter}
            setStartDateFilter={setStartDateFilter}
            endDateFilter={endDateFilter}
            setEndDateFilter={setEndDateFilter}
            dateFilterType={dateFilterType}
            setDateFilterType={setDateFilterType}
            clearDateFilters={clearDateFilters}
            draggedId={draggedId}
            setDraggedId={setDraggedId}
            moveCard={moveCard}
            removeCard={removeCard}
            handleFile={handleFile}
            fileRef={fileRef}
            exportXlsx={exportXlsx}
            clearAllData={clearAllData}
            updateCardFinancials={updateCardFinancials}
            resetCardTimer={resetCardTimer}
            nowMs={nowMs}
            setSelectedCardId={setSelectedCardId}
            selectedCard={selectedCard}
            closeSelectedCard={() => setSelectedCardId(null)}
          />
        )}
      </div>
    </div>
  );
}

function FormularioPage({ form, updateForm, handleFormFiles, handleSubmitForm }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Página 1</p>
        <h2 className="text-2xl font-bold">Formulário de solicitação de orçamento</h2>
        <p className="mt-2 text-slate-500">O preenchimento cria automaticamente um card no Kanban como “Não iniciado”.</p>
      </div>

      <form onSubmit={handleSubmitForm} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <FormField label="Data da solicitação">
          <input type="date" value={form.dataSolicitacao} disabled className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500" />
        </FormField>
        <FormField label="Nome do solicitante">
          <input value={form.nomeSolicitante} onChange={(event) => updateForm("nomeSolicitante", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Email do solicitante">
          <input type="email" value={form.emailSolicitante} onChange={(event) => updateForm("emailSolicitante", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Número da Proposta">
          <input value={form.numeroProposta} onChange={(event) => updateForm("numeroProposta", event.target.value)} placeholder="Pp-001-26" required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Nome da obra">
          <input value={form.nomeObra} onChange={(event) => updateForm("nomeObra", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Cliente">
          <input value={form.cliente} onChange={(event) => updateForm("cliente", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Local da obra">
          <input value={form.localObra} onChange={(event) => updateForm("localObra", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Tipo de Orçamento">
          <select value={form.tipoOrcamento} onChange={(event) => updateForm("tipoOrcamento", event.target.value)} required className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
            <option value="">Selecione</option>
            {TIPO_ORCAMENTO_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </FormField>
        <FormField label="Data da entrega das cotações">
          <input type="date" value={form.dataEntregaCotacoes} onChange={(event) => updateForm("dataEntregaCotacoes", event.target.value)} required className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </FormField>
        <FormField label="Arquivos da solicitação">
          <input type="file" multiple onChange={handleFormFiles} className="w-full rounded-lg border border-slate-200 px-4 py-3" />
          {form.anexos.length > 0 && (
            <div className="mt-2 space-y-1 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
              {form.anexos.map((file) => (
                <div key={file.nome} className="flex flex-col gap-1">
                  <span>📎 {file.nome} — {(file.tamanho / 1024).toFixed(1)} KB</span>
                  <span className="text-[11px] text-emerald-600">Disponível para download no Kanban</span>
                </div>
              ))}
            </div>
          )}
        </FormField>
        <div className="flex items-end md:col-span-2 xl:col-span-3">
          <button type="submit" className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white">Enviar solicitação para o Kanban</button>
        </div>
      </form>
    </section>
  );
}

function KanbanPage(props) {
  const {
    cards, filteredCards, metrics, phaseAverages, priorities, query, setQuery, priorityFilter, setPriorityFilter,
    startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter, dateFilterType, setDateFilterType,
    clearDateFilters, draggedId, setDraggedId, moveCard, removeCard, handleFile, fileRef, exportXlsx,
    clearAllData, updateCardFinancials, resetCardTimer, nowMs, setSelectedCardId, selectedCard, closeSelectedCard
  } = props;

  return (
    <>
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Página 2</p>
            <h2 className="text-2xl font-bold">Kanban de solicitações</h2>
            <p className="mt-1 text-slate-500">Spend, saving e quantidade de linhas de REQ são preenchidos manualmente no card quando o item chegar em “Finalizado”.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input ref={fileRef} type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={handleFile} />
            <button onClick={() => fileRef.current?.click()} className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">⬆️ Importar planilha</button>
            <button onClick={exportXlsx} className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">⬇️ Exportar</button>
            <button onClick={clearAllData} className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-700">Limpar tudo</button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4 xl:grid-cols-9">
          <Metric title="Solicitações" value={metrics.quantidadeLinhas} />
          <Metric title="Itens REQ" value={metrics.quantidadeReq} />
          <Metric title="Spend" value={formatCurrency(metrics.spend)} />
          <Metric title="Saving" value={formatCurrency(metrics.saving)} />
          <Metric title="Cards" value={metrics.total} />
          <Metric title="Em Cotação" value={metrics.emCotacao} />
          <Metric title="Finalizadas" value={metrics.finalizados} />
          <Metric title="Pausadas" value={metrics.pausados} />
          <Metric title="Atrasadas" value={metrics.atrasados} />
        </section>

        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-bold text-slate-700">Ordenação automática por prioridade do semáforo</p>
          <p className="mt-1">
            1º Atrasados · 2º Próximos do prazo · 3º Dentro do prazo · 4º Sem data.
            Em cada grupo, a ordem usa primeiro a data de entrega mais próxima e depois a solicitação mais antiga.
          </p>
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-bold">Média de tempo por fase</h3>
        <p className="mb-3 text-sm text-slate-500">A contagem ativa acontece somente em Não iniciado e Em Cotação.</p>
        <div className="grid gap-3 md:grid-cols-4">
          {STATUSES.map((status) => (
            <div key={status.id} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">{status.label}</p>
              <p className="mt-1 text-xl font-bold">{formatDuration(phaseAverages[status.id] || 0)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por proposta, obra, cliente, solicitante, email, local ou tipo" className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-slate-400" />
        </div>
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400">
          <option value="todas">Todas as prioridades</option>
          {priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
        </select>
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">📅 Filtrar data</div>
          <select value={dateFilterType} onChange={(event) => setDateFilterType(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400">
            <option value="solicitacao">Solicitação</option>
            <option value="entrega">Entrega</option>
          </select>
          <input type="date" value={startDateFilter} onChange={(event) => setStartDateFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400" />
          <span className="hidden text-slate-400 md:inline">até</span>
          <input type="date" value={endDateFilter} onChange={(event) => setEndDateFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400" />
          {(startDateFilter || endDateFilter) && <button onClick={clearDateFilters} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">✕ Limpar</button>}
        </div>
      </section>

      <div className="rounded-xl bg-white p-4 text-sm text-slate-600 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <LegendDot light="verde" label="Dentro do prazo ou finalizado" />
          <LegendDot light="amarelo" label="Entrega em até 7 dias" />
          <LegendDot light="vermelho" label="Entrega vencida" />
          <LegendDot light="cinza" label="Sem data de entrega" />
        </div>
      </div>

      <main className="grid min-h-[620px] gap-6 overflow-x-auto pb-4 lg:grid-cols-4">
        {STATUSES.map((status) => {
          const columnCards = sortCardsBySemaphorePriority(filteredCards.filter((card) => card.status === status.id));
          const lateCards = columnCards.filter((card) => getTrafficLight(card) === "vermelho").length;

          return (
            <section
              key={status.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => draggedId && moveCard(draggedId, status.id)}
              className="min-w-[310px] rounded-xl bg-slate-100 p-3 shadow-inner"
            >
              <div className={`mb-3 rounded-lg p-4 shadow-sm ${getColumnHeaderClass(status.id)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-80">{getStatusStepLabel(status.id)}</p>
                    <h2 className="mt-3 text-lg font-black uppercase leading-tight">{status.label}</h2>
                    <p className="mt-1 text-sm font-medium opacity-80">{getColumnSubtitle(status.id)}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black opacity-40">{columnCards.length}</div>
                    {lateCards > 0 && (
                      <div className="mt-1 rounded-md bg-white/20 px-2 py-1 text-xs font-bold">
                        🔴 {lateCards} atr.
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold">
                  Média da fase: {formatDuration(phaseAverages[status.id] || 0)}
                </p>
              </div>

              <div className="flex max-h-[calc(100vh-340px)] flex-col gap-3 overflow-y-auto pr-1">
                {columnCards.map((card) => (
                  <KanbanCard
                    key={card.id}
                    card={card}
                    nowMs={nowMs}
                    setDraggedId={setDraggedId}
                    setSelectedCardId={setSelectedCardId}
                    removeCard={removeCard}
                    updateCardFinancials={updateCardFinancials}
                  />
                ))}

                {!columnCards.length && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-6 text-center text-sm text-slate-400">
                    Arraste cards para esta etapa.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>

      {selectedCard && (
        <CardDetailsModal
          card={selectedCard}
          nowMs={nowMs}
          closeSelectedCard={closeSelectedCard}
          updateCardFinancials={updateCardFinancials}
          removeCard={removeCard}
        />
      )}
    </>
  );
}

function KanbanCard({ card, nowMs, setDraggedId, setSelectedCardId, removeCard, updateCardFinancials }) {
  const trafficLight = getTrafficLight(card);
  const currentPhaseElapsed = getCurrentPhaseElapsedMs(card, nowMs);
  const currentStatusLabel = STATUSES.find((status) => status.id === card.status)?.label || card.status;
  const timerIsActive = shouldCountTimer(card.status);

  function openCard(event) {
    const isAction = event.target.closest("[data-card-action]");
    if (isAction) return;
    setSelectedCardId(card.id);
  }

  return (
    <article
      draggable
      onClick={openCard}
      onDragStart={() => setDraggedId(card.id)}
      onDragEnd={() => setDraggedId(null)}
      className={`cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing ${getCardBorderClass(card)}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-400">PP</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{getPriorityLabel(card)}</span>
            {trafficLight === "vermelho" && (
              <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">URGENTE</span>
            )}
            {trafficLight === "amarelo" && (
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">ATENÇÃO</span>
            )}
          </div>
          <h3 className="mt-1 text-xl font-black leading-none text-slate-950">{card.numeroProposta}</h3>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase text-slate-600">
            {card.status === "nao_iniciado" ? "NI" : card.status === "em_cotacao" ? "EC" : card.status === "finalizado" ? "FI" : "PA"}
          </span>
          <span className={`h-3 w-3 rounded-full ${getTrafficClass(trafficLight)}`} title={getTrafficLabel(trafficLight)} />
        </div>
      </div>

      <p className="line-clamp-2 min-h-[42px] text-sm font-semibold uppercase text-slate-700">
        {card.nomeObra || "Sem nome da obra"}
      </p>

      <div className="my-3 border-t border-slate-100" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
        <div>
          <p className="font-bold uppercase tracking-wide text-slate-400">Cliente</p>
          <p className="truncate font-bold text-slate-900">{card.cliente || "Não informado"}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-slate-400">Solicitante</p>
          <p className="truncate font-bold text-slate-900">{card.nomeSolicitante || "Não informado"}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-slate-400">Prazo entrega</p>
          <p className="font-bold text-slate-900">{displayDate(card.dataEntregaCotacoes)}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-slate-400">Fase</p>
          <p className="truncate font-bold text-slate-900">{currentStatusLabel}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {timerIsActive ? "Tempo contabilizando" : "Cronômetro parado"}
        </p>
        <p className="mt-1 text-lg font-black tabular-nums text-slate-900">{formatDuration(currentPhaseElapsed)}</p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
            📎 {(card.anexos || []).length}
          </span>
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
            REQ {Number(card.quantidadeReq || 0) || "-"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            data-card-action="true"
            onClick={(event) => {
              event.stopPropagation();
              removeCard(card.id);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-red-50"
            title="Excluir"
          >
            🚫
          </button>
          <button
            data-card-action="true"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedCardId(card.id);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-blue-50"
            title="Abrir detalhes"
          >
            ▶
          </button>
        </div>
      </div>
    </article>
  );
}

function CardDetailsModal({ card, nowMs, closeSelectedCard, updateCardFinancials, removeCard }) {
  const trafficLight = getTrafficLight(card);
  const currentPhaseElapsed = getCurrentPhaseElapsedMs(card, nowMs);
  const canEditFinancials = card.status === "finalizado";
  const timerIsActive = shouldCountTimer(card.status);
  const statusLabel = STATUSES.find((status) => status.id === card.status)?.label || card.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onClick={closeSelectedCard}>
      <div
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${getTrafficClass(trafficLight)}`} />
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{card.numeroProposta}</p>
            </div>
            <h2 className="text-2xl font-bold">{card.nomeObra}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {getTrafficLabel(trafficLight)} · Status: {statusLabel}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => removeCard(card.id)}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
            >
              Excluir
            </button>
            <button
              onClick={closeSelectedCard}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-3 font-bold">Informações da solicitação</h3>
            <div className="space-y-2 text-sm">
              <Info label="Proposta" value={card.numeroProposta} />
              <Info label="Data solicitação" value={displayDate(card.dataSolicitacao)} />
              <Info label="Data entrega cotações" value={displayDate(card.dataEntregaCotacoes)} />
              <Info label="Solicitante" value={card.nomeSolicitante || "Não informado"} />
              <Info label="Email" value={card.emailSolicitante || "Não informado"} />
              <Info label="Cliente" value={card.cliente || "Não informado"} />
              <Info label="Local da obra" value={card.localObra || "Não informado"} />
              <Info label="Tipo de orçamento" value={card.tipoOrcamento || "Não informado"} />
              <Info label="Prioridade do semáforo" value={getPriorityLabel(card)} />
            </div>
          </section>

          <section className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-3 font-bold">Temporizador por fase</h3>
            <div className="rounded-lg bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">
                {timerIsActive ? "Tempo contabilizando na fase atual" : "Cronômetro parado nesta fase"}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{formatDuration(currentPhaseElapsed)}</p>
              <p className="mt-1 text-xs text-slate-400">
                Contabiliza apenas em Não iniciado e Em Cotação.
              </p>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {STATUSES.map((status) => (
                <div key={status.id} className="rounded-lg bg-white p-3">
                  <p className="text-xs text-slate-400">{status.label}</p>
                  <p className="text-lg font-bold text-slate-700 tabular-nums">
                    {formatDuration(getPhaseElapsedMs(card, status.id, nowMs))}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className={`rounded-xl p-4 lg:col-span-2 ${canEditFinancials ? "bg-emerald-50" : "bg-slate-50"}`}>
            <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <h3 className="font-bold">Campos finais</h3>
                <p className="text-sm text-slate-500">
                  {canEditFinancials
                    ? "Preencha estes campos quando a solicitação estiver finalizada."
                    : "Estes campos ficam bloqueados até o card chegar na fase Finalizado."}
                </p>
              </div>
              {!canEditFinancials && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                  Bloqueado
                </span>
              )}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm font-medium text-slate-600">
                Spend
                <input
                  value={card.spendInput || ""}
                  onChange={(event) => updateCardFinancials(card.id, "spend", event.target.value)}
                  disabled={!canEditFinancials}
                  placeholder="R$ 0,00"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </label>

              <label className="text-sm font-medium text-slate-600">
                Saving
                <input
                  value={card.savingInput || ""}
                  onChange={(event) => updateCardFinancials(card.id, "saving", event.target.value)}
                  disabled={!canEditFinancials}
                  placeholder="R$ 0,00"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </label>

              <label className="text-sm font-medium text-slate-600">
                Quantidade de linhas de REQ / Itens solicitados
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={card.quantidadeReqInput || ""}
                  onChange={(event) => updateCardFinancials(card.id, "quantidadeReq", event.target.value)}
                  disabled={!canEditFinancials}
                  placeholder="0"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <Metric title="Spend preenchido" value={formatCurrency(card.valorFinal)} />
              <Metric title="Saving preenchido" value={formatCurrency(card.saving)} />
              <Metric title="Itens REQ" value={Number(card.quantidadeReq || 0)} />
            </div>
          </section>

          <section className="rounded-xl bg-slate-50 p-4 lg:col-span-2">
            <h3 className="mb-3 font-bold">Arquivos anexados</h3>
            {(card.anexos || []).length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2">
                {(card.anexos || []).map((file) => (
                  <div key={file.nome} className="rounded-lg bg-white p-3 text-sm text-slate-600">
                    <div className="font-medium">📎 {file.nome}</div>
                    <p className="mt-1 text-xs text-slate-400">
                      {(file.tamanho / 1024).toFixed(1)} KB · {file.tipo}
                    </p>
                    {file.dataUrl ? (
                      <a
                        href={file.dataUrl}
                        download={file.nome}
                        className="mt-3 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Baixar arquivo
                      </a>
                    ) : (
                      <p className="mt-2 text-xs text-amber-600">
                        Arquivo importado sem conteúdo salvo para download.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-lg bg-white p-4 text-sm text-slate-400">
                Nenhum arquivo anexado.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-700">{value}</span>
    </div>
  );
}

function LegendDot({ light, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${getTrafficClass(light)}`} />
      <span>{label}</span>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

