# Guia de Instalação - VOID

## Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta no Supabase

## 1. Configurar Banco de Dados (Supabase)

1. Vá para [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute os comandos SQL em `SQL-SETUP.md` no editor SQL do Supabase
4. Copie sua `SUPABASE_URL` e `SUPABASE_KEY` (anon key)

## 2. Configurar Backend

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas credenciais Supabase
# SUPABASE_URL=sua_url
# SUPABASE_KEY=sua_chave
# JWT_SECRET=gere_uma_string_aleatoria
```

## 3. Configurar Frontend

```bash
# Entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env
# VITE_API_URL=http://localhost:3000/api
# VITE_SUPABASE_URL=sua_url
# VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

## 4. Executar Localmente

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Servidor rodando em http://localhost:3000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# App rodando em http://localhost:5173
```

## 5. Testar

1. Vá para http://localhost:5173
2. Crie uma conta
3. Adicione seus links
4. Acesse seu perfil público em http://localhost:5173/seu_usuario

## Deploy

### Backend (Vercel, Railway, Render)

```bash
npm run start
```

### Frontend (Vercel, Netlify, GitHub Pages)

```bash
npm run build
```

Os arquivos estáticos estarão em `dist/`

## Troubleshooting

- **Erro de CORS**: Verifique se FRONTEND_URL está correto no .env do backend
- **Erro de autenticação**: Confirme que SUPABASE_KEY está correta
- **Links não carregam**: Verifique se as tabelas foram criadas no Supabase
