import pino from 'pino';
import LogModel from '../models/log.model';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

export async function logEvent(workspaceId: string | null, level: 'info' | 'warn' | 'error', type: string, details: any) {
  logger[level]({ workspaceId, type, details });
  try {
    await LogModel.create({ workspaceId, level, type, details });
  } catch (err) {
    logger.error({ err, msg: 'Failed to write log to DB' });
  }
}

export default logger;
