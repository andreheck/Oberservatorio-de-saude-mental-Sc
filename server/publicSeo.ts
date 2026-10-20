import { modules, capsTypes, nationalSource } from "../shared/portal";
import { portalRouter, DEFAULT_PORTAL_SETTINGS } from "./portal";
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );
export async function decoratePublicHtml(template: string, url: string) {
  const caller = portalRouter.createCaller({
    user: null,
    req: {} as any,
    res: {} as any,
  });
  const identity = await caller.settings().catch(() => DEFAULT_PORTAL_SETTINGS);
  const path = url.split("?")[0];
  const module = modules.find(m => m.path === path);
  const caps = capsTypes.find(c => path === `/guia-caps/${c.slug}`);
  let title = module?.title || identity.name;
  let description = module?.description || identity.subtitle;
  let content = "";
  let status = 200;
  let noindex = false;
  const links =
    modules
      .map(
        m =>
          `<li><a href="${m.path}">${escape(m.title)}</a> — ${escape(m.description)}</li>`
      )
      .join("") +
    '<li><a href="/dados-da-cidade">Dados da cidade</a> — Perfil municipal e indicadores oficiais do IBGE e da transparência.</li>';
  if (path === "/") {
    content =
      "<h2>Informação pública. Cuidado coletivo.</h2><p>Os dados municipais estão em levantamento e validação. Não apresentamos números inventados. Acompanhe os registros, as fontes e as evidências.</p>";
  } else if (caps || path === "/guia-caps") {
    title = caps ? `${caps.name} — Guia de acesso` : "Guia de acesso aos CAPS";
    description =
      caps?.text ||
      "Conheça as modalidades CAPS e o primeiro acolhimento segundo a orientação geral do Ministério da Saúde.";
    content = `<h2>Preciso de ajuda. Por onde começo?</h2><p>Os CAPS são serviços públicos do SUS. A orientação nacional permite procura direta para o primeiro acolhimento, sem encaminhamento prévio. Isso não garante vaga em toda atividade.</p><p>O funcionamento, endereços e capacidade locais aguardam verificação atual. Em urgência ou risco imediato, busque um serviço de urgência e emergência ou ligue para o SAMU 192.</p><a href="${nationalSource}">Fonte oficial: Ministério da Saúde</a>`;
  } else if (path === "/metodologia") {
    title = "Como monitoramos a saúde mental";
    description =
      "Fontes, critérios, limites dos dados e procedimentos de revisão e correção.";
    content =
      "<h2>Fontes verificáveis e revisão</h2><p>Ausência de dado não é zero. Atendimentos não equivalem a pessoas únicas. Anúncio, orçamento, transferência, empenho, liquidação e pagamento são etapas distintas, não despesas independentes.</p><p>Sem prazo aplicável, termo inicial e situação de resposta verificados, o portal não afirma atraso legal. Ausência de marcador no mapa não prova ausência de atendimento.</p>";
  } else if (path === "/dados-da-cidade") {
    title = "Itajaí em dados — saúde e cidade";
    description =
      "Perfil municipal com dados do IBGE e da transparência de Itajaí, períodos, fontes, metodologia e estado de validação das metas anuais de saúde.";
    content =
      '<h2>Perfil municipal e fontes oficiais</h2><p>O Censo Demográfico 2022 registrou 264.054 residentes em Itajaí (código IBGE 4208203); a estimativa IBGE 2026, referência 01/07/2026, é 302.247. São medidas diferentes: a estimativa não substitui o Censo nem a distribuição etária 2022. Indicadores de saúde geral não medem, por si só, saúde mental nem cobertura da Rede de Atenção Psicossocial.</p><p>O Portal da Transparência exibe no cartão “Despesas com Saúde” R$ 373,6 milhões e 21,26%; fórmula, denominador, composição e etapa não foram confirmados. Não interpretar esse percentual como proporção das despesas liquidadas apresentadas separadamente. Despesas gerais da saúde ou do FMS não são automaticamente gastos de saúde mental. As metas da Programação Anual de Saúde 2026 aguardam validação documental; não há metas estimadas ou publicadas.</p><a href="https://www.ibge.gov.br/cidades-e-estados/sc/itajai.html">Fonte: IBGE Cidades e Estados</a> · <a href="https://portaltransparencia.itajai.sc.gov.br/">Portal da Transparência de Itajaí</a>';
  } else if (path === "/admin") {
    title = "Área de gestão";
    description =
      "Acesso restrito para cadastro, revisão e atualização do observatório.";
    noindex = true;
    content =
      "<p>Autenticação e permissão editorial são obrigatórias. Nenhum dado interno está disponível neste conteúdo público.</p>";
  } else if (path === "/busca") {
    title = "Busca no observatório";
    noindex = true;
  } else if (/^\/registro\/\d+$/.test(path)) {
    try {
      const caller = portalRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });
      const result = await caller.detail({ id: Number(path.split("/")[2]) });
      title = result.record.title;
      description = result.record.description;
      content = `<h2>Situação: ${escape(result.record.status)}</h2><p>Período de referência: ${escape(result.record.referencePeriod)}</p><p>Fonte: <a href="${escape(result.record.sourceUrl)}">${escape(result.record.sourceName)}</a></p>`;
    } catch {
      status = 404;
      noindex = true;
      title = "Registro não disponível publicamente";
      description =
        "Este registro não existe ou não foi autorizado para consulta pública.";
    }
  } else if (!module) {
    status = 404;
    noindex = true;
    title = "Página não encontrada";
    description =
      "Consulte os módulos do observatório para encontrar informações públicas.";
  }
  if (module)
    content =
      "<h2>Dados em levantamento</h2><p>Informações municipais serão publicadas após cadastro, verificação de fonte e autorização. O portal não estima números para preencher os painéis.</p>";
  const staticContent = `<section id="public-static" class="content-page"><h1>${escape(title)}</h1><p>${escape(description)}</p>${content}<nav aria-label="Módulos públicos"><h2>Explore o observatório</h2><ul>${links}</ul><a href="/guia-caps">Guia de acesso aos CAPS</a> · <a href="/metodologia">Fontes e metodologia</a></nav><p>${escape(identity.signature)} Não presume representação oficial do conselho sem autorização.</p></section>`;
  let html = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(title)} | Saúde Mental de Itajaí</title>`
    )
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(description)}" />`
    );
  html = html.replace(
    "</head>",
    `<meta property="og:type" content="website"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:site_name" content="${escape(identity.name)}"/><meta property="og:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519664033027457/MLVXFtMZVhJKBsmy.svg"/><meta name="twitter:card" content="summary"/>${noindex ? '<meta name="robots" content="noindex,nofollow"/>' : ""}</head>`
  );
  html = html
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/, "")
    .replace('<div id="root"></div>', staticContent + '<div id="root"></div>');
  return { html, status };
}
