import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

type AppErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Supply Flow render error", error, info);
  }

  componentDidUpdate(previousProps: AppErrorBoundaryProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  private retry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="app-error-boundary">
        <section>
          <AlertTriangle size={30} />
          <div>
            <span className="eyebrow">Recuperacao do sistema</span>
            <h1>Este modulo encontrou uma falha temporaria</h1>
            <p>
              O Supply Flow isolou o erro para evitar tela branca. Tente recarregar o modulo; se continuar, acesse outra aba pelo menu.
            </p>
            <small>{this.state.error.message || "Erro inesperado ao renderizar a tela."}</small>
          </div>
          <button className="primary-button" type="button" onClick={this.retry}>
            <RefreshCw size={18} />
            Tentar novamente
          </button>
        </section>
      </main>
    );
  }
}
