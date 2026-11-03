import { modules, capsTypes, nationalSource } from "../shared/portal";
import { portalRouter, DEFAULT_PORTAL_SETTINGS } from "./portal";
const siteBrand = "Observatório de Saúde Mental (Sul do Brasil)";
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
    '<li><a href="/inicio">Início do observatório</a> — Panorama público de dados, políticas e participação.</li>' +
    '<li><a href="/dados-da-cidade">Dados da cidade</a> — Perfil municipal e indicadores oficiais do IBGE e da transparência.</li>' +
    '<li><a href="/metas-saude">Quatro frentes de acompanhamento</a> — Fichas PAS transcritas e prioridades complementares, sem execução informada.</li>' +
    '<li><a href="/atualizacoes-normativas">Atualizações normativas</a> — Contexto nacional, separado de habilitações, transferências e execução municipal.</li>';
  if (path === "/") {
    title = siteBrand;
    description =
      "Portal público de transparência e participação social em saúde mental; os dados atualmente disponíveis têm recorte municipal de Itajaí/SC.";
    content =
      '<h2>Informação pública. Cuidado coletivo.</h2><p>Um espaço para acompanhar dados, políticas públicas e participação social em saúde mental, com fontes, limites e evidências à vista.</p><a href="/inicio">Acessar o observatório</a>';
  } else if (path === "/inicio") {
    title = "Panorama da saúde mental";
    description =
      "Panorama do Observatório de Saúde Mental (Sul do Brasil). Dados e serviços atualmente documentados com recorte municipal de Itajaí/SC.";
    content =
      '<h2>O que estamos acompanhando</h2><p>Consulte fontes, registros e limites da informação municipal. A ausência de dado publicado não é tratada como zero, e metas planejadas não são apresentadas como resultados realizados.</p><a href="/metas-saude">Metas da saúde mental 2026–2029</a> · <a href="/dados-da-cidade">Dados da cidade</a>';
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
      '<h2>Perfil municipal e fontes oficiais</h2><p>O Censo Demográfico 2022 registrou 264.054 residentes em Itajaí (código IBGE 4208203); a estimativa IBGE 2026, referência 01/07/2026, é 302.247. São medidas diferentes: a estimativa não substitui o Censo nem a distribuição etária 2022. Indicadores de saúde geral não medem, por si só, saúde mental nem cobertura da Rede de Atenção Psicossocial.</p><p>O Portal da Transparência exibe no cartão “Despesas com Saúde” R$ 373,6 milhões e 21,26%; fórmula, denominador, composição e etapa não foram confirmados. Não interpretar esse percentual como proporção das despesas liquidadas apresentadas separadamente. Despesas gerais da saúde ou do FMS não são automaticamente gastos de saúde mental. O portal apresenta 18 metas selecionadas da PAS 2026–2029 como transcrição do DOCX organizado enviado pelo usuário; o PDF primário ainda não foi conferido diretamente e os resultados não constam nessa fonte. O nome regional não significa que esta página contenha dados de todo o Sul do Brasil: o conjunto atual é de Itajaí/SC.</p><a href="https://www.ibge.gov.br/cidades-e-estados/sc/itajai.html">Fonte: IBGE Cidades e Estados</a> · <a href="https://portaltransparencia.itajai.sc.gov.br/">Portal da Transparência de Itajaí</a>';
  } else if (path === "/metas-saude") {
    title = "Metas da saúde mental — programação 2026–2029";
    description =
      "Quatro frentes de acompanhamento: 18 fichas da PAS de Itajaí e prioridades complementares sem execução informada.";
    content =
      '<h2>Quatro frentes — planejamento e prioridades em separado</h2><p>O portal apresenta 18 fichas PAS selecionadas (16 do objetivo 1.3 e duas do objetivo 2.1), transcritas do DOCX organizado enviado pelo usuário. O documento indica o DigiSUS Gestor como fonte primária e cita páginas do PDF de 49 páginas; a conferência direta desse PDF segue pendente.</p><p>Espera pelo primeiro atendimento, continuidade após alta dos CAPS, PTS, satisfação, boletins, painel de indicadores, Colaboratório e o código 4.1.44 são prioridades informadas pelo usuário, não metas PAS verificadas nesta etapa. A linha do tempo não apresenta resultados de execução nem interpola anos intermediários.</p><p>O recorte de dados disponível nesta etapa é municipal, de Itajaí/SC; o nome regional não implica cobertura de todo o Sul do Brasil.</p><a href="/metodologia">Consultar metodologia e fontes</a> · <a href="https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc/planos-saude">Painel público do DigiSUS</a>';
  } else if (path === "/atualizacoes-normativas") {
    title = "Atos federais e contexto local";
    description =
      "Portarias nacionais relacionadas à RAPS, verificadas no Diário Oficial da União. Nenhum benefício ou serviço de Itajaí foi identificado nos atos selecionados.";
    content =
      '<h2>Contexto nacional — nenhum benefício de Itajaí identificado</h2><p>Seis portarias de 8 de abril de 2026 tratam de equipes EAP-Desinst, Unidade de Acolhimento Adulto, Serviço Hospitalar de Referência e Serviços Residenciais Terapêuticos em João Pessoa/PB, Porto Alegre/RS, Junqueirópolis/SP, Joinville/SC e outras localidades. A portaria sobre Joinville não identifica Itajaí. Valores previstos não comprovam pagamento, despesa liquidada/paga ou funcionamento local.</p><h2>Atenção Primária: contexto transversal</h2><p>A Portaria GM/MS nº 9.082/2025 apresenta valores nacionais agregados e cita municípios catarinenses distintos; não foi identificada habilitação de Itajaí. O CONASEMS é um índice secundário; os textos oficiais estão ligados ao DOU.</p><a href="https://portal.conasems.org.br/legislacao-diaria/2754_legislacao-diaria-nacional-9-de-abril-de-2026">Boletim do CONASEMS de 09/04/2026</a>';
  } else if (path === "/cism") {
    title = "Área reservada a membros da CISM";
    description =
      "Acesso autenticado a documentos expressamente destinados aos membros da comissão.";
    noindex = true;
    content =
      "<h2>Área restrita</h2><p>Entre com uma conta autorizada. A autenticação não concede automaticamente o papel de membro da CISM; a liberação é feita manualmente pela administração.</p>";
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
  const documentTitle =
    title === siteBrand ? siteBrand : `${title} | ${siteBrand}`;
  const canonicalUrl = `https://observa-x7fimfpb.manus.space${path}`;
  let html = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(documentTitle)}</title>`
    )
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(description)}" />`
    );
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${escape(canonicalUrl)}"/><meta property="og:type" content="website"/><meta property="og:url" content="${escape(canonicalUrl)}"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:site_name" content="${escape(siteBrand)}"/><meta property="og:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519664033027457/UlpRkXDtzNQYLabk.png"/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content="${escape(title)}"/><meta name="twitter:description" content="${escape(description)}"/><meta name="twitter:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519664033027457/UlpRkXDtzNQYLabk.png"/>${noindex ? '<meta name="robots" content="noindex,nofollow"/>' : ""}</head>`
  );
  html = html
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/, "")
    .replace('<div id="root"></div>', staticContent + '<div id="root"></div>');
  return { html, status };
}
