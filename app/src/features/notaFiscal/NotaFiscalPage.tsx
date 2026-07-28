import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/nota-fiscal.html?raw").then((module) => module.default);

export function NotaFiscalPage() {
  return <EmbeddedHtmlToolPage title="NF de simples remessa" moduleKey="nota_fiscal" loadHtml={loadHtml} />;
}
