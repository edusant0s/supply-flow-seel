import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/gestao-frota.html?raw").then((module) => module.default);

export function FrotaPage() {
  return <EmbeddedHtmlToolPage title="Gestao de frota" moduleKey="frota" loadHtml={loadHtml} />;
}
