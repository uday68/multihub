import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  members: { userId: mongoose.Types.ObjectId; role: string }[];
  activePromptId?: mongoose.Types.ObjectId;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, required: true, index: true },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, required: true },
        role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' },
      },
    ],
    activePromptId: { type: Schema.Types.ObjectId, ref: 'Prompt' },
    settings: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

WorkspaceSchema.index({ ownerId: 1, name: 1 }, { unique: true, partialFilterExpression: { name: { $exists: true } } });

export default mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
