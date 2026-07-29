import type { ReactNode } from "react";

export type ModuleHeroMetric = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

export function ModuleHero({
  eyebrow = "Supply Flow SEEL",
  title,
  description,
  badge,
  metrics = [],
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: ReactNode;
  metrics?: ModuleHeroMetric[];
  className?: string;
}) {
  return (
    <section className={`module-command-bar orcamentos-hero supply-module-hero ${className}`.trim()}>
      <div className="orcamentos-hero__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="module-command-bar__actions orcamentos-hero__metrics">
        {metrics.map((metric) => (
          <span className="orcamentos-hero-metric" key={`${metric.label}-${metric.value}`}>
            {metric.icon}
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </span>
        ))}
        {badge ? <span className="module-command-bar__badge">{badge}</span> : null}
      </div>
    </section>
  );
}
