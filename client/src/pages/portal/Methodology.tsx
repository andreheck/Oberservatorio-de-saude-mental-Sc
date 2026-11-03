import { Link } from "wouter";
import { BookOpen, ShieldCheck } from "lucide-react";
import { nationalSource, consultationDate } from "@shared/portal";
import { Notice, PageHeading } from "@/components/portal/Common";
import { trpc } from "@/lib/trpc";
export default function Methodology() {
  const settings = trpc.portal.settings.useQuery();
  return (
    <div className="content-page">
      <PageHeading
        eyebrow="FONTES, CRITÉRIOS E RESPONSABILIDADE"
        title="Como monitoramos a saúde mental"
        description="O que medimos, de onde vêm as informações e o que os dados ainda não permitem concluir."
      />
      <Notice title="Portal em fase inicial de levantamento">
        Os painéis municipais ainda não têm bases validadas. Ausência de dado
        não é zero, prova de ausência de atendimento ou indício automático de
        irregularidade.
      </Notice>
      <div className="method-grid">
        <article className="text-panel">
          <h2>1. Fontes e atualização</h2>
          <p>
            Priorizamos fontes oficiais e documentos públicos: Prefeitura e
            Secretaria de Saúde de Itajaí, COMUSA, CNES, DATASUS, Fundo Nacional
            de Saúde, SIOPS, instrumentos orçamentários, contratos, Diário
            Oficial e respostas institucionais.
          </p>
          <p>
            O cadastro de cada informação deve conter fonte, URL, instituição,
            data de consulta, período de referência, método de extração,
            limitações e responsável pela validação. Atualizações dependem da
            disponibilidade da base e da revisão: não há integração automática
            ativa nem periodicidade municipal confirmada nesta versão.
          </p>
          <p>
            O guia CAPS utiliza a página oficial do{" "}
            <a href={nationalSource} target="_blank" rel="noreferrer">
              Ministério da Saúde
            </a>
            , consultada em {consultationDate}. Ela orienta sobre modalidades e
            acesso, mas não confirma a operação dos serviços de Itajaí.
          </p>
        </article>
        <article className="text-panel">
          <h2>2. Indicadores e denominadores</h2>
          <p>
            Os totais do portal descrevem registros publicados e verificados,
            não a totalidade da oferta municipal. Valores ausentes são exibidos
            como “Dados em levantamento” ou “Não informado”, nunca convertidos
            em zero.
          </p>
          <p>
            Atendimentos realizados não equivalem a pessoas únicas. Taxa de
            ocupação só é válida quando há capacidade definida e denominador
            documentado. Não estimamos vagas a partir de salas, profissionais ou
            carga horária.
          </p>
          <p>
            Tempo mediano de espera é o valor central da distribuição válida de
            tempos. O percentil 90 é o ponto abaixo do qual estão 90% dos tempos
            observados, segundo o método definido na base. Nenhum deles é
            apresentado sem dados e método local verificados.
          </p>
        </article>
        <article className="text-panel">
          <h2>3. Orçamento e execução</h2>
          <p>
            Distinguimos anúncio, dotação, autorização, transferência, empenho,
            liquidação e pagamento. Não somamos etapas do mesmo recurso nem
            contamos ingresso e despesa como investimentos independentes.
          </p>
          <p>
            Os valores só são atribuídos à saúde mental quando a classificação
            ou documentação permite. Bases anuais somente podem ser comparadas
            com definições compatíveis; mudanças devem ser identificadas. Este
            portal não cria rankings acusatórios.
          </p>
          <Link href="/dados-orcamento">
            Consultar a estrutura do orçamento
          </Link>
        </article>
        <article className="text-panel">
          <h2>4. Solicitações e providências</h2>
          <p>
            Tempo em aberto é a diferença em dias civis entre a data de envio
            documentada e a data atual, ou a resposta quando registrada. Os
            cálculos não substituem a interpretação jurídica do prazo.
          </p>
          <p>
            Um prazo só é destacado quando há regra aplicável, termo inicial e
            verificação da resposta. “Sem resposta registrada no portal” não
            significa que o órgão não respondeu por outro canal.
          </p>
          <p>
            Uma resposta pode ser parcial. A conclusão de uma providência exige
            evidência vinculada e revisão institucional, não apenas uma
            promessa. Os eventos preservam a cronologia do acompanhamento.
          </p>
        </article>
        <article className="text-panel">
          <h2>5. Território e serviços</h2>
          <p>
            O mapa utiliza base cartográfica OpenStreetMap, com atribuição aos
            colaboradores. A posição de um serviço só deve aparecer após
            confirmação de endereço, coordenadas e funcionamento. Os limites
            administrativos de bairros ainda não foram integrados.
          </p>
          <p>
            Um bairro sem equipamento físico pode ter atendimento regionalizado.
            Ausência de marcador não comprova desassistência. Consideramos
            cobertura, referência territorial, fluxos de acesso e lacunas de
            informação separadamente.
          </p>
          <Link href="/mapa-raps">Explorar o mapa da RAPS</Link>
        </article>
        <article className="text-panel" id="privacidade">
          <h2>6. Revisão, privacidade e histórico</h2>
          <p>
            Os registros passam por rascunho, revisão, aprovação e publicação.
            Alterações críticas guardam autor, data e conteúdo anterior e novo.
            Despublicações exigem justificativa.
          </p>
          <p>
            O portal não publica prontuários, diagnósticos individuais, relatos
            clínicos identificáveis, telefones ou endereços pessoais. Arquivos
            internos ficam restritos e não são automaticamente publicados pelo
            upload.
          </p>
          <p>
            Os responsáveis devem revisar documentos, dados pessoais,
            fotografias e fundamento de publicidade antes de autorizar a
            divulgação. Esta versão não substitui uma avaliação jurídica de
            conformidade com a LGPD.
          </p>
        </article>
      </div>
      <div className="text-panel" id="contato">
        <h2>Correções e participação fundamentada</h2>
        <p>
          Uma contribuição deve indicar o registro, a divergência e a fonte
          documental que sustenta a correção. Evite informações clínicas,
          relatos sensíveis, nomes de usuários da rede e acusações sem
          evidência.
        </p>
        {settings.data?.contactEmail ? (
          <a
            href={`mailto:${settings.data.contactEmail}`}
            className="button button-primary"
          >
            Enviar informação ou correção
          </a>
        ) : (
          <Notice title="Canal institucional aguardando configuração">
            O endereço de contato ainda não foi informado pela administração.
            Este portal não recebe pedidos de atendimento clínico nem
            manifestações identificáveis nesta fase.
          </Notice>
        )}
        <p style={{ marginTop: 15 }}>
          A relação desta iniciativa com a CISM no COMUSA é descritiva. O
          observatório não é apresentado como órgão público instituído ou
          representante oficial do conselho sem autorização expressa.
        </p>
      </div>
    </div>
  );
}
