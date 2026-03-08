import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import axios from 'axios'
import { requestLogger } from './middleware/logger'
import paymentsRouter from './routes/payments'
import authRouter from './routes/auth'

const app = express()
const PORT = process.env.PORT ?? 5000
const AI_SERVICE_URL = process.env.AI_SERVICE_URL ?? 'http://localhost:8000'

// Middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'backend' })
})

// Travel plan endpoint
app.post('/api/travel-plan', async (req: Request, res: Response) => {
  try {
    const { city, language = 'en' } = req.body

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return res.status(400).json({
        error: 'City name is required and must be a non-empty string',
      })
    }

    // Validate language parameter (future i18n support)
    const supportedLanguages = ['en', 'tr', 'de', 'es', 'fr', 'pt']
    const lang = supportedLanguages.includes(language) ? language : 'en'

    // Forward request to AI Service
    const aiServiceResponse = await axios.post(
      `${AI_SERVICE_URL}/api/travel-plan`,
      {
        city: city.trim(),
        language: lang,
      },
      {
        timeout: 10000, // 10 second timeout
      }
    )

    // Return the response from AI Service
    res.json(aiServiceResponse.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        return res.status(503).json({
          error: 'AI Service is not available. Please ensure it is running on port 8000.',
        })
      }
      if (error.response) {
        return res.status(error.response.status).json({
          error: error.response.data?.error || 'Error from AI Service',
        })
      }
    }

    console.error('Error forwarding request to AI Service:', error)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
})

// Auth & Payments API (requires Prisma + DATABASE_URL)
app.use('/api', authRouter)
// Fix: Make sure profileRouter is defined and imported before use.
// If profileRouter is not available, comment out or remove the line below to avoid runtime errors.
// import profileRouter from './path/to/profileRouter'; // Uncomment and set correct path if you have profileRouter
// app.use('/api', profileRouter);

app.use('/api', paymentsRouter)

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
