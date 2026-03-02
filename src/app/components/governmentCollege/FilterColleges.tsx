"use client"
import { Search, BookOpen, Atom, DollarSign, Landmark, Building2, GraduationCap } from "lucide-react"

type OwnershipFilter = "Central Government" | "State Government" | "Private"
type StreamFilter = "All" | "Arts" | "Science" | "Commerce"

type FilterCollegesProps = {
  ownershipFilter: OwnershipFilter
  streamFilter: StreamFilter
  searchQuery: string
  onOwnershipChange: (filter: OwnershipFilter) => void
  onStreamChange: (filter: StreamFilter) => void
  onSearchChange: (query: string) => void
}

const ownershipTabs: { label: OwnershipFilter; icon: React.ReactNode }[] = [
  { label: "Central Government", icon: <GraduationCap className="w-4 h-4" /> },
  { label: "State Government", icon: <Landmark className="w-4 h-4" /> },
  { label: "Private", icon: <Building2 className="w-4 h-4" /> },
]

const streamTabs: { label: StreamFilter; icon: React.ReactNode }[] = [
  { label: "All", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Arts", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Science", icon: <Atom className="w-4 h-4" /> },
  { label: "Commerce", icon: <DollarSign className="w-4 h-4" /> },
]

export default function FilterColleges({
  ownershipFilter,
  streamFilter,
  searchQuery,
  onOwnershipChange,
  onStreamChange,
  onSearchChange,
}: FilterCollegesProps) {
  return (
    <section className="bg-slate-50 py-6 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="rounded-2xl border border-indigo-100 bg-white p-2 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {ownershipTabs.map((tab) => {
              const active = ownershipFilter === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => onOwnershipChange(tab.label)}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                  aria-pressed={active}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {streamTabs.map((tab) => {
              const active = streamFilter === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => onStreamChange(tab.label)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                  }`}
                  aria-pressed={active}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="w-full lg:w-[360px]">
            <label htmlFor="college-search" className="sr-only">Search colleges</label>
            <div className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-3 py-2 shadow-sm">
              <Search className="w-4 h-4 text-indigo-600" />
              <input
                id="college-search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search college, city, course, eligibility"
                className="w-full bg-transparent outline-none text-slate-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
