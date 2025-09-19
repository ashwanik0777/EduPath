import mongoose, { Schema, type Document } from "mongoose";

export interface IScholarship extends Document {
  scholarship_id: string;
  name: string;
  provider: string;
  eligibility: {
    class: string;
    category: string;
    income_limit: string;
  };
  amount: string;
  deadline: string;
  apply_link: string;
  documents_required: string[];
  type?: string;
  location?: string;
  gender?: string;
  how_to_apply?: string;
  selection_process?: string;
  renewal?: string;
  important_dates?: Record<string, string>;
  status?: string;
}

const ScholarshipSchema = new Schema<IScholarship>({
  scholarship_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  eligibility: {
    class: String,
    category: String,
    income_limit: String,
  },
  amount: String,
  deadline: String,
  apply_link: String,
  documents_required: [String],
  type: String,
  location: String,
  gender: String,
  how_to_apply: String,
  selection_process: String,
  renewal: String,
  important_dates: Object,
  status: String,
});

export default mongoose.models.Scholarship || mongoose.model<IScholarship>("Scholarship", ScholarshipSchema);
