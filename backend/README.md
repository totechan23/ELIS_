# ELIS Backend (Production-Ready API)

A modular Node.js + Express + MongoDB backend for **ELIS (Explain Like I'm Stupid)**.

## Features

- JWT authentication (`/api/auth/signup`, `/api/auth/login`)
- Protected chat endpoint (`/api/chat`)
- Optional streaming endpoint (`/api/chat/stream`, SSE)
- Per-user conversation history (`/api/chat/history`)
- OpenAI service abstraction (`services/aiService.js`)
- Global error handling + 404 handling
- Security and reliability middleware:
  - `helmet`
  - `cors`
  - rate limiting (`express-rate-limit`)
  - request logging (`morgan`)

## Folder Structure

```text
backend/
  app.js
  server.js
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
```

## 1) Install

```bash
cd backend
npm install
```

## 2) Environment Setup

Create a `.env` file from template:

```bash
cp .env.example .env
```

Set real values:

- `MONGO_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`

## 3) Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server default: `http://localhost:5000`

## API Overview

### Health
- `GET /api/health`

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Chat (Protected)
- `POST /api/chat`
- `POST /api/chat/stream` (SSE)
- `GET /api/chat/history?limit=50`

### Example: `POST /api/chat`

Headers:

```text
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Body:

```json
{
  "message": "What is recursion?"
}
```

The AI is instructed with:

> Explain in very simple terms like teaching a beginner. Use examples.

## Notes for Production

- Use a managed MongoDB cluster and rotate credentials.
- Keep JWT secrets and API keys in secure secret managers.
- Restrict `CLIENT_ORIGIN` to trusted domains.
- Put the app behind a reverse proxy (NGINX/Cloudflare) and enforce HTTPS.
