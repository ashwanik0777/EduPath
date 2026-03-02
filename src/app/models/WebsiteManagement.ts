import mongoose, { Schema, type Document } from "mongoose"

export type WebsitePageStatus = "published" | "draft"

export interface IWebsitePage {
  pageId: string
  name: string
  route: string
  status: WebsitePageStatus
  owner: string
  title: string
  subtitle: string
  seoTitle: string
  seoDescription: string
  updatedAt?: Date
}

export interface IWebsiteAnnouncement {
  announcementId: string
  text: string
  active: boolean
  createdAt?: Date
}

export interface IPricingPlan {
  name: string
  description: string
  priceINR: number
  priceUSD: number
  features: string[]
}

export interface IFreeTier {
  enabled: boolean
  durationDays: number
  maxAssessments: number
  maxCounselingSessions: number
  features: string[]
  alwaysFreeFeatures: string[]
}

export interface IWebsitePricing {
  freeTier: IFreeTier
  monthlyPlan: IPricingPlan
  yearlyPlan: IPricingPlan
  singleCounselingPlan: IPricingPlan & {
    durationMinutes: number
  }
  firstSubscriptionDiscount: number
}

export interface IWebsiteManagement extends Document {
  singletonKey: string
  maintenanceMode: boolean
  collegeSearchProvider: "algolia" | "database"
  heroTitle: string
  heroSubtitle: string
  primaryColor: string
  supportEmail: string
  footerText: string
  seoTitle: string
  seoDescription: string
  pricing: IWebsitePricing
  pages: IWebsitePage[]
  announcements: IWebsiteAnnouncement[]
  createdAt: Date
  updatedAt: Date
}

const WebsitePageSchema = new Schema<IWebsitePage>(
  {
    pageId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    route: { type: String, required: true, trim: true },
    status: { type: String, enum: ["published", "draft"], default: "published" },
    owner: { type: String, default: "Admin Team" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false },
)

const WebsiteAnnouncementSchema = new Schema<IWebsiteAnnouncement>(
  {
    announcementId: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
)

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    priceINR: { type: Number, default: 0, min: 0 },
    priceUSD: { type: Number, default: 0, min: 0 },
    features: { type: [String], default: [] },
  },
  { _id: false },
)

const FreeTierSchema = new Schema<IFreeTier>(
  {
    enabled: { type: Boolean, default: true },
    durationDays: { type: Number, default: 7, min: 0 },
    maxAssessments: { type: Number, default: 1, min: 0 },
    maxCounselingSessions: { type: Number, default: 1, min: 0 },
    features: { type: [String], default: [] },
    alwaysFreeFeatures: { type: [String], default: [] },
  },
  { _id: false },
)

const WebsitePricingSchema = new Schema<IWebsitePricing>(
  {
    freeTier: {
      type: FreeTierSchema,
      default: {
        enabled: true,
        durationDays: 7,
        maxAssessments: 1,
        maxCounselingSessions: 1,
        features: [
          "Career discovery starter assessment",
          "1 counseling session with mentor",
          "Basic progress dashboard",
        ],
        alwaysFreeFeatures: [
          "Study resources access",
          "Government college listings",
          "Scholarship and exam notifications",
        ],
      },
    },
    monthlyPlan: {
      type: PricingPlanSchema,
      default: {
        name: "Pro Monthly",
        description: "For active students who need ongoing mentor and planning support.",
        priceINR: 1999,
        priceUSD: 29,
        features: [
          "Unlimited assessment attempts",
          "4 counseling sessions / month",
          "Personalized roadmap + reminders",
        ],
      },
    },
    yearlyPlan: {
      type: PricingPlanSchema,
      default: {
        name: "Pro Yearly",
        description: "Best value plan for complete yearly guidance and admissions prep.",
        priceINR: 14999,
        priceUSD: 199,
        features: [
          "Everything in Monthly",
          "Priority counselor booking",
          "Admission strategy guidance",
        ],
      },
    },
    singleCounselingPlan: {
      type: new Schema(
        {
          ...PricingPlanSchema.obj,
          durationMinutes: { type: Number, default: 45, min: 15 },
        },
        { _id: false },
      ),
      default: {
        name: "Single Counseling Session",
        description: "One focused session for stream/career/college decision support.",
        priceINR: 799,
        priceUSD: 12,
        durationMinutes: 45,
        features: [
          "1:1 live counseling",
          "Session summary notes",
          "Next-step action checklist",
        ],
      },
    },
    firstSubscriptionDiscount: { type: Number, default: 50, min: 0, max: 100 },
  },
  { _id: false },
)

const WebsiteManagementSchema = new Schema<IWebsiteManagement>(
  {
    singletonKey: { type: String, required: true, unique: true, default: "primary" },
    maintenanceMode: { type: Boolean, default: false },
    collegeSearchProvider: { type: String, enum: ["algolia", "database"], default: "algolia" },
    heroTitle: { type: String, default: "Discover Your Best Career Path" },
    heroSubtitle: {
      type: String,
      default: "Personalized guidance, government colleges, scholarships, and counseling in one platform.",
    },
    primaryColor: { type: String, default: "#4f46e5" },
    supportEmail: { type: String, default: "support@edupath.com" },
    footerText: { type: String, default: "© 2026 EduPath. All rights reserved." },
    seoTitle: { type: String, default: "EduPath - Career Guidance Platform" },
    seoDescription: {
      type: String,
      default: "Career planning and counseling platform for students.",
    },
    pricing: { type: WebsitePricingSchema, default: () => ({}) },
    pages: { type: [WebsitePageSchema], default: [] },
    announcements: { type: [WebsiteAnnouncementSchema], default: [] },
  },
  { timestamps: true },
)

WebsiteManagementSchema.index({ "pages.route": 1 })

export default mongoose.models.WebsiteManagement ||
  mongoose.model<IWebsiteManagement>("WebsiteManagement", WebsiteManagementSchema)
