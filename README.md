# BossaInvest - Frontend

Este repositório contém o código-fonte do frontend da aplicação **BossaInvest**, uma plataforma para gerenciar carteiras de investimentos, criar investimentos e visualizar empresas disponíveis para investimento.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para a construção da interface do usuário.
- **Styled Components**: Para estilização dos componentes com CSS-in-JS.
- **React Router**: Para gerenciar as rotas no frontend.
- **Axios**: Para realizar as requisições HTTP para a API.
- **TypeScript**: Para tipagem estática e desenvolvimento seguro.
- **Lucide React**: Para ícones personalizados.
- **Material UI**: Biblioteca de componentes de interface do usuário.
- **Vite**: Ferramenta de build e desenvolvimento rápido para aplicações web modernas.

## Pré-requisitos

Antes de rodar o projeto, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão >= 14.x)
- **npm** ou **yarn** para gerenciar pacotes

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Gabriel-Medeiros-faria/BossaInvest_front
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd bossaInvent_front
   ```

3. **Instale as dependências:**

   Usando `npm`:

   ```bash
   npm install
   ```

   Ou usando `yarn`:

   ```bash
   yarn
   ```

## Configuração

Certifique-se de que o backend da API esteja configurado e rodando. Para se conectar ao backend, você precisará configurar as variáveis de ambiente.

### Executando o projeto

Para rodar o projeto em modo de desenvolvimento, use o seguinte comando:

```bash
npm run dev
```

Ou com `yarn`:

```bash
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`.

## Estrutura de Pastas

Aqui está uma breve visão geral da estrutura de pastas do projeto:

```
/src
  /assets        # Imagens e recursos estáticos
  /components    # Componentes reutilizáveis
  /pages         # Páginas principais da aplicação
  /utils         # Funções utilitárias e helpers
  /styles        # Estilos globais e temáticos
```

## Funcionalidades

- **Autenticação de Usuário**: Login e logout seguro.
- **Gestão de Carteiras**: Criação, visualização e exclusão de carteiras de investimento.
- **Investimentos**: Visualização de opções de investimentos disponíveis e criação de novos investimentos.
- **Responsividade**: Interface adaptada para dispositivos móveis.

## Testes

O projeto utiliza **Jest** para testes unitários. Para rodar os testes, execute o seguinte comando:

```bash
npm run test
```

Ou com `yarn`:

```bash
yarn test
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

