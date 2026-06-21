# VOID - Bio Link Platform

Um platform de agregação de links similar ao solo.to, construído com React, Node.js e Supabase.

## 🚀 Features

- ✅ Autenticação com email/senha
- ✅ Criar e gerenciar perfil personalizado
- ✅ Adicionar/editar/deletar links
- ✅ Página pública com todos os links
- ✅ Customização de tema
- ✅ Analytics básico
- ✅ Dashboard intuitivo

## 🛠️ Stack Tecnológico

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth

## 📁 Estrutura do Projeto

```
void/
├── backend/          # API Node.js + Express
├── frontend/         # App React + Vite
├── .gitignore
└── README.md
```

## 🚀 Instalação

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure suas credenciais Supabase em .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Configure a URL da API em .env
npm run dev
```

## 📝 Variáveis de Ambiente

Veja `.env.example` em cada pasta para configurar as variáveis necessárias.

## 📄 Licença

MIT
