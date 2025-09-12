import mongoose, { Schema, type Document } from "mongoose"

export interface IAssessmentResult extends Document {
  userId: mongoose.Types.ObjectId
  assessmentId: mongoose.Types.ObjectId
  responses: {
    questionId: string
    answer: string | number | string[]
    timeSpent?: number // in seconds
  }[]
  scores: {
    category: string
    score: number
    percentage: number
    interpretation: string
  }[]
  overallScore: number
  recommendations: {
    careerPaths: {
      field: string
      match: number // percentage match
      description: string
      suggestedCourses: string[]
      topColleges: string[]
    }[]
    nextSteps: string[]
    resources: {
      type: "article" | "video" | "course" | "book"
      title: string
      url?: string
      description: string
    }[]
  }
  completedAt: Date
  timeSpent: number // total time in minutes
  isValid: boolean
  createdAt: Date
  updatedAt: Date
}

const AssessmentResultSchema = new Schema<IAssessmentResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
      index: true,
    },
    responses: [
      {
        questionId: {
          type: String,
          required: true,
        },
        answer: {
          type: Schema.Types.Mixed,
          required: true,
        },
        timeSpent: {
          type: Number,
          min: 0,
        },
      },
    ],
    scores: [
      {
        category: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 0,
        },
        percentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        interpretation: {
          type: String,
          required: true,
        },
      },
    ],
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    recommendations: {
      careerPaths: [
        {
          field: {
            type: String,
            required: true,
          },
          match: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
          },
          description: {
            type: String,
            required: true,
          },
          suggestedCourses: [String],
          topColleges: [String],
        },
      ],
      nextSteps: [String],
      resources: [
        {
          type: {
            type: String,
            enum: ["article", "video", "course", "book"],
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          url: String,
          description: {
            type: String,
            required: true,
          },
        },
      ],
    },
    completedAt: {
      type: Date,
      required: true,
    },
    timeSpent: {
      type: Number,
      required: true,
      min: 1,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound indexes for better query performance
AssessmentResultSchema.index({ userId: 1, assessmentId: 1 })
AssessmentResultSchema.index({ userId: 1, completedAt: -1 })
AssessmentResultSchema.index({ assessmentId: 1, overallScore: -1 })

export default mongoose.models.AssessmentResult ||
  mongoose.model<IAssessmentResult>("AssessmentResult", AssessmentResultSchema)
