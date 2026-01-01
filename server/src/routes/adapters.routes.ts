import { Router, Request, Response } from 'express';
import { adapters } from '../adapters';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const list = Object.keys(adapters).map(k => ({ key: k, name: (adapters as any)[k].name }));
  res.json(list);
});

router.post('/:key/run', async (req: Request, res: Response) => {
  const key = req.params.key as keyof typeof adapters;
  const adapter = (adapters as any)[key];
  if (!adapter) return res.status(404).json({ error: 'Adapter not found' });

  const { prompt, context } = req.body;
  try {
    const result = await adapter.run(prompt, context);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
