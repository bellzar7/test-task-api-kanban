import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  status: 'TODO' | 'In Progress' | 'Done';
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  history: Array<{ status: string; timestamp: Date }>;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['TODO', 'In Progress', 'Done'], default: 'TODO' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

export default mongoose.model<ITask>('Task', TaskSchema);