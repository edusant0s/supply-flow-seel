import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/gestao-contratos.html?raw").then((module) => module.default);

export function ContratosPage() {
  return <EmbeddedHtmlToolPage title="Gestao de contratos" moduleKey="contratos" loadHtml={loadHtml} />;
}
