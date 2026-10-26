# Observatório de Saúde Mental (Sul do Brasil)

> A marca tem identidade regional; o recorte de dados implementado nesta versão é municipal, de Itajaí/SC.

Para retomar o desenvolvimento em outra IA, comece por [`docs/CONTINUIDADE_PARA_IA.md`](docs/CONTINUIDADE_PARA_IA.md). Em seguida, consulte `plan.md`, `TODO.md`, [`docs/guia-portal.md`](docs/guia-portal.md), o relatório de implementação e os documentos de fontes indicados no guia. Preserve os requisitos integrais do `TODO.md` e as limitações de procedência dos dados.

## Stack

Aplicação React 19, TypeScript, Vite, Tailwind, Express, tRPC e Drizzle ORM sobre MySQL gerido pelo Manus.

## Comandos

- `pnpm dev`: inicia o servidor de desenvolvimento; respeita `PORT` (padrão 3000).
- `pnpm build` / `pnpm start`: compila e inicia `dist/index.js` e `dist/public/`.
- `pnpm db:migrate`: aplica as migrações registradas no repositório.
- `pnpm check` / `pnpm test`: executam a checagem TypeScript e os testes da aplicação.

A base de desenvolvimento e produção é compartilhada. Não faça testes destrutivos ou cadastros fictícios nela. Alterações de schema devem ter migração revisada e aditiva. Leia a skill Webdev do Manus e os guias específicos de autenticação, banco, mapas, publicação e Git antes de alterar essas áreas.

## Segurança e configuração

A configuração da plataforma é gerida por `webdev.config`. `server/_core/publicConfig.ts` expõe apenas valores públicos nomeados; credenciais privadas devem permanecer no servidor e no mecanismo de configuração protegido. `/manus-storage/` é servido pela plataforma, sem criar um segundo proxy no aplicativo.
