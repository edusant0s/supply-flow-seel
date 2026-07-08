import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./features/auth/LoginPage";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { RequisicoesPage } from "./features/requisicoes/RequisicoesPage";
import { OrcamentosPage } from "./features/orcamentos/OrcamentosPage";
import { ContratosPage } from "./features/contratos/ContratosPage";
import { FretesPage } from "./features/fretes/FretesPage";
import { EstoqueObrasPage } from "./features/estoqueObras/EstoqueObrasPage";
import { FrotaPage } from "./features/frota/FrotaPage";
import { FornecedoresPage } from "./features/fornecedores/FornecedoresPage";
import { AvaliacaoFornecedoresPage } from "./features/avaliacaoFornecedores/AvaliacaoFornecedoresPage";
import { ImportacoesPage } from "./features/importacoes/ImportacoesPage";
import { UsuariosPage } from "./features/usuarios/UsuariosPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { EmptyState } from "./components/States";

export function App() {
  return (
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
          index
          element={
            <ProtectedRoute module="dashboard">
              <DashboardPage />
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
          path="estoque-obras"
          element={
            <ProtectedRoute module="estoque_obras">
              <EstoqueObrasPage />
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
      <Route path="*" element={<EmptyState title="Página não encontrada" />} />
    </Routes>
  );
}
