import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/gestao-fretes.html?raw").then((module) => module.default);

export function FretesPage() {
  return <EmbeddedHtmlToolPage title="Gestao de fretes" loadHtml={loadHtml} />;
}
