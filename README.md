# 🚀 Accountz

Accountz é uma aplicação full-stack para gerenciamento de contas e senhas, composta por uma interface moderna (frontend) e um backend robusto em NestJS. A aplicação permite registrar usuários, fazer login, gerenciar contas de websites, e gerar senhas seguras. 🔐

## 📜 Sumário

- [✨ Recursos](#-recursos)  
- [🛠 Tecnologias](#-tecnologias)  
- [📥 Instalação](#-instalação)  
  - [⚙ Requisitos](#-requisitos)  
  - [📑 Configuração do Ambiente](#-configuração-do-ambiente)  
- [▶️ Rodando o Projeto](#-rodando-o-projeto)  
  - [🎨 Frontend](#-frontend)  
  - [🖥 Backend](#-backend)  
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)  
- [☁️ Deploy](#-deploy)  

## ✨ Recursos

✅ **Cadastro e Autenticação de Usuários:** Registro, login e gerenciamento de sessão.  
✅ **Gerenciamento de Contas:** Adição, edição e exclusão de contas vinculadas a websites.  
✅ **Geração de Senhas Seguras:** Ferramenta integrada para criação de senhas fortes.  
✅ **Interface Responsiva:** Design moderno com componentes reutilizáveis e integração com Tailwind CSS.  
✅ **Backend Robustecido:** API RESTful construída com NestJS, utilizando Prisma para gerenciamento do banco de dados.  

## 🛠 Tecnologias

### 🎨 **Frontend:**  
- ⚡ React + TypeScript  
- ⚡ Vite  
- 🎨 Tailwind CSS  
- 🧹 ESLint & Prettier para padronização de código  

### 🖥 **Backend:**  
- 🚀 NestJS  
- 🗄 Prisma ORM  
- 🐳 Docker Compose (configuração disponível)  

## 📥 Instalação

### ⚙ Requisitos

- 🟢 Node.js (versão recomendada LTS)  
- 📦 PNPM ou NPM  
- 🗃 Banco de dados (PostgreSQL, MySQL ou SQLite via Prisma)  
- 🐳 Docker (opcional, para rodar a stack via docker-compose)  

### 📑 Configuração do Ambiente

1. Clone o repositório:  
   ```bash
   git clone https://seu-repositorio-url.git
   cd accountz-main
   ```

2. Crie os arquivos de ambiente:  
   - 🖥 **Frontend:** Crie um arquivo `.env` na pasta `client/` conforme o exemplo fornecido.  
   - 🗄 **Backend:** Configure as variáveis de ambiente necessárias para Prisma e NestJS (`.env` na raiz do backend).  

## ▶️ Rodando o Projeto

### 🎨 Frontend

1. Acesse a pasta `client/`:  
   ```bash
   cd client
   ```

2. Instale as dependências:  
   ```bash
   pnpm install
   ```

3. Inicie a aplicação:  
   ```bash
   pnpm run dev
   ```

💡 O frontend estará disponível em [http://localhost:3000](http://localhost:3000) ou conforme definido no Vite.

### 🖥 Backend

1. Acesse a pasta `server/`:  
   ```bash
   cd server
   ```

2. Instale as dependências:  
   ```bash
   pnpm install
   ```

3. Configure o banco de dados e execute as migrações com Prisma:  
   ```bash
   pnpm prisma migrate dev
   ```

4. Inicie o backend:  
   ```bash
   pnpm run start:dev
   ```

🔗 O backend estará disponível em [http://localhost:3001](http://localhost:3001) ou conforme configurado.

## 📂 Estrutura do Projeto

📁 **client/** → Código do frontend com React, Vite e Tailwind CSS  
  - 📦 **src/components/** → Componentes reutilizáveis (`AccountDropdown`, `PasswordGenerator`)  
  - 📦 **src/containers/** → Páginas (`Dashboard`, `Login`, `Register`)  

📁 **server/** → Código do backend com NestJS  
  - 📦 **src/modules/** → Módulos (`accounts`, `users`, `tokens`)  
  - 📦 **prisma/** → Arquivos de configuração e migrações  

## ☁️ Deploy

O projeto contém arquivos de configuração para deploy:  
- **🔧 Vercel:** Arquivo `vercel.json` para fácil integração no frontend e backend.  
- **🐳 Docker:** Utilize o `docker-compose.yaml` para rodar toda a stack com Docker.  

