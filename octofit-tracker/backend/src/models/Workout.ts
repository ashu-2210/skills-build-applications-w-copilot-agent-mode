import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: number;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
