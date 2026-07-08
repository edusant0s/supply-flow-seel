import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/avaliacao-fornecedores.html?raw").then((module) => module.default);

export function AvaliacaoFornecedoresPage() {
  return <EmbeddedHtmlToolPage title="Avaliacao de fornecedores" loadHtml={loadHtml} />;
}
