import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";

const loadHtml = () => import("../../embedded/estoque-obras.html?raw").then((module) => module.default);

export function EstoqueObrasPage() {
  return <EmbeddedHtmlToolPage title="Estoque de obras" moduleKey="estoque_obras" loadHtml={loadHtml} />;
}
