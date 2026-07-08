import { useEffect, useMemo, useState } from "react";
import { LoadingState } from "./States";

type EmbeddedHtmlToolPageProps = {
  title: string;
  loadHtml: () => Promise<string>;
};

const embeddedChromeCss = `
  html, body {
    min-height: 100%;
    background: #f1f5f9 !important;
  }

  body {
    margin: 0 !important;
    color: #0f172a;
  }

  body::before {
    opacity: .32 !important;
  }

  .container,
  .topbar-content,
  .topbar-inner,
  main,
  .main,
  .admin-main,
  .content {
    max-width: none !important;
  }

  body > header,
  header.topbar,
  .topbar {
    top: 0 !important;
    box-shadow: 0 8px 24px rgba(15, 23, 42, .08) !important;
  }

  .card,
  .panel,
  .section,
  .stat,
  .kpi,
  .modal,
  .supplier,
  .order-card,
  .freight-card,
  .vehicle-card,
  .chart-card,
  .table-wrap {
    border-radius: 8px !important;
  }

  button,
  input,
  select,
  textarea,
  .tab,
  .chip,
  .badge,
  .pill,
  .status {
    border-radius: 8px !important;
  }

  @media (max-width: 760px) {
    body > header,
    header.topbar,
    .topbar {
      position: relative !important;
    }
  }
`;

function withEmbeddedShell(html: string, baseHref: string) {
  const injection = `<base href="${baseHref}"><style>${embeddedChromeCss}</style>`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${injection}`);
  }
  return `<!doctype html><html lang="pt-BR"><head>${injection}</head><body>${html}</body></html>`;
}

export function EmbeddedHtmlToolPage({ title, loadHtml }: EmbeddedHtmlToolPageProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setHtml(null);
    setError(null);

    loadHtml()
      .then((content) => {
        if (active) setHtml(content);
      })
      .catch(() => {
        if (active) setError("Nao foi possivel carregar este modulo.");
      });

    return () => {
      active = false;
    };
  }, [loadHtml]);

  const srcDoc = useMemo(() => {
    if (!html) return undefined;
    const baseHref = new URL(import.meta.env.BASE_URL || "/", window.location.origin).toString();
    return withEmbeddedShell(html, baseHref);
  }, [html]);

  if (error) {
    return (
      <section className="state-panel">
        <h2>{error}</h2>
        <p>Atualize a pagina e tente novamente.</p>
      </section>
    );
  }

  if (!srcDoc) return <LoadingState label={`Carregando ${title}...`} />;

  return (
    <div className="embedded-tool-page">
      <iframe
        className="embedded-tool-frame"
        title={title}
        srcDoc={srcDoc}
        sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
