# API Examples

This document provides example requests and responses for testing the API endpoints.

## Example 1: Basic Travel Plan Request

### Request to Backend (Port 5000)

```bash
curl -X POST http://localhost:5000/api/travel-plan \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "language": "en"
  }'
```

### Request to AI Service directly (Port 8000)

```bash
curl -X POST http://localhost:8000/api/travel-plan \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "language": "en"
  }'
```

### Response

```json
{
  "city": "Paris",
  "duration": 4,
  "language": "en",
  "itinerary": [
    {
      "day": 1,
      "activities": [
        "Visit Paris Museum",
        "Explore Paris Old Town",
        "Take a walking tour of Paris"
      ],
      "restaurants": [
        "Paris Fine Dining Restaurant",
        "Traditional Paris Cuisine"
      ],
      "hotels": [
        "Paris Luxury Hotel"
      ]
    },
    {
      "day": 2,
      "activities": [
        "Visit Paris Cathedral",
        "Enjoy Paris Park"
      ],
      "restaurants": [
        "Paris Street Food Market"
      ],
      "hotels": []
    },
    {
      "day": 3,
      "activities": [
        "Experience Paris local markets",
        "Take a boat tour in Paris"
      ],
      "restaurants": [
        "Paris Rooftop Restaurant"
      ],
      "hotels": []
    },
    {
      "day": 4,
      "activities": [
        "Visit Paris Art Gallery"
      ],
      "restaurants": [
        "Paris Seafood Restaurant"
      ],
      "hotels": []
    }
  ],
  "recommendations": {
    "bestTimeToVisit": "Spring or Fall (March-May, September-November)",
    "currency": "USD",
    "timeZone": "UTC+0"
  }
}
```

## Example 2: Request with Different Language

### Request

```bash
curl -X POST http://localhost:5000/api/travel-plan \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Istanbul",
    "language": "tr"
  }'
```

### Response

```json
{
  "city": "Istanbul",
  "duration": 5,
  "language": "tr",
  "itinerary": [
    ...
  ],
  "recommendations": {
    ...
  }
}
```

## Example 3: Error Cases

### Missing City Name

**Request:**
```bash
curl -X POST http://localhost:5000/api/travel-plan \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en"
  }'
```

**Response (400 Bad Request):**
```json
{
  "error": "City name is required and must be a non-empty string"
}
```

### Empty City Name

**Request:**
```bash
curl -X POST http://localhost:5000/api/travel-plan \
  -H "Content-Type: application/json" \
  -d '{
    "city": "",
    "language": "en"
  }'
```

**Response (400 Bad Request):**
```json
{
  "error": "City name is required and must be a non-empty string"
}
```

### AI Service Not Available

**Response (503 Service Unavailable):**
```json
{
  "error": "AI Service is not available. Please ensure it is running on port 8000."
}
```

## Example 4: Health Checks

### Backend Health Check

```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "backend"
}
```

### AI Service Health Check

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "ai-service"
}
```

## Example 5: Frontend Request (JavaScript)

```javascript
// Using fetch
fetch('http://localhost:5000/api/travel-plan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    city: 'Tokyo',
    language: 'en'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios (already configured in frontend)
import axios from 'axios';

axios.post('http://localhost:5000/api/travel-plan', {
  city: 'Tokyo',
  language: 'en'
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

## Supported Languages

- `en` - English (default)
- `tr` - Turkish
- `de` - German
- `es` - Spanish
- `fr` - French
- `pt` - Portuguese

Note: Currently, all languages return English mock data. The language parameter is accepted and stored in the response for future i18n implementation.
