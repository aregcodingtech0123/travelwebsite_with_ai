import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/profile/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, surname: true, creditAmount: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    return res.json(user)
  } catch (e) {
    console.error('Profile get error:', e)
    return res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

router.patch('/profile/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { email, name, surname } = req.body as { email?: string; name?: string; surname?: string }
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(email != null && { email }),
        ...(name != null && { name }),
        ...(surname != null && { surname }),
      },
    })
    return res.json({ id: user.id, email: user.email, name: user.name, surname: user.surname, creditAmount: user.creditAmount })
  } catch (e) {
    console.error('Profile update error:', e)
    return res.status(500).json({ error: 'Failed to update profile' })
  }
})

export default router
