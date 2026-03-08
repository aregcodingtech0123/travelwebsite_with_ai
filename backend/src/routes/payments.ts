import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { logAction } from '../lib/logger'

const router = Router()

interface PaymentBody {
  userId: string
  amount: number
  cardLast4?: string
  status?: string
}

router.post('/payments', async (req: Request, res: Response) => {
  try {
    const { userId, amount, cardLast4, status = 'completed' } = req.body as PaymentBody

    if (!userId || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'userId and a positive amount are required',
      })
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        status,
        date: new Date(),
      },
    })

    // Update user credit
    await prisma.user.update({
      where: { id: userId },
      data: {
        creditAmount: { increment: amount },
      },
    })

    await logAction({
      userId,
      action: 'payment_completed',
      details: { paymentId: payment.id, amount, cardLast4, status },
      ip: req.ip ?? undefined,
      userAgent: req.get('user-agent') ?? undefined,
    })

    return res.status(201).json({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      date: payment.date,
    })
  } catch (error) {
    console.error('Payment error:', error)
    return res.status(500).json({ error: 'Payment processing failed' })
  }
})

export default router
