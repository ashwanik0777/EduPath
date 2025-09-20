import mongoose, { Schema, models } from "mongoose";

const PsychometricQuestionSchema = new Schema({
  section: { type: String, required: true }, // O, C, E, A, N
  sectionTitle: { type: String, required: true },
  q: { type: String, required: true },
  type: { type: String, enum: ["scale", "mcq"], required: true },
  options: [String], // for MCQ
  order: { type: Number, default: 0 },
});

export default models.PsychometricQuestion || mongoose.model("PsychometricQuestion", PsychometricQuestionSchema);
