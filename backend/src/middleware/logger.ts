/**
 * Logger Middleware Plan:
 * - Attach to Express app to log every request (optional, for high-level audit).
 * - For user actions (login, payment, chat), call logAction() inside the route handler
 *   after the action succeeds, so we record: userId, action, optional details.
 *
 * This middleware logs incoming request method + path (no body) for audit.
 * Sensitive actions (payments, profile updates) should also call Logger.logAction() in the route.
 */

import { Request, Response, NextFunction } from 'express'
import { logAction } from '../lib/logger'

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const userId = (req as Request & { userId?: string }).userId ?? null
  const action = `request_${req.method}_${req.path}`
  const ip = req.ip ?? req.socket?.remoteAddress ?? null
  const userAgent = req.get('user-agent') ?? null

  // Fire-and-forget; do not block response
  logAction({
    userId: userId || undefined,
    action,
    details: { path: req.path, method: req.method },
    ip,
    userAgent,
  }).catch(() => {})

  next()
}
