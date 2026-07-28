import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/mapa-fornecedores.html?raw").then((module) => module.default);

export function FornecedoresPage() {
  return <EmbeddedHtmlToolPage title="Mapa de fornecedores" moduleKey="fornecedores" loadHtml={loadHtml} loadSupplierMapBase />;
}
