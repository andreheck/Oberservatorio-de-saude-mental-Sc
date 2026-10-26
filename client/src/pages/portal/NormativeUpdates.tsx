import { ArrowUpRight, FileText, Info, MapPin } from "lucide-react";
import { PageHeading, SectionTitle, SourceNote } from "@/components/portal/Common";

const conasemsUrl =
  "https://portal.conasems.org.br/legislacao-diaria/2754_legislacao-diaria-nacional-9-de-abril-de-2026";

type NormativeAct = {
  date: string;
  number: string;
  title: string;
  subject: string;
  places: string;
  financialNote: string;
  localNote: string;
  url: string;
};

const rapsActs: NormativeAct[] = [
  {
    date: "08/04/2026",
    number: "10.727",
    title: "Equipes de avaliação e acompanhamento de medidas terapêuticas",
    subject:
      "Habilita duas Equipes de Avaliação e Acompanhamento de Medidas Terapêuticas Aplicáveis à Pessoa com Transtorno Mental em Conflito com a Lei (EAP-Desinst).",
    places: "João Pessoa/PB e Porto Alegre/RS.",
    financialNote:
      "O ato indica R$ 1.584.000,00 anuais no total, sendo R$ 792.000,00 por equipe/ano, e impacto de R$ 1.056.000,00 em 2026, com efeitos a partir da 5ª parcela. Não é comprovante de pagamento.",
    localNote: "O ato não identifica Itajaí nem município de Santa Catarina.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.727-de-8-de-abril-de-2026-698599243",
  },
  {
    date: "08/04/2026",
    number: "10.738",
    title: "Unidade de Acolhimento Adulto",
    subject: "Habilita uma Unidade de Acolhimento Adulto (UAA).",
    places: "João Pessoa/PB, sob gestão estadual.",
    financialNote:
      "O ato indica R$ 600.000,00 anuais (R$ 50.000,00 mensais) e impacto de R$ 400.000,00 em 2026. São valores do ato, não execução financeira comprovada.",
    localNote: "O ato não identifica Itajaí nem município de Santa Catarina.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.738-de-8-de-abril-de-2026-698588400",
  },
  {
    date: "08/04/2026",
    number: "10.732",
    title: "Serviço Hospitalar de Referência em Hospital Geral",
    subject:
      "Habilita um Serviço Hospitalar de Referência (SHR), código 06.36, com dois leitos, no estabelecimento CNES 2751003.",
    places: "Irmandade da Santa Casa de Misericórdia de Junqueirópolis/SP, gestão municipal.",
    financialNote:
      "O ato indica R$ 134.642,64 anuais (R$ 11.220,22 mensais) e impacto de R$ 89.761,76 em 2026. Não comprova pagamento nem funcionamento.",
    localNote: "O ato não identifica Itajaí nem município de Santa Catarina.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.732-de-8-de-abril-de-2026-698584190",
  },
  {
    date: "08/04/2026",
    number: "10.728",
    title: "Serviços Residenciais Terapêuticos",
    subject: "Habilita Serviços Residenciais Terapêuticos (SRT) em cinco municípios.",
    places:
      "Pé de Serra/BA, Carapicuíba/SP, Guarapuava/PR, Rio de Janeiro/RJ e Joinville/SC.",
    financialNote:
      "O ato indica R$ 1.244.661,12 anuais no total. Para Joinville, indica R$ 30.506,40 mensais e R$ 366.076,80 anuais. O impacto total informado para 2026 é R$ 829.774,08; esses valores não comprovam pagamento.",
    localNote:
      "A localidade catarinense citada é Joinville, não Itajaí; não há habilitação local identificada neste ato.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.728-de-8-de-abril-de-2026-698592472",
  },
  {
    date: "08/04/2026",
    number: "10.737",
    title: "Serviços Residenciais Terapêuticos",
    subject: "Habilita Serviços Residenciais Terapêuticos (SRT).",
    places: "Salvador/BA e Junqueirópolis/SP.",
    financialNote:
      "O ato indica R$ 610.128,00 anuais no total: R$ 244.051,20/ano para Salvador e R$ 366.076,80/ano para Junqueirópolis.",
    localNote: "O ato não identifica Itajaí nem município de Santa Catarina.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.737-de-8-de-abril-de-2026-698609199",
  },
  {
    date: "08/04/2026",
    number: "10.747",
    title: "Serviços Residenciais Terapêuticos tipo II",
    subject: "Habilita Serviços Residenciais Terapêuticos (SRT) tipo II nas localidades indicadas no ato.",
    places: "Campo Grande/MS e Niterói/RJ.",
    financialNote:
      "O ato indica R$ 658.938,24 anuais no total: R$ 366.076,80/ano para Campo Grande e R$ 292.861,44/ano para Niterói.",
    localNote: "O ato não identifica Itajaí nem município de Santa Catarina.",
    url: "https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-10.747-de-8-de-abril-de-2026-698596454",
  },
];

function ActCard({ act }: { act: NormativeAct }) {
  return (
    <article className="normative-card">
      <div className="normative-card-meta">
        <span>PORTARIA GM/MS Nº {act.number}</span>
        <time dateTime="2026-04-08">{act.date}</time>
      </div>
      <h3>{act.title}</h3>
      <p>{act.subject}</p>
      <div className="normative-fact">
        <MapPin size={16} aria-hidden="true" />
        <div>
          <strong>Localidades citadas no ato</strong>
          <span>{act.places}</span>
        </div>
      </div>
      <p className="normative-financial-note">{act.financialNote}</p>
      <p className="normative-local-note">
        <Info size={15} aria-hidden="true" />
        <span>{act.localNote}</span>
      </p>
      <a href={act.url} target="_blank" rel="noopener noreferrer">
        <FileText size={15} aria-hidden="true" />
        Ler o texto oficial no Diário Oficial da União
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

export default function NormativeUpdates() {
  return (
    <div className="content-page normative-updates-page">
      <PageHeading
        eyebrow="LEGISLAÇÃO · CONTEXTO NACIONAL"
        title="Atos federais e contexto local"
        description="Portarias nacionais relacionadas à RAPS, conferidas no Diário Oficial da União. Os atos abaixo ajudam a acompanhar mudanças normativas, mas não comprovam habilitação, repasse ou funcionamento de serviços em Itajaí."
      />

      <aside className="normative-intro" aria-labelledby="normative-intro-title">
        <div className="normative-intro-icon">
          <Info size={20} aria-hidden="true" />
        </div>
        <div>
          <span className="eyebrow">RECORTE DE DADOS DO OBSERVATÓRIO: ITAJAÍ/SC</span>
          <h2 id="normative-intro-title">
            Contexto nacional — nenhum benefício de Itajaí identificado
          </h2>
          <p>
            Na leitura dos atos selecionados, não identificamos habilitação,
            serviço ou recurso destinado a Itajaí. A Portaria nº 10.728 cita
            Joinville/SC — não Itajaí. A Portaria nº 9.082/2025 cita outros
            municípios catarinenses, também sem identificar Itajaí. Valores
            previstos em portaria não comprovam transferência realizada,
            despesa liquidada/paga ou serviço em funcionamento.
          </p>
        </div>
      </aside>

      <SectionTitle
        number="01"
        title="Atos relacionados à RAPS"
        subtitle="Seis portarias de 8 de abril de 2026, cada uma ligada ao texto oficial do DOU."
      />
      <div className="normative-grid">
        {rapsActs.map(act => (
          <ActCard key={act.number} act={act} />
        ))}
      </div>

      <SectionTitle
        number="02"
        title="Atenção Primária: contexto transversal"
        subtitle="Ato federal com habilitações e valores agregados; não constitui valor municipal de saúde mental."
      />
      <article className="normative-card normative-card-wide">
        <div className="normative-card-meta">
          <span>PORTARIA GM/MS Nº 9.082</span>
          <time dateTime="2025-12-03">03/12/2025</time>
        </div>
        <h3>Credenciamento e habilitação de equipes e serviços da APS</h3>
        <p>
          O ato trata de credenciamento/habilitação de equipes e serviços de
          Atenção Primária à Saúde, entre outros componentes. Nos anexos
          consultados foram identificados, em Santa Catarina, Concórdia,
          Campos Novos e Imbituba; Itajaí não foi identificado.
        </p>
        <div className="normative-national-values">
          <strong>Valores agregados indicados no ato — não individualizados para Itajaí</strong>
          <ul>
            <li>R$ 113.251.492,80 para custeio em 2026.</li>
            <li>R$ 107.869.041,70 para custeio em 2027.</li>
            <li>R$ 6.216.000,00 em 2026, parcela única, para investimento em SESB/CEO.</li>
          </ul>
        </div>
        <p className="normative-financial-note">
          O ato condiciona a transferência de custeio ao cadastramento/atualização
          no CNES e a outras condições previstas. Os totais são nacionais; não
          são repasse, orçamento ou despesa de Itajaí.
        </p>
        <a
          href="https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-9.082-de-3-de-dezembro-de-2025-673001731"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={15} aria-hidden="true" />
          Ler o texto oficial no Diário Oficial da União
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </article>

      <aside className="normative-method-note">
        <h2>Como ler estas atualizações</h2>
        <p>
          O CONASEMS foi usado como índice secundário para localizar os atos;
          os links acima levam aos textos do Diário Oficial da União. Habilitação
          ou valor autorizado não equivale a pagamento ou implantação local.
          Para afirmar execução em Itajaí, seria necessário confirmar o município
          no ato e cruzar a informação com fontes financeiras, CNES e evidências
          de funcionamento apropriadas.
        </p>
        <a href={conasemsUrl} target="_blank" rel="noopener noreferrer">
          Consultar o boletim do CONASEMS de 09/04/2026
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </aside>

      <SourceNote
        source="Diário Oficial da União (atos individuais); CONASEMS, Legislação Diária Nacional"
        period="Portarias de 03/12/2025 e 08/04/2026"
        date="Análise consultada em 25/10/2026"
      />
    </div>
  );
}
