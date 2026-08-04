import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LogIn, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { EmptyState } from "../../components/States";

export function LoginPage() {
  const { configured, session, signIn, requestPasswordReset } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

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

  async function handleForgotSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await requestPasswordReset(email);
    } catch (err) {
      console.warn("Falha ao solicitar recuperacao de senha.", err);
    } finally {
      // Mensagem sempre generica, mesmo em caso de erro: evita confirmar para quem tenta
      // adivinhar e-mails cadastrados se um endereco existe ou nao na base.
      setResetSent(true);
      setSubmitting(false);
    }
  }

  function backToLogin() {
    setMode("login");
    setError("");
    setResetSent(false);
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

        {mode === "login" ? (
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
            <button type="button" className="login-forgot-link" onClick={() => setMode("forgot")}>
              Esqueceu sua senha?
            </button>
          </form>
        ) : resetSent ? (
          <div className="login-forgot-confirm">
            <p>
              Se o e-mail <strong>{email}</strong> estiver cadastrado, enviamos um link para redefinir a senha. Verifique
              tambem a caixa de spam.
            </p>
            <button type="button" className="secondary-button" onClick={backToLogin}>
              Voltar ao login
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit}>
            <label>
              E-mail cadastrado
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
            </label>
            <button className="primary-button" type="submit" disabled={submitting}>
              <Mail size={18} />
              {submitting ? "Enviando..." : "Enviar link de recuperacao"}
            </button>
            <button type="button" className="login-forgot-link" onClick={backToLogin}>
              Voltar ao login
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
