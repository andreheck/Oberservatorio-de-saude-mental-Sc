import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  HeartHandshake,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { capsTypes, nationalSource, consultationDate } from "@shared/portal";
import {
  Empty,
  Notice,
  SectionTitle,
  SourceNote,
} from "@/components/portal/Common";
const steps = [
  [
    "Reconheça a necessidade de cuidado",
    "Se você ou alguém próximo está em sofrimento, não precisa enfrentar isso sozinho.",
  ],
  [
    "Procure um CAPS ou sua UBS",
    "A orientação nacional permite procura direta do CAPS para o primeiro acolhimento, sem encaminhamento prévio.",
  ],
  [
    "Converse com a equipe",
    "O acolhimento inicial permite ouvir a situação e avaliar as necessidades imediatas.",
  ],
  [
    "Conheça as possibilidades de cuidado",
    "A equipe orienta sobre acompanhamento, atividades e outros pontos da rede.",
  ],
  [
    "Construa seu plano de cuidado",
    "Quando indicado, o Projeto Terapêutico Singular é construído com você e, quando necessário, sua família.",
  ],
  [
    "Acompanhe e reavalie o cuidado",
    "O acompanhamento é organizado segundo necessidades, recursos disponíveis e plano de cuidado.",
  ],
];
export default function CapsGuide() {
  const [match, params] = useRoute("/guia-caps/:slug");
  const type = match ? capsTypes.find(c => c.slug === params?.slug) : undefined;
  if (match && !type)
    return (
      <div className="content-page">
        <Empty
          title="Modalidade não encontrada"
          text="Volte ao guia para conhecer as modalidades descritas."
        />
        <Link href="/guia-caps" className="button button-secondary">
          Voltar ao guia
        </Link>
      </div>
    );
  return (
    <div className="content-page">
      <Link href={type ? "/guia-caps" : "/"} className="back-link">
        <ArrowLeft size={14} />
        {type ? "Todas as modalidades" : "Voltar ao panorama"}
      </Link>
      <section className="guide-hero">
        <HeartHandshake size={58} />
        <div>
          <div className="eyebrow">ORIENTAÇÃO CIDADÃ · SUS</div>
          <h1>
            {type
              ? `${type.name}: ${type.caption}`
              : "Preciso de ajuda. Por onde começo?"}
          </h1>
          <p>
            {type
              ? type.text
              : "Conheça os Centros de Atenção Psicossocial, entenda o primeiro acolhimento e os caminhos para buscar cuidado. Informação acessível, sem estigma."}
          </p>
        </div>
      </section>
      {!type && (
        <figure className="guide-listening-visual">
          <img
            src="/manus-storage/async-images/h1k4ztjz912XRa9iklgDN7/image-1.webp"
            alt="Ilustração editorial de um homem negro idoso em conversa acolhedora com uma profissional da saúde, sentados em poltronas verdes."
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span className="eyebrow">ESCUTA ENTRE GERAÇÕES</span>
            <strong>O cuidado também começa quando alguém é ouvido.</strong>
            <span>
              Ilustração editorial; não representa uma unidade ou atendimento
              específico de Itajaí.
            </span>
          </figcaption>
        </figure>
      )}
      <Notice title="Orientação nacional, oferta local ainda em verificação">
        Este guia explica as modalidades segundo o Ministério da Saúde. Não
        confirma a existência, endereço, horário ou funcionamento atual dessas
        unidades em Itajaí. Para a orientação local, consulte a UBS de
        referência ou a Secretaria Municipal de Saúde.
      </Notice>
      {!type ? (
        <>
          <SectionTitle
            title="O caminho começa pelo acolhimento"
            subtitle="Os CAPS são serviços públicos do SUS, abertos à comunidade."
          />
          <div className="care-steps">
            {steps.map((s, i) => (
              <div className="care-step" key={s[0]}>
                <span className="step-number">{i + 1}</span>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
          <div className="text-panel">
            <h2>Procura direta não é garantia de vaga em toda atividade.</h2>
            <p>
              O primeiro acolhimento é uma oportunidade de avaliação e
              orientação. A continuidade do acompanhamento e as atividades são
              definidas a partir das necessidades da pessoa e da organização da
              rede. Se não houver inserção no CAPS, a equipe deve articular o
              cuidado em outro ponto da RAPS.
            </p>
            <p>
              Identificação e Cartão Nacional de Saúde são documentos úteis. Sua
              falta não deve ser tratada como impedimento absoluto para buscar
              ajuda em uma situação urgente.
            </p>
          </div>
          <section
            id="pilha-plus"
            className="pilha-promo"
            aria-labelledby="pilha-plus-title"
          >
            <div className="pilha-promo-header">
              <span className="pilha-promo-mark" aria-hidden="true">
                P+
              </span>
              <div>
                <span className="eyebrow">
                  AUTOCUIDADO DIGITAL · ACESSO ANTECIPADO
                </span>
                <h2 id="pilha-plus-title">Conheça o PilhA+</h2>
              </div>
            </div>
            <p className="pilha-promo-intro">
              Registre e acompanhe tendências de sinais vitais, sono, saúde
              emocional e dor — informações de autocuidado que devem ser
              interpretadas no seu contexto.
            </p>
            <p className="pilha-promo-offer">
              A página oficial apresenta um plano Básico gratuito por 30 dias;
              confira as condições vigentes ao iniciar e conheça a proposta no
              <a
                href="https://vaideplanob.com.br/pilha-plus"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}site do PilhA+
              </a>.
            </p>
            <p className="pilha-promo-privacy">
              Antes de registrar informações sensíveis no app oficial, confira
              os avisos de privacidade e as condições de uso apresentados pelo
              próprio serviço.
            </p>
            <div className="pilha-promo-actions">
              <a
                className="button button-primary"
                href="https://vaideplanob.com.br/pilha-plus-app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Experimentar acesso antecipado gratuito
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href="https://andreheck.github.io/pilha-plus-pwa-preview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prévia PWA para iPhone
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <p className="pilha-promo-preview">
              <strong>Sobre a prévia PWA do GitHub:</strong> abra no Safari e
              use o botão de início; se desejar, adicione o app à tela inicial.
              Os registros ficam no navegador do aparelho, sem login social ou
              integração com servidor. Em aparelho compartilhado, outras
              pessoas com acesso ao navegador podem ver esses registros locais.
            </p>
            <p className="pilha-promo-disclaimer">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Ferramenta informativa de autocuidado e apoio à decisão. Não é
                dispositivo médico, não fornece diagnóstico e não substitui
                acompanhamento profissional.
              </span>
            </p>
          </section>
          <div style={{ marginTop: 30 }}>
            <SectionTitle
              title="Qual modalidade atende a cada necessidade?"
              subtitle="As modalidades abaixo não são uma lista de unidades confirmadas de Itajaí."
            />
          </div>
          <div className="cards-grid">
            {capsTypes.map(c => (
              <Link
                key={c.slug}
                href={`/guia-caps/${c.slug}`}
                className="caps-card"
              >
                <span>{c.tag.toUpperCase()}</span>
                <h2>{c.name}</h2>
                <h3>{c.caption}</h3>
                <p>{c.text}</p>
                <span className="text-link">
                  Entender esta modalidade <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="two-columns">
            <div className="text-panel">
              <h2>O que pode fazer parte do cuidado</h2>
              <p>
                O acompanhamento pode incluir atendimentos individuais, grupos,
                atividades comunitárias, apoio social e construção do Projeto
                Terapêutico Singular. A composição da equipe e a oferta efetiva
                de cada unidade precisam ser documentadas localmente.
              </p>
              <h3>Família e rede de apoio</h3>
              <p>
                Apoio familiar e articulação com UBS, escolas, assistência
                social e outros serviços podem integrar o cuidado, com respeito
                ao sigilo, à autonomia e às necessidades da pessoa.
              </p>
              {type.slug.includes("ad") && (
                <p>
                  O cuidado deve ser acolhedor, sem estigmatização e com
                  estratégias de redução de danos. Este guia não impõe exigência
                  genérica de abstinência para buscar orientação.
                </p>
              )}
            </div>
            <div className="text-panel">
              <h2>Como procurar atendimento</h2>
              <p>
                A orientação geral do Ministério da Saúde permite ir diretamente
                ao CAPS para o primeiro acolhimento, sem necessidade de marcar
                consulta previamente. Também é possível chegar por
                encaminhamento de outro ponto da rede.
              </p>
              <p>
                A faixa etária, os critérios de acompanhamento, as atividades,
                as regras locais de acesso e o horário praticado ainda precisam
                de confirmação documental.
              </p>
              <Link className="button button-secondary" href="/mapa-raps">
                Consultar diretório local <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <SectionTitle
              title="Capacidade, demanda e acesso"
              subtitle="Não inferimos vagas a partir do número de salas ou profissionais."
            />
          </div>
          <div className="filter-bar">
            <select
              disabled
              aria-label="Ano de referência — filtros indisponíveis sem base validada"
            >
              <option>2026</option>
              <option>2025</option>
            </select>
            <select
              disabled
              aria-label="Intervalo de referência — filtros indisponíveis sem base validada"
            >
              <option>Ano completo</option>
              <option>1º trimestre</option>
              <option>2º trimestre</option>
              <option>3º trimestre</option>
              <option>4º trimestre</option>
            </select>
            <select
              disabled
              aria-label="Unidade — cadastro aguardando validação"
            >
              <option>Sem unidade validada</option>
            </select>
          </div>
          <div className="capacity-grid">
            {[
              [
                "Capacidade instalada",
                "Salas e espaços",
                "Profissionais por categoria",
                "Carga horária disponível",
                "Capacidade planejada por atividade",
              ],
              [
                "Produção assistencial",
                "Acolhimentos iniciais",
                "Atendimentos individuais e em grupo",
                "Atendimentos familiares e visitas",
                "Pessoas únicas acompanhadas",
              ],
              [
                "Demanda e acesso",
                "Fila formal de primeiro acolhimento",
                "Espera por consulta ou atividade",
                "Tempo mediano e percentil 90",
                "Demanda recebida e atendida",
              ],
              [
                "Acompanhamento continuado",
                "Pessoas ativas",
                "Frequência de acompanhamento",
                "Modalidades terapêuticas",
                "Ocupação com denominador válido",
              ],
            ].map(g => (
              <div className="panel" key={g[0]}>
                <h3>{g[0]}</h3>
                {g.slice(1).map(x => (
                  <div className="capacity-row" key={x}>
                    <span>{x}</span>
                    <strong>Não disponibilizada</strong>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Notice title="Cada indicador mede uma coisa diferente">
            Atendimentos não equivalem a pessoas únicas: alguém pode ter vários
            atendimentos no período. Vagas programadas, vagas ofertadas,
            atendimentos realizados e pessoas acompanhadas são medidas
            distintas. A metodologia local ainda não está confirmada.
          </Notice>
        </>
      )}
      <div className="emergency">
        <Phone size={24} />
        <div>
          <strong>Há risco imediato ou uma urgência?</strong>
          <p>
            Procure um serviço de urgência e emergência ou ligue para o SAMU.
            Este portal não oferece atendimento clínico nem substitui os
            serviços de saúde.
          </p>
        </div>
        <a href="tel:192">SAMU 192</a>
      </div>
      <SourceNote
        source="Ministério da Saúde — orientação geral sobre CAPS"
        period="Conteúdo consultado, não dado municipal"
        date={consultationDate}
      />
      <div className="source-box">
        Fonte oficial:{" "}
        <a href={nationalSource} target="_blank" rel="noreferrer">
          Centros de Atenção Psicossocial — Ministério da Saúde{" "}
          <ArrowUpRight size={12} style={{ display: "inline" }} />
        </a>
        . Consulta em {consultationDate}. Endereços, horários, capacidade e
        funcionamento de Itajaí aguardam verificação atual.
      </div>
    </div>
  );
}
