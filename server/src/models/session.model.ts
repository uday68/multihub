import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  workspaceId: mongoose.Types.ObjectId;
  sessionScope: 'project' | 'user';
  sessionTokenHash: string; // store hashed token only
  createdBy?: mongoose.Types.ObjectId;
  expiresAt?: Date;
  createdAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, index: true },
    sessionScope: { type: String, enum: ['project', 'user'], default: 'project' },
    sessionTokenHash: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId },
    expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>('Session', SessionSchema);
