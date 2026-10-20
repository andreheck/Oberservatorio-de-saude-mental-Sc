# Relatório de implementação e verificação — MVP

O portal foi implementado como aplicação React/TypeScript com Express/tRPC, esquema Drizzle e MySQL gerido persistente. A primeira versão oferece navegação pelos módulos públicos, mapa Leaflet, guia CAPS com orientação nacional documentada, pesquisa, filtros básicos, fichas públicas, histórico de solicitações, painel autenticado, revisão editorial, permissões e documentos privados.

Não foram cadastrados dados municipais fictícios. Os indicadores locais e a composição CISM permanecem em levantamento. Fontes municipais históricas de 2018/2020 não foram utilizadas como confirmação de operação atual. Os módulos de capacidade/demanda/espera possuem estados de ausência de informação; seus filtros ficam explicitamente indisponíveis sem base validada.

## Verificações efetuadas

A verificação TypeScript foi executada com `pnpm check` e passou. A execução final de `pnpm test` passou em quatro arquivos, com 19 testes. A compilação `pnpm build` também passou. O conjunto Vitest cobre sessões de projeto, logout, filtros públicos, estados de publicação, separação editor/revisor, fonte e URL HTTP(S), data de verificação, evidência de ação concluída, validação de endereço, bloqueio de alteração/evento em registro publicado, acesso a documentos privados, assinaturas de arquivo e cálculo de prazos em dias civis UTC. Casos adicionais cobrem filtro financeiro por ano, não soma de etapas diferentes, bloqueio de agregado duplicado/sem identificador, precisão em centavos, exportação de valor/etapa/ano/esfera/identificador e descrição obrigatória.

A compilação de produção foi executada com `pnpm build`. O servidor de desenvolvimento responde à rota de saúde e ao manifesto JSON com 19 padrões de páginas. A API pública de configuração retorna identidade padrão; a listagem pública retorna acervo vazio, como esperado para portal sem cadastros validados. A gestão anônima retorna HTTP 401. Páginas inexistentes retornam HTTP 404, e páginas públicas incluem conteúdo semântico e metadados iniciais sem depender apenas da execução de JavaScript.

A migração aditiva `0001_portal` foi aplicada na base real gerida; a consulta de estrutura confirmou as tabelas de registros, eventos, auditoria, documentos, configurações e permissões. O journal tem duas migrações. Não foram efetuados testes destrutivos nem criados usuários fictícios ou sessões simuladas para contornar autenticação.

Uma revisão somente leitura verificou conexões interface → API → banco. Os pontos encontrados foram corrigidos: autoria pessoal OAuth deixou de entrar no histórico público, CSV passou a incluir campos financeiros, lançamentos sem ano foram excluídos do exercício selecionado, descrição passou a ser obrigatória no servidor e assinatura editável passou a aparecer publicamente. Auditoria interna mantém identidade do usuário responsável; o histórico público utiliza atribuição institucional genérica.

## Limites da verificação

Não houve ensaio completo do login externo e de cadastros com uma conta autenticada do usuário, nem teste manual integral por navegador em vários dispositivos. A validação de permissões inclui inspeção de código, testes isolados e rejeição HTTP do acesso anônimo. A persistência foi confirmada por migração/estrutura e respostas da base, sem inserir registros fictícios no acervo real. A verificação não equivale a teste de invasão, certificação WCAG 2.2 AA, auditoria jurídica LGPD, validação clínica ou homologação institucional.

## Funcionalidades parcialmente implementadas e pendentes

Os cadastros especializados têm campos essenciais e dados estruturados; a normalização completa e todos os campos dos anexos permanecem em backlog. Existem filtros básicos, não todos os filtros avançados requeridos. O orçamento tem etapas separadas e exportação financeira, mas gráficos históricos/composição e bases comparáveis ainda dependem de evolução. A soma por etapa exige lançamentos com identificadores únicos e não representa automaticamente o gasto municipal integral. Duplicação entre fontes com identificadores diferentes requer conciliação e validação externa.

O mapa não possui limites oficiais de bairros; nenhum serviço, horário, contato, equipe ou capacidade atual de Itajaí foi inventado. A biblioteca utiliza originais privados na base, publicação explícita e downloads autorizados; versionamento completo, antivírus, classificação de sigilo e retenção formal continuam pendentes. CSV é suportado; XLSX deve ser convertido para CSV. PDF corresponde a impressão/salvar como PDF no navegador.

Integrações automáticas com CNES, FNS, DATASUS, SIOPS, PNCP e transparências municipais/estaduais/federais não estão ativas. Backups externos automáticos, política de retenção e restauração ensaiada não foram configurados. O guia técnico e administrativo detalha essas limitações e os procedimentos de atualização.

## Acesso e publicação

O portal pode ser utilizado no Preview do projeto. A versão salva por checkpoint e a publicação são operações distintas. O endereço permanente só deve ser informado após confirmação de publicação bem-sucedida. A área administrativa fica na rota `/admin`, com login Manus e permissão atribuída pelo proprietário; não há senha compartilhada nem credencial publicada neste relatório.


## Aditivo — Centro de dados municipal (19/10/2026)

Foi criada a rota pública `/dados-da-cidade`, ligada à navegação lateral, à busca global e ao conteúdo semântico inicial. O catálogo versionado `shared/cityData.ts` reúne indicadores do IBGE com períodos e fontes próprios, incluindo Censo 2022 (264.054 residentes), estimativa separada de 2026 (302.247; referência 01/07/2026), grupos etários do SIDRA 9514 (21 categorias, soma 264.054), exportação CSV e fotografia do painel resumido da Transparência de Itajaí (outubro de 2026). A visualização adapta-se a desktop/telemóvel e descreve indicadores por texto, unidade, período, fonte e limites.

O painel municipal é publicado como leitura literal do cartão oficial, visualmente separado dos totais liquidados. A etapa, a composição e o denominador do indicador 21,26% não foram confirmados; a página declara que o percentual não deve ser interpretado como fração das despesas liquidadas nem como gasto específico de saúde mental. Não há importação automática nem escrita nova na base gerida; os dados são versionados em código e a atualização exige revalidar a fonte e atualizar a data. Os endpoints de execução bruta podem trazer dados de favorecidos e não são replicados na página.

As metas e previsões da PAS 2026 continuam pendentes: o arquivo recebido tinha 0 bytes, portanto não foram inseridas metas, previsões ou realizações estimadas. A página comunica o estado “Em levantamento documental”.

Verificações deste aditivo: `pnpm check` passou; `pnpm test` passou (22 testes em cinco ficheiros); `pnpm build` passou; `/api/health` respondeu `{"status":"ok"}`; o manifesto contém 20 rotas incluindo `/dados-da-cidade`; a rota respondeu HTTP 200 com conteúdo semântico de IBGE. A consulta direta SIDRA das 21 faixas etárias coincidiu com os 21 valores locais e somou 264.054; a tabela SIDRA 6579 devolveu 302.247 para a estimativa 2026. Foram observadas capturas desktop e móvel do gráfico e cartões; nenhum cadastro foi criado na base partilhada.
