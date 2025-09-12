import mongoose, { Schema, type Document } from "mongoose"

export interface ICounselingSession extends Document {
  studentId: mongoose.Types.ObjectId
  counselorId: mongoose.Types.ObjectId
  type: "career-guidance" | "college-selection" | "course-planning" | "general"
  scheduledAt: Date
  duration: number // in minutes
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show"
  meetingDetails: {
    platform: "zoom" | "google-meet" | "phone" | "in-person"
    meetingUrl?: string
    meetingId?: string
    password?: string
    location?: string
  }
  agenda: string[]
  notes: {
    counselorNotes?: string
    studentFeedback?: string
    actionItems?: string[]
    followUpRequired?: boolean
    nextSessionDate?: Date
  }
  assessment: {
    rating?: number // 1-5 stars
    feedback?: string
    wouldRecommend?: boolean
  }
  payment: {
    amount: number
    currency: string
    status: "pending" | "paid" | "refunded" | "failed"
    transactionId?: string
    paidAt?: Date
  }
  cancellation: {
    cancelledBy?: "student" | "counselor" | "admin"
    reason?: string
    cancelledAt?: Date
    refundAmount?: number
  }
  createdAt: Date
  updatedAt: Date
}

const CounselingSessionSchema = new Schema<ICounselingSession>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    counselorId: {
      type: Schema.Types.ObjectId,
      ref: "Counselor",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["career-guidance", "college-selection", "course-planning", "general"],
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 15,
      max: 180,
      default: 60,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled", "no-show"],
      default: "scheduled",
      index: true,
    },
    meetingDetails: {
      platform: {
        type: String,
        enum: ["zoom", "google-meet", "phone", "in-person"],
        required: true,
      },
      meetingUrl: String,
      meetingId: String,
      password: String,
      location: String,
    },
    agenda: {
      type: [String],
      default: [],
    },
    notes: {
      counselorNotes: String,
      studentFeedback: String,
      actionItems: [String],
      followUpRequired: {
        type: Boolean,
        default: false,
      },
      nextSessionDate: Date,
    },
    assessment: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      feedback: String,
      wouldRecommend: Boolean,
    },
    payment: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
      status: {
        type: String,
        enum: ["pending", "paid", "refunded", "failed"],
        default: "pending",
        index: true,
      },
      transactionId: String,
      paidAt: Date,
    },
    cancellation: {
      cancelledBy: {
        type: String,
        enum: ["student", "counselor", "admin"],
      },
      reason: String,
      cancelledAt: Date,
      refundAmount: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Compound indexes for better query performance
CounselingSessionSchema.index({ studentId: 1, status: 1 })
CounselingSessionSchema.index({ counselorId: 1, scheduledAt: 1 })
CounselingSessionSchema.index({ scheduledAt: 1, status: 1 })

export default mongoose.models.CounselingSession ||
  mongoose.model<ICounselingSession>("CounselingSession", CounselingSessionSchema)
