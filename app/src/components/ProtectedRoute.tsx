import { Navigate, useLocation } from "react-router-dom";
import type React from "react";
import { useAuth } from "../contexts/AuthContext";
import type { ModuleKey } from "../types";
import { canView } from "../lib/permissions";
import { EmptyState } from "./States";

export function ProtectedRoute({ module, children }: { module?: ModuleKey; children: React.ReactNode }) {
  const { configured, loading, session, profile, obras } = useAuth();
  const location = useLocation();

  if (!configured) {
    return (
      <EmptyState
        title="Supabase não configurado"
        description="Preencha as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar login, banco e RLS."
      />
    );
  }

  if (loading) return <EmptyState title="Carregando sessão" description="Validando usuário e permissões." />;

  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;

  if (!profile) {
    return (
      <EmptyState
        title="Perfil não encontrado"
        description="O usuário está autenticado, mas ainda não possui registro em profiles."
      />
    );
  }

  if (!profile.ativo) {
    return <EmptyState title="Usuário inativo" description="Seu acesso foi desativado. Procure um administrador." />;
  }

  if (module && !canView(profile.role, module)) {
    return <EmptyState title="Sem permissão" description="Seu perfil não tem acesso a esta área." />;
  }

  if (profile.role === "viewer" && !obras.length && (module === "requisicoes" || module === "contratos")) {
    return (
      <EmptyState
        title="Nenhuma obra vinculada"
        description="Seu usuário comum precisa estar vinculado a pelo menos uma obra para visualizar dados."
      />
    );
  }

  return <>{children}</>;
}
