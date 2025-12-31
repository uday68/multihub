import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Session from '../models/session.model';
import { requireAuth, requireWorkspaceAdmin } from '../middleware/auth';

const router = Router();

// Create a project-scoped session (admin only)
router.post('/workspaces/:workspaceId/sessions', requireAuth, requireWorkspaceAdmin, async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  // Generate opaque token
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  const s = await Session.create({ workspaceId, sessionScope: 'project', sessionTokenHash: tokenHash, expiresAt });

  // Return token once to the caller
  res.status(201).json({ token, sessionId: s._id, expiresAt });
});

// Revoke
router.post('/sessions/:id/revoke', requireAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  await Session.findByIdAndDelete(id);
  res.json({ revoked: true });
});

export default router;
