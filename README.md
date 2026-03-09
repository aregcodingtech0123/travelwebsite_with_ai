AeRoute – AI‑Powered Travel Planner
===================================

AeRoute is an AI‑powered conversational travel assistant and destination explorer. It’s built as a Dockerized microservices stack with:

- **Frontend**: Next.js (App Router), Tailwind CSS, NextAuth, full custom i18n for **12 languages**
- **Backend API**: Node.js/Express with Prisma ORM and PostgreSQL
- **AI Service**: FastAPI + Google Gemini (or mock mode) for chat and streaming destination content
- **Database**: PostgreSQL (via Docker)

The app lets users:

- Chat with an AI travel assistant that understands mood, budget, season, and location
- Explore dynamically generated destination pages with streaming AI content and Unsplash imagery
- Search destinations via a navbar autocomplete
- Register/login (email/password + Google OAuth)
- Switch the entire experience into 12 languages, including RTL Arabic

---

Project structure
-----------------

- `frontend/` – Next.js application (App Router)
  - Auth (NextAuth: Google + credentials)
  - AI Chat UI (`/chat`)
  - Destinations index (`/destinations`) and dynamic destination pages (`/destination/[locationName]`)
  - Custom i18n via `LanguageContext` with **12 locales**
  - Tailwind + typography plugin + streaming UI for AI content
- `backend/` – Node.js/Express API
  - Auth routes (register, login, Google OAuth sync)
  - Proxy route to AI service (`/api/ai-travel-chat`)
  - Prisma schema & migrations
- `ai-service/` – FastAPI AI microservice
  - Chat endpoint (`/api/ai-travel-chat`)
  - Streaming destination endpoint (`/api/destination-stream`)
  - Safety guardrails, topic boundaries, JSON‑structured responses
- `docker-compose.yml` – Orchestrates frontend, backend, ai-service, and PostgreSQL

---

Prerequisites
-------------

- **Node.js** ≥ 18
- **Docker** and **Docker Compose**
- A **Google AI Studio / Gemini API key** (for production AI mode)

---

Environment variables
---------------------

### AI service (`ai-service/.env`)

Copy the example file and fill in your own values:

```bash
cp ai-service/.env.example ai-service/.env
```

`ai-service/.env`:

```bash
GOOGLE_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
# When true, returns mock responses and does NOT call Gemini
USE_MOCK=false
```

> For local development without a key, set `USE_MOCK=true` and leave `GOOGLE_API_KEY` empty.

### Backend (`backend`)

Typical variables (you may already have these wired via `docker-compose.yml`):

- `DATABASE_URL` – PostgreSQL connection string (e.g. `postgresql://postgres:postgres@db:5432/ai_planner_db?schema=public`)
- `NEXTAUTH_SECRET` – secret shared with frontend NextAuth

Add a `.env` or pass them via Docker/compose as you already do.

### Frontend (`frontend`)

Important environment variables (usually set via `docker-compose.yml`):

- `NEXTAUTH_URL` – e.g. `http://localhost:3000`
- `NEXTAUTH_SECRET` – must match backend / NextAuth config
- `NEXT_PUBLIC_API_URL` – base URL for the backend (e.g. `http://localhost:8080`)
- `NEXT_PUBLIC_AI_SERVICE_URL` (if used directly)
- `UNSPLASH_ACCESS_KEY` – for dynamic destination imagery

---

Running the stack with Docker
-----------------------------

From the project root:

```bash
docker-compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- AI service: `http://localhost:5000`
- PostgreSQL: `localhost:5432` (internal container `db`)

The frontend will be available at `http://localhost:3000`. Auth, AI chat, and destinations will work end‑to‑end as long as:

- Database migrations have been applied (see below)
- AI service is configured with a valid Gemini key or `USE_MOCK=true`

---

Database migrations
-------------------

Inside the `backend` container (or locally, if you run Prisma outside Docker):

```bash
cd backend
npm install
npx prisma migrate deploy
```

This applies existing Prisma migrations and ensures tables like `User` and any logs exist.

---

Local development (without Docker)
----------------------------------

You can also run each service separately.

### 1. AI service (FastAPI)

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # edit values
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

### 2. Backend (Node/Express + Prisma)

```bash
cd backend
npm install
npx prisma migrate deploy
npm run dev
```

### 3. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` for the app.

---

Internationalization (i18n)
---------------------------

AeRoute ships with **12 fully localized languages**:

- English (`en`)
- Turkish (`tr`)
- German (`de`)
- Spanish (`es`)
- French (`fr`)
- Arabic (`ar`, RTL)
- Chinese (`zh`)
- Russian (`ru`)
- Japanese (`ja`)
- Portuguese (`pt`)
- Korean (`ko`)
- Hindi (`hi`)

Front‑end localization is managed by:

- `app/contexts/LanguageContext.tsx` – central translation dictionary and current language state
- `src/i18n/*` – types and helper hook(s)

To use translations in components:

```tsx
import { useLanguage } from '@/app/contexts/LanguageContext'

const { t, language } = useLanguage()

return <h1>{t('hero.title.line1')}</h1>
```

The AI backend receives the current `language` code and is prompted to respond entirely in that language.

Arabic (`ar`) also sets `dir="rtl"` for appropriate layout direction.

---

Authentication
--------------

The frontend uses **NextAuth** with:

- **CredentialsProvider** – email/password via the backend
- **GoogleProvider** – Google OAuth; upon login, the backend syncs the user profile

Key points:

- `NEXTAUTH_SECRET` must be set in the frontend environment.
- `NEXTAUTH_URL` should match the deployed host (e.g. `https://your-domain.com`).

---

AI chat & destinations
----------------------

- **Chat** – `/chat`
  - Sends conversation history + language to the backend, which proxies to the FastAPI AI service.
  - Enforces guest trial limits for unauthenticated users.

- **Destination pages** – `/destination/[locationName]`
  - Calls the FastAPI streaming endpoint to get markdown, rendered live as the model responds.
  - Fetches Unsplash imagery based on the selected location.
  - Fully localized UI and prompts.

---

Deployment & GitHub readiness
-----------------------------

This repository is structured to be safe to push to GitHub:

- **Secrets are not committed**:
  - `.env` files are kept local. Use `.env.example` templates instead.
  - Ensure your global or local `.gitignore` includes at least:

    ```gitignore
    .env
    .env.*
    ai-service/.env
    backend/.env
    frontend/.env
    node_modules
    .next
    .turbo
    dist
    ```

- **Configuration via environment**:
  - All sensitive values (API keys, DB URLs, NextAuth secrets) are expected from env vars or Docker Compose, not hardcoded.

To publish:

1. Initialize git (if not already):

   ```bash
   git init
   git add .
   git commit -m "Initial AeRoute AI travel planner"
   ```

2. Create a GitHub repo and add it as a remote:

   ```bash
   git remote add origin git@github.com:<your-username>/aeroute.git
   git push -u origin main
   ```

3. Configure production environments (e.g. Render, Railway, Fly.io, Vercel + separate backend/AI service) with the same environment variables described above.

---

License
-------

Add your preferred license here (e.g. MIT) before publishing to GitHub.

# AI Travel Planner

A multi-service AI Travel Planner application with a Next.js frontend, Express backend, and FastAPI AI service.

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ──────> │   Backend   │ ──────> │ AI Service  │
│  (Next.js)  │         │  (Express)  │         │  (FastAPI)  │
│   Port 3000 │         │   Port 5000 │         │   Port 8000 │
└─────────────┘         └─────────────┘         └─────────────┘
```

## Project Structure

```
ai_traveller_planner/
├── frontend/          # Next.js frontend (TypeScript, Tailwind CSS)
│   ├── app/
│   │   ├── page.tsx   # Main page component
│   │   ├── layout.tsx # Root layout
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── backend/           # Express backend (TypeScript)
│   ├── src/
│   │   └── server.ts  # Express server
│   ├── package.json
│   └── tsconfig.json
│
└── ai-service/       # FastAPI AI service (Python)
    ├── main.py       # FastAPI application
    └── requirements.txt
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## Setup Instructions

### 1. AI Service Setup (Python/FastAPI)

```bash
# Navigate to ai-service directory
cd ai-service

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Backend Setup (Node.js/Express)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Frontend Setup (Next.js)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Services

**Important:** Start services in this order: AI Service → Backend → Frontend

### Step 1: Start AI Service (Port 8000)

```bash
# From ai-service directory
cd ai-service

# Activate virtual environment if not already activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Run the service
python main.py

# Or using uvicorn directly:
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Verify:** Open http://localhost:8000/health in your browser. You should see:
```json
{"status": "ok", "service": "ai-service"}
```

### Step 2: Start Backend (Port 5000)

Open a **new terminal**:

```bash
# Navigate to backend directory
cd backend

# Run in development mode
npm run dev

# Or build and run in production mode:
npm run build
npm start
```

You should see:
```
Backend server running on http://localhost:5000
Health check: http://localhost:5000/health
```

**Verify:** Open http://localhost:5000/health in your browser. You should see:
```json
{"status": "ok", "service": "backend"}
```

### Step 3: Start Frontend (Port 3000)

Open a **new terminal**:

```bash
# Navigate to frontend directory
cd frontend

# Run development server
npm run dev
```

You should see:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

**Verify:** Open http://localhost:3000 in your browser. You should see the AI Travel Planner interface.

## API Endpoints

### AI Service (Port 8000)

- `GET /` - Service info
- `GET /health` - Health check
- `POST /api/travel-plan` - Generate travel plan

**Request Body:**
```json
{
  "city": "Paris",
  "language": "en"
}
```

**Response:**
```json
{
  "city": "Paris",
  "duration": 4,
  "language": "en",
  "itinerary": [
    {
      "day": 1,
      "activities": ["Visit Paris Museum", "Explore Paris Old Town"],
      "restaurants": ["Paris Fine Dining Restaurant"],
      "hotels": ["Paris Luxury Hotel"]
    },
    ...
  ],
  "recommendations": {
    "bestTimeToVisit": "Spring or Fall (March-May, September-November)",
    "currency": "USD",
    "timeZone": "UTC+0"
  }
}
```

### Backend (Port 5000)

- `GET /health` - Health check
- `POST /api/travel-plan` - Forward request to AI Service

**Request Body:**
```json
{
  "city": "Paris",
  "language": "en"
}
```

**Response:** Same as AI Service response

## Testing the Flow

1. Open http://localhost:3000 in your browser
2. Enter a city name (e.g., "Paris", "Istanbul", "Tokyo")
3. Click "Plan Trip"
4. The frontend will:
   - Send POST request to Backend (port 5000)
   - Backend forwards to AI Service (port 8000)
   - AI Service returns mock itinerary
   - Backend returns response to Frontend
   - Frontend displays the itinerary

## Supported Languages (Future i18n)

The API structure supports the following languages (currently returns English mock data):
- `en` - English (default)
- `tr` - Turkish
- `de` - German
- `es` - Spanish
- `fr` - French
- `pt` - Portuguese

To use a different language, include the `language` parameter in the request:
```json
{
  "city": "Paris",
  "language": "fr"
}
```

## Troubleshooting

### AI Service not responding
- Ensure Python virtual environment is activated
- Check that port 8000 is not in use: `netstat -ano | findstr :8000` (Windows) or `lsof -i :8000` (macOS/Linux)
- Verify dependencies are installed: `pip list`

### Backend not connecting to AI Service
- Ensure AI Service is running on port 8000
- Check CORS settings if needed
- Verify the AI_SERVICE_URL in backend/src/server.ts

### Frontend not connecting to Backend
- Ensure Backend is running on port 5000
- Check browser console for CORS errors
- Verify BACKEND_URL in frontend/app/page.tsx

### Port already in use
- Change the port in the respective service configuration
- Or stop the process using that port

## Development Notes

- **Mock Data:** Currently, the AI Service returns randomly generated mock data. No real AI models are integrated.
- **CORS:** CORS is enabled for all origins in development. In production, specify exact origins.
- **Error Handling:** All services include basic error handling and validation.
- **Type Safety:** Frontend and Backend use TypeScript for type safety.

## Next Steps

1. Integrate real AI models (OpenAI, Anthropic, etc.)
2. Add database for storing user preferences
3. Implement authentication and user accounts
4. Add map integrations
5. Implement full i18n support with translations
6. Add more sophisticated itinerary generation

## License

MIT
