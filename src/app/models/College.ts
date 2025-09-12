import mongoose, { Schema, type Document } from "mongoose"

export interface ICollege extends Document {
  name: string
  shortName: string
  type: "government" | "private" | "deemed"
  category: "engineering" | "medical" | "arts" | "science" | "commerce" | "law" | "management"
  location: {
    city: string
    state: string
    pincode: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  established: number
  affiliation: string
  accreditation: string[]
  ranking: {
    nirf?: number
    nac?: string
    other?: { name: string; rank: number }[]
  }
  courses: {
    name: string
    degree: "UG" | "PG" | "Diploma" | "PhD"
    duration: number
    seats: number
    fees: {
      annual: number
      total: number
      currency: string
    }
    eligibility: string
    entrance: string[]
  }[]
  facilities: string[]
  placement: {
    percentage: number
    averagePackage: number
    highestPackage: number
    topRecruiters: string[]
  }
  contact: {
    phone: string
    email: string
    website: string
    address: string
  }
  images: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CollegeSchema = new Schema<ICollege>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    shortName: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["government", "private", "deemed"],
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ["engineering", "medical", "arts", "science", "commerce", "law", "management"],
      required: true,
      index: true,
    },
    location: {
      city: {
        type: String,
        required: true,
        index: true,
      },
      state: {
        type: String,
        required: true,
        index: true,
      },
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    established: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
    affiliation: String,
    accreditation: [String],
    ranking: {
      nirf: Number,
      nac: String,
      other: [
        {
          name: String,
          rank: Number,
        },
      ],
    },
    courses: [
      {
        name: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          enum: ["UG", "PG", "Diploma", "PhD"],
          required: true,
        },
        duration: {
          type: Number,
          required: true,
          min: 1,
          max: 8,
        },
        seats: {
          type: Number,
          min: 1,
        },
        fees: {
          annual: {
            type: Number,
            min: 0,
          },
          total: {
            type: Number,
            min: 0,
          },
          currency: {
            type: String,
            default: "INR",
          },
        },
        eligibility: String,
        entrance: [String],
      },
    ],
    facilities: [String],
    placement: {
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      averagePackage: {
        type: Number,
        min: 0,
      },
      highestPackage: {
        type: Number,
        min: 0,
      },
      topRecruiters: [String],
    },
    contact: {
      phone: String,
      email: String,
      website: String,
      address: String,
    },
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound indexes for better search performance
CollegeSchema.index({ type: 1, category: 1, isActive: 1 })
CollegeSchema.index({ "location.state": 1, "location.city": 1 })
CollegeSchema.index({ name: "text", shortName: "text" })

export default mongoose.models.College || mongoose.model<ICollege>("College", CollegeSchema)
