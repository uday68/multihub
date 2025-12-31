import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  workspaceId?: mongoose.Types.ObjectId;
  level: 'info' | 'warn' | 'error';
  type: string;
  details?: Record<string, any>;
  createdAt: Date;
}

const LogSchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, index: true },
    level: { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
    type: { type: String },
    details: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Optional TTL index could be applied for older logs if desired
// LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 }); // 1 year

export default mongoose.model<ILog>('Log', LogSchema);
