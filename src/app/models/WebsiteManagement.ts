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

export interface IWebsiteManagement extends Document {
  singletonKey: string
  maintenanceMode: boolean
  heroTitle: string
  heroSubtitle: string
  primaryColor: string
  supportEmail: string
  footerText: string
  seoTitle: string
  seoDescription: string
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

const WebsiteManagementSchema = new Schema<IWebsiteManagement>(
  {
    singletonKey: { type: String, required: true, unique: true, default: "primary" },
    maintenanceMode: { type: Boolean, default: false },
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
    pages: { type: [WebsitePageSchema], default: [] },
    announcements: { type: [WebsiteAnnouncementSchema], default: [] },
  },
  { timestamps: true },
)

WebsiteManagementSchema.index({ singletonKey: 1 }, { unique: true })
WebsiteManagementSchema.index({ "pages.route": 1 })

export default mongoose.models.WebsiteManagement ||
  mongoose.model<IWebsiteManagement>("WebsiteManagement", WebsiteManagementSchema)
