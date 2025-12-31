import mongoose, { Schema, Document } from 'mongoose';

export interface IPromptVersion extends Document {
  promptId: mongoose.Types.ObjectId;
  versionNumber: number;
  diffFromPrev?: string;
  fullText: string;
  reason?: string;
  author?: mongoose.Types.ObjectId;
  knownFailures?: string[];
  createdAt: Date;
}

const PromptVersionSchema: Schema = new Schema(
  {
    promptId: { type: Schema.Types.ObjectId, required: true, index: true },
    versionNumber: { type: Number, required: true },
    diffFromPrev: { type: String },
    fullText: { type: String, required: true },
    reason: { type: String },
    author: { type: Schema.Types.ObjectId },
    knownFailures: [{ type: String }],
  },
  { timestamps: true }
);

PromptVersionSchema.index({ promptId: 1, versionNumber: 1 }, { unique: true });

export default mongoose.model<IPromptVersion>('PromptVersion', PromptVersionSchema);
