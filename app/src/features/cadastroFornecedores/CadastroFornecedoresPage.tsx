import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/cadastro-fornecedores.html?raw").then((module) => module.default);

export function CadastroFornecedoresPage() {
  return <EmbeddedHtmlToolPage title="Cadastro de fornecedores" moduleKey="fornecedores" loadHtml={loadHtml} />;
}
