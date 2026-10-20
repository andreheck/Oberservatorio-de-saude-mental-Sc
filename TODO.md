# Resultados, critérios e backlog

Os critérios originais são preservados integralmente abaixo. Itens que excedem o MVP permanecem abertos, ainda que parcialmente implementados; não há afirmação de entrega integral.

## Resultados de base implementados

- [x] Layout e navegação pública responsiva com módulos e guia CAPS (arquivos client/src).
- [x] Autenticação real do starter e bloqueio anônimo de gestão (API devolve 401).
- [x] Esquema, migrações e APIs de registros, eventos, configuração, papéis e auditoria (server/portal.ts, drizzle).
- [x] Mapa interativo Leaflet e marcadores condicionados a registros verificados; sem serviços fictícios.
- [x] Guia CAPS com fonte nacional consultada, orientação de urgência e aviso de dados locais não confirmados.
- [x] Busca e filtros básicos de registros públicos; exportação CSV e impressão para PDF.
- [x] Guia técnico, administrativo, dicionário e backlog documentados em docs/guia-portal.md.

## Critérios integrais ainda não concluídos no escopo completo

### [ ] PROJETO: PORTAL DE TRANSPARÊNCIA E MONITORAMENTO DA SAÚDE MENTAL DE ITAJAÍ



### [ ] 1. PAPEL E OBJETIVO


Atue como uma equipe multidisciplinar formada por:

* Arquiteto de software e engenheiro full-stack sênior;
* Especialista em UX/UI e acessibilidade digital;
* Cientista de dados especializado em orçamento público e saúde;
* Especialista em políticas públicas de saúde mental, SUS e RAPS;
* Especialista em transparência pública, participação social e proteção de dados;
* Designer de visualização de dados e storytelling institucional.

Desenvolva um portal web moderno, responsivo, acessível e funcional para documentar, monitorar e divulgar a jornada de mobilização por melhores condições de saúde mental no município de Itajaí, Santa Catarina.

A iniciativa está relacionada à atuação da Comissão Intersetorial de Saúde Mental (CISM) no Conselho Municipal de Saúde de Itajaí (COMUSA).

O portal deverá servir como instrumento de:

### [ ] 1. Transparência e controle social;



### [ ] 2. Monitoramento das políticas públicas de saúde mental;



### [ ] 3. Registro de fiscalizações, inspeções e recomendações;



### [ ] 4. Acompanhamento de solicitações, respostas e providências do poder público;



### [ ] 5. Monitoramento de orçamento, transferências e execução financeira;



### [ ] 6. Divulgação de ações, reuniões, documentos e resultados;



### [ ] 7. Preservação da memória institucional e da história da mobilização;



### [ ] 8. Comunicação pública com linguagem acessível à população.


Não crie apenas uma landing page ou protótipo estático. Desenvolva uma aplicação organizada, com arquitetura preparada para banco de dados, cadastros, filtros, documentos, atualização periódica e evolução funcional.

Antes de implementar, examine as ferramentas, integrações, infraestrutura e possibilidades disponíveis no ambiente do Manus. Tome decisões técnicas fundamentadas, documente-as e avance sem interromper o trabalho para perguntas não essenciais.

### [ ] 2. IDENTIDADE E POSICIONAMENTO


Nome provisório:
Observatório da Saúde Mental de Itajaí

Subtítulo:
Transparência, participação social e monitoramento das políticas públicas de saúde mental.

Assinatura institucional descritiva:
Uma iniciativa de acompanhamento e divulgação das políticas de saúde mental em Itajaí, relacionada à atuação da CISM no COMUSA.

O nome e a assinatura deverão ser editáveis no painel administrativo. Não presumir que o observatório seja um órgão público formalmente instituído ou que represente oficialmente o COMUSA sem autorização expressa.

A identidade visual deve transmitir:

* Credibilidade institucional;
* Defesa dos direitos humanos;
* Ciência e evidências;
* Participação democrática;
* Acolhimento e dignidade;
* Transparência e independência crítica.

Direção estética:

* Design editorial contemporâneo;
* Fundo predominantemente claro;
* Azul profundo ou petróleo para confiança;
* Verde-azulado para saúde e cuidado;
* Amarelo ou âmbar para destaques e alertas;
* Cinzas neutros para informações secundárias;
* Tipografia legível, com excelente contraste;
* Gráficos claros, mapas interativos e linhas do tempo;
* Ícones consistentes, sem excesso de elementos decorativos.

Evitar estética hospitalar genérica, imagens sensacionalistas, linguagem de campanha eleitoral e visual excessivamente burocrático.

A experiência deve ser mobile-first e acessível, seguindo boas práticas WCAG 2.2 AA, com navegação por teclado, descrição de gráficos, contraste adequado e alternativas textuais.

### [ ] 3. ESTRUTURA PRINCIPAL DO SITE


Criar as seguintes páginas e módulos:

### [ ] A. Página inicial — panorama da saúde mental


A página inicial deve apresentar uma visão geral, objetiva e visualmente impactante da situação monitorada.

Incluir:

* Indicadores gerais da saúde mental municipal;
* Total de equipamentos e serviços cadastrados;
* Solicitações abertas, respondidas e concluídas;
* Solicitações aguardando resposta;
* Inspeções e fiscalizações realizadas;
* Recomendações emitidas e providências acompanhadas;
* Recursos orçamentários previstos, autorizados, empenhados, liquidados e pagos, quando os dados estiverem disponíveis;
* Transferências federais identificadas;
* Número de bairros com ações ou serviços documentados;
* Últimas atualizações;
* Próximos compromissos e reuniões públicas;
* Destaques de documentos, relatórios e publicações.

Todos os indicadores devem informar período de referência, data da última atualização, fonte e metodologia.

Não exibir números inventados como se fossem reais. Enquanto não houver dados validados, mostrar “Dados em levantamento”, “Não informado” ou “Aguardando atualização”.

### [ ] B. Observatório de orçamento e financiamento


Criar um dashboard financeiro específico para o financiamento municipal da saúde mental.

Permitir analisar:

* Orçamento autorizado;
* Dotação inicial e atualizada;
* Valores empenhados;
* Valores liquidados;
* Valores pagos;
* Restos a pagar, quando identificáveis;
* Transferências federais recebidas;
* Transferências estaduais identificadas;
* Contrapartida municipal;
* Recursos vinculados à saúde mental;
* Recursos destinados a serviços específicos;
* Contratos, convênios, termos de parceria e instrumentos equivalentes;
* Despesas identificadas com comunidades terapêuticas;
* Investimentos em estrutura física, equipamentos, equipes e serviços;
* Evolução anual e comparação entre exercícios.

Criar filtros por:

* Ano;
* Fonte do recurso;
* Esfera governamental;
* Unidade ou equipamento;
* Serviço de saúde;
* Tipo de despesa;
* Instrumento de transferência;
* Situação da execução financeira.

Criar gráficos de série histórica, barras comparativas, composição de despesas e tabelas detalhadas.

Distinguir claramente:

### [ ] 1. Valor anunciado;



### [ ] 2. Valor orçado;



### [ ] 3. Valor transferido;



### [ ] 4. Valor empenhado;



### [ ] 5. Valor liquidado;



### [ ] 6. Valor efetivamente pago.


Não somar valores de etapas diferentes da execução orçamentária como se fossem despesas independentes. Evitar dupla contagem de transferências, repasses e despesas executadas.

Quando os dados não permitirem identificar especificamente os gastos com saúde mental, apresentar essa limitação de forma explícita. Não classificar toda a despesa geral da saúde como investimento em saúde mental.

Incluir exportação de dados para CSV e relatórios em PDF.

### [ ] C. Mapa territorial da saúde mental


Criar um mapa interativo de Itajaí, com visualização por bairros e localização dos serviços.

Cadastrar, conforme confirmação documental, os seguintes tipos de equipamentos e serviços:

* CAPS II;
* CAPS III;
* CAPS AD;
* CAPSi;
* Unidades Básicas de Saúde e equipes de Atenção Primária;
* UPAs;
* Serviços hospitalares e leitos de saúde mental;
* Serviços de atendimento psicológico;
* Serviços de atendimento psiquiátrico;
* Centro Integrado de Saúde (CIS), com nomenclatura e função confirmadas;
* Comunidades terapêuticas;
* Outros pontos da Rede de Atenção Psicossocial (RAPS);
* Serviços complementares e dispositivos de atendimento psicossocial.

Para cada ponto, apresentar:

* Nome oficial;
* Tipo de serviço;
* Endereço institucional;
* Bairro;
* Esfera de gestão;
* Órgão ou entidade responsável;
* Público atendido;
* Modalidades de atendimento;
* Horário de funcionamento, quando confirmado;
* Existência de atendimento psicológico e/ou psiquiátrico, quando documentada;
* Situação de funcionamento verificada;
* Data da última verificação;
* Fonte das informações;
* Documentos e relatórios relacionados;
* Inspeções realizadas e providências pendentes.

Permitir filtrar por tipo de serviço, bairro, modalidade de atendimento e situação de funcionamento.

Criar uma visão territorial que ajude a responder:

* Quais bairros possuem serviços identificados?
* Quais bairros têm ações documentadas?
* Onde existem lacunas de informação?
* Onde foram registradas demandas ou dificuldades de acesso?
* Onde ocorreram inspeções e quais providências foram acompanhadas?

Não concluir que um bairro está desassistido apenas porque não há equipamento físico localizado nele. Considerar a organização regionalizada dos serviços, a cobertura territorial, o acesso e os fluxos de referência.

A ausência de dados deverá ser representada como ausência de informação, não como prova de ausência de atendimento.

### [ ] D. Diretório de profissionais e força de trabalho


Criar um módulo para acompanhar a distribuição da força de trabalho municipal relacionada à saúde mental.

Registrar, preferencialmente em dados agregados:

* Quantidade de psicólogos;
* Quantidade de psiquiatras;
* Outras categorias profissionais relevantes;
* Unidade de lotação;
* Tipo de vínculo;
* Carga horária contratada e efetivamente disponível, se documentada;
* Quantidade de vagas previstas, ocupadas e não preenchidas;
* Distribuição por equipamento e território;
* Evolução histórica dos quantitativos;
* Concursos, contratações e processos seletivos relacionados;
* Fontes e datas de atualização.

Diferenciar:

* Profissionais vinculados diretamente à administração municipal;
* Profissionais contratados por organizações parceiras;
* Profissionais de serviços estaduais ou federais;
* Prestadores de serviços;
* Quantitativos previstos e efetivamente identificados.

Nomes individuais só deverão ser divulgados quando houver fundamento de publicidade, finalidade institucional legítima e verificação de que a informação pode ser publicada. Não expor telefones pessoais, endereços particulares ou dados pessoais desnecessários.

Priorizar dados de força de trabalho agregados e informações funcionais estritamente necessárias.

### [ ] E. Fiscalizações e inspeções na RAPS


Criar um módulo específico para registrar as fiscalizações, inspeções, visitas técnicas e acompanhamentos realizados pela comissão.

Cada registro deverá possuir:

* Identificador único;
* Data e horário;
* Local ou equipamento inspecionado;
* Bairro;
* Tipo de atividade;
* Participantes institucionais;
* Objetivo;
* Escopo;
* Metodologia utilizada;
* Documentos consultados;
* Condições observadas;
* Aspectos positivos identificados;
* Problemas ou não conformidades observados;
* Evidências documentais;
* Recomendações ou encaminhamentos;
* Órgãos destinatários;
* Prazo proposto ou formalmente estabelecido;
* Resposta institucional;
* Providências adotadas;
* Situação atual;
* Data da última atualização;
* Relatório público, quando autorizado.

Status possíveis:

* Planejada;
* Agendada;
* Realizada;
* Relatório em elaboração;
* Relatório publicado;
* Encaminhamentos em acompanhamento;
* Providências parcialmente realizadas;
* Concluída;
* Suspensa ou cancelada.

Disponibilizar linha do tempo de cada fiscalização e uma visão consolidada de todas as inspeções.

Permitir anexar relatórios, ofícios, fotografias institucionais autorizadas, atas e respostas oficiais.

Distinguir fatos observados, relatos de terceiros, hipóteses, recomendações técnicas e conclusões formalmente documentadas.

Não publicar dados que identifiquem usuários dos serviços, prontuários, diagnósticos individuais, relatos clínicos identificáveis ou informações sigilosas.

Implementar fluxo de revisão e autorização antes da publicação externa.

### [ ] F. Solicitações, ofícios e acompanhamento de demandas


Construir um sistema de protocolo e monitoramento das solicitações feitas pela comissão ou relacionadas à sua atuação.

Cada solicitação deverá permitir registrar:

* Número interno de protocolo;
* Número oficial do ofício ou processo, se existente;
* Título;
* Descrição objetiva;
* Data de elaboração;
* Data de envio;
* Órgão destinatário;
* Assunto;
* Fundamentação;
* Documento original;
* Canal de envio;
* Comprovante de recebimento;
* Prazo legal, regulamentar ou formalmente acordado, quando aplicável;
* Data de resposta;
* Documento de resposta;
* Síntese da resposta;
* Providências prometidas;
* Responsável institucional pelo acompanhamento;
* Status;
* Última movimentação;
* Histórico completo de eventos.

Status:

* Em elaboração;
* Aguardando aprovação;
* Enviada;
* Recebimento não confirmado;
* Aguardando resposta;
* Respondida parcialmente;
* Respondida;
* Em análise pela comissão;
* Providência em andamento;
* Concluída;
* Arquivada;
* Reaberta.

A linha do tempo deverá mostrar cada evento com data, descrição, responsável institucional e documento relacionado.

Calcular automaticamente o tempo decorrido desde o envio. Quando houver prazo aplicável e documentado, exibir dias restantes ou dias transcorridos após o vencimento.

Nunca apresentar uma solicitação como legalmente atrasada sem que o prazo aplicável, seu termo inicial e a ausência de resposta tenham sido verificados.

Diferenciar “sem resposta registrada no portal” de “órgão não respondeu”. A primeira expressão não pressupõe que todas as comunicações externas tenham sido capturadas.

Criar filtros por:

* Órgão destinatário;
* Período;
* Assunto;
* Status;
* Tipo de solicitação;
* Prazo;
* Bairro ou serviço relacionado.

Criar uma página pública para cada demanda autorizada, com histórico, documentos públicos e situação atual.

### [ ] G. Monitoramento de ações do Executivo


Criar um módulo de acompanhamento das políticas, medidas e compromissos relacionados à saúde mental.

Registrar:

* Ação anunciada ou implementada;
* Órgão responsável;
* Data do anúncio;
* Data de início;
* Prazo previsto;
* Público beneficiado;
* Bairro ou território;
* Serviço envolvido;
* Recursos associados;
* Meta anunciada;
* Indicador de acompanhamento;
* Evidência de execução;
* Situação;
* Última verificação;
* Fonte documental.

Status:

* Anunciada;
* Planejada;
* Em implementação;
* Em execução;
* Parcialmente implementada;
* Concluída com evidências;
* Suspensa;
* Sem atualização recente;
* Não foi possível verificar.

Distinguir anúncios oficiais, previsões orçamentárias, execução comprovada e resultados observados.

Quando uma ação for considerada concluída, exigir registro da evidência que sustenta essa classificação.

Permitir acompanhar ações de diferentes gestões sem apagar o histórico anterior.

### [ ] H. Recursos destinados às comunidades terapêuticas


Criar uma área específica para mapear recursos públicos destinados a comunidades terapêuticas e instrumentos de parceria relacionados.

Para cada entidade ou instrumento, quando houver informação pública verificável:

* Nome oficial;
* CNPJ institucional, quando pertinente;
* Município e localização institucional;
* Natureza jurídica;
* Órgão concedente;
* Instrumento jurídico;
* Objeto da parceria;
* Valor pactuado;
* Valor empenhado;
* Valor liquidado;
* Valor pago;
* Vigência;
* Metas e entregas pactuadas;
* Prestação de contas;
* Situação da parceria;
* Fonte documental;
* Histórico de alterações.

Não presumir irregularidade pela existência de repasses. Registrar fatos, instrumentos, valores, objetos e resultados comprováveis.

Distinguir comunidades terapêuticas de CAPS, serviços hospitalares e demais equipamentos da RAPS. Não apresentar esses modelos como equivalentes.

### [ ] I. Linha do tempo institucional


Criar uma timeline pública e cronológica da jornada de mobilização pela saúde mental em Itajaí.

Registrar:

* Reuniões da CISM e do COMUSA;
* Inspeções;
* Fiscalizações;
* Audiências públicas;
* Ofícios enviados;
* Respostas recebidas;
* Recomendações;
* Relatórios;
* Participação em eventos;
* Articulações interinstitucionais;
* Decisões;
* Conquistas documentadas;
* Pendências;
* Alterações em políticas e serviços;
* Publicações e manifestações institucionais.

Cada evento deve apresentar:

* Data;
* Categoria;
* Título;
* Descrição;
* Participantes institucionais, quando divulgáveis;
* Documentos associados;
* Serviços e bairros relacionados;
* Resultado ou encaminhamento;
* Fonte;
* Link para o registro detalhado.

Criar filtros por período, categoria, serviço, bairro, órgão e status.

Permitir destacar eventos relevantes, mantendo o histórico integral disponível.

### [ ] J. Ações por bairro


Criar uma seção territorial com:

* Reuniões comunitárias;
* Demandas identificadas;
* Visitas e inspeções;
* Serviços existentes;
* Ações do Executivo;
* Projetos e iniciativas;
* Solicitações relacionadas;
* Resultados documentados;
* Lacunas de informação.

Disponibilizar mapa e fichas de cada bairro.

Não utilizar estimativas populacionais ou indicadores territoriais sem informar sua fonte e período de referência.

### [ ] K. Comissão e seus membros


Criar uma página institucional da CISM, com descrição de sua finalidade, competências, relação com o COMUSA e registros públicos de atuação.

Criar perfil individual para cada membro, contendo:

* Nome;
* Fotografia autorizada;
* Minibiografia;
* Formação acadêmica relevante;
* Experiência profissional pertinente;
* Representação institucional;
* Função na comissão;
* Período de participação;
* Áreas de contribuição;
* Participações em reuniões e ações públicas;
* Produções ou documentos institucionais relacionados.

A biografia deve ser factual, profissional e revisada pelo próprio membro.

Não inventar nomes, cargos, títulos, experiências ou qualificações. Criar inicialmente um formulário de cadastro para preenchimento e validação.

Informar a data da última atualização da composição e indicar se a lista foi oficialmente confirmada.

### [ ] L. Documentos e biblioteca pública


Criar uma biblioteca pesquisável com categorias:

* Ofícios;
* Respostas oficiais;
* Atas;
* Relatórios de inspeção;
* Pareceres;
* Recomendações;
* Resoluções;
* Planos municipais;
* Relatórios de gestão;
* Instrumentos orçamentários;
* Contratos e parcerias;
* Dados abertos;
* Apresentações;
* Publicações institucionais.

Permitir pesquisa por palavra-chave, período, categoria, órgão e serviço.

Exibir data, origem, descrição, formato e nível de acesso.

Preservar os documentos originais quando autorizado, registrando versões e datas de atualização.

Implementar controle de acesso para documentos internos, sigilosos ou em revisão. Não disponibilizar automaticamente todo arquivo carregado.

### [ ] M. Notícias, publicações e participação social


Criar área editorial para:

* Atualizações do observatório;
* Relatos de ações;
* Informes públicos;
* Explicações sobre a RAPS;
* Análises de orçamento;
* Convocações para reuniões públicas;
* Consultas e escuta social;
* Materiais educativos;
* Prestação de contas das atividades.

Usar linguagem cidadã, sem perder a precisão técnica.

Permitir compartilhar páginas e relatórios por links públicos.

Não publicar denúncias identificáveis, relatos pessoais sensíveis ou acusações não verificadas.

### [ ] 4. FONTES DE DADOS E VERIFICAÇÃO


Estruturar o portal para utilizar prioritariamente fontes primárias e oficiais, incluindo, conforme disponibilidade:

* Portal da Transparência de Itajaí;
* Portal oficial da Prefeitura e da Secretaria Municipal de Saúde;
* COMUSA e publicações oficiais do município;
* Instrumentos municipais de planejamento e orçamento, como PPA, LDO e LOA;
* Relatórios Anuais de Gestão e instrumentos de planejamento do SUS;
* Fundo Nacional de Saúde;
* DATASUS;
* CNES;
* SISAB e sistemas públicos pertinentes;
* Ministério da Saúde;
* Portal da Transparência da União;
* Fundo Estadual de Saúde e fontes estaduais;
* Diário Oficial;
* PNCP e portais de contratos e licitações;
* SIOPS;
* IBGE;
* Documentos oficiais obtidos por solicitação formal de informação.

Para cada conjunto de dados, armazenar:

* Nome da fonte;
* URL;
* Instituição responsável;
* Data de consulta;
* Período de referência;
* Método de extração;
* Data de atualização;
* Limitações;
* Responsável pela validação.

Implementar importação manual por CSV e planilhas, com possibilidade de integração por API quando houver fonte e autorização técnica disponíveis.

Não presumir que uma API exista, que um portal permita extração automatizada ou que dados atualizados estejam disponíveis. Verificar antes de implementar qualquer integração.

Quando a integração automática não for possível, oferecer procedimento manual de atualização, com registro de origem e data.

Não inventar dados para preencher dashboards. Os dados demonstrativos devem ser claramente identificados como fictícios e utilizados somente em ambientes de demonstração.

### [ ] 5. ADMINISTRAÇÃO DO PORTAL


Criar painel administrativo protegido por autenticação.

Perfis sugeridos:

* Administrador;
* Editor;
* Responsável por dados financeiros;
* Responsável por inspeções;
* Responsável por documentos;
* Revisor institucional;
* Leitor interno;
* Visitante público.

Permitir:

* Criar e editar registros;
* Anexar documentos;
* Revisar e aprovar publicações;
* Controlar permissões;
* Atualizar status;
* Importar dados;
* Registrar fontes;
* Visualizar histórico de alterações;
* Despublicar registros com justificativa;
* Gerenciar categorias, bairros, órgãos e equipamentos;
* Exportar relatórios;
* Consultar logs de auditoria.

Implementar fluxo editorial:
Rascunho → Em revisão → Aprovado → Publicado.

Toda alteração em registros críticos deve guardar data, usuário responsável, valor anterior e novo valor.

Não permitir que a edição de um registro apague silenciosamente o histórico público. Correções devem ser rastreáveis, preservando versões anteriores quando apropriado.

### [ ] 6. MODELO DE DADOS


Planejar banco de dados relacional com entidades relacionadas para:

* Usuários e permissões;
* Membros da comissão;
* Órgãos e instituições;
* Bairros;
* Equipamentos de saúde;
* Profissionais e quantitativos agregados;
* Fontes de dados;
* Indicadores;
* Registros financeiros;
* Transferências e instrumentos de parceria;
* Inspeções;
* Solicitações e protocolos;
* Eventos de timeline;
* Ações do Executivo;
* Recomendações e encaminhamentos;
* Documentos;
* Atualizações e histórico de alterações.

Cada registro deve ter identificador único, data de criação, data de atualização, origem e situação de publicação.

Estabelecer relações entre inspeções, solicitações, órgãos, equipamentos, documentos e ações para permitir rastreabilidade.

Evitar duplicação de registros financeiros, documentos e eventos.

Definir validações, campos obrigatórios, índices de pesquisa e política de integridade dos dados.

### [ ] 7. SEGURANÇA, PRIVACIDADE E INTEGRIDADE


Aplicar a LGPD e as regras pertinentes de acesso à informação e sigilo.

Adotar:

* Autenticação segura;
* Controle de acesso por função;
* Proteção contra acesso indevido;
* Validação de arquivos enviados;
* Proteção contra uploads maliciosos;
* Registro de auditoria;
* Política de backups;
* Procedimentos de restauração;
* Proteção contra exposição de credenciais;
* Separação entre dados públicos e internos;
* Revisão prévia de documentos;
* Política de retenção e correção de informações.

Nunca publicar dados clínicos individualizados, prontuários, informações identificáveis de usuários da RAPS ou dados pessoais sensíveis sem fundamento legal e autorização apropriada.

Tratar fotografias, depoimentos e informações de terceiros com cautela.

O portal deve documentar fatos verificáveis, não funcionar como instrumento de exposição pessoal ou julgamento antecipado.

### [ ] 8. INDICADORES E METODOLOGIA


Criar uma página “Como monitoramos a saúde mental em Itajaí”, explicando:

* Fontes utilizadas;
* Definições dos indicadores;
* Fórmulas de cálculo;
* Periodicidade de atualização;
* Limitações dos dados;
* Diferenças entre orçamento e execução;
* Critérios de classificação dos serviços;
* Critérios para considerar uma solicitação respondida ou concluída;
* Critérios para classificar uma providência como comprovada;
* Procedimento para correções;
* Canal para envio de informações e contestação fundamentada.

Todos os gráficos devem possuir fonte, período, unidade de medida e data de atualização.

Permitir comparar anos somente quando as definições e bases forem compatíveis. Informar alterações metodológicas e mudanças de classificação.

Não criar rankings acusatórios ou conclusões automáticas de irregularidade.

### [ ] 9. EXPERIÊNCIA DO USUÁRIO


A navegação principal deve conter:

### [ ] 1. Início;



### [ ] 2. Dados e orçamento;



### [ ] 3. Mapa da RAPS;



### [ ] 4. Profissionais;



### [ ] 5. Fiscalizações;



### [ ] 6. Solicitações e prazos;



### [ ] 7. Ações do Executivo;



### [ ] 8. Comunidades terapêuticas;



### [ ] 9. Timeline;



### [ ] 10. Bairros;



### [ ] 11. Comissão;



### [ ] 12. Documentos;



### [ ] 13. Publicações;



### [ ] 14. Metodologia e contato.


Criar uma busca global e filtros consistentes entre os módulos.

A página inicial deve permitir que um cidadão compreenda rapidamente:

* O que está sendo monitorado;
* O que foi feito;
* O que está em andamento;
* O que está aguardando resposta;
* Quais dados existem;
* Quais informações ainda precisam ser obtidas.

Priorizar clareza e desempenho em celulares.

### [ ] 10. TECNOLOGIA E IMPLEMENTAÇÃO


Escolher uma arquitetura moderna, segura e sustentável, compatível com o ambiente disponível no Manus.

Priorizar:

* Front-end responsivo;
* Banco de dados persistente;
* Autenticação;
* APIs bem documentadas;
* Armazenamento seguro de documentos;
* Componentes reutilizáveis;
* Gráficos acessíveis;
* Mapas com fonte de dados identificada;
* Exportação de relatórios;
* Estrutura preparada para integrações futuras.

Se houver suporte adequado, considerar tecnologias consolidadas como Next.js, TypeScript, PostgreSQL e uma solução segura de autenticação e armazenamento.

Essas tecnologias são sugestões, não requisitos absolutos. Escolher conforme as capacidades reais do ambiente e documentar as decisões.

Não deixar informações críticas armazenadas somente no navegador ou em dados temporários de demonstração.

Não expor chaves de API, senhas, tokens ou credenciais no código público.

Implementar testes básicos de navegação, permissões, formulários, cálculos, filtros e persistência.

### [ ] 11. ENTREGÁVEIS


Ao concluir a primeira versão, entregar:

### [ ] 1. Site funcional e responsivo;



### [ ] 2. Identidade visual consistente;



### [ ] 3. Páginas públicas completas;



### [ ] 4. Dashboard com estrutura para dados reais;



### [ ] 5. Mapa territorial;



### [ ] 6. Sistema de solicitações com timeline e cálculo de tempo;



### [ ] 7. Módulo de inspeções;



### [ ] 8. Biblioteca de documentos;



### [ ] 9. Diretório da comissão;



### [ ] 10. Painel administrativo;



### [ ] 11. Banco de dados persistente;



### [ ] 12. Dados demonstrativos claramente sinalizados, quando necessários;



### [ ] 13. Documentação técnica;



### [ ] 14. Guia de administração e atualização;



### [ ] 15. Dicionário de dados e metodologia dos indicadores;



### [ ] 16. Relatório das funcionalidades efetivamente implementadas;



### [ ] 17. Lista das integrações pendentes;



### [ ] 18. Endereço de acesso e instruções de publicação, conforme as possibilidades disponíveis.



### [ ] 12. ORDEM DE EXECUÇÃO


Trabalhe em etapas:

FASE 1 — Fundação:
Definir arquitetura, identidade visual, estrutura de navegação, modelo de dados e componentes principais.

FASE 2 — MVP público:
Construir página inicial, dashboard, mapa, timeline, biblioteca e páginas institucionais.

FASE 3 — Gestão:
Implementar banco de dados, autenticação, painel administrativo, protocolos, inspeções e documentos.

FASE 4 — Dados:
Implementar importações, integrações verificadas, indicadores financeiros e metodologia.

FASE 5 — Validação:
Testar segurança, acessibilidade, responsividade, persistência, consistência dos cálculos e rastreabilidade dos registros.

FASE 6 — Publicação:
Publicar o portal, documentar o funcionamento e entregar o acesso administrativo de maneira segura.

Se não for possível implementar todos os módulos de uma só vez, concluir primeiro uma versão funcional do MVP e manter as demais funcionalidades organizadas em backlog. Não simular que funcionalidades incompletas estão operacionais.

### [ ] 13. CRITÉRIOS DE ACEITAÇÃO


O projeto será considerado pronto para sua primeira publicação quando:

* A navegação estiver funcional em dispositivos móveis e computadores;
* Os registros persistirem no banco de dados;
* O painel administrativo exigir autenticação;
* Os perfis de acesso forem aplicados;
* As solicitações possuírem histórico de movimentação;
* O tempo em aberto for calculado corretamente;
* O vencimento de prazos depender de regras documentadas;
* As inspeções aceitarem documentos e encaminhamentos;
* Os indicadores financeiros distinguirem as etapas da execução orçamentária;
* Os mapas e gráficos exibirem fontes e datas;
* Os dados demonstrativos estiverem claramente identificados;
* Houver mecanismo de revisão antes da publicação;
* Os documentos internos não forem expostos publicamente;
* A metodologia e as limitações estiverem acessíveis;
* A documentação de administração estiver disponível.

### [ ] 14. INSTRUÇÃO FINAL


Comece analisando o ambiente de desenvolvimento disponível. Apresente um plano de implementação curto e, em seguida, construa o projeto de forma incremental.

Priorize um portal confiável, útil e verificável, não apenas visualmente atraente.

A principal proposta de valor é transformar a atuação da CISM no COMUSA, os documentos públicos, os dados financeiros, as inspeções e as demandas institucionais em uma memória organizada e acessível da política de saúde mental de Itajaí.

O resultado deve permitir que qualquer cidadão compreenda a situação documentada, acompanhe os compromissos públicos e consulte as evidências que sustentam cada informação.

Não invente dados, membros, inspeções, solicitações, valores financeiros, serviços existentes ou resultados. Quando uma informação estiver ausente, crie o campo de cadastro e indique que ela precisa ser levantada e validada.

Execute o máximo possível dentro das capacidades reais do ambiente e informe com transparência o que foi implementado, o que foi testado e o que ainda depende de configuração ou de dados oficiais.

## Guia CAPS e capacidade — critérios integrais

### [ ] MÓDULO ESPECIALIZADO: GUIA DE ACESSO AOS CAPS E MAPA DA RAPS DE ITAJAÍ



### [ ] 1. Objetivo


Criar uma seção pública dedicada a explicar, de maneira simples e completa, como funcionam os Centros de Atenção Psicossocial de Itajaí, quem pode acessar cada modalidade, como buscar atendimento, quais atividades são oferecidas e qual é a capacidade real de atendimento das unidades.

O módulo deverá servir simultaneamente como:

* Guia de orientação para cidadãos e familiares;
* Diretório geográfico dos serviços;
* Painel de transparência sobre acesso, capacidade e demanda;
* Ferramenta de monitoramento da oferta pública de cuidado em saúde mental;
* Base documental para identificar lacunas de informação e subsidiar solicitações da CISM no COMUSA.

### [ ] 2. Modalidades de CAPS


Criar páginas explicativas individuais para CAPS II, CAPS III, CAPS AD, CAPS AD III, CAPSi e CAPS I, deixando claro quais modalidades estão efetivamente cadastradas e em funcionamento em Itajaí.

CAPSi — Centro de Atenção Psicossocial Infantojuvenil

Explicar que é destinado ao cuidado de crianças e adolescentes com sofrimento psíquico intenso ou necessidades complexas de saúde mental, inclusive situações relacionadas ao uso de álcool e outras drogas.

Apresentar:

* Faixa etária atendida, conforme regras e organização local;
* Situações em que procurar o serviço;
* Como funciona o primeiro acolhimento;
* Atendimentos individuais e em grupo;
* Acompanhamento familiar;
* Articulação com escolas, UBS, assistência social e demais serviços, respeitando sigilo e consentimento;
* Elaboração do Projeto Terapêutico Singular;
* Critérios de acompanhamento e encaminhamento;
* Horário, endereço, contatos e acessibilidade;
* Capacidade diária, demanda e espera, se os dados oficiais estiverem disponíveis.

Explicar que o serviço não substitui automaticamente toda forma de atendimento psicológico infantil e que a necessidade de acompanhamento especializado deve ser avaliada pela equipe.

CAPS II — Centro de Atenção Psicossocial Adulto

Explicar que é voltado prioritariamente a pessoas com sofrimento psíquico intenso e persistente que necessitam de acompanhamento psicossocial especializado.

Apresentar:

* Perfil do público atendido;
* Como procurar o serviço;
* Acolhimento inicial;
* Avaliação das necessidades;
* Atendimentos individuais;
* Grupos terapêuticos e oficinas;
* Atendimento médico e acompanhamento medicamentoso, conforme oferta local;
* Orientação e apoio aos familiares;
* Visitas domiciliares e articulação territorial, quando disponíveis;
* Projeto Terapêutico Singular;
* Critérios de continuidade do acompanhamento;
* Capacidade, demanda, espera e disponibilidade de profissionais, quando documentadas.

Diferenciar atendimento pontual, acolhimento, acompanhamento continuado e vagas em atividades específicas.

CAPS AD — Centro de Atenção Psicossocial Álcool e outras Drogas

Explicar que acolhe pessoas que precisam de cuidado relacionado ao uso prejudicial de álcool e outras drogas, com abordagem de saúde, direitos humanos e redução de danos.

Apresentar:

* Quem pode procurar o serviço;
* Acolhimento sem estigmatização;
* Como funciona a avaliação inicial;
* Acompanhamento individual e em grupo;
* Atendimento multiprofissional, conforme composição real da equipe;
* Estratégias de redução de danos;
* Apoio familiar;
* Articulação com UBS, assistência social, serviços de urgência e outros pontos da RAPS;
* Projeto Terapêutico Singular;
* Possibilidades de encaminhamento para outros serviços;
* Capacidade diária, demanda, espera e oferta efetiva de atividades.

Não condicionar a orientação pública à exigência genérica de abstinência. Informar os procedimentos locais somente após confirmação oficial.

CAPS III e CAPS AD III

Explicar que essas modalidades possuem funcionamento contínuo, incluindo noites, fins de semana e feriados, conforme sua configuração normativa, e podem oferecer acolhimento noturno nas condições previstas para cada serviço.

Não apresentar essas modalidades como existentes em Itajaí sem confirmação cadastral e operacional. Se não houver unidade confirmada, explicar a diferença e identificar, após validação oficial, qual serviço da rede atende às necessidades fora do horário habitual.

### [ ] 3. Como acessar o atendimento


Criar uma seção visual intitulada “Preciso de ajuda. Por onde começo?”.

Explicar, em linguagem cidadã, que os CAPS são serviços públicos do SUS e que o primeiro acolhimento pode ser procurado diretamente, sem exigir previamente encaminhamento médico, conforme as orientações gerais do Ministério da Saúde.

Apresentar o fluxo:

### [ ] 1. A pessoa identifica a necessidade de cuidado;



### [ ] 2. Procura o CAPS adequado ou a UBS de referência;



### [ ] 3. A equipe realiza acolhimento inicial e avalia as necessidades;



### [ ] 4. São discutidas as possibilidades de cuidado e os encaminhamentos pertinentes;



### [ ] 5. Quando indicado, é construído um Projeto Terapêutico Singular;



### [ ] 6. O acompanhamento é organizado de acordo com as necessidades, os recursos disponíveis e o plano de cuidado.


Esclarecer que a procura direta não garante automaticamente vaga em toda atividade ou modalidade de acompanhamento, mas deve permitir a avaliação e a orientação sobre o cuidado apropriado.

Incluir informações sobre documentos normalmente úteis, como identificação e Cartão Nacional de Saúde, sem apresentar a falta de documentos como impedimento absoluto para buscar ajuda em uma situação urgente.

Diferenciar:

* Primeiro acolhimento;
* Atendimento agendado;
* Acompanhamento continuado;
* Atendimento de crise;
* Atendimento de urgência e emergência.

Em situações de risco imediato, orientar a busca por serviço de urgência e emergência. Exibir o SAMU 192 e os endereços e contatos de unidades de urgência somente após validação das informações locais.

### [ ] 4. Mapa interativo dos serviços


Criar um mapa navegável de Itajaí com pontos individualizados para:

* CAPSi;
* CAPS II;
* CAPS III, caso existente;
* CAPS AD;
* CAPS AD III, caso existente;
* UBS com atendimento psicológico;
* Unidades de Pronto Atendimento;
* Serviços hospitalares e leitos de saúde mental;
* Serviços de atendimento psiquiátrico;
* Consultório na Rua;
* Centro Integrado de Saúde e outros centros especializados pertinentes;
* Unidades de Acolhimento e outros dispositivos da RAPS, quando existentes e confirmados.

Cada marcador deverá abrir uma ficha com:

* Nome oficial;
* Modalidade do serviço;
* Endereço;
* Bairro;
* Telefone e contato institucional;
* Horário de funcionamento;
* Público atendido;
* Como acessar;
* Serviços oferecidos;
* Necessidade ou não de encaminhamento, conforme regra confirmada;
* Quantidade de profissionais por categoria;
* Capacidade de atendimento;
* Data da última verificação;
* Fonte oficial;
* Link para documentos relacionados.

Incluir filtros por modalidade, bairro, horário, atendimento infantil, atendimento relacionado ao uso de substâncias e tipo de serviço.

Adicionar botão para abrir a rota em um aplicativo de mapas, usando o endereço confirmado da unidade.

Não divulgar como disponível um serviço cuja existência, localização ou funcionamento não tenham sido verificados.

### [ ] 5. Capacidade diária e vagas: painel obrigatório de transparência


Criar um painel específico para cada unidade, com o título “Capacidade, demanda e acesso”.

Não utilizar uma única métrica chamada “vagas diárias” para representar situações diferentes. Registrar e apresentar separadamente:

Capacidade instalada

* Número de salas e espaços de atendimento;
* Quantidade de profissionais por categoria;
* Carga horária profissional disponível;
* Capacidade planejada por modalidade de atividade;
* Capacidade de acolhimento, quando aplicável.

Produção assistencial

* Quantidade de acolhimentos iniciais por mês;
* Quantidade de atendimentos individuais;
* Quantidade de atendimentos em grupo;
* Quantidade de atendimentos familiares;
* Quantidade de visitas domiciliares;
* Quantidade de usuários acompanhados;
* Quantidade de usuários novos;
* Quantidade de atendimentos por dia, quando apurada.

Demanda e acesso

* Pessoas aguardando primeiro acolhimento, se houver fila formal;
* Pessoas aguardando consulta ou atividade específica;
* Tempo mediano e, se disponível, percentil 90 do tempo de espera;
* Demanda recebida;
* Demanda atendida;
* Faltas e cancelamentos, quando registrados;
* Demanda encaminhada para outros serviços;
* Motivos de não inserção no acompanhamento, em categorias agregadas e não identificáveis.

Acompanhamento continuado

* Número de usuários ativos;
* Frequência média de acompanhamento, quando calculável;
* Modalidades terapêuticas oferecidas;
* Taxa de ocupação, somente quando houver denominador válido e capacidade definida;
* Critérios de inclusão e continuidade.

Todos os indicadores devem permitir filtro por mês, trimestre, ano e unidade.

Explicar que o número de atendimentos não equivale necessariamente ao número de pessoas únicas atendidas. Uma mesma pessoa pode ter diversos atendimentos durante o período.

Diferenciar vagas programadas, vagas efetivamente ofertadas, atendimentos realizados e pessoas em acompanhamento.

Quando os dados não forem disponibilizados, exibir “Informação solicitada”, “Não disponibilizada” ou “Metodologia ainda não confirmada”. Nunca estimar uma quantidade de vagas a partir apenas do número de profissionais ou de salas.

### [ ] 6. Registro de informações pendentes


Criar um módulo interno para que a comissão solicite formalmente à Secretaria Municipal de Saúde os dados necessários para preencher o painel.

Incluir solicitações sobre:

* Capacidade planejada e realizada de cada CAPS;
* Quantidade de profissionais e carga horária;
* Demanda mensal;
* Usuários ativos e novos;
* Tempo de espera;
* Critérios de acesso;
* Horários efetivamente praticados;
* Atividades e grupos disponíveis;
* Existência de fila e critérios de priorização;
* Fluxos de encaminhamento;
* Atendimento de crises;
* Articulação com UPAs e hospitais;
* Existência de acolhimento noturno;
* Indicadores de qualidade e continuidade do cuidado.

Cada pedido deve ter protocolo, destinatário, data de envio, prazo aplicável, resposta, documentos, status e histórico de acompanhamento.

As informações públicas devem ser apresentadas de forma agregada, protegendo a privacidade dos usuários.

### [ ] 7. Fontes e atualização


Priorizar:

* Ministério da Saúde;
* CNES;
* Secretaria Municipal de Saúde de Itajaí;
* Portal oficial do Município;
* Relatórios de gestão e produção do SUS;
* Documentos públicos obtidos pela comissão;
* Respostas oficiais às solicitações.

Exibir a fonte e a data de atualização de cada informação. Permitir correção documentada quando houver divergência entre cadastros públicos e a situação operacional confirmada.

### [ ] 8. Resultado esperado


A pessoa que acessar essa seção deve conseguir responder:

* Qual CAPS atende à minha necessidade?
* Quem pode procurar esse serviço?
* Preciso de encaminhamento?
* Onde fica a unidade?
* Qual é o horário e como entrar em contato?
* O que acontece no primeiro acolhimento?
* Quais serviços são efetivamente oferecidos?
* Qual é a capacidade documentada?
* Há fila ou tempo de espera conhecido?
* Quando os dados foram atualizados?
* Quais informações ainda não foram divulgadas?

O módulo deve ser integrado ao mapa da RAPS, à timeline institucional, ao sistema de solicitações e ao dashboard de fiscalização, para que as informações sobre acesso e capacidade também possam fundamentar o monitoramento público.

## Verificação final

- [x] Avaliação somente leitura das conexões interface/API, permissões e persistência; falhas concretas corrigidas e verificadas nos caminhos afetados.
- [ ] Publicação permanente confirmada.


## Aditivo de requisitos solicitado em 19/10/2026 — Centro de dados municipais

### [x] 1. Centro de dados sobre a cidade, saúde e saúde mental

“Busque dados no portal da transparência do município de Itajaí, dados do IBGE sobre o município; vamos tornar esse portal um centro de dados sobre a saúde mental e saúde da cidade.” Incluir uma página pública que reúna fontes municipais e do IBGE, com o indicador, conceito, unidade, período/ano, data de consulta/atualização, instituição, URL da fonte, método de leitura/cálculo e limitações. Diferenciar contexto demográfico/territorial, indicadores gerais de saúde, saúde mental, plano/meta, previsão e execução. Dados gerais da saúde ou do Fundo Municipal de Saúde não devem ser classificados como gastos de saúde mental sem classificação documental explícita. Não inferir atendimento local a partir de dados gerais do IBGE nem tratar falta de publicação como valor zero. Dados atualizados manualmente devem indicar a data da extração; não alegar atualização automática sem integração verificada. Não publicar identificadores pessoais que possam surgir em exportações da API municipal.

### [ ] 2. Metas e previsões da Programação Anual de Saúde 2026

“inclua esses dados no site de alguma forma: as metas e previsão”. Incorporar objetivos, metas, indicadores e previsões da PAS 2026 a partir de documento oficial íntegro, com página/trecho, unidade, meta/plano anual, período e órgão responsável. Separar valor/resultado previsto do realizado e exibir fonte, atualização e evidências. Não inventar nem inferir números. O anexo `ProgramaçãoAnualdeSaúde-2026-FINAL.pdf` recebido na sessão tinha 0 bytes e não pôde ser lido; localizar cópia oficial válida ou solicitar reenvio antes de publicar as metas.
