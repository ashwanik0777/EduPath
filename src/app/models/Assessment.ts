import mongoose, { Schema, type Document } from "mongoose"

export interface IAssessment extends Document {
  title: string
  description: string
  type: "career" | "aptitude" | "personality" | "skill"
  duration: number // in minutes
  totalQuestions: number
  questions: {
    id: string
    question: string
    type: "multiple-choice" | "rating" | "text"
    options?: string[]
    category: string
    weight: number
  }[]
  scoring: {
    categories: string[]
    weights: { [key: string]: number }
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["career", "aptitude", "personality", "skill"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 5,
      max: 180,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    questions: [
      {
        id: {
          type: String,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["multiple-choice", "rating", "text"],
          required: true,
        },
        options: [String],
        category: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          default: 1,
          min: 0.1,
          max: 5,
        },
      },
    ],
    scoring: {
      categories: [String],
      weights: {
        type: Map,
        of: Number,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
AssessmentSchema.index({ type: 1, isActive: 1 })
AssessmentSchema.index({ createdAt: -1 })

export default mongoose.models.Assessment || mongoose.model<IAssessment>("Assessment", AssessmentSchema)
