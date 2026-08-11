import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: [{ type: String, required: true }]
}, {
  timestamps: true
});

export default mongoose.model<ITeam>('Team', TeamSchema);
