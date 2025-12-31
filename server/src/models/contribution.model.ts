import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  workspaceId: mongoose.Types.ObjectId;
  promptVersionId: mongoose.Types.ObjectId;
  modelId: string;
  content: string;
  metadata?: { tokensUsed?: number; latencyMs?: number; confidence?: number };
  conflicts?: boolean;
  accepted?: boolean | null;
  createdAt: Date;
}

const ContributionSchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, index: true },
    promptVersionId: { type: Schema.Types.ObjectId, required: true, index: true },
    modelId: { type: String, required: true },
    content: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    conflicts: { type: Boolean, default: false },
    accepted: { type: Boolean, default: null },
  },
  { timestamps: true }
);

ContributionSchema.index({ workspaceId: 1 });
ContributionSchema.index({ promptVersionId: 1 });

export default mongoose.model<IContribution>('Contribution', ContributionSchema);
