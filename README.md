# 🚀 Accountz  

Accountz is a full-stack application for managing accounts and passwords, featuring a modern frontend and a robust NestJS backend. It allows user registration, login, account management, and secure password generation. 🔐  

## 📜 Table of Contents  

- [✨ Features](#-features)  
- [🛠 Technologies](#-technologies)  
- [📥 Installation](#-installation)  
  - [⚙ Requirements](#-requirements)  
  - [📑 Environment Setup](#-environment-setup)  
- [▶️ Running the Project](#-running-the-project)  
  - [🎨 Frontend](#-frontend)  
  - [🖥 Backend](#-backend)  
- [📂 Project Structure](#-project-structure)  
- [☁️ Deployment](#-deployment)  
- [🎥 Demo](#-demo)  
- [☁️ Deployment](#-deployment)  

## ✨ Features  

✅ **User Registration & Authentication:** Sign-up, login, and session management.  
✅ **Account Management:** Add, edit, and delete website-linked accounts.  
✅ **Secure Password Generation:** Built-in tool for generating strong passwords.  
✅ **Responsive Interface:** Modern design with reusable components and Tailwind CSS integration.  
✅ **Robust Backend:** RESTful API built with NestJS, using Prisma for database management.  

## 🛠 Technologies  

### 🎨 **Frontend:**  
- ⚡ React + TypeScript  
- ⚡ Vite  
- 🎨 Tailwind CSS  
- 🧹 ESLint & Prettier for code standardization  

### 🖥 **Backend:**  
- 🚀 NestJS  
- 🗄 Prisma ORM  
- 🐳 Docker Compose (available configuration)  

## 📥 Installation  

### ⚙ Requirements  

- 🟢 Node.js (recommended LTS version)  
- 📦 PNPM or NPM  
- 🗃 Database (PostgreSQL, MySQL, or SQLite via Prisma)  
- 🐳 Docker (optional, for running the stack via docker-compose)  

### 📑 Environment Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/Mathesu-veLi/accountz.git
   cd accountz
   ```
2. Create environment files:  
   - 🖥 **Frontend:** Create a `.env` file in the `client/` folder following the provided example.  
   - 🗄 **Backend:** Configure the necessary environment variables for Prisma and NestJS (`.env` in the backend root).  

## ▶️ Running the Project  

### 🎨 Frontend  

1. Navigate to the `client/` folder:  
   ```bash
   cd client
   ```  
2. Install dependencies:  
   ```bash
   pnpm install
   ```  
3. Start the application:  
   ```bash
   pnpm run dev
   ```  
💡 The frontend will be available at [http://localhost:3000](http://localhost:3000) or as defined in Vite.  

### 🖥 Backend  

1. Navigate to the `server/` folder:  
   ```bash
   cd server
   ```  
2. Install dependencies:  
   ```bash
   pnpm install
   ```  
3. Configure the database and apply migrations with Prisma:  
   ```bash
   pnpm prisma migrate dev
   ```  
4. Start the backend:  
   ```bash
   pnpm run start:dev
   ```  
🔗 The backend will be available at [http://localhost:3001](http://localhost:3001) or as configured.  

## 📂 Project Structure  

📁 **client/** → Frontend code with React, Vite, and Tailwind CSS  
  - 📦 **src/components/** → Reusable components (`AccountDropdown`, `PasswordGenerator`)  
  - 📦 **src/containers/** → Pages (`Dashboard`, `Login`, `Register`)  

📁 **server/** → Backend code with NestJS  
  - 📦 **src/modules/** → Modules (`accounts`, `users`, `tokens`)  
  - 📦 **prisma/** → Configuration files and migrations  
  
### 🎥 Demo

[![Watch the demo](https://img.youtube.com/vi/1OpyfoMtNGI/0.jpg)](https://www.youtube.com/watch?v=1OpyfoMtNGI)

## ☁️ Deployment  

The project includes configuration files for deployment:  
- **🔧 Vercel:** `vercel.json` file for easy frontend and backend deployment.  
- **🐳 Docker:** Use `docker-compose.yaml` to run the entire stack with Docker.  
