import mongoose, { Schema, Document } from "mongoose";

export interface IProgressStep {
  step_id: number;
  key: string;
  status: "completed" | "in_progress" | "locked";
  completed_on?: Date | null;
  details?: string;
  counselor_notes?: string;
}

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  steps: IProgressStep[];
  updatedAt: Date;
}

const ProgressStepSchema = new Schema<IProgressStep>(
  {
    step_id: { type: Number, required: true },
    key: { type: String, required: true },
    status: { type: String, enum: ["completed", "in_progress", "locked"], required: true },
    completed_on: { type: Date, default: null },
    details: { type: String },
    counselor_notes: { type: String },
  },
  { _id: false }
);

const ProgressSchema = new Schema<IProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    steps: { type: [ProgressStepSchema], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model<IProgress>("Progress", ProgressSchema);
