import mongoose, { Schema, type Document } from "mongoose"
import { DEFAULT_PRICING } from "@/app/lib/pricingDefaults"

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
  benefitLine: string
  popularTag: string
  ctaLabel: string
  priceINR: number
  priceUSD: number
  features: string[]
}

export interface IPlanComparisonRow {
  label: string
  monthlyPlanValue: string
  yearlyPlanValue: string
  singleCounselingPlanValue: string
}

export interface IFullComparisonRow {
  label: string
  category?: boolean
  values: string[]
}

export interface IPlanTestimonial {
  name: string
  planName: string
  quote: string
}

export interface IFreeTier {
  enabled: boolean
  durationDays: number
  maxAssessments: number
  maxCounselingSessions: number
  features: string[]
  alwaysFreeFeatures: string[]
}

export interface IAdditionalPricingPlan extends IPricingPlan {
  tag: string
}

export interface IWebsitePricing {
  freeTier: IFreeTier
  monthlyPlan: IPricingPlan
  yearlyPlan: IPricingPlan
  singleCounselingPlan: IPricingPlan & {
    durationMinutes: number
  }
  additionalPlans: IAdditionalPricingPlan[]
  firstSubscriptionDiscount: number
  comparisonRows: IPlanComparisonRow[]
  fullComparisonRows: IFullComparisonRow[]
  testimonials: IPlanTestimonial[]
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
    benefitLine: { type: String, default: "" },
    popularTag: { type: String, default: "" },
    ctaLabel: { type: String, default: "Get Started" },
    priceINR: { type: Number, default: 0, min: 0 },
    priceUSD: { type: Number, default: 0, min: 0 },
    features: { type: [String], default: [] },
  },
  { _id: false },
)

const PlanComparisonRowSchema = new Schema<IPlanComparisonRow>(
  {
    label: { type: String, required: true, trim: true },
    monthlyPlanValue: { type: String, default: "" },
    yearlyPlanValue: { type: String, default: "" },
    singleCounselingPlanValue: { type: String, default: "" },
  },
  { _id: false },
)

const FullComparisonRowSchema = new Schema<IFullComparisonRow>(
  {
    label: { type: String, required: true, trim: true },
    category: { type: Boolean, default: false },
    values: { type: [String], default: [] },
  },
  { _id: false },
)

const PlanTestimonialSchema = new Schema<IPlanTestimonial>(
  {
    name: { type: String, required: true, trim: true },
    planName: { type: String, default: "" },
    quote: { type: String, default: "" },
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

const AdditionalPricingPlanSchema = new Schema<IAdditionalPricingPlan>(
  {
    ...PricingPlanSchema.obj,
    tag: { type: String, default: "" },
  },
  { _id: false },
)

const WebsitePricingSchema = new Schema<IWebsitePricing>(
  {
    freeTier: {
      type: FreeTierSchema,
      default: DEFAULT_PRICING.freeTier,
    },
    monthlyPlan: {
      type: PricingPlanSchema,
      default: DEFAULT_PRICING.monthlyPlan,
    },
    yearlyPlan: {
      type: PricingPlanSchema,
      default: DEFAULT_PRICING.yearlyPlan,
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
        ...DEFAULT_PRICING.singleCounselingPlan,
      },
    },
    additionalPlans: {
      type: [AdditionalPricingPlanSchema],
      default: DEFAULT_PRICING.additionalPlans,
    },
    firstSubscriptionDiscount: { type: Number, default: DEFAULT_PRICING.firstSubscriptionDiscount, min: 0, max: 100 },
    comparisonRows: {
      type: [PlanComparisonRowSchema],
      default: DEFAULT_PRICING.comparisonRows,
    },
    fullComparisonRows: {
      type: [FullComparisonRowSchema],
      default: DEFAULT_PRICING.fullComparisonRows,
    },
    testimonials: {
      type: [PlanTestimonialSchema],
      default: DEFAULT_PRICING.testimonials,
    },
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
