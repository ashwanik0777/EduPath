import algoliasearch, { SearchIndex } from "algoliasearch"

const appId = process.env.ALGOLIA_APP_ID || ""
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY || ""
const indexName = process.env.ALGOLIA_COLLEGES_INDEX_NAME || ""

function hasAlgoliaConfig() {
  return Boolean(appId && adminApiKey && indexName)
}

export function getCollegesAlgoliaIndex(): SearchIndex | null {
  if (!hasAlgoliaConfig()) return null

  const client = algoliasearch(appId, adminApiKey)
  return client.initIndex(indexName)
}

export function mapCollegeToAlgoliaRecord(college: Record<string, any>) {
  const city = college?.location?.city || ""
  const state = college?.location?.state || ""
  const courses = Array.isArray(college?.courses)
    ? college.courses.map((course: Record<string, any>) => course?.name).filter(Boolean)
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

export async function indexCollegeInAlgolia(college: Record<string, any>) {
  const index = getCollegesAlgoliaIndex()
  if (!index) return

  const record = mapCollegeToAlgoliaRecord(college)
  if (!record.objectID) return

  await index.saveObject(record)
}

export async function removeCollegeFromAlgolia(collegeId: string) {
  const index = getCollegesAlgoliaIndex()
  if (!index || !collegeId) return

  await index.deleteObject(collegeId)
}
