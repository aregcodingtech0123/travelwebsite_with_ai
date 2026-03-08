# Gemini-Powered AI Travel Assistant — Deployment Guide

This project uses **Google Gemini** in the `ai-service` (FastAPI) container. Follow these steps to deploy and validate.

---

## Step 6 — Rebuild and Restart the Service

```bash
# Rebuild only the ai-service image
docker compose build --no-cache ai-service

# Restart the service (zero downtime if behind a load balancer)
docker compose up -d --no-deps ai-service

# Tail logs — wait for "Application startup complete"
docker compose logs -f ai-service --tail=60
```

**Expected healthy startup log:**

```
INFO | travel-assistant | Google Gemini configured — model: gemini-2.5-flash
INFO | uvicorn.error    | Application startup complete.
```

If you see `WARNING | GOOGLE_API_KEY not set`, ensure `./ai-service/.env` exists and is loaded (see Step 4 below).

---

## Step 4 — Environment Variables (Secrets)

1. **Obtain a Google API key** at https://aistudio.google.com/app/apikey
2. **Create** `./ai-service/.env` (never commit this file):

```bash
# Copy from example and edit
cp ai-service/.env.example ai-service/.env
# Set GOOGLE_API_KEY=AIzaSy-... and optionally GEMINI_MODEL, IPINFO_TOKEN, USE_MOCK
```

3. **docker-compose** already loads `./ai-service/.env` and passes:
   - `GOOGLE_API_KEY`
   - `GEMINI_MODEL`
   - `IPINFO_TOKEN`
   - `USE_MOCK`

4. **`.gitignore`** includes `ai-service/.env` so it is not committed.

---

## Step 7 — Smoke Tests

Run from the host. **All should return HTTP 200** (or valid JSON).  
**Base URL:** `http://localhost:5000` (adjust if behind a reverse proxy).

```bash
BASE=http://localhost:5000

# Test 1: Health check
curl -s "$BASE/health" | python3 -m json.tool
# Expected: { "status": "healthy", "provider": "Google Gemini", ... }

# Test 2: AI travel chat (real Gemini call)
curl -s -X POST "$BASE/api/ai-travel-chat" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "I am feeling overwhelmed and need a quiet nature retreat, budget is tight.",
    "current_date": "'"$(date +%Y-%m-%d)"'"
  }' | python3 -m json.tool
# Expected: JSON with assistant_message, destinations[], gemini_model_used

# Test 3: Legacy backward-compat endpoint
curl -s "$BASE/api/destinations?city=Paris" | python3 -m json.tool
# Expected: JSON with "notice" key confirming legacy mode
```

**Pass criteria:**

| Test       | Field to verify                                              |
|-----------|---------------------------------------------------------------|
| Health    | `"status": "healthy"` and `"provider": "Google Gemini"`      |
| AI Chat   | `assistant_message` non-empty, `destinations` array 3–5 items|
| Legacy    | `"notice"` key present                                       |

---

## Step 8 — Reverse Proxy (Nginx / Traefik)

### Nginx

```nginx
location /api/ {
    proxy_pass          http://ai-service:5000/api/;
    proxy_set_header    Host              $host;
    proxy_set_header    X-Real-IP         $remote_addr;
    proxy_set_header    X-Forwarded-For   $proxy_add_x_forwarded_for;

    # Gemini calls can take 5–15 seconds
    proxy_read_timeout  60s;
    proxy_send_timeout  60s;
}
```

**Important:** Forward `X-Forwarded-For` so the API can use the client IP for geo-context.

### Traefik

Use path-based routing to `ai-service:5000` and forward `X-Forwarded-For` via middleware.

---

## Step 10 — Production Hardening Checklist

- [x] **Remove `raw_llm_response`** — Response model sets it to `None` before returning.
- [ ] **Restrict CORS** — In `main.py`, replace `allow_origins=["*"]` with your frontend domain(s).
- [ ] **Secrets** — Store `GOOGLE_API_KEY` in a secrets manager; do not rely on plain `.env` in production.
- [ ] **Rate limiting** — Add middleware (e.g. `slowapi`) on `/api/ai-travel-chat` to protect Gemini quota.
- [ ] **CI/CD** — Set `USE_MOCK=true` in test pipelines to avoid using the real API key.
- [ ] **Monitoring** — Alert if P95 latency for `/api/ai-travel-chat` exceeds ~20 s.
- [ ] **Resource limits** — In `docker-compose.yml` under `ai-service`, add:
  ```yaml
  deploy:
    resources:
      limits:
        cpus: '1.0'
        memory: 512M
  ```
- [ ] **Billing** — Enable Google Cloud billing alerts at https://console.cloud.google.com/billing/budgets

---

## Step 11 — Rollback

If the new deployment fails:

```bash
# Option A — use previous image tag (if you tagged before deploying)
docker tag ai-traveller-planner-ai-service:latest ai-traveller-planner-ai-service:backup
docker compose up -d --no-deps ai-service

# Option B — no recreate (reuse existing container)
docker compose up -d --no-deps --no-recreate ai-service

# Verify
docker compose logs ai-service --tail=20
curl -s http://localhost:5000/health | python3 -m json.tool
```

---

## Done

After **Step 6** and **Step 7**, the Gemini-powered AI Travel Assistant is live.  
Notify the frontend team that `POST /api/ai-travel-chat` is ready (via backend proxy or directly to `ai-service:5000`).
