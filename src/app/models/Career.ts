import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  career_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  stream: { type: String, required: true },
  education_path: [{ type: String }],
  description: { type: String },
  required_skills: [{ type: String }],
  salary_range: { type: String },
  growth_scope: { type: String },
  related_careers: [{ type: String }],
  career_nature: { type: String },
  interest_area: [{ type: String }],
  education_level: [{ type: String }],
  short_description: { type: String },
  key_roles: [{ type: String }],
  eligibility: { type: String },
  entry_courses: [{ type: String }],
  pros: [{ type: String }],
  cons: [{ type: String }],
  famous_people: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
