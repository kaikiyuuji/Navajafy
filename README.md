# Navajafy

Navajafy é uma plataforma web completa projetada para conectar usuários a barbearias, permitindo que eles naveguem pelos serviços e agendem horários de forma transparente.

## 🚀 Aplicação Live

Você pode visualizar a aplicação em produção no seguinte link:
[https://navajafy-barbearias.vercel.app/](https://navajafy-barbearias.vercel.app/)

## ✨ Funcionalidades

-   **Autenticação de Usuário**: Sistema seguro de login e registro usando NextAuth.js com o provedor do Google.
-   **Navegar por Barbearias**: Visualize uma lista de barbearias cadastradas.
-   **Ver Detalhes da Barbearia**: Veja informações detalhadas sobre uma barbearia específica, incluindo endereço, serviços e descrição.
-   **Listagem de Serviços**: Cada barbearia pode listar os serviços que oferece com detalhes como nome, descrição e preço.
-   **Agendamento de Horários**: Usuários autenticados podem agendar um serviço disponível para uma data e hora específicas.
-   **Visualizar Agendamentos**: Os usuários podem visualizar seus agendamentos futuros e passados.

## 🛠️ Tecnologias Utilizadas

Este projeto é construído com uma stack de tecnologia moderna:

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
-   **Autenticação**: [NextAuth.js](https://next-auth.js.org/)
-   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes de UI**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Gerenciamento de Formulários**: [React Hook Form](https://react-hook-form.com/)
-   **Validação de Esquema**: [Zod](https://zod.dev/)
-   **Ícones**: [Lucide React](https://lucide.dev/)

## 🗃️ Esquema do Banco de Dados

Os dados da aplicação são estruturados em torno dos seguintes modelos principais:

-   `User`: Armazena informações do usuário, incluindo nome, e-mail e detalhes de autenticação.
-   `Barbershop`: Contém todas as informações relacionadas a uma barbearia, como nome, endereço e detalhes de contato.
-   `BarbershopService`: Representa um serviço oferecido por uma barbearia, incluindo nome, preço e descrição.
-   `Booking`: Representa um agendamento feito por um usuário para um serviço específico, ligando usuários e serviços.

Modelos padrão do NextAuth.js (`Account`, `Session`, `VerificationToken`) também são usados para gerenciar o estado de autenticação.

## 🚀 Começando

Para obter uma cópia local e executá-la, siga estes passos simples.

### Pré-requisitos

-   Node.js (v20 ou posterior)
-   npm ou yarn
-   Uma instância do PostgreSQL em execução

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/kaikiyuuji/Navajafy.git
    cd Navajafy
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis.
    ```env
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/BANCO_DE_DADOS"

    # Provedor do Google para NextAuth.js
    GOOGLE_CLIENT_ID="seu_id_de_cliente_google"
    GOOGLE_CLIENT_SECRET="seu_segredo_de_cliente_google"

    # NextAuth.js
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="sua_chave_super_secreta" 
    ```

4.  **Aplique as migrações do banco de dados:**
    ```sh
    npx prisma migrate dev
    ```

5.  **Popule o banco de dados (opcional):**
    Para popular o banco de dados com dados iniciais:
    ```sh
    npx prisma db seed
    ```

6.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
