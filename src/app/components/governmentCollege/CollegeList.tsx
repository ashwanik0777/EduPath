"use client"
import { useEffect, useMemo, useState } from "react"
import { BookOpen, Library, Wifi, Home, Beaker, Dumbbell, Monitor, ExternalLink, MapPin } from "lucide-react"

const colleges = [
  {
    _id: "demo-1",
    name: "Lady Shri Ram College for Women",
    location: "New Delhi",
    ownership: "Central Government",
    courses: ["B.A", "B.Sc", "B.Com", "BCA"],
    facilities: ["Library", "Hostel", "Labs", "Wi-Fi"],
    eligibilitySummary: "12th pass with minimum 50% marks; merit based admission for UG programs.",
    admissionProcess: "Apply through official admission portal and complete document verification.",
    eligibilityPageUrl: "https://lsr.edu.in/admissions/",
  },
  {
    _id: "demo-2",
    name: "Government Arts College",
    location: "Bengaluru, Karnataka",
    ownership: "State Government",
    courses: ["B.Sc", "B.A", "B.Com", "BBA"],
    facilities: ["Library", "Sports Complex", "Labs"],
    eligibilitySummary: "12th pass from recognized board; category-wise cutoff applies.",
    admissionProcess: "State counseling portal registration, merit list, and college reporting.",
    eligibilityPageUrl: "https://dce.karnataka.gov.in/english",
  },
  {
    _id: "demo-3",
    name: "Presidency College",
    location: "Chennai, Tamil Nadu",
    ownership: "State Government",
    courses: ["B.Com", "B.A", "B.Sc"],
    facilities: ["Hostel", "Digital Classrooms", "Library"],
    eligibilitySummary: "12th with subject-specific requirements depending on program.",
    admissionProcess: "Apply online, check merit/cutoff list, and attend counseling.",
    eligibilityPageUrl: "https://presidencycollegechennai.ac.in/",
  },
  {
    _id: "demo-4",
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    ownership: "Central Government",
    courses: ["B.A", "M.A", "M.Sc"],
    facilities: ["Library", "Computer Lab"],
    eligibilitySummary: "Entrance-based admission; minimum qualification varies by program.",
    admissionProcess: "Register for entrance test and complete university counseling steps.",
    eligibilityPageUrl: "https://www.jnu.ac.in/admissions",
  },
  {
    _id: "demo-5",
    name: "Symbiosis College of Arts and Commerce",
    location: "Pune, Maharashtra",
    ownership: "Private",
    courses: ["B.A", "B.Sc"],
    facilities: ["Library", "Hostel", "Wi-Fi"],
    eligibilitySummary: "12th pass with program-specific cutoffs; some courses may have entrance.",
    admissionProcess: "Online application, eligibility screening, and merit/entrance rounds.",
    eligibilityPageUrl: "https://symbiosiscollege.edu.in/admissions",
  },
  {
    _id: "demo-6",
    name: "St. Xavier's College",
    location: "Mumbai, Maharashtra",
    ownership: "Private",
    courses: ["B.Sc", "BCA", "B.Tech"],
    facilities: ["Labs", "Library", "Sports Complex"],
    eligibilitySummary: "12th pass with required subjects; admission as per course-specific criteria.",
    admissionProcess: "Submit online form and complete institution-level selection rounds.",
    eligibilityPageUrl: "https://xaviers.ac/admission",
  },
  {
    _id: "demo-7",
    name: "Christ University",
    location: "Bengaluru, Karnataka",
    ownership: "Private",
    courses: ["B.Com", "BBA"],
    facilities: ["Library", "Digital Classrooms", "Wi-Fi"],
    eligibilitySummary: "Minimum 50% in 12th; selection process includes skill assessment/interview.",
    admissionProcess: "Apply online, appear for selection process, and complete admission formalities.",
    eligibilityPageUrl: "https://christuniversity.in/admission",
  },
  {
    _id: "demo-8",
    name: "Amity University",
    location: "Kolkata, West Bengal",
    ownership: "Private",
    courses: ["B.Com", "BBA"],
    facilities: ["Library", "Digital Classrooms", "Wi-Fi"],
    eligibilitySummary: "Program-wise minimum marks in qualifying exam, plus entrance/interview if applicable.",
    admissionProcess: "Application submission, eligibility check, and admission confirmation.",
    eligibilityPageUrl: "https://www.amity.edu/kolkata/admission-procedure.aspx",
  },
]

type ApiCollege = {
  _id: string
  objectID?: string
  name?: string
  ownership?: string
  type?: string
  governingBody?: string
  category?: string
  eligibilitySummary?: string
  admissionProcess?: string
  eligibilityPageUrl?: string
  city?: string
  state?: string
  location?: { city?: string; state?: string }
  courses?: ({ name?: string; eligibility?: string } | string)[]
  facilities?: string[]
  contact?: { website?: string }
}

const facilityIcons: { [key: string]: React.ReactElement } = {
  Library: <Library className="w-3.5 h-3.5 text-slate-500" />,
  Hostel: <Home className="w-3.5 h-3.5 text-slate-500" />,
  Labs: <Beaker className="w-3.5 h-3.5 text-slate-500" />,
  "Wi-Fi": <Wifi className="w-3.5 h-3.5 text-slate-500" />,
  "Sports Complex": <Dumbbell className="w-3.5 h-3.5 text-slate-500" />,
  "Digital Classrooms": <Monitor className="w-3.5 h-3.5 text-slate-500" />,
  "Computer Lab": <Monitor className="w-3.5 h-3.5 text-slate-500" />,
}

const ownershipColors = {
  "Central Government": {
    border: "border-indigo-200",
    hoverBorder: "hover:border-indigo-300",
    accent: "from-indigo-500 to-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    chip: "border-indigo-200 bg-indigo-50 text-indigo-700",
    btn: "border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    nameColor: "text-indigo-900",
    loc: "text-indigo-500",
  },
  "State Government": {
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    accent: "from-emerald-500 to-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    btn: "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    nameColor: "text-emerald-900",
    loc: "text-emerald-600",
  },
  "Private": {
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    accent: "from-violet-500 to-violet-600",
    badge: "bg-violet-100 text-violet-700",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    btn: "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
    nameColor: "text-violet-900",
    loc: "text-violet-600",
  },
}

function CollegeCard({ name, location, ownership, courses, facilities, eligibilitySummary, admissionProcess, eligibilityPageUrl }: {
  name: string;
  location: string;
  ownership: string;
  courses: string[];
  facilities: string[];
  eligibilitySummary: string;
  admissionProcess: string;
  eligibilityPageUrl: string;
}) {
  const c = ownershipColors[ownership as keyof typeof ownershipColors] || ownershipColors["Central Government"]
  const shortLabel = ownership === "Central Government" ? "Central" : ownership === "State Government" ? "State" : "Private"

  return (
    <div className={`group relative bg-white rounded-3xl border-2 ${c.border} ${c.hoverBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden`}>
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${c.accent} rounded-t-3xl`} />
      {/* Bottom hover accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 pt-2">
        <a
          href={eligibilityPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-base font-bold ${c.nameColor} hover:underline inline-flex items-start gap-1 leading-snug`}
        >
          {name}
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-50" />
        </a>
        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
          {shortLabel}
        </span>
      </div>

      {/* Location */}
      <div className={`flex items-center gap-1.5 text-sm font-medium ${c.loc}`}>
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        {location}
      </div>

      {/* Courses */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Courses Offered</h4>
        <div className="flex flex-wrap gap-1.5">
          {courses.slice(0, 4).map((course, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-1 ${c.chip}`}
            >
              <BookOpen className="w-3 h-3" />
              {course.length > 18 ? course.slice(0, 18) + "…" : course}
            </span>
          ))}
          {courses.length > 4 && (
            <span className="text-xs text-slate-400 px-2 py-1">+{courses.length - 4} more</span>
          )}
        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Facilities</h4>
        <div className="flex flex-wrap gap-1.5">
          {facilities.slice(0, 5).map((fac, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs font-medium border border-slate-200 rounded-full px-2.5 py-1 bg-white text-slate-600"
            >
              {facilityIcons[fac] || null}
              {fac}
            </span>
          ))}
          {facilities.length > 5 && (
            <span className="text-xs text-slate-400 px-2">+{facilities.length - 5}</span>
          )}
        </div>
      </div>

      {/* Eligibility */}
      {(eligibilitySummary || admissionProcess) && (
        <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-3">
          {eligibilitySummary && (
            <p><span className="font-semibold text-slate-700">Eligibility: </span>{eligibilitySummary.length > 90 ? eligibilitySummary.slice(0, 90) + "…" : eligibilitySummary}</p>
          )}
          {admissionProcess && (
            <p><span className="font-semibold text-slate-700">Admission: </span>{admissionProcess.length > 90 ? admissionProcess.slice(0, 90) + "…" : admissionProcess}</p>
          )}
        </div>
      )}

      {/* CTA */}
      <a
        href={eligibilityPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2 ${c.btn} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
      >
        View Details
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}

type OwnershipFilter = "Central Government" | "State Government" | "Private"
type StreamFilter = "All" | "Arts" | "Science" | "Commerce"

export default function CollegeList({ ownershipFilter, streamFilter, searchQuery }: { ownershipFilter: OwnershipFilter; streamFilter: StreamFilter; searchQuery: string }) {
  const [apiColleges, setApiColleges] = useState<ApiCollege[]>([])
  const [searchResults, setSearchResults] = useState<ApiCollege[]>([])

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/api/colleges?page=1&limit=200&sortBy=name&sortOrder=asc", { cache: "no-store" })
        const data = await response.json()
        if (data?.success && Array.isArray(data?.data?.colleges)) {
          setApiColleges(data.data.colleges)
        }
      } catch {
        setApiColleges([])
      }
    }
    fetchColleges()
  }, [])

  useEffect(() => {
    const trimmed = searchQuery.trim()

    if (!trimmed) {
      setSearchResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/colleges/search?q=${encodeURIComponent(trimmed)}&limit=200`, { cache: "no-store" })
        const data = await response.json()
        if (data?.success && Array.isArray(data?.data)) {
          setSearchResults(data.data)
          return
        }
      } catch {
      }
      setSearchResults([])
    }, 250)

    return () => clearTimeout(timeout)
  }, [searchQuery])

  const mapApiCollege = (item: ApiCollege, index: number) => {
      const ownership = item.governingBody === "central-government"
        ? "Central Government"
        : item.governingBody === "state-government"
          ? "State Government"
          : item.type === "private"
            ? "Private"
            : item.ownership || "State Government"

      const city = item.location?.city || item.city || ""
      const state = item.location?.state || item.state || ""
      const location = [city, state].filter(Boolean).join(", ") || "India"
      const courses = (item.courses || [])
        .map((course) => (typeof course === "string" ? course : course.name || ""))
        .filter(Boolean)
      const eligibilityFromCourses = (item.courses || [])
        .map((course) => (typeof course === "string" ? "" : course.eligibility || ""))
        .filter(Boolean)
        .join(" | ")

    return {
      _id: item._id || item.objectID || `api-${index}`,
      name: item.name || "Unnamed College",
      location,
      ownership,
      courses: courses.length ? courses : ["Course details available on official website"],
      facilities: item.facilities?.length ? item.facilities : ["Library"],
      eligibilitySummary: item.eligibilitySummary || eligibilityFromCourses || "",
      admissionProcess: item.admissionProcess || "",
      eligibilityPageUrl: item.eligibilityPageUrl || item.contact?.website || "#",
    }
  }

  const normalized = useMemo(() => {
    if (!apiColleges.length) return colleges
    return apiColleges.map((item, index) => mapApiCollege(item, index))
  }, [apiColleges])

  const normalizedSearchResults = useMemo(
    () => searchResults.map((item, index) => mapApiCollege(item, index)),
    [searchResults],
  )

  const localSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return normalized

    return normalized.filter((college) => {
      return (
        college.name.toLowerCase().includes(q) ||
        college.location.toLowerCase().includes(q) ||
        college.eligibilitySummary.toLowerCase().includes(q) ||
        college.admissionProcess.toLowerCase().includes(q) ||
        college.courses.some((course) => course.toLowerCase().includes(q))
      )
    })
  }, [normalized, searchQuery])

  const source = !searchQuery.trim()
    ? normalized
    : normalizedSearchResults.length > 0
      ? normalizedSearchResults
      : localSearchResults

  const streamMatches = (college: {
    courses: string[]
    eligibilitySummary: string
  }) => {
    if (streamFilter === "All") return true

    const joined = `${college.courses.join(" ")} ${college.eligibilitySummary}`.toLowerCase()

    if (streamFilter === "Arts") {
      return /(arts|humanities|literature|history|political|ba\b|b\.a\b|ma\b|m\.a\b)/i.test(joined)
    }

    if (streamFilter === "Science") {
      return /(science|physics|chemistry|biology|math|engineering|technology|bsc\b|b\.sc\b|msc\b|m\.sc\b|btech\b|b\.tech\b|bca\b)/i.test(joined)
    }

    return /(commerce|finance|account|economics|business|bcom\b|b\.com\b|mcom\b|m\.com\b|bba\b|mba\b)/i.test(joined)
  }

  const filtered = source.filter((c) => {
    return c.ownership === ownershipFilter && streamMatches(c)
  })

  const categoryLabel = ownershipFilter === "Central Government" ? "Central Government" : ownershipFilter === "State Government" ? "State Government" : "Private"
  const categoryColor = ownershipFilter === "Central Government" ? "indigo" : ownershipFilter === "State Government" ? "emerald" : "violet"

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                categoryColor === "indigo" ? "bg-indigo-100 text-indigo-700" :
                categoryColor === "emerald" ? "bg-emerald-100 text-emerald-700" :
                "bg-violet-100 text-violet-700"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {categoryLabel} Colleges
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${
              categoryColor === "indigo" ? "from-indigo-700 to-indigo-500" :
              categoryColor === "emerald" ? "from-emerald-700 to-emerald-500" :
              "from-violet-700 to-violet-500"
            } bg-clip-text text-transparent`}>
              Explore {categoryLabel} Colleges
            </h2>
          </div>
          {filtered.length > 0 && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                <span className={`w-2 h-2 rounded-full ${
                  categoryColor === "indigo" ? "bg-indigo-500" :
                  categoryColor === "emerald" ? "bg-emerald-500" :
                  "bg-violet-500"
                }`} />
                {filtered.length} college{filtered.length !== 1 ? "s" : ""} found
              </span>
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-700">No colleges found</p>
              <p className="text-sm text-slate-500">Try adjusting your filters or search keywords.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <CollegeCard key={i} {...c} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
