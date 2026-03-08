import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'
import { logAction } from '../lib/logger'

const router = Router()

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, surname } = req.body as {
      email?: string
      password?: string
      name?: string
      surname?: string
    }
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: name ?? '',
        surname: surname ?? '',
      },
    })
    await logAction({
      userId: user.id,
      action: 'register',
      details: { email },
      ip: req.ip ?? undefined,
      userAgent: req.get('user-agent') ?? undefined,
    })
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: `${user.name} ${user.surname}`.trim(),
    })
  } catch (e) {
    console.error('Register error:', e)
    return res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string }
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    await logAction({
      userId: user.id,
      action: 'login',
      details: { email },
      ip: req.ip ?? undefined,
      userAgent: req.get('user-agent') ?? undefined,
    })
    return res.json({
      id: user.id,
      email: user.email,
      name: `${user.name} ${user.surname}`.trim(),
    })
  } catch (e) {
    console.error('Login error:', e)
    return res.status(500).json({ error: 'Login failed' })
  }
})

export default router
