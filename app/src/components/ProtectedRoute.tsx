import { Navigate, useLocation } from "react-router-dom";
import type React from "react";
import { useAuth } from "../contexts/AuthContext";
import type { ModuleKey } from "../types";
import { canView } from "../lib/permissions";
import { EmptyState } from "./States";

export function ProtectedRoute({ module, children }: { module?: ModuleKey; children: React.ReactNode }) {
  const { configured, error, loading, session, profile, obras } = useAuth();
  const location = useLocation();

  if (!configured) {
    return (
      <EmptyState
        title="Supabase nao configurado"
        description="Preencha as variaveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar login, banco e RLS."
      />
    );
  }

  if (loading) return <EmptyState title="Carregando sessao" description="Validando usuario e permissoes." />;

  if (error) {
    return <EmptyState title="Falha ao validar acesso" description={`${error} Atualize a pagina ou tente entrar novamente.`} />;
  }

  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;

  if (!profile) {
    return (
      <EmptyState
        title="Perfil nao encontrado"
        description="O usuario esta autenticado, mas ainda nao possui registro em profiles."
      />
    );
  }

  if (!profile.ativo) {
    return <EmptyState title="Usuario inativo" description="Seu acesso foi desativado. Procure um administrador." />;
  }

  if (profile.must_change_password && location.pathname !== "/alterar-senha") {
    return <Navigate to="/alterar-senha" replace state={{ from: location }} />;
  }

  if (module && !canView(profile, module)) {
    return <EmptyState title="Sem permissao" description="Seu perfil nao tem acesso a esta area." />;
  }

  if (profile.role === "viewer" && !obras.length && (module === "requisicoes" || module === "contratos")) {
    return (
      <EmptyState
        title="Nenhuma obra vinculada"
        description="Seu usuario comum precisa estar vinculado a pelo menos uma obra para visualizar dados."
      />
    );
  }

  return <>{children}</>;
}
