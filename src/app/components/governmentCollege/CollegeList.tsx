"use client"
import { useEffect, useMemo, useState } from "react"
import { BookOpen, Library, Wifi, Home, Beaker, Dumbbell, Monitor, Search, ExternalLink, MapPin } from "lucide-react"

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
  name?: string
  type?: string
  governingBody?: string
  category?: string
  eligibilitySummary?: string
  admissionProcess?: string
  eligibilityPageUrl?: string
  location?: { city?: string; state?: string }
  courses?: { name?: string; eligibility?: string }[]
  facilities?: string[]
  contact?: { website?: string }
}

const facilityIcons: { [key: string]: React.ReactElement } = {
  Library: <Library className="w-5 h-5 text-indigo-600" />,
  Hostel: <Home className="w-5 h-5 text-indigo-600" />,
  Labs: <Beaker className="w-5 h-5 text-indigo-600" />,
  "Wi-Fi": <Wifi className="w-5 h-5 text-indigo-600" />,
  "Sports Complex": <Dumbbell className="w-5 h-5 text-indigo-600" />,
  "Digital Classrooms": <Monitor className="w-5 h-5 text-indigo-600" />,
  "Computer Lab": <Monitor className="w-5 h-5 text-indigo-600" />,
}

const courseIcon = <BookOpen className="w-5 h-5 text-indigo-600 inline-block mr-1" />

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
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <a href={eligibilityPageUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-[#2E358B] hover:text-indigo-700 inline-flex items-center gap-1">
          {name}
          <ExternalLink className="w-4 h-4" />
        </a>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ownership === "State Government" ? "bg-emerald-100 text-emerald-700" : ownership === "Central Government" ? "bg-cyan-100 text-cyan-700" : "bg-violet-100 text-violet-700"}`}>
          {ownership}
        </span>
      </div>
      <p className="text-indigo-600 font-medium mb-4 inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{location}</p>
      <div className="mb-4">
        <h4 className="text-gray-700 font-semibold mb-1">Courses Offered</h4>
        <ul className="flex flex-wrap gap-3 text-indigo-600 text-sm font-medium">
          {courses.map((course, i) => (
            <li
              key={i}
              className="flex items-center border border-indigo-300 rounded-full px-3 py-1"
            >
              {courseIcon}
              {course}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-gray-700 font-semibold mb-1">Facilities</h4>
        <ul className="flex flex-wrap gap-3 text-indigo-600 text-sm font-medium">
          {facilities.map((fac, i) => (
            <li
              key={i}
              className="flex items-center gap-1 border border-indigo-300 rounded-full px-2 py-1"
            >
              {facilityIcons[fac] || null}
              {fac}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <p><span className="font-semibold">Eligibility:</span> {eligibilitySummary || "Check official college eligibility page for latest criteria."}</p>
        <p><span className="font-semibold">Admission Process:</span> {admissionProcess || "Check official admission portal for steps and timelines."}</p>
      </div>
    </div>
  )
}

export default function CollegeList({ filter }: { filter: string }) {
  const [query, setQuery] = useState("")
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
    const trimmed = query.trim()

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
  }, [query])

  const mapApiCollege = (item: ApiCollege, index: number) => {
      const ownership = item.governingBody === "central-government"
        ? "Central Government"
        : item.governingBody === "state-government"
          ? "State Government"
          : item.type === "private"
            ? "Private"
            : "State Government"

      const location = [item.location?.city, item.location?.state].filter(Boolean).join(", ") || "India"
      const courses = (item.courses || []).map((course) => course.name || "").filter(Boolean)
      const eligibilityFromCourses = (item.courses || []).map((course) => course.eligibility || "").filter(Boolean).join(" | ")

    return {
      _id: item._id || `api-${index}`,
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

  const source = query.trim() ? normalizedSearchResults : normalized

  const filtered = source.filter((c) => {
    const matchesFilter =
      filter === "All"
        ? true
        : ["Private", "State Government", "Central Government"].includes(filter)
          ? c.ownership === filter
          : c.courses.some((course) => course.includes(filter))

    return matchesFilter
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#2E358B]">Recommended Government & Private Colleges</h2>
        <div className="max-w-2xl mx-auto mb-8">
          <label htmlFor="college-search" className="sr-only">Search college by name</label>
          <div className="flex items-center gap-2 rounded-xl bg-white border border-indigo-200 px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-indigo-600" />
            <input
              id="college-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by college name, city, course, or eligibility"
              className="w-full bg-transparent outline-none text-slate-700"
            />
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-slate-600 mb-8">No college found. Try another college name or keyword.</p>
        ) : null}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, i) => (
            <CollegeCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
