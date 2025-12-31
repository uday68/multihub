import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Simple middleware skeleton - replace with real verification and jwks if OIDC
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    // Attach user info to req
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireWorkspaceAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  // Simple placeholder: check roles; in real system query membership
  if (!user || !user.isWorkspaceAdmin) return res.status(403).json({ error: 'Forbidden' });
  next();
}
