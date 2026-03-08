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
