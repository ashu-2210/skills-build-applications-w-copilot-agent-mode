import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
}

const ActivitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
