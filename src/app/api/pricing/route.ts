import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import WebsiteManagement from "@/app/models/WebsiteManagement";
import { DEFAULT_PRICING, normalizePricing, type WebsitePricing } from "@/app/lib/pricingDefaults";

export async function GET() {
  await connectDB();
  const doc = (await WebsiteManagement.findOne({ singletonKey: "primary" }).lean()) as {
    pricing?: WebsitePricing;
    maintenanceMode?: boolean;
    supportEmail?: string;
  } | null;

  return NextResponse.json({
    success: true,
    pricing: normalizePricing(doc?.pricing || DEFAULT_PRICING),
    maintenanceMode: doc?.maintenanceMode || false,
    supportEmail: doc?.supportEmail || "support@edupath.com",
  });
}
