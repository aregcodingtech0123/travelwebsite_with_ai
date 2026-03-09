import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { logAction } from '../lib/logger'

const router = Router()

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body as {
      email?: string
      password?: string
      firstName?: string
      lastName?: string
    }
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' })
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
        // Keep legacy fields populated for compatibility
        name: `${firstName} ${lastName}`.trim(),
        surname: lastName,
        firstName,
        lastName,
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
      name: `${user.firstName ?? firstName} ${user.lastName ?? lastName}`.trim(),
    })
  } catch (e: unknown) {
    // Handle known Prisma errors gracefully
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation (email race condition)
      if (e.code === 'P2002') {
        return res.status(409).json({ error: 'Email already registered' })
      }
    }

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
      name: `${user.firstName ?? user.name} ${user.lastName ?? user.surname}`.trim(),
    })
  } catch (e) {
    console.error('Login error:', e)
    return res.status(500).json({ error: 'Login failed' })
  }
})

export default router

// Google OAuth user upsert – called from NextAuth signIn callback
router.post('/auth/oauth/google', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName } = req.body as {
      email?: string
      firstName?: string
      lastName?: string
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        password: null,
        name: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
        surname: lastName ?? '',
        firstName: firstName ?? null,
        lastName: lastName ?? null,
      },
      update: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
      },
    })

    await logAction({
      userId: user.id,
      action: 'oauth_google',
      details: { email },
      ip: req.ip ?? undefined,
      userAgent: req.get('user-agent') ?? undefined,
    })

    return res.json({
      id: user.id,
      email: user.email,
      name: `${user.firstName ?? user.name} ${user.lastName ?? user.surname}`.trim(),
    })
  } catch (e) {
    console.error('Google OAuth upsert error:', e)
    return res.status(500).json({ error: 'OAuth user sync failed' })
  }
})
