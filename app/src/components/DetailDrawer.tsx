import { X } from "lucide-react";
import type React from "react";

export function DetailDrawer({
  eyebrow,
  title,
  onClose,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="drawer-backdrop">
      <aside className="detail-drawer">
        <header>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </header>
        {children}
      </aside>
    </div>
  );
}

export function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
