import mongoose, { Schema, Document } from 'mongoose';

export interface IPrompt extends Document {
  workspaceId: mongoose.Types.ObjectId;
  title: string;
  currentVersionId?: mongoose.Types.ObjectId;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const PromptSchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, index: true },
    title: { type: String, required: true },
    currentVersionId: { type: Schema.Types.ObjectId, ref: 'PromptVersion' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
