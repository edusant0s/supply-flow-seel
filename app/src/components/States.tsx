import { AlertTriangle, Loader2 } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
  secondaryAction,
}: {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) {
  return (
    <div className="state-panel">
      <AlertTriangle size={26} />
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        {action || secondaryAction ? (
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {action ? (
              <button type="button" className="secondary-button" onClick={action.onClick}>
                {action.label}
              </button>
            ) : null}
            {secondaryAction ? (
              <button type="button" className="secondary-button" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function LoadingState({ label = "Carregando" }: { label?: string }) {
  return (
    <div className="state-panel state-panel--inline">
      <Loader2 className="spin" size={20} />
      <span>{label}</span>
    </div>
  );
}
