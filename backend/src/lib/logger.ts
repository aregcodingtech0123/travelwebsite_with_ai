/**
 * Logger Service - Records user actions to ActionLog table.
 * Use this in routes/middleware to log: login, logout, chat_send, payment_init, etc.
 */

import { prisma } from './prisma'

export interface LogActionParams {
  userId?: string | null
  action: string
  details?: Record<string, unknown> | null
  ip?: string | null
  userAgent?: string | null
}

export async function logAction(params: LogActionParams): Promise<void> {
  try {
    await prisma.actionLog.create({
      data: {
        userId: params.userId ?? undefined,
        action: params.action,
        details: params.details ? JSON.stringify(params.details) : null,
        ip: params.ip ?? null,
        userAgent: params.userAgent ?? null,
      },
    })
  } catch (err) {
    console.error('[Logger] Failed to write action log:', err)
  }
}

export const Logger = { logAction }
