import mongoose from "mongoose";
import WebsiteManagement from "../src/app/models/WebsiteManagement";
import { DEFAULT_PRICING, normalizePricing } from "../src/app/lib/pricingDefaults";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "test",
  });
}

export async function seedPricing() {
  await dbConnect();

  const existing = await WebsiteManagement.findOne({ singletonKey: "primary" });

  if (!existing) {
    await WebsiteManagement.create({
      singletonKey: "primary",
      pricing: DEFAULT_PRICING,
    });
    return "Pricing seeded: created primary website management document.";
  }

  existing.pricing = normalizePricing(existing.pricing || DEFAULT_PRICING);
  await existing.save();

  return "Pricing seeded: normalized and updated existing primary website management document.";
}

if (require.main === module) {
  seedPricing()
    .then((message) => {
      console.log(message);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Pricing seed failed:", error);
      process.exit(1);
    });
}
