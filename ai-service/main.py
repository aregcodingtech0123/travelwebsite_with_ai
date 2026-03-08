"""
AI-Powered Conversational Travel Assistant — FastAPI Backend
============================================================
Powered by Google Gemini (google.genai SDK).
Provider: Google AI Studio via GOOGLE_API_KEY.

Author : Senior AI Engineer
Version: 4.0.0  (Google GenAI SDK)
"""

from __future__ import annotations

import json
import logging
import os
import re
from datetime import datetime
from typing import Any, Optional

import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# New Google GenAI SDK (replaces deprecated google.generativeai)
from google import genai
from google.genai.types import Content, GenerateContentConfig, Part

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("travel-assistant")

# ---------------------------------------------------------------------------
# App & CORS  (retains existing structure)
# ---------------------------------------------------------------------------
app = FastAPI(
    title="AI Conversational Travel Assistant — Gemini Edition",
    description=(
        "Google Gemini-powered travel planning API with emotional intelligence, "
        "seasonal awareness, and IP-based location context."
    ),
    version="4.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # ← restrict to your domain(s) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Environment / Gemini config
# ---------------------------------------------------------------------------
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "").strip()
GEMINI_MODEL   = os.getenv("GEMINI_MODEL", "gemini-2.0-flash").strip() or "gemini-2.0-flash"
IPINFO_TOKEN   = os.getenv("IPINFO_TOKEN", "").strip()
USE_MOCK       = os.getenv("USE_MOCK", "false").lower() == "true"

# Client is created lazily so we can log clearly when key is missing
_genai_client: Optional[genai.Client] = None

def get_genai_client() -> Optional[genai.Client]:
    global _genai_client
    if _genai_client is not None:
        return _genai_client
    if not GOOGLE_API_KEY:
        return None
    _genai_client = genai.Client(api_key=GOOGLE_API_KEY)
    return _genai_client

@app.on_event("startup")
def _log_gemini_config() -> None:
    if GOOGLE_API_KEY:
        logger.info("Google Gemini configured — model: %s", GEMINI_MODEL)
    else:
        logger.warning(
            "GOOGLE_API_KEY not set — API calls will fail unless USE_MOCK=true. "
            "Add GOOGLE_API_KEY to ai-service/.env (see ai-service/.env.example)."
        )


# ===========================================================================
# Pydantic Models
# ===========================================================================

class TravelChatRequest(BaseModel):
    """Conversational request payload from the frontend."""

    prompt: str = Field(
        ...,
        description="Free-form user message.",
        example="I feel totally burned-out. Where can I go for a peaceful solo trip on a budget?",
    )
    user_ip: Optional[str] = Field(
        None,
        description=(
            "Client IP forwarded by the frontend for geo-context. "
            "Falls back to request.client.host when omitted."
        ),
    )
    current_date: Optional[str] = Field(
        None,
        description="ISO-8601 date override (YYYY-MM-DD). Defaults to server's today.",
        example="2025-06-15",
    )
    conversation_history: list[dict[str, str]] = Field(
        default_factory=list,
        description=(
            "Previous turns as [{role, content}] for multi-turn support. "
            "Roles must be 'user' or 'model' (Gemini convention)."
        ),
    )


class Destination(BaseModel):
    name: str
    country: str
    region: Optional[str] = None
    why_recommended: str
    best_time_to_visit: str
    estimated_daily_budget_usd: Optional[str] = None
    vibe_tags: list[str] = Field(default_factory=list)
    hidden_gem: bool = False
    insider_tip: Optional[str] = None


class TravelChatResponse(BaseModel):
    assistant_message: str
    destinations: list[Destination] = Field(default_factory=list)
    detected_intent: Optional[str] = None
    detected_travel_style: Optional[str] = None
    season_context: Optional[str] = None
    user_country_context: Optional[str] = None
    follow_up_questions: list[str] = Field(default_factory=list)
    gemini_model_used: Optional[str] = None
    raw_llm_response: Optional[str] = None   # remove in production


# ===========================================================================
# Geo-location helper
# ===========================================================================

async def resolve_country_from_ip(ip: str) -> str:
    """
    Return a human-readable country name for the given IP address.
    • Calls ipinfo.io when IPINFO_TOKEN is provided.
    • Falls back to a deterministic prefix-based mock for local dev.
    """
    private_prefixes = (
        "127.", "::1", "192.168.", "10.",
        "172.16.", "172.17.", "172.18.", "172.19.", "172.20.",
    )
    if not ip or any(ip.startswith(p) for p in private_prefixes):
        logger.info("Private/loopback IP (%s) — defaulting to 'United States'.", ip)
        return "United States"

    if IPINFO_TOKEN:
        try:
            url = f"https://ipinfo.io/{ip}?token={IPINFO_TOKEN}"
            async with httpx.AsyncClient(timeout=4.0) as client:
                resp = await client.get(url)
                resp.raise_for_status()
                data = resp.json()
                code = data.get("country", "")
                return _iso2_to_name(code) or code or "Unknown"
        except Exception as exc:
            logger.warning("ipinfo.io lookup failed for %s: %s", ip, exc)

    # Deterministic mock — stable for unit tests
    mock_map = {
        "8.8":  "United States",
        "1.1":  "Australia",
        "46.":  "Germany",
        "91.":  "United Kingdom",
        "5.":   "Turkey",
        "31.":  "Netherlands",
    }
    for prefix, country in mock_map.items():
        if ip.startswith(prefix):
            return country

    return "United States"   # safe global default


def _iso2_to_name(code: str) -> str:
    """Minimal ISO-2 → country name lookup."""
    table = {
        "US": "United States",   "GB": "United Kingdom", "AU": "Australia",
        "DE": "Germany",         "FR": "France",          "IT": "Italy",
        "ES": "Spain",           "TR": "Turkey",          "JP": "Japan",
        "IN": "India",           "BR": "Brazil",          "CA": "Canada",
        "MX": "Mexico",          "NL": "Netherlands",     "PL": "Poland",
        "TH": "Thailand",        "SG": "Singapore",       "ZA": "South Africa",
        "NG": "Nigeria",         "EG": "Egypt",           "AR": "Argentina",
        "CO": "Colombia",        "PT": "Portugal",        "GR": "Greece",
        "SE": "Sweden",          "NO": "Norway",          "PH": "Philippines",
        "ID": "Indonesia",       "MY": "Malaysia",        "VN": "Vietnam",
    }
    return table.get(code.upper(), "")


# ===========================================================================
# Season / calendar helpers
# ===========================================================================

def get_season_context(date: datetime) -> str:
    month = date.month
    if month in (12, 1, 2):
        return "Winter (Northern Hemisphere) / Summer (Southern Hemisphere)"
    if month in (3, 4, 5):
        return "Spring (Northern Hemisphere) / Autumn (Southern Hemisphere)"
    if month in (6, 7, 8):
        return "Summer (Northern Hemisphere) / Winter (Southern Hemisphere)"
    return "Autumn (Northern Hemisphere) / Spring (Southern Hemisphere)"


def resolve_date(date_str: Optional[str]) -> datetime:
    if date_str:
        try:
            return datetime.fromisoformat(date_str)
        except ValueError:
            logger.warning("Invalid current_date '%s' — using server UTC now.", date_str)
    return datetime.utcnow()


# ===========================================================================
# System prompt factory
# ===========================================================================

SYSTEM_PROMPT_TEMPLATE = """\
You are "Aria", an elite AI travel concierge powered by Google Gemini with 20 years of experience.
You are warm, empathetic, culturally aware, and deeply knowledgeable about every corner of the planet.
Your superpower is translating vague feelings and loose ideas into perfect, personalised travel recommendations.

━━━ CONTEXT FOR THIS REQUEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Today's date   : {today}
Current season : {season}
User's country : {user_country}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━ CORE BEHAVIOURAL RULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. EMOTIONAL INTELLIGENCE
   - Detect the user's emotional state: stressed, burned-out, excited, adventurous,
     lonely, romantic, family-focused, overwhelmed, etc.
   - Mirror their tone — calm & reassuring for anxious users; enthusiastic for adventurers.
   - Acknowledge and validate their feelings BEFORE recommending destinations.

2. TIME & SEASON AWARENESS
   - Use the date above. Filter destinations by current travel suitability.
   - Proactively mention weather conditions, upcoming festivals, or seasonal highlights.
   - If the user's timing is ambiguous, include one clarifying follow-up question.

3. DOMESTIC vs INTERNATIONAL
   - If the user mentions "domestic", "within my country", or similar phrasing,
     recommend destinations INSIDE {user_country} only.
   - Otherwise, suggest globally appropriate destinations.

4. BUDGET & VALUE
   - Classify intent: backpacker (<$50/day), mid-range ($50-$150/day), luxury (>$150/day).
   - Always include honest estimated daily budget ranges in USD.
   - For "best value" requests, highlight destinations with high quality-to-cost ratio.

5. HIDDEN GEMS
   - When the user asks for off-the-beaten-path spots, avoid overexposed tourist traps.
   - Mark those destinations with "hidden_gem": true.
   - Always include a concrete, actionable insider_tip for hidden gems.

6. MULTI-TURN CONVERSATION
   - If conversation history is provided, maintain context across turns.
   - Avoid repeating destinations already discussed in prior turns.

━━━ OUTPUT FORMAT — STRICT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply ONLY with a single valid JSON object.
No markdown fences, no preamble, no explanation outside the JSON.

{{
  "assistant_message": "<friendly 2-4 sentence reply validating feelings and teasing picks>",
  "destinations": [
    {{
      "name": "<city or area name>",
      "country": "<country name>",
      "region": "<region / state / province, or null>",
      "why_recommended": "<2-3 sentence personalised reason>",
      "best_time_to_visit": "<months or season range>",
      "estimated_daily_budget_usd": "<e.g. $40-$80 or null>",
      "vibe_tags": ["<tag1>", "<tag2>"],
      "hidden_gem": <true|false>,
      "insider_tip": "<specific actionable tip, or null>"
    }}
  ],
  "detected_intent": "<one-line summary of what the user really wants>",
  "detected_travel_style": "<e.g. Solo Budget Backpacker | Luxury Couple | Family Adventure>",
  "season_context": "<one sentence about how the current season affects this travel plan>",
  "follow_up_questions": ["<question 1>", "<question 2>"]
}}

Rules:
- destinations: provide 3-5 ranked entries (best match first).
- follow_up_questions: always exactly 2 thoughtful questions to refine the plan further.
- Do NOT include any text outside the JSON object.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
""".strip()


def build_system_prompt(today: datetime, season: str, user_country: str) -> str:
    return SYSTEM_PROMPT_TEMPLATE.format(
        today=today.strftime("%A, %B %d %Y"),
        season=season,
        user_country=user_country,
    )


# ===========================================================================
# Gemini LLM caller (google.genai SDK)
# ===========================================================================

def _build_contents(messages: list[dict[str, str]]) -> list[Content]:
    """Build a list of Content for the new GenAI SDK (role + parts)."""
    contents: list[Content] = []
    for msg in messages:
        role = "model" if msg.get("role") in ("assistant", "model") else "user"
        text = msg.get("content", "")
        contents.append(Content(role=role, parts=[Part.from_text(text=text)]))
    return contents


async def call_gemini_api(
    system_prompt: str,
    messages: list[dict[str, str]],
) -> str:
    """
    Calls Google Gemini via the google.genai SDK (replaces deprecated google.generativeai).

    Uses GenerateContentConfig with system_instruction and response_mime_type="application/json".
    Returns the raw text content of the model's reply.
    """
    if USE_MOCK:
        logger.info("USE_MOCK=true — returning stub Gemini response.")
        return _mock_gemini_response()

    client = get_genai_client()
    if not client:
        raise RuntimeError(
            "GOOGLE_API_KEY is not configured. "
            "Set it in ai-service/.env or enable USE_MOCK=true for local dev."
        )

    contents = _build_contents(messages)
    if not contents:
        raise ValueError("messages must contain at least one user message")

    config = GenerateContentConfig(
        system_instruction=system_prompt,
        response_mime_type="application/json",
        temperature=0.7,
        max_output_tokens=2048,
    )

    logger.info("Sending message to Gemini model '%s'...", GEMINI_MODEL)
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=config,
    )
    if response.text:
        return response.text
    raise RuntimeError("Empty response from Gemini")


# ===========================================================================
# Mock response — for local dev / CI without a real API key
# ===========================================================================

def _mock_gemini_response() -> str:
    return json.dumps({
        "assistant_message": (
            "I can absolutely feel the exhaustion in your words, and you truly deserve a proper reset. "
            "I've curated three destinations that balance calm, culture, and great value — "
            "each chosen to help you breathe and reconnect with yourself. Let's find your escape! 🌿"
        ),
        "destinations": [
            {
                "name": "Chiang Mai",
                "country": "Thailand",
                "region": "Northern Thailand",
                "why_recommended": (
                    "Misty mountains, golden temples, and a thriving slow-travel community "
                    "make Chiang Mai the ultimate burnout antidote. The pace is gentle, the food "
                    "is extraordinary, and your money stretches remarkably far."
                ),
                "best_time_to_visit": "November – February",
                "estimated_daily_budget_usd": "$30–$60",
                "vibe_tags": ["peaceful", "cultural", "budget-friendly", "nature", "wellness"],
                "hidden_gem": False,
                "insider_tip": (
                    "Rent a bicycle and explore the Old City moat lanes at dawn — "
                    "you'll encounter monks collecting alms and tiny shrines the tour buses never reach."
                ),
            },
            {
                "name": "Kotor",
                "country": "Montenegro",
                "region": "Bay of Kotor",
                "why_recommended": (
                    "A dramatic fjord-like bay ringed by medieval walls — all the Adriatic "
                    "beauty of Croatia at a fraction of the price. Perfect for slow walks, "
                    "fresh seafood, and genuinely switching off from daily noise."
                ),
                "best_time_to_visit": "May – June or September – October",
                "estimated_daily_budget_usd": "$45–$80",
                "vibe_tags": ["scenic", "historic", "hidden-gem", "relaxed", "coastal"],
                "hidden_gem": True,
                "insider_tip": (
                    "Climb to the fortress of San Giovanni after 18:00 — entry is free at that "
                    "hour and you'll watch the sunset over the bay in near-total solitude."
                ),
            },
            {
                "name": "Medellín",
                "country": "Colombia",
                "region": "Antioquia",
                "why_recommended": (
                    "Eternal spring weather at altitude, a booming café culture, and a city that "
                    "has reinvented itself into one of South America's most innovative urban gems. "
                    "Solo travellers consistently rate it among the world's most welcoming cities."
                ),
                "best_time_to_visit": "December – March or July – August",
                "estimated_daily_budget_usd": "$35–$70",
                "vibe_tags": ["vibrant", "urban", "budget-friendly", "coffee", "solo-friendly"],
                "hidden_gem": False,
                "insider_tip": (
                    "Take the free Metrocable up to Arví Park on a Sunday morning — "
                    "it's what locals do for a countryside escape without leaving the metro area."
                ),
            },
        ],
        "detected_intent": "Solo budget travel with a strong need for rest, calm, and cultural richness",
        "detected_travel_style": "Solo Budget Traveller — Wellness & Culture Focus",
        "season_context": (
            "Current conditions favour warm, dry weather in Southeast Asia and "
            "shoulder-season value across Southern Europe — ideal timing for all three picks."
        ),
        "follow_up_questions": [
            "How long are you thinking — a quick 7-day reset or a longer 3–4 week slow-travel journey?",
            "Do you lean more toward coastal/beach vibes, mountain retreats, or lively city exploration?",
        ],
    })


# ===========================================================================
# Response parser — robust against Gemini's occasional markdown wrapping
# ===========================================================================

def parse_llm_response(raw: str) -> dict[str, Any]:
    """
    Parse JSON from Gemini's reply.
    Handles: plain JSON, ```json ... ``` fences, leading/trailing whitespace.
    """
    cleaned = raw.strip()

    # Strip markdown code fences if present (``` or ```json)
    fence_match = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", cleaned, re.IGNORECASE)
    if fence_match:
        cleaned = fence_match.group(1).strip()

    return json.loads(cleaned)


# ===========================================================================
# API Endpoints
# ===========================================================================

@app.get("/health", tags=["ops"])
async def health_check():
    """Liveness probe — reports which Gemini model is active."""
    return {
        "status": "healthy",
        "provider": "Google Gemini",
        "model": GEMINI_MODEL,
        "mock_mode": USE_MOCK,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }


@app.post("/api/ai-travel-chat", response_model=TravelChatResponse, tags=["travel"])
async def ai_travel_chat(body: TravelChatRequest, request: Request):
    """
    Core AI travel conversation endpoint.

    Accepts a free-form user prompt, enriches it with real-time date/season
    context and IP-derived location, calls Google Gemini, and returns a
    fully structured travel recommendation.
    """

    # ── 1. Resolve date & season ─────────────────────────────────────────────
    today  = resolve_date(body.current_date)
    season = get_season_context(today)

    # ── 2. Resolve user IP / country ─────────────────────────────────────────
    # Priority: X-Forwarded-For (reverse proxy) > body.user_ip > direct connection IP
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        ip = forwarded_for.split(",")[0].strip()
    elif body.user_ip:
        ip = body.user_ip
    else:
        ip = request.client.host if request.client else "127.0.0.1"

    user_country = await resolve_country_from_ip(ip)
    logger.info(
        "Request | ip=%s | country=%s | date=%s | season=%s | model=%s",
        ip, user_country, today.date(), season, GEMINI_MODEL,
    )

    # ── 3. Build Gemini system prompt ─────────────────────────────────────────
    system_prompt = build_system_prompt(today, season, user_country)

    # ── 4. Assemble message list (multi-turn history aware) ───────────────────
    messages: list[dict[str, str]] = list(body.conversation_history)
    messages.append({"role": "user", "content": body.prompt})

    # ── 5. Call Gemini ────────────────────────────────────────────────────────
    try:
        raw_response = await call_gemini_api(system_prompt, messages)
    except Exception as exc:
        logger.exception("Gemini API call failed: %s", exc)
        return TravelChatResponse(
            assistant_message=(
                "I'm having a little trouble reaching my knowledge base right now ✈️ "
                "Please try again in a moment — I have so many great ideas for you!"
            ),
            gemini_model_used=GEMINI_MODEL,
            raw_llm_response=None,
        )

    # ── 6. Parse JSON ─────────────────────────────────────────────────────────
    try:
        parsed = parse_llm_response(raw_response)
    except json.JSONDecodeError as exc:
        logger.error("JSON parse error: %s\nRaw Gemini output:\n%s", exc, raw_response)
        return TravelChatResponse(
            assistant_message=(
                "I got a little turned around there — could you rephrase what you're looking for? "
                "I'd love to help you find the perfect destination! 🗺️"
            ),
            gemini_model_used=GEMINI_MODEL,
            raw_llm_response=None,
        )

    # ── 7. Map to Pydantic response model ─────────────────────────────────────
    destinations = [Destination(**d) for d in parsed.get("destinations", [])]

    # Production: do not expose raw_llm_response to the client
    return TravelChatResponse(
        assistant_message     = parsed.get("assistant_message", ""),
        destinations          = destinations,
        detected_intent       = parsed.get("detected_intent"),
        detected_travel_style = parsed.get("detected_travel_style"),
        season_context        = parsed.get("season_context"),
        user_country_context  = user_country,
        follow_up_questions   = parsed.get("follow_up_questions", []),
        gemini_model_used     = GEMINI_MODEL,
        raw_llm_response      = None,
    )


# ===========================================================================
# Legacy mock endpoint (backward-compatible)
# ===========================================================================

@app.get("/api/destinations", tags=["legacy"])
async def get_destinations(city: Optional[str] = None):
    """
    Original mock endpoint retained for backward compatibility.
    Point your frontend at POST /api/ai-travel-chat for AI-powered responses.
    """
    return {
        "notice": (
            "This endpoint returns mock data. "
            "Use POST /api/ai-travel-chat for Gemini-powered responses."
        ),
        "city": city,
        "results": [],
    }


# ===========================================================================
# Entry-point (local dev without uvicorn CLI)
# ===========================================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)