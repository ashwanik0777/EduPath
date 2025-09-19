import mongoose, { Schema, type Document } from "mongoose";

export interface IExam extends Document {
  exam_id: string;
  name: string;
  type: string;
  eligibility: string;
  age_limit: string;
  application_start: string;
  application_end: string;
  exam_date: string;
  syllabus_pdf: string;
  official_link: string;
  conducting_body: string;
  department?: string;
  exam_mode?: string;
  state?: string;
  languages?: string[];
  fee?: string;
  posts?: string;
  selection_process?: string;
  pattern?: string;
  important_dates?: Record<string, string>;
  last_year_cutoff?: string;
  recommended_courses?: string[];
}

const ExamSchema = new Schema<IExam>({
  exam_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  eligibility: { type: String, required: true },
  age_limit: { type: String },
  application_start: { type: String },
  application_end: { type: String },
  exam_date: { type: String },
  syllabus_pdf: { type: String },
  official_link: { type: String },
  conducting_body: { type: String },
  department: { type: String },
  exam_mode: { type: String },
  state: { type: String },
  languages: [{ type: String }],
  fee: { type: String },
  posts: { type: String },
  selection_process: { type: String },
  pattern: { type: String },
  important_dates: { type: Object },
  last_year_cutoff: { type: String },
  recommended_courses: [{ type: String }],
});

export default mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);
