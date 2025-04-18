# Câmara Frontend

## Como instalar e iniciar

Requisitos:

- Node v22.13.1 ou maior

Instalação:

- Rode o comando `npm i` na raíz do projeto. Esse comando só é necessário na primeira vez ou em casos de atualização dos módulos
- Rode o comando `npm run dev` na raíz do projeto pra abrir o servidor de desenvolvimento.

## Como atualizar e manter o código

Esse projeto dispõe da arquitetura baseada em features, então é de extrema importância manter os padrões para fins de agilidade na manutenção e organização do projeto.

Abaixo temos a estrutura comentada bem como seu exemplo de utilização:

- src
  - Main.tsx // Arquivo inicial que é importando no index.html e que chama o componente de rotas
  - Routes.tsx // Componente contendo todas as rotas do projeto, aqui é importado as pastas de /pages
  - pages // Contém todas as páginas do projeto e deve seguir padrão de exemplo abaixo
    - home
      - index.tsx
  - features // Contém todas as features do projeto e deve seguir o padrão de exemplo abaixo
    - auth // Feature de autenticação(apenas de exemplo nessa doc)
      - components
        - LoginForm.tsx
      - hooks // Reutilização de lógica de estado
        - useLoginForm.ts
      - services // Integrações com o backend
        - index.ts
      - model // Tipagens
        - index.ts
  - common // Tudo que é compartilhado no projeto
    - components
      - Button.tsx
      - Modal.tsx
    - hooks
      - useFetch.ts
    - utils
    - formDate.ts

### Componentes e estilos

[https://ui.shadcn.com/](Shadcn) é a biblioteca de componentes usada no projeto, e que pode ser customizada usando o [Tailwind](https://tailwindcss.com/) caso necessário.

### Adição de novas libs

Ao se deparar com um problema que pode ser resolvido instalando uma lib, consulte primeiro os outros devs do projeto para ter certeza de que uma lib similar ainda não existe no projeto ou se o ideal é desenvolver uma solução própria para o problema.

## Como subir o código

1. O primeiro passo ao iniciar uma tarefa é criar sua branch, então garanta que o nome da branch siga o seguinte padrão: `{type}/{card_id}`.

- `{type}` pode ser: `feat`, `fix` ou `hotfix`
- `{card_id}` é o ID do card da tarefa que esta sendo trabalhada

Então digamos que o ID do card da tarefa é 12345 e é uma correção de bug, nesse caso o nome da branch vai ser `fix/12345`.
Garanta também que a branch foi criada a partir da branch de origem correta, na maioria dos casos ela será criada a partir da `dev`

2. Para criar um novo commit, certifique-se de que ele segue o padrão dos [commits convencionais](https://www.conventionalcommits.org/en/v1.0.0/) e que a mensagem do commit esteja em inglês.

3. Abra um PR e mande para a revisão.

## Links

- [Board de tarefas](https://trello.com/b/9rqnzDx4/board-dev-camara)
- [Repositório frontend](https://github.com/Willianglb/camara-frontend)
- [Repositório backend](https://github.com/Willianglb/camara-backend)
