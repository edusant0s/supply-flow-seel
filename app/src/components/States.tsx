import { AlertTriangle, Loader2 } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="state-panel">
      <AlertTriangle size={26} />
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
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
