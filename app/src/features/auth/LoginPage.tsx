import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { EmptyState } from "../../components/States";

export function LoginPage() {
  const { configured, session, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to={(location.state as { from?: { pathname?: string } })?.from?.pathname || "/"} replace />;

  if (!configured) {
    return (
      <div className="login-page">
        <EmptyState
          title="Configuração pendente"
          description="Crie um arquivo .env a partir de .env.example e informe as chaves públicas do Supabase."
        />
      </div>
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <img src="/logo-seel.png" alt="Seel" />
          <div>
            <span>Supply Flow Seel</span>
            <h1>Acesso corporativo</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
          </label>
          <label>
            Senha
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <div className="form-error">{error}</div> : null}
          <button className="primary-button" type="submit" disabled={submitting}>
            <LogIn size={18} />
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </div>
  );
}
