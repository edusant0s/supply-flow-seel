import type React from "react";
import type { KanbanColumn } from "../types";

export function KanbanBoard<T extends { id: string }>({
  columns,
  renderCard,
  canDrag,
  onMove,
}: {
  columns: KanbanColumn<T>[];
  renderCard: (item: T) => React.ReactNode;
  canDrag: boolean;
  onMove?: (id: string, status: string) => void;
}) {
  return (
    <div className="kanban-board">
      {columns.map((column) => {
        const hiddenCount = Math.max((column.totalCount ?? column.items.length) - column.items.length, 0);
        return (
          <section
            className="kanban-column"
            key={column.key}
            onDragOver={(event) => {
              if (canDrag) event.preventDefault();
            }}
            onDrop={(event) => {
              const id = event.dataTransfer.getData("text/plain");
              if (canDrag && id && onMove) onMove(id, column.key);
            }}
          >
            <header>
              <div>
                <strong>{column.title}</strong>
                {column.subtitle ? <span>{column.subtitle}</span> : null}
              </div>
              <b>{column.totalCount ?? column.items.length}</b>
            </header>
            <div className="kanban-column__cards">
              {column.items.length ? (
                <>
                  {column.items.map((item) => (
                    <div
                      className={`kanban-card ${canDrag ? "kanban-card--draggable" : ""}`}
                      key={item.id}
                      draggable={canDrag}
                      onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
                    >
                      {renderCard(item)}
                    </div>
                  ))}
                  {hiddenCount ? <div className="kanban-overflow">{column.overflowLabel || `Mais ${hiddenCount} item(ns). Refine os filtros para ver.`}</div> : null}
                </>
              ) : (
                <div className="kanban-empty">Sem itens nesta fase.</div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
