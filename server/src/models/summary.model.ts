import mongoose, { Schema, Document } from 'mongoose';

export interface ISummary extends Document {
  workspaceId: mongoose.Types.ObjectId;
  summaryText: string;
  summaryHash: string;
  sourceRef?: { collection: string; id: mongoose.Types.ObjectId };
  createdAt: Date;
}

const SummarySchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, index: true },
    summaryText: { type: String, required: true },
    summaryHash: { type: String, required: true, index: true },
    sourceRef: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<ISummary>('Summary', SummarySchema);
