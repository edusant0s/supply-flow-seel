import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/cadastro-materiais.html?raw").then((module) => module.default);

export function CadastroMateriaisPage() {
  return <EmbeddedHtmlToolPage title="Cadastro de materiais" moduleKey="cadastro_materiais" loadHtml={loadHtml} />;
}
