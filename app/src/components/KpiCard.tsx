import type { LucideIcon } from "lucide-react";

export function KpiCard({
  title,
  value,
  tone = "neutral",
  icon: Icon,
}: {
  title: string;
  value: string | number;
  tone?: "neutral" | "success" | "warning" | "danger" | "blue";
  icon?: LucideIcon;
}) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      {Icon ? <Icon size={22} /> : null}
    </article>
  );
}
