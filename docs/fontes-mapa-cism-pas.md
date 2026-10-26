# Fontes e decisões — mapa, território, CISM e programação de saúde

Consulta e extração realizadas em 20/10/2026. Este caderno registra o conteúdo das fontes e os limites de uso. Uma coordenada cadastral não comprova, por si só, que a unidade esteja funcionando, acessível ao público ou oferecendo um tipo específico de atendimento.

## Cadastro Nacional de Estabelecimentos de Saúde (CNES)

- Portal de downloads: <https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp>
- Guia oficial CNES/DATASUS sobre extração municipal e campos: <https://wiki.saude.gov.br/cnes/index.php/Portal_CNES>
- Catálogo oficial: <https://dadosabertos.saude.gov.br/dataset/cnes-cadastro-nacional-de-estabelecimentos-de-saude>
- Recurso API CNES: <https://apidadosabertos.saude.gov.br/v1/#/CNES/get_cnes_estabelecimentos>
- Recurso CSV de estabelecimentos: <https://dadosabertos.saude.gov.br/dataset/cnes-cadastro-nacional-de-estabelecimentos-de-saude/resource/78b91d79-bb6d-43ad-bda5-f015e3575a84>
- CSV compactado: <https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/CNES/cnes_estabelecimentos_csv.zip>
- Guia oficial de preenchimento CNES, identificação/localização: <https://wiki.saude.gov.br/cnes/index.php/SCNES_-_Guia_de_Preenchimento>
- A ficha consultada mostrava atualização em 20/10/2026. Foi baixado o arquivo nacional (~56,7 MB comprimido; ~232 MB descompactado) e filtrado localmente. O CNES usa `CO_UF=42` e `CO_IBGE=420820` para Itajaí; o código municipal IBGE de sete dígitos é 4208203. O arquivo contém campos para CNES, nome, tipo, endereço, bairro, telefone, latitude e longitude.
- A extração encontrou 1.784 registros CNES de todos os tipos no código municipal, 1.738 com coordenadas preenchidas. Isso **não** é uma contagem de serviços públicos: inclui ampla variedade de estabelecimentos/consultórios e cadastros com diferentes estados; 55 coordenadas preenchidas ficaram fora de uma janela geográfica aproximada de controle. Não publicar essa contagem como número de serviços nem usar todas as linhas como unidades abertas.
- Entre os tipos de interesse, o arquivo continha 44 registros tipo 2, 3 tipo 70, 3 tipo 73 e 2 tipo 5. O tipo 70 corresponde a Centro de Atenção Psicossocial, conforme o guia CNES. Havia motivos de desativação preenchidos em 5 dos 44 tipo 2 e em 1 dos 3 tipo 73. O diretório municipal consultado informa 32 UBS e duas UPAs; portanto a contagem bruta do extrato não deve ser apresentada como total local.

## Diretório e notícias oficiais da Prefeitura de Itajaí

- Diretório “Unidades de Atendimento à População”: <https://itajai.sc.gov.br/a/69>
- Notícia municipal de mudança do CAPSi, incluída em 07/04/2025: <https://itajai.sc.gov.br/noticias/33646/capsi-tem-novo-endereco-a-partir-desta-quarta-feira-09>
- Notícia municipal de mudança do CAPS AD, incluída em 05/03/2024: <https://saude.itajai.sc.gov.br/noticia/31774/caps-ad-estara-fechado-nesta-quinta-07-sexta-08-e-segunda-feira-11-para-mudanca>
- Notícia municipal de 18/05/2026 sobre a rede psicossocial: <https://itajai.sc.gov.br/noticias/36589/semana-da-luta-antimanicomial-mobiliza-rede-de-saude-mental-de-itajai>
- Mapas municipais: <https://servicos.itajai.sc.gov.br/servico/126-mapas.html>
- O diretório municipal lista 32 UBS, duas UPAs e três CAPS; nas fichas consultadas, oferece endereço, telefone e horário, sem data de atualização visível. É fonte oficial para cruzamento, mas o estado operacional/horários de cada ponto ainda requer validação.
- CAPSi: o diretório não datado ainda informa Rua Alfredo Trompowsky, 405. A notícia de 07/04/2025 relata mudança a partir de 09/04/2025 para Rua Umbelino Damásio de Brito, 192, Centro, e atendimento 7h–18h de segunda a sexta. O CNES baixado em 20/10/2026 continua indicando Rua Alfredo Trompowski, 405. Três fontes oficiais não concordam sobre o endereço atual: não encaminhar visitante para a coordenada antiga sem confirmação recente.
- CAPS II: o CNES informa Rua Alfredo Trompowsky, 485, Centro, coordenadas -26.907550, -48.666170. O diretório municipal informa Rua Alfredo Trompowski, 485, Vila Operária. Rua e número coincidem, bairro diverge. Se exibido, rotular como “coordenada CNES; bairro divergente entre fontes” e informar que a distância é até o ponto cadastral, não uma confirmação operacional.
- CAPS AD: o CNES informa Rua Alberto Werner, 645. O diretório municipal consultado informa Rua Silva, 628; notícia municipal de 05/03/2024 confirma a mudança para Rua Silva, 628. Não mostrar rota/distância como localização atual até resolver a divergência.
- A notícia municipal de 18/05/2026 confirma três CAPS (CAPSi, CAPS II, CAPS AD) na rede e informa que um CAPS AD III no bairro São Vicente está em construção com recursos do PAC Federal. Tratar como obra/ação planejada ou em implementação; não criar ponto de serviço ativo até haver fonte de inauguração e funcionamento.
- A página de mapas municipal aponta para Mapa de Itajaí, Macrozoneamento e GeoItajaí; confirmar formato e condições de uso antes de incorporar polígonos.

## Limites territoriais IBGE

- Malhas censitárias e divisões intramunicipais: <https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/26565-malhas-de-setores-censitarios-divisoes-intramunicipais.html>
- A edição 2022 oferece bairros e setores em Shapefile/GeoPackage e tem referência político-administrativa em 31/07/2022. Bairros censitários podem não coincidir com denominações operacionais atuais; qualquer camada territorial deverá exibir a edição e essa ressalva.

## PAS e horizonte de acompanhamento

- O primeiro anexo `ProgramaçãoAnualdeSaúde-2026-FINAL.pdf` recebido tinha 0 bytes e continua inutilizável. Em 21/10/2026, o usuário enviou `Itajai_PAS_2026_Dados_e_Metas_Organizados.docx`, um documento estruturado de 133 páginas. Ele declara ter sido organizado em 20/10/2026 a partir da PAS 2026 de Itajaí no DigiSUS Gestor, identificada como o PDF “Programação Anual de Saúde - 2026 edit.pdf”, de 49 páginas, e contém referências de página para as fichas. O DOCX não contém hiperlink para o PDF original.
- O DigiSUS Gestor continua sendo a fonte primária indicada. O painel público de planos para Santa Catarina ([10]) pode ser consultado, mas a tabela acessível não expõe, por si só, o texto completo de cada meta. Portanto, os dados carregados no site devem ser identificados como transcrição do DOCX organizado enviado pelo usuário, com a fonte primária indicada e a página do PDF citada; não afirmar que houve conferência independente do PDF original.
- A busca também retornou um PDF hospedado por Rio dos Cedros (`https://riodoscedros.sc.gov.br/uploads/sites/444/2026/07/pas_2026_20260508113647.pdf`). A capa identifica “Município: Rio dos Cedros - SC” e o documento tem 28 páginas; foi descartado e não serve de fonte para Itajaí.
- O documento organizado informa que o plano cobre 2026–2029, que o objetivo 1.3 tem 41 metas (36 programadas para 2026) e que os resultados de execução de 2026 não estão incluídos. O recorte solicitado contém 18 fichas: 16 do objetivo 1.3 e duas do objetivo 2.1. As referências do PDF registradas são: 1.3.21 p. 12; 2.1.16 e 2.1.17 p. 18; 1.3.32, 1.3.33 e 1.3.38 p. 13; 1.3.41 p. 14; 1.3.23, 1.3.17, 1.3.16, 1.3.28, 1.3.29 e 1.3.25 p. 12; 1.3.1, 1.3.6 e 1.3.9 p. 11; 1.3.34 p. 13; 1.3.40 pp. 13–14.
- A visualização deve comparar apenas marcos planejados: linha de base 2025, meta 2026 e meta do plano 2026–2029. Não criar valores anuais para 2027 ou 2028, nem preencher a execução observada. Registrar o realizado como “Não informado nesta fonte” até haver relatório de execução com período, unidade, origem e evidência próprios. As notícias municipais anteriores continuam sendo contexto de ações, não substitutos das metas nem dos resultados.

## Geolocalização e privacidade

- Obter a posição do dispositivo somente após ação explícita e permissão do navegador. Manter as coordenadas apenas em memória no cliente; calcular distância em linha reta localmente e rotulá-la como aproximação, distinta de rota viária. Oferecer busca/lista sem GPS. Abrir rota externa só após ação expressa e aviso de que o fornecedor de mapas poderá receber a posição/endereço. Nunca guardar a posição do visitante em banco, logs ou histórico.
- Mapas de calor de saúde mental usarão somente dados institucionais públicos/autorizados e agregados. Exigir fonte, período, unidade geográfica, denominador, fórmula e método compatíveis. Não plotar diagnóstico, prontuário, caso individual ou endereço de pessoa. Sem base territorial validada, mostrar “Dados territoriais ainda não disponibilizados”.

## Acesso reservado CISM

- Usar a autenticação Manus já existente e papel `cism_member` atribuído manualmente após confirmação administrativa. Separar documentos explicitamente restritos da biblioteca pública. Verificar permissão no servidor para páginas, listagens, metadados e download. Não inventar composição, membros, atas ou pautas.

## Referências

[1]: https://dadosabertos.saude.gov.br/dataset/cnes-cadastro-nacional-de-estabelecimentos-de-saude "Catálogo oficial de dados abertos CNES"
[2]: https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/CNES/cnes_estabelecimentos_csv.zip "CSV nacional de estabelecimentos CNES"
[3]: https://itajai.sc.gov.br/a/69 "Unidades de Atendimento à População de Itajaí"
[4]: https://itajai.sc.gov.br/noticias/33646/capsi-tem-novo-endereco-a-partir-desta-quarta-feira-09 "Mudança de endereço do CAPSi em 2025"
[5]: https://saude.itajai.sc.gov.br/noticia/31774/caps-ad-estara-fechado-nesta-quinta-07-sexta-08-e-segunda-feira-11-para-mudanca "Mudança de sede do CAPS AD em 2024"
[6]: https://itajai.sc.gov.br/noticias/36589/semana-da-luta-antimanicomial-mobiliza-rede-de-saude-mental-de-itajai "Rede psicossocial e obra do CAPS AD III, notícia de maio de 2026"
[7]: https://wiki.saude.gov.br/cnes/index.php/SCNES_-_Guia_de_Preenchimento "Guia de preenchimento CNES"
[8]: https://ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/26565-malhas-de-setores-censitarios-divisoes-intramunicipais.html "Malhas territoriais e divisões intramunicipais IBGE"


## Conferência do snapshot CNES usado pelo mapa

Na conferência do CSV oficial baixado em 20/10/2026, os 18 códigos apresentados pelo snapshot versionado (17 UBS e um CAPS II) foram encontrados no arquivo; nenhum tinha valor preenchido no campo `CO_MOTIVO_DESAB`. O mapa ainda os descreve como pontos cadastrais e não afirma funcionamento, horário, acessibilidade, capacidade ou oferta atual. A ausência de motivo de desativação nesse campo é apenas uma verificação do registro disponível, não uma confirmação operacional pela Secretaria de Saúde.


## Prestação de contas da PAS 2026 e disponibilidade de metas

- A Prefeitura publicou em 21/09/2026 a notícia [“Saúde de Itajaí presta contas do 2º quadrimestre de 2026”](https://itajai.sc.gov.br/noticias/37647/saude-de-itajai-presta-contas-do-2%C2%BA-quadrimestre-de-2026). Para o acompanhamento geral da PAS 2026 até o segundo quadrimestre (maio–agosto), ela informa 124 metas alcançadas, 94 parcialmente alcançadas e 132 não alcançadas ou ainda em análise. A publicação não lista os objetivos/indicadores correspondentes nem identifica quais metas são de saúde mental; esses totais gerais não devem ser atribuídos ao recorte de saúde mental nem usados para construir o gráfico de metas desse recorte.
- A página pública do DigiSUS para Santa Catarina, consultada em 20/10/2026 ([Planos de saúde](https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc/planos-saude)), mostra a linha de Itajaí com três planos aprovados, mas a tabela municipal não discrimina o ciclo de cada plano nem expõe, nessa linha, o conteúdo da PAS 2026. A informação de situação não substitui o documento íntegro com meta, indicador, unidade, previsão e página de origem.
- A notícia oficial é uma fonte válida apenas para contextualizar a situação geral da PAS e não valida metas específicas de saúde mental. Ela continua separada do DOCX organizado, que contém o recorte planejado e suas páginas citadas.
- Com a entrega de 21/10/2026, `/metas-saude` pode apresentar as 18 metas selecionadas como transcrição organizada fornecida pelo usuário, com fonte primária DigiSUS indicada e referência de página. A página precisa informar que o PDF original não foi conferido diretamente e que a fonte não contém resultados de execução. Os totais gerais de 124/94/132 não devem ser associados às metas de saúde mental.

## Limite territorial dos dados de saúde mental localizados

A notícia municipal de 17/09/2026 sobre saúde mental apresenta totais de atendimentos/procedimentos para o município e alguns serviços; não publica contagens por bairro, setor censitário ou coordenada, nem denominadores territoriais. A base é útil para um gráfico agregado por serviço, com ressalva de que as categorias misturam atendimentos e procedimentos, mas não pode ser distribuída por bairros ou convertida em mapa de calor. O mapa de calor permanece desativado até existir uma base pública/autorizada com unidade geográfica, período, definição, denominador e método compatíveis e revisão de risco de reidentificação.

[9]: https://itajai.sc.gov.br/noticias/37647/saude-de-itajai-presta-contas-do-2%C2%BA-quadrimestre-de-2026 "Prestação de contas do 2º quadrimestre de 2026"
[10]: https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc/planos-saude "DigiSUS Gestor — Planos de saúde de Santa Catarina"
[11]: https://itajai.sc.gov.br/noticias/37613/setembro-amarelo-reune-acoes-de-saude-mental-em-itajai "Setembro Amarelo reúne ações de saúde mental em Itajaí"


## Prioridades complementares recebidas em 24/10/2026

O usuário indicou quatro frentes de acompanhamento e itens de monitoramento: espera pelo primeiro atendimento; continuidade após alta dos CAPS; Projetos Terapêuticos Singulares (PTS); satisfação das pessoas usuárias; implantação do Observatório; boletins; painel de indicadores; andamento do Colaboratório; e o código 4.1.44, “Protocolo municipal de atendimento à violência autoprovocada”, com o escopo informado de incluir automutilação e tentativas de suicídio. Para o 4.1.44, a mensagem menciona “implantar 1 protocolo”. Esta procedência é a mensagem do usuário (não o PDF PAS). Não há página ou documento oficial conferido, linha de base, período, responsável ou alvo de longo prazo; a interface mostra “Não informado · aguardando fonte, definição e período”. Não afirmar que o protocolo foi aprovado, implantado ou verificado na PAS.

A organização preserva as 18 fichas existentes, sem alterar códigos/valores/fontes, em quatro frentes (8 expansão, 3 acesso/continuidade, 7 qualidade/inclusão/prevenção, nenhuma ficha PAS quantitativa na frente de informação pública). As prioridades adicionais não entram na contagem das 18 metas, não têm execução publicada e aguardam validação documental. A marca “Observatório de Saúde Mental (Sul do Brasil)” também não amplia o território dos dados: o recorte vigente permanece Itajaí/SC.


## Busca adicional pela PAS municipal íntegra — 26/10/2026

Foi feita nova busca local e pública pelo PDF de 49 páginas “Programação Anual de Saúde - 2026 edit.pdf”, apontado pelo DOCX organizado. O único arquivo local com nome `ProgramaçãoAnualdeSaúde-2026-FINAL.pdf` continua com **0 bytes**. O DOCX organizado (`Itajai_PAS_2026_Dados_e_Metas_Organizados.docx`) tem zero hyperlinks no arquivo OOXML, portanto não fornece link direto para o PDF-fonte.

A consulta direta ao [painel público DigiSUS Gestor de Santa Catarina](https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc) mostra tabelas agregadas por situação e macrorregião, mas não apresenta ali o documento PAS 2026 individual de Itajaí. A [tabela pública de Planos de Saúde municipais](https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc/planos-saude) lista Itajaí com três instrumentos aprovados, porém a linha municipal não identifica o ciclo/documento de cada instrumento nem expõe link para a PAS citada. O painel disponibiliza uma [extração CSV por UF](https://digisusgmp.saude.gov.br/v1.5/transparencia/extracao/csv?uf=42); nesta sessão, a requisição de download expirou durante o handshake TLS. Isso é uma limitação de acesso observada, não prova de que o arquivo/documento inexista.

Foram abertos e conferidos arquivos homônimos/relacionados para evitar substituição indevida. O PDF diretamente aberto em armazenamento DigiSUS com nome hash contém o **Manual do Usuário do Módulo Planejamento**, não a PAS municipal; portanto não valida nenhuma ficha de Itajaí. A [PAS 2026 da Secretaria de Estado da Saúde de Santa Catarina](https://www.saude.sc.gov.br/index.php/pt/servicos/planejamento-em-saude/programacao-anual-de-saude-pas/programacoes-anuais/programacao-anual-de-saude-2026/download) é explicitamente estadual e ligada ao PES 2024–2027; não pode ser usada como PAS de Itajaí. A [PAS 2026 de Joinville](https://www.joinville.sc.gov.br/wp-content/uploads/2026/05/Programacao-Anual-de-Saude-PAS-2026.pdf) é um documento municipal íntegro de Joinville, não de Itajaí, e também foi descartada. Não usar documentos de Rio dos Cedros, Joinville, do Estado ou manuais para completar a transcrição de Itajaí.

Resultado: **a busca realizada não localizou o PDF primário de Itajaí**. As 18 fichas continuam identificadas corretamente como transcrição do DOCX organizado fornecido pelo usuário, com páginas citadas e DigiSUS indicado como fonte primária, sem confirmação independente do PDF. Próximo passo seguro: solicitar à Secretaria Municipal de Saúde/COMUSA/CISM ou à pessoa usuária o arquivo válido ou o link direto do documento municipal, e só então cotejar códigos, descrições, unidades, linha de base, anualização, metas do plano, ações e páginas. Manter execução como “Não informado nesta fonte”.
