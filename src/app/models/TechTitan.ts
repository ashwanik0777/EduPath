import mongoose, { Schema, type Document } from "mongoose"

export interface ITechTitan extends Document {
  name: string
  role: string
  specialization: string
  bio: string
  imageUrl: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  yearsOfExperience?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TechTitanSchema = new Schema<ITechTitan>(
  {
    name: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true, index: true },
    bio: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    yearsOfExperience: { type: Number, min: 0, max: 60, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

TechTitanSchema.index({ name: "text", role: "text", specialization: "text", bio: "text" })

export default mongoose.models.TechTitan || mongoose.model<ITechTitan>("TechTitan", TechTitanSchema)
