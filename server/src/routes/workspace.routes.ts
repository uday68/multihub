import { Router, Request, Response } from 'express';
import Workspace from '../models/workspace.model';

const router = Router();

// Create workspace
router.post('/', async (req: Request, res: Response) => {
  const { name, ownerId } = req.body;
  try {
    const w = await Workspace.create({ name, ownerId, members: [{ userId: ownerId, role: 'owner' }] });
    res.status(201).json(w);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get workspace
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const w = await Workspace.findById(id);
  if (!w) return res.status(404).json({ error: 'Not found' });
  res.json(w);
});

export default router;
