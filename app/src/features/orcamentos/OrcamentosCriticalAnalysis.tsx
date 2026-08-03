import { useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  DollarSign,
  FileSpreadsheet,
  Target,
  TimerReset,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatCurrency, slaColorByDueDate } from "../../lib/format";
import type { Orcamento } from "../../types";
import { averageOrcamentoSlaMs, formatBusinessDuration, getOrcamentoSla } from "./sla";
import { getAssignedToList, getOrcamentoOutcome, openStatuses } from "./model";

export type OrcamentoTone = "success" | "monitor" | "warning" | "danger";

export type OrcamentoAnalysisCard = {
  key: string;
  tone: OrcamentoTone;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  value: string;
  meta: string;
  description: string;
  action: string;
};

export type OrcamentoAnalysis = {
  total: number;
  healthScore: number;
  headlineTone: OrcamentoTone;
  headlineIcon: LucideIcon;
  headline: string;
  headlineText: string;
  criticalCount: number;
  warningCount: number;
  exposure: number;
  cards: OrcamentoAnalysisCard[];
};

export function OrcamentosCriticalAnalysis({ items, now }: { items: Orcamento[]; now: number }) {
  const analysis = useMemo(() => buildOrcamentoCriticalAnalysis(items, now), [items, now]);
  const HeadlineIcon = analysis.headlineIcon;

  return (
    <section className="dashboard-alerts-section orcamento-critical-analysis">
      <div className="dashboard-alerts-title">
        <span>
          <AlertTriangle size={20} />
        </span>
        <div>
          <h2>Alertas de orcamentos</h2>
          <p>Pendencias de prazo, resultado comercial e carga de trabalho para a carteira filtrada.</p>
        </div>
      </div>

      <div className="dashboard-alert-summary-grid">
        <article
          className={`dashboard-alert-summary-card dashboard-alert-summary-card--${analysis.headlineTone} dashboard-alert-summary-card--wide`}
        >
          <HeadlineIcon size={26} />
          <div>
            <h3>{analysis.headline}</h3>
            <p>{analysis.headlineText}</p>
            <small>Recalculado automaticamente em {formatTimestamp(now)}</small>
          </div>
        </article>
        <article
          className={`dashboard-alert-summary-card dashboard-alert-summary-card--${
            analysis.healthScore >= 80 ? "success" : analysis.healthScore >= 58 ? "warning" : "danger"
          }`}
        >
          <span>Indice de controle</span>
          <strong>{analysis.healthScore}/100</strong>
          <p>Composto por prazos, resultado comercial, fluxo e concentracao de carga.</p>
        </article>
        <article
          className={`dashboard-alert-summary-card dashboard-alert-summary-card--${
            analysis.criticalCount ? "danger" : analysis.warningCount ? "warning" : "success"
          }`}
        >
          <span>Analises criticas</span>
          <strong>{analysis.criticalCount}</strong>
          <p>{analysis.warningCount} analise(s) adicional(is) em atencao.</p>
        </article>
        <article
          className={`dashboard-alert-summary-card dashboard-alert-summary-card--${analysis.exposure > 0 ? "warning" : "success"}`}
        >
          <span>Exposicao financeira</span>
          <strong>{formatCurrency(analysis.exposure)}</strong>
          <p>Valor de cotacoes vencidas ou a vencer em ate 3 dias.</p>
        </article>
      </div>

      <div className="dashboard-auto-analysis-head">
        <h3>Analises automaticas priorizadas</h3>
        <span>{analysis.total} solicitacao(oes) consideradas no filtro atual</span>
      </div>

      <div className="dashboard-auto-analysis-grid">
        {analysis.cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className={`dashboard-analysis-card dashboard-analysis-card--${card.tone}`}>
              <div className="dashboard-analysis-card__head">
                <span>
                  <Icon size={17} />
                </span>
                <b>{card.eyebrow}</b>
                <em>{toneLabel(card.tone)}</em>
              </div>
              <strong>{card.title}</strong>
              <div className="dashboard-analysis-card__value">
                <span>{card.value}</span>
                <small>{card.meta}</small>
              </div>
              <p>{card.description}</p>
              <footer>
                <b>Acao:</b> {card.action}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function buildOrcamentoCriticalAnalysis(items: Orcamento[], now: number): OrcamentoAnalysis {
  const total = items.length;
  if (!total) return emptyAnalysis();

  const open = items.filter((item) => openStatuses.includes(item.status || "nao_iniciado"));
  const finished = items.filter((item) => item.status === "finalizado");

  const delayed = open.filter((item) => slaColorByDueDate(item.data_entrega_cotacoes) === "danger");
  const dueSoon = open.filter((item) => slaColorByDueDate(item.data_entrega_cotacoes) === "warning");
  const missingDueDate = open.filter((item) => !item.data_entrega_cotacoes);

  const won = finished.filter((item) => getOrcamentoOutcome(item) === "ganha");
  const lost = finished.filter((item) => getOrcamentoOutcome(item) === "perdida");
  const waiting = finished.filter((item) => getOrcamentoOutcome(item) === "aguardando");
  const decided = won.length + lost.length;

  const exposure = [...delayed, ...dueSoon].reduce((sum, item) => sum + Number(item.valor_final ?? item.valor_inicial ?? 0), 0);

  const finishRate = pct(finished.length, total);
  const openShare = pct(open.length, total);
  const winRate = decided ? pct(won.length, decided) : 0;
  const missingShare = pct(missingDueDate.length, open.length || 1);
  const waitingShare = pct(waiting.length, finished.length || 1);

  const assigneeConcentration = topAssigneeShare(open);
  const typeConcentration = topTypeShare(items);

  const savingItems = finished.filter((item) => item.saving !== null && item.saving !== undefined);
  const negativeSaving = savingItems.filter((item) => Number(item.saving) <= 0);
  const avgSaving = savingItems.length ? savingItems.reduce((sum, item) => sum + Number(item.saving || 0), 0) / savingItems.length : 0;

  const avgFinishedSlaMs = averageOrcamentoSlaMs(finished, now);
  const oldestOpen = open.slice().sort((a, b) => getOrcamentoSla(b, now).totalMs - getOrcamentoSla(a, now).totalMs)[0];
  const oldestMs = oldestOpen ? getOrcamentoSla(oldestOpen, now).totalMs : 0;

  let healthScore = 100;
  healthScore -= Math.min(30, pct(delayed.length, total) * 1.3);
  healthScore -= Math.min(14, pct(dueSoon.length, total) * 0.6);
  healthScore -= Math.min(12, missingShare * 0.5);
  healthScore -= Math.min(12, waitingShare * 0.5);
  healthScore -= Math.min(14, Math.max(0, 60 - finishRate) * 0.3);
  if (decided >= 3) healthScore -= Math.min(10, Math.max(0, 55 - winRate) * 0.25);
  if (assigneeConcentration.share >= 70) healthScore -= 6;
  else if (assigneeConcentration.share >= 50) healthScore -= 3;
  healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));

  let headlineTone: OrcamentoTone = "success";
  let headlineIcon: LucideIcon = CheckCircle2;
  let headline = "Carteira de orcamentos sob controle";
  let headlineText = "Nao ha atrasos criticos ou pendencias relevantes no filtro atual.";

  if (delayed.length) {
    headlineTone = "danger";
    headlineIcon = AlertTriangle;
    headline = "Atraso de prazo exige atuacao imediata";
    headlineText = `${delayed.length} solicitacao(oes) em aberto ${delayed.length === 1 ? "esta" : "estao"} com o prazo de cotacao vencido, com exposicao estimada de ${formatCurrency(exposure)}.`;
  } else if (dueSoon.length || missingDueDate.length) {
    headlineTone = "warning";
    headlineIcon = Clock3;
    headline = "Prazos exigem atencao nos proximos dias";
    headlineText = `${dueSoon.length} cotacao(oes) vencem em breve e ${missingDueDate.length} estao sem prazo definido.`;
  } else if (waiting.length > Math.max(2, finished.length * 0.3)) {
    headlineTone = "warning";
    headlineIcon = Target;
    headline = "Resultados comerciais pendentes de decisao";
    headlineText = `${waiting.length} obra(s) finalizada(s) ainda aguardam definicao de resultado.`;
  } else if (openShare >= 65) {
    headlineTone = "warning";
    headlineIcon = ClipboardList;
    headline = "Carteira em aberto acima do esperado";
    headlineText = `${openShare}% das solicitacoes filtradas ainda estao em aberto.`;
  }

  const cards: OrcamentoAnalysisCard[] = [
    {
      key: "delayed",
      tone: delayed.length ? "danger" : "success",
      icon: AlertTriangle,
      eyebrow: "Risco de prazo",
      title: "Cotacoes com prazo vencido",
      value: String(delayed.length),
      meta: `${pct(delayed.length, total)}% da carteira - ${formatCurrency(exposure)} em exposicao`,
      description: delayed.length
        ? "Ha solicitacoes em aberto com o prazo de entrega de cotacoes ja vencido."
        : "Nenhuma cotacao em aberto esta com prazo vencido.",
      action: delayed.length
        ? "Cobrar fornecedores, atualizar o Kanban e redefinir prazo por solicitacao."
        : "Manter rotina diaria de conferencia de prazos.",
    },
    {
      key: "due-soon",
      tone: dueSoon.length ? "warning" : "success",
      icon: Clock3,
      eyebrow: "Proximos dias",
      title: "Cotacoes a vencer em ate 3 dias",
      value: String(dueSoon.length),
      meta: `${pct(dueSoon.length, total)}% da carteira filtrada`,
      description: dueSoon.length
        ? "Janela curta para receber cotacoes antes do vencimento do prazo."
        : "Nenhuma cotacao com vencimento iminente.",
      action: dueSoon.length
        ? "Antecipar contato com fornecedores e validar recebimento das propostas."
        : "Manter acompanhamento semanal do funil.",
    },
    {
      key: "missing-date",
      tone: missingDueDate.length ? "warning" : "success",
      icon: ClipboardList,
      eyebrow: "Qualidade de dados",
      title: "Cotacoes sem prazo definido",
      value: String(missingDueDate.length),
      meta: `${missingShare}% do que esta em aberto`,
      description: missingDueDate.length
        ? "A ausencia da data de entrega impede alertas confiaveis de SLA."
        : "Todas as solicitacoes em aberto possuem prazo de entrega informado.",
      action: missingDueDate.length
        ? "Completar a data de entrega de cotacoes de cada solicitacao aberta."
        : "Manter o preenchimento obrigatorio do prazo na abertura.",
    },
    {
      key: "waiting-outcome",
      tone: waiting.length ? "warning" : "success",
      icon: Target,
      eyebrow: "Resultado comercial",
      title: "Obras aguardando decisao",
      value: String(waiting.length),
      meta: `${waitingShare}% dos finalizados`,
      description: waiting.length
        ? "Solicitacoes finalizadas ainda sem definicao de obra ganha ou perdida."
        : "Todos os finalizados ja possuem resultado comercial registrado.",
      action: waiting.length
        ? "Atualizar o resultado da obra para fechar o ciclo de acompanhamento."
        : "Manter o registro do resultado ao finalizar cada solicitacao.",
    },
    {
      key: "finish-rate",
      tone: finishRate < 35 ? "danger" : finishRate < 60 ? "warning" : "success",
      icon: CheckCircle2,
      eyebrow: "Eficiencia de fluxo",
      title: "Taxa de finalizacao da carteira",
      value: `${finishRate}%`,
      meta: `${finished.length} de ${total} solicitacao(oes)`,
      description:
        finishRate < 60
          ? "Parcela relevante das solicitacoes ainda nao chegou ao fim do fluxo."
          : "A maior parte da carteira ja foi finalizada.",
      action:
        finishRate < 60
          ? "Revisar gargalos do Kanban e priorizar as solicitacoes mais antigas."
          : "Manter a cadencia atual de finalizacao.",
    },
    {
      key: "win-rate",
      tone: decided < 3 ? "monitor" : winRate < 35 ? "danger" : winRate < 55 ? "warning" : "success",
      icon: TrendingUp,
      eyebrow: "Performance comercial",
      title: "Taxa de conversao em obras ganhas",
      value: decided ? `${winRate}%` : "-",
      meta: decided ? `${won.length} ganha(s), ${lost.length} perdida(s)` : "Sem resultado comercial no filtro",
      description:
        decided < 3
          ? "Volume de resultados comerciais ainda insuficiente para leitura confiavel."
          : winRate < 55
            ? "A taxa de conversao esta abaixo do desejavel para o periodo."
            : "A conversao em obras ganhas esta em bom nivel.",
      action:
        decided < 3
          ? "Aguardar mais finalizacoes com resultado registrado."
          : winRate < 55
            ? "Revisar precificacao e argumentos comerciais das obras perdidas."
            : "Manter a estrategia comercial atual.",
    },
    {
      key: "open-share",
      tone: openShare >= 65 ? "warning" : openShare >= 45 ? "monitor" : "success",
      icon: ClipboardList,
      eyebrow: "Capacidade operacional",
      title: "Volume em aberto na carteira",
      value: String(open.length),
      meta: `${openShare}% da carteira filtrada`,
      description:
        openShare >= 45
          ? "Parcela relevante da carteira ainda depende de tratativa ativa."
          : "O volume em aberto esta em nivel saudavel.",
      action: openShare >= 45 ? "Redistribuir demandas entre os responsaveis disponiveis." : "Manter o balanceamento atual de fila.",
    },
    {
      key: "assignee-concentration",
      tone: assigneeConcentration.share >= 70 ? "danger" : assigneeConcentration.share >= 50 ? "warning" : "success",
      icon: Users,
      eyebrow: "Concentracao de carga",
      title: "Dependencia de um responsavel",
      value: assigneeConcentration.name ? `${assigneeConcentration.share}%` : "-",
      meta: assigneeConcentration.name
        ? `${assigneeConcentration.name} - ${assigneeConcentration.count} solicitacao(oes) em aberto`
        : "Sem responsavel atribuido no filtro",
      description:
        assigneeConcentration.share >= 50
          ? "A carteira em aberto esta concentrada em poucos responsaveis."
          : "A carteira em aberto esta distribuida entre os responsaveis.",
      action:
        assigneeConcentration.share >= 50
          ? "Avaliar redistribuicao de carga e capacidade da equipe."
          : "Manter o balanceamento atual entre responsaveis.",
    },
    {
      key: "saving",
      tone: !savingItems.length ? "monitor" : avgSaving <= 0 ? "warning" : "success",
      icon: DollarSign,
      eyebrow: "Oportunidade financeira",
      title: "Saving medio por solicitacao finalizada",
      value: savingItems.length ? formatCurrency(avgSaving) : "-",
      meta: savingItems.length ? `${negativeSaving.length} sem saving positivo` : "Sem saving informado no filtro",
      description: !savingItems.length
        ? "Nenhuma solicitacao finalizada possui saving registrado no filtro."
        : avgSaving <= 0
          ? "O saving medio das solicitacoes finalizadas esta zerado ou negativo."
          : "O saving medio das solicitacoes finalizadas esta positivo.",
      action:
        avgSaving <= 0
          ? "Revisar negociacao e registrar o saving obtido em cada finalizacao."
          : "Manter o registro consistente do saving nas finalizacoes.",
    },
    {
      key: "cycle-time",
      tone: finished.length && avgFinishedSlaMs > businessDaysMs(6) ? "warning" : "success",
      icon: TimerReset,
      eyebrow: "Eficiencia de ciclo",
      title: "Tempo medio até finalizacao",
      value: finished.length ? formatBusinessDuration(avgFinishedSlaMs) : "-",
      meta: finished.length ? `${finished.length} finalizado(s) no filtro` : "Sem finalizados no filtro",
      description: !finished.length
        ? "Ainda nao ha finalizados para medir o ciclo."
        : avgFinishedSlaMs > businessDaysMs(6)
          ? "O ciclo medio de finalizacao esta acima do desejavel."
          : "O ciclo medio de finalizacao esta em nivel saudavel.",
      action:
        finished.length && avgFinishedSlaMs > businessDaysMs(6)
          ? "Mapear a fase que mais consome tempo e agir sobre o gargalo."
          : "Manter o ritmo atual de atendimento.",
    },
    {
      key: "oldest-open",
      tone: oldestMs > businessDaysMs(10) ? "danger" : oldestMs > businessDaysMs(5) ? "warning" : "success",
      icon: Clock3,
      eyebrow: "Prioridade de fila",
      title: "Maior tempo em aberto na fila",
      value: oldestOpen ? formatBusinessDuration(oldestMs) : "-",
      meta: oldestOpen ? oldestOpen.numero_proposta || "Solicitacao sem numero" : "Sem solicitacoes em aberto",
      description: oldestOpen
        ? "Esta e a solicitacao em aberto mais antiga do filtro atual."
        : "Nao ha solicitacoes em aberto no filtro atual.",
      action: oldestOpen ? "Priorizar esta solicitacao antes de iniciar novas cotacoes." : "Manter o controle de entrada da fila.",
    },
    {
      key: "type-mix",
      tone: typeConcentration.share >= 70 ? "monitor" : "success",
      icon: FileSpreadsheet,
      eyebrow: "Mix de demanda",
      title: "Concentracao por tipo de orcamento",
      value: typeConcentration.name ? `${typeConcentration.share}%` : "-",
      meta: typeConcentration.name || "Sem tipo informado",
      description:
        typeConcentration.share >= 70
          ? "A demanda filtrada esta concentrada em um unico tipo de orcamento."
          : "A demanda filtrada esta distribuida entre os tipos de orcamento.",
      action:
        typeConcentration.share >= 70
          ? "Avaliar se a concentracao de tipo exige capacidade dedicada."
          : "Manter o acompanhamento periodico do mix de demanda.",
    },
  ];

  cards.sort((a, b) => toneRank(a.tone) - toneRank(b.tone));

  return {
    total,
    healthScore,
    headlineTone,
    headlineIcon,
    headline,
    headlineText,
    criticalCount: cards.filter((card) => card.tone === "danger").length,
    warningCount: cards.filter((card) => card.tone === "warning").length,
    exposure,
    cards,
  };
}

function emptyAnalysis(): OrcamentoAnalysis {
  return {
    total: 0,
    healthScore: 100,
    headlineTone: "success",
    headlineIcon: CheckCircle2,
    headline: "Sem dados no filtro atual",
    headlineText: "Ajuste os filtros para visualizar os alertas da carteira de orcamentos.",
    criticalCount: 0,
    warningCount: 0,
    exposure: 0,
    cards: [],
  };
}

function topAssigneeShare(items: Orcamento[]) {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const names = getAssignedToList(item);
    (names.length ? names : ["Sem atribuido"]).forEach((name) => map.set(name, (map.get(name) || 0) + 1));
  });
  const top = Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0];
  if (!top) return { name: "", share: 0, count: 0 };
  return { name: top[0], share: pct(top[1], items.length), count: top[1] };
}

function topTypeShare(items: Orcamento[]) {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const key = item.tipo_orcamento || "Nao informado";
    map.set(key, (map.get(key) || 0) + 1);
  });
  const top = Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0];
  if (!top) return { name: "", share: 0 };
  return { name: top[0], share: pct(top[1], items.length) };
}

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function businessDaysMs(days: number) {
  return days * 10 * 60 * 60 * 1000;
}

function toneRank(tone: OrcamentoTone) {
  return { danger: 0, warning: 1, monitor: 2, success: 3 }[tone];
}

function toneLabel(tone: OrcamentoTone) {
  return { danger: "Critico", warning: "Atencao", monitor: "Monitorar", success: "Controlado" }[tone];
}

function formatTimestamp(now: number) {
  const date = new Date(now);
  return `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
}
