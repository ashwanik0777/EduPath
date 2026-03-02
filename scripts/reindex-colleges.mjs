import "dotenv/config"
import mongoose from "mongoose"
import algoliasearch from "algoliasearch"

const mongoUri = process.env.MONGODB_URI
const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY
const indexName = process.env.ALGOLIA_COLLEGES_INDEX_NAME

if (!mongoUri) {
  console.error("Missing MONGODB_URI")
  process.exit(1)
}

if (!appId || !adminKey || !indexName) {
  console.error("Missing Algolia credentials. Required: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_COLLEGES_INDEX_NAME")
  process.exit(1)
}

const mapCollegeToAlgoliaRecord = (college) => {
  const city = college?.location?.city || ""
  const state = college?.location?.state || ""
  const courses = Array.isArray(college?.courses)
    ? college.courses.map((course) => course?.name).filter(Boolean)
    : []

  return {
    objectID: String(college?._id || ""),
    collegeId: String(college?._id || ""),
    name: String(college?.name || ""),
    shortName: String(college?.shortName || ""),
    type: String(college?.type || ""),
    governingBody: String(college?.governingBody || ""),
    category: String(college?.category || ""),
    city,
    state,
    locationText: [city, state].filter(Boolean).join(", "),
    courses,
    facilities: Array.isArray(college?.facilities) ? college.facilities : [],
    eligibilitySummary: String(college?.eligibilitySummary || ""),
    admissionProcess: String(college?.admissionProcess || ""),
    eligibilityPageUrl: String(college?.eligibilityPageUrl || college?.contact?.website || ""),
    recommendationScore: Number(college?.recommendationScore || 0),
    isRecommended: Boolean(college?.isRecommended),
    isActive: college?.isActive !== false,
  }
}

async function run() {
  await mongoose.connect(mongoUri)

  const collegesCollection = mongoose.connection.collection("colleges")
  const colleges = await collegesCollection.find({ isActive: { $ne: false } }).toArray()

  const client = algoliasearch(appId, adminKey)
  const index = client.initIndex(indexName)

  const records = colleges.map(mapCollegeToAlgoliaRecord).filter((record) => Boolean(record.objectID))

  if (records.length > 0) {
    await index.saveObjects(records)
  }

  console.log(`Reindex completed. Indexed ${records.length} colleges to ${indexName}.`)
  await mongoose.disconnect()
}

run().catch(async (error) => {
  console.error("Reindex script failed:", error)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
