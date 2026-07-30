import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { EmptyState, LoadingState } from "./components/States";
import { LoginPage } from "./features/auth/LoginPage";

const ChangePasswordPage = lazy(() => import("./features/auth/ChangePasswordPage").then((module) => ({ default: module.ChangePasswordPage })));
const AlertasPage = lazy(() => import("./features/alertas/AlertasPage").then((module) => ({ default: module.AlertasPage })));
const DashboardPage = lazy(() => import("./features/dashboard/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const RequisicoesPage = lazy(() => import("./features/requisicoes/RequisicoesPage").then((module) => ({ default: module.RequisicoesPage })));
const OrcamentosPage = lazy(() => import("./features/orcamentos/OrcamentosPage").then((module) => ({ default: module.OrcamentosPage })));
const ContratosPage = lazy(() => import("./features/contratos/ContratosPage").then((module) => ({ default: module.ContratosPage })));
const FretesPage = lazy(() => import("./features/fretes/FretesPage").then((module) => ({ default: module.FretesPage })));
const NotaFiscalPage = lazy(() => import("./features/notaFiscal/NotaFiscalPage").then((module) => ({ default: module.NotaFiscalPage })));
const EstoqueObrasPage = lazy(() => import("./features/estoqueObras/EstoqueObrasPage").then((module) => ({ default: module.EstoqueObrasPage })));
const CadastroMateriaisPage = lazy(() =>
  import("./features/cadastroMateriais/CadastroMateriaisPage").then((module) => ({ default: module.CadastroMateriaisPage }))
);
const FrotaPage = lazy(() => import("./features/frota/FrotaPage").then((module) => ({ default: module.FrotaPage })));
const FornecedoresPage = lazy(() => import("./features/fornecedores/FornecedoresPage").then((module) => ({ default: module.FornecedoresPage })));
const CadastroFornecedoresPage = lazy(() =>
  import("./features/cadastroFornecedores/CadastroFornecedoresPage").then((module) => ({ default: module.CadastroFornecedoresPage }))
);
const AvaliacaoFornecedoresPage = lazy(() =>
  import("./features/avaliacaoFornecedores/AvaliacaoFornecedoresPage").then((module) => ({ default: module.AvaliacaoFornecedoresPage }))
);
const ImportacoesPage = lazy(() => import("./features/importacoes/ImportacoesPage").then((module) => ({ default: module.ImportacoesPage })));
const UsuariosPage = lazy(() => import("./features/usuarios/UsuariosPage").then((module) => ({ default: module.UsuariosPage })));
const SettingsPage = lazy(() => import("./features/settings/SettingsPage").then((module) => ({ default: module.SettingsPage })));

export function App() {
  const location = useLocation();

  return (
    <AppErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<LoadingState label="Carregando modulo" />}>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="alterar-senha"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute module="dashboard">
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="alertas"
            element={
              <ProtectedRoute module="alertas">
                <AlertasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="requisicoes"
            element={
              <ProtectedRoute module="requisicoes">
                <RequisicoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orcamentos"
            element={
              <ProtectedRoute module="orcamentos">
                <OrcamentosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="contratos"
            element={
              <ProtectedRoute module="contratos">
                <ContratosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="fretes"
            element={
              <ProtectedRoute module="fretes">
                <FretesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="nota-fiscal"
            element={
              <ProtectedRoute module="nota_fiscal">
                <NotaFiscalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="estoque-obras"
            element={
              <ProtectedRoute module="estoque_obras">
                <EstoqueObrasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cadastro-materiais"
            element={
              <ProtectedRoute module="cadastro_materiais">
                <CadastroMateriaisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="frota"
            element={
              <ProtectedRoute module="frota">
                <FrotaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="fornecedores"
            element={
              <ProtectedRoute module="fornecedores">
                <FornecedoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cadastro-fornecedores"
            element={
              <ProtectedRoute module="fornecedores">
                <CadastroFornecedoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="avaliacao-fornecedores"
            element={
              <ProtectedRoute module="avaliacao_fornecedores">
                <AvaliacaoFornecedoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="importacoes"
            element={
              <ProtectedRoute module="importacoes">
                <ImportacoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="usuarios"
            element={
              <ProtectedRoute module="usuarios">
                <UsuariosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute module="settings">
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<EmptyState title="Pagina nao encontrada" />} />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
}
