# Fixes Applied & Setup Guide

## 1. AI Service — Google GenAI SDK (no more deprecation)

- **Change:** Replaced deprecated `google.generativeai` with the new `google.genai` package.
- **Files:** `ai-service/main.py`, `ai-service/requirements.txt`
- **Details:** Uses `genai.Client(api_key=...)`, `Content`/`Part` for messages, and `GenerateContentConfig(system_instruction=..., response_mime_type="application/json")`.

## 2. AI Service — GOOGLE_API_KEY and env

- **Docker:** `ai-service` no longer uses `${GOOGLE_API_KEY}` from the host in `environment:`, so you no longer see “variable is not set” for that. All AI-related env vars are read from **`ai-service/.env`** only.
- **What you do:**
  1. Copy the example:  
     `cp ai-service/.env.example ai-service/.env`
  2. Edit `ai-service/.env` and set your key:  
     `GOOGLE_API_KEY=AIzaSy...`  
     (Get a key at https://aistudio.google.com/app/apikey)
  3. Optionally set `GEMINI_MODEL=gemini-2.0-flash`, `USE_MOCK=false`, `IPINFO_TOKEN=...`
  4. Rebuild and start:  
     `docker compose build --no-cache ai-service`  
     `docker compose up -d ai-service`

If `GOOGLE_API_KEY` is missing, the app still starts but logs a clear warning and only works with `USE_MOCK=true`.

## 3. Frontend — NODE_ENV

- **Change:** In `docker-compose.yml`, the `frontend` service now sets `NODE_ENV=development` when running `next dev`.
- **Result:** Next.js no longer warns about a “non-standard NODE_ENV value” in dev.

## 4. Backend — Prisma migrations

- **Change:** Added an initial migration so “No migration found in prisma/migrations” is resolved.
- **New:** `backend/prisma/migrations/20260309000000_init/migration.sql` creates `User`, `ChatHistory`, `Payment`, `ActionLog`.

**Apply migrations (choose one):**

**A) Fresh DB (recommended for new setup)**  
From project root:

```bash
docker compose up -d db
docker compose run --rm backend npx prisma migrate deploy
docker compose up -d
```

**B) DB already has data / first time with existing DB**  
If the database already has tables and you want to “baseline” without wiping:

1. Create the migration folder (already done) and mark it as applied without running it:
   ```bash
   docker compose run --rm -e DATABASE_URL="postgresql://postgres:password@db:5432/ai_planner_db?schema=public" backend npx prisma migrate resolve --applied 20260309000000_init
   ```
2. If your existing schema does **not** match the migration, either:
   - Run the migration on a copy of the DB and fix conflicts, or
   - Align the schema manually and then run `prisma migrate resolve --applied 20260309000000_init`.

**C) Local Prisma (no Docker)**  
With `DATABASE_URL` in `.env`:

```bash
cd backend
npx prisma migrate deploy
```

After this, backend startup should no longer report “No migration found”.

## 5. Backend — npm notice

- **Change:** In `backend/Dockerfile` (runner stage), added `npm install -g npm@11.11.0` so the container uses a newer npm and the “New major version of npm available” notice is reduced/removed.

## 6. PostgreSQL “Connection reset by peer”

- **What it is:** The log line `could not receive data from client: Connection reset by peer` means the client (e.g. backend or another service) closed the TCP connection before PostgreSQL finished using it. Common when:
  - A healthcheck or script connects and exits quickly.
  - The backend starts and opens a connection that is then closed (e.g. Prisma or migrate).
  - Network/timeouts cause the client to drop the connection.
- **Do you need to fix it?** Usually **no**. It’s often a one-off during startup. If it happens rarely and the stack is healthy, you can ignore it.
- **If it keeps happening:** Make the DB healthcheck a bit gentler so it doesn’t open/close connections too aggressively:

  In `docker-compose.yml`, under `db`:

  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres -q"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 10s
  ```

  `start_period` gives Postgres time to start before failed healthchecks count as retries. Optionally increase `interval` (e.g. to 10s) to reduce connection churn.

---

## Step-by-step: apply everything and restart

1. **Env for AI service**
   ```bash
   cp ai-service/.env.example ai-service/.env
   # Edit ai-service/.env and set GOOGLE_API_KEY=...
   ```

2. **Rebuild and start**
   ```bash
   docker compose build --no-cache
   docker compose up -d
   ```

3. **Run migrations (if not already applied)**
   ```bash
   docker compose run --rm backend npx prisma migrate deploy
   ```

4. **Check logs**
   ```bash
   docker compose logs ai-service --tail=30
   docker compose logs backend --tail=20
   docker compose logs frontend --tail=20
   ```

   - **ai-service:** You should see “Google Gemini configured — model: …” and no `FutureWarning` for `google.generativeai`.
   - **backend:** No “No migration found” after migrations are applied.
   - **frontend:** No NODE_ENV warning.

5. **Smoke test AI**
   ```bash
   curl -s http://localhost:5000/health | python3 -m json.tool
   ```

   Expect `"provider": "Google Gemini"` and `"status": "healthy"`.
