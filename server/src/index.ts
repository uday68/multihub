import express from 'express';
import dotenv from 'dotenv';
import adaptersRouter from './routes/adapters.routes';
import workspaceRouter from './routes/workspace.routes';
import sessionRouter from './routes/session.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/adapters', adaptersRouter);
app.use('/api/workspaces', workspaceRouter);
app.use('/api', sessionRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on ${port}`));
