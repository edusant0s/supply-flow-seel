import { Construction } from "lucide-react";

export function ContratosPage() {
  return (
    <div className="page-stack">
      <section className="state-panel state-panel--development">
        <Construction size={30} />
        <div>
          <h2>Modulo de contratos em desenvolvimento</h2>
          <p>Esta area esta temporariamente bloqueada para ajustes antes da liberacao operacional.</p>
        </div>
      </section>
    </div>
  );
}
