import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "student" | "counselor" | "admin"
  profile: {
    firstName?: string
    lastName?: string
    dateOfBirth?: Date
    gender?: "male" | "female" | "other"
    phone?: string
    address?: {
      street?: string
      city?: string
      state?: string
      pincode?: string
      country?: string
    }
    profileImage?: string
  }
  academic: {
    currentLevel?: "high-school" | "undergraduate" | "postgraduate" | "other"
    institution?: string
    course?: string
    year?: number
    percentage?: number
    interests?: string[]
  }
  preferences: {
    careerFields?: string[]
    preferredLocations?: string[]
    budgetRange?: {
      min: number
      max: number
    }
    notifications?: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  assessments: {
    assessmentId: mongoose.Types.ObjectId
    completedAt: Date
    score: number
    results: any
  }[]
  sessions: {
    sessionId: mongoose.Types.ObjectId
    counselorId: mongoose.Types.ObjectId
    scheduledAt: Date
    status: "scheduled" | "completed" | "cancelled"
  }[]
  verification: {
    email: {
      isVerified: boolean
      verifiedAt?: Date
      token?: string
    }
    phone: {
      isVerified: boolean
      verifiedAt?: Date
      otp?: string
    }
  }
  resetPassword: {
    token?: string
    expiresAt?: Date
  }
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
    quizResult?: any;
    quizCompleted?: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "counselor", "admin"],
      default: "student",
      index: true,
    },
    profile: {
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: {
          type: String,
          default: "India",
        },
      },
      profileImage: String,
    },
    academic: {
      currentLevel: {
        type: String,
        enum: ["high-school", "undergraduate", "postgraduate", "other"],
      },
      institution: String,
      course: String,
      board: String,
      year: {
        type: Number,
        min: 1,
        max: 10,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      interests: [String],
    },
    preferences: {
      careerFields: [String],
      preferredCourses: [String],
      targetedExams: [String],
      careerGoal: { type: String },
      preferredLocations: [String],
      budgetRange: {
        min: {
          type: Number,
          min: 0,
        },
        max: {
          type: Number,
          min: 0,
        },
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
    },
    assessments: [
      {
        assessmentId: {
          type: Schema.Types.ObjectId,
          ref: "Assessment",
          required: true,
        },
        completedAt: {
          type: Date,
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        results: Schema.Types.Mixed,
      },
    ],
    sessions: [
      {
        sessionId: {
          type: Schema.Types.ObjectId,
          ref: "CounselingSession",
          required: true,
        },
        counselorId: {
          type: Schema.Types.ObjectId,
          ref: "Counselor",
          required: true,
        },
        scheduledAt: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["scheduled", "completed", "cancelled"],
          default: "scheduled",
        },
      },
    ],
    verification: {
      email: {
        isVerified: {
          type: Boolean,
          default: false,
        },
        verifiedAt: Date,
        token: String,
      },
      phone: {
        isVerified: {
          type: Boolean,
          default: false,
        },
        verifiedAt: Date,
        otp: String,
      },
    },
    resetPassword: {
      token: String,
      expiresAt: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    quizResult: {
      type: Object,
      default: null,
    },
    quizCompleted: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
UserSchema.index({ email: 1, isActive: 1 })
UserSchema.index({ role: 1, isActive: 1 })
UserSchema.index({ createdAt: -1 })

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
