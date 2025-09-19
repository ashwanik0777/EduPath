import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  userId?: string;
  name?: string;
  email?: string;
  type: string;
  message: string;
  rating?: number;
  screenshotUrl?: string;
  status: "Pending" | "Reviewed" | "Responded";
  submitted_on: Date;
  suggestionText?: string;
  suggestionCategory?: string;
}

const FeedbackSchema = new Schema<IFeedback>({
  userId: { type: String },
  name: { type: String },
  email: { type: String },
  type: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number },
  screenshotUrl: { type: String },
  status: { type: String, enum: ["Pending", "Reviewed", "Responded"], default: "Pending" },
  submitted_on: { type: Date, default: Date.now },
  suggestionText: { type: String },
  suggestionCategory: { type: String },
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);
