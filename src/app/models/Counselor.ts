import mongoose, { Schema, type Document } from "mongoose"

export interface ICounselor extends Document {
  userId: mongoose.Types.ObjectId
  profile: {
    firstName: string
    lastName: string
    displayName: string
    bio: string
    profileImage?: string
  }
  qualifications: {
    degree: string
    institution: string
    year: number
    specialization?: string
  }[]
  experience: {
    totalYears: number
    currentPosition: string
    organization: string
    previousRoles: {
      position: string
      organization: string
      duration: string
      description?: string
    }[]
  }
  specializations: string[]
  languages: string[]
  availability: {
    timezone: string
    workingHours: {
      start: string
      end: string
    }
    workingDays: string[]
    isAvailable: boolean
  }
  pricing: {
    sessionRate: number
    packageRates?: {
      name: string
      sessions: number
      price: number
      description: string
    }[]
    currency: string
  }
  rating: {
    average: number
    totalReviews: number
  }
  verification: {
    isVerified: boolean
    verifiedAt?: Date
    documents: {
      type: string
      url: string
      status: "pending" | "approved" | "rejected"
    }[]
  }
  statistics: {
    totalSessions: number
    totalStudents: number
    successRate: number
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CounselorSchema = new Schema<ICounselor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profile: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      displayName: {
        type: String,
        required: true,
        trim: true,
      },
      bio: {
        type: String,
        required: true,
        maxlength: 1000,
      },
      profileImage: String,
    },
    qualifications: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
          min: 1950,
          max: new Date().getFullYear(),
        },
        specialization: String,
      },
    ],
    experience: {
      totalYears: {
        type: Number,
        required: true,
        min: 0,
      },
      currentPosition: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        required: true,
      },
      previousRoles: [
        {
          position: String,
          organization: String,
          duration: String,
          description: String,
        },
      ],
    },
    specializations: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "At least one specialization is required",
      },
    },
    languages: {
      type: [String],
      required: true,
      default: ["English"],
    },
    availability: {
      timezone: {
        type: String,
        required: true,
        default: "Asia/Kolkata",
      },
      workingHours: {
        start: {
          type: String,
          required: true,
          default: "09:00",
        },
        end: {
          type: String,
          required: true,
          default: "18:00",
        },
      },
      workingDays: {
        type: [String],
        required: true,
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    pricing: {
      sessionRate: {
        type: Number,
        required: true,
        min: 0,
      },
      packageRates: [
        {
          name: String,
          sessions: Number,
          price: Number,
          description: String,
        },
      ],
      currency: {
        type: String,
        default: "INR",
      },
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verifiedAt: Date,
      documents: [
        {
          type: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
          },
        },
      ],
    },
    statistics: {
      totalSessions: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalStudents: {
        type: Number,
        default: 0,
        min: 0,
      },
      successRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
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
CounselorSchema.index({ "verification.isVerified": 1, isActive: 1 })
CounselorSchema.index({ specializations: 1 })
CounselorSchema.index({ "rating.average": -1 })
CounselorSchema.index({ "pricing.sessionRate": 1 })

export default mongoose.models.Counselor || mongoose.model<ICounselor>("Counselor", CounselorSchema)
