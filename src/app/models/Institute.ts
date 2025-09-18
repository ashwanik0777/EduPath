import mongoose, { Schema, Document } from "mongoose";

export interface IInstitute extends Document {
  name: string;
  type: "school" | "college" | "university" | "polytechnic";
  state_code: string;
  district: string;
  city: string;
  address: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
  courses: Array<{
    level: "11th-12th" | "UG" | "PG" | "Diploma";
    streams: string[];
    medium: string;
    affiliated_to: string;
  }>;
  grade_level: "11th-12th" | "UG" | "PG" | "Diploma";
  facilities: string[];
  year_established?: number;
  principal?: string;
  admission_process?: string;
  location_map_url?: string;
  coed_type?: "coed" | "boys" | "girls";
  testimonials?: Array<{ student: string; text: string }>;
}

const InstituteSchema = new Schema<IInstitute>({
  name: { type: String, required: true },
  type: { type: String, enum: ["school", "college", "university", "polytechnic"], required: true },
  state_code: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  contact_phone: String,
  contact_email: String,
  website: String,
  courses: [
    {
      level: { type: String, enum: ["11th-12th", "UG", "PG", "Diploma"] },
      streams: [String],
      medium: String,
      affiliated_to: String,
    },
  ],
  grade_level: { type: String, enum: ["11th-12th", "UG", "PG", "Diploma"] },
  facilities: [String],
  year_established: Number,
  principal: String,
  admission_process: String,
  location_map_url: String,
  coed_type: { type: String, enum: ["coed", "boys", "girls"] },
  testimonials: [
    {
      student: String,
      text: String,
    },
  ],
});

export default mongoose.models.Institute || mongoose.model<IInstitute>("Institute", InstituteSchema);
