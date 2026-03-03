import mongoose, { Schema, type Document } from "mongoose"

export type RoleType = "Lead" | "Member" | "Thread" | "Advisor" | "Contributor"

export interface ITechTitan extends Document {
  name: string
  role: string
  roleType: RoleType
  specialization?: string
  bio?: string
  // image fields (support both naming conventions)
  image?: string
  imageUrl?: string
  // social links
  email?: string
  github?: string
  githubUrl?: string
  linkedin?: string
  linkedinUrl?: string
  website?: string
  portfolioUrl?: string
  twitter?: string
  instagram?: string
  facebook?: string
  // academic info
  rollNumber?: string
  batch?: string
  program?: string
  school?: string
  department?: string
  // detail lists
  responsibilities?: string[]
  technologies?: string[]
  contributions?: string[]
  // meta
  yearsOfExperience?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TechTitanSchema = new Schema<ITechTitan>(
  {
    name: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true },
    roleType: {
      type: String,
      enum: ["Lead", "Member", "Thread", "Advisor", "Contributor"],
      default: "Member",
    },
    specialization: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    // image
    image: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    // social
    email: { type: String, default: "" },
    github: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    website: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    // academic
    rollNumber: { type: String, default: "" },
    batch: { type: String, default: "" },
    program: { type: String, default: "" },
    school: { type: String, default: "" },
    department: { type: String, default: "" },
    // detail lists
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    contributions: { type: [String], default: [] },
    // meta
    yearsOfExperience: { type: Number, min: 0, max: 60, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

TechTitanSchema.index({ name: "text", role: "text", specialization: "text", bio: "text" })

export default mongoose.models.TechTitan || mongoose.model<ITechTitan>("TechTitan", TechTitanSchema)
