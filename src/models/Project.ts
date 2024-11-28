import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  users: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

export default mongoose.model<IProject>('Project', ProjectSchema);