import { FormEvent, useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ChangePasswordPage() {
  const { changePassword, profile } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const forced = Boolean(profile?.must_change_password);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("A confirmacao nao confere com a nova senha.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(password);
      setMessage("Senha atualizada com sucesso.");
      setPassword("");
      setConfirmPassword("");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel alterar a senha.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="password-page">
      <div className="password-card">
        <div className="password-card__icon">
          <KeyRound size={24} />
        </div>
        <span className="eyebrow">{forced ? "Primeiro acesso" : "Seguranca da conta"}</span>
        <h2>{forced ? "Crie uma nova senha para continuar" : "Alterar senha"}</h2>
        <p>
          {forced
            ? "Sua senha atual e temporaria. Para liberar o acesso ao Supply Flow, defina uma senha nova e exclusiva."
            : "Atualize sua senha periodicamente e evite reutilizar credenciais de outros sistemas."}
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <label>
            Nova senha
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <label>
            Confirmar nova senha
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          {error ? <div className="form-error">{error}</div> : null}
          {message ? <div className="form-note">{message}</div> : null}
          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={saving}>
              <KeyRound size={17} />
              {saving ? "Salvando..." : "Salvar nova senha"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
