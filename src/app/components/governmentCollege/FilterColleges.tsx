"use client"
import { Search, BookOpen, Atom, DollarSign, Landmark, Building2, GraduationCap, X, SlidersHorizontal } from "lucide-react"

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

const ownershipTabs: {
  label: OwnershipFilter
  icon: React.ReactNode
  activeClass: string
  ringClass: string
}[] = [
  {
    label: "Central Government",
    icon: <GraduationCap className="w-4 h-4" />,
    activeClass: "border-2 border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm",
    ringClass: "ring-2 ring-indigo-200",
  },
  {
    label: "State Government",
    icon: <Landmark className="w-4 h-4" />,
    activeClass: "border-2 border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm",
    ringClass: "ring-2 ring-emerald-200",
  },
  {
    label: "Private",
    icon: <Building2 className="w-4 h-4" />,
    activeClass: "border-2 border-violet-500 bg-violet-50 text-violet-700 shadow-sm",
    ringClass: "ring-2 ring-violet-200",
  },
]

const streamTabs: {
  label: StreamFilter
  icon: React.ReactNode
  activeClass: string
}[] = [
  { label: "All", icon: <BookOpen className="w-3.5 h-3.5" />, activeClass: "border-2 border-slate-500 bg-slate-800 text-white" },
  { label: "Arts", icon: <BookOpen className="w-3.5 h-3.5" />, activeClass: "border-2 border-amber-500 bg-amber-50 text-amber-700" },
  { label: "Science", icon: <Atom className="w-3.5 h-3.5" />, activeClass: "border-2 border-blue-500 bg-blue-50 text-blue-700" },
  { label: "Commerce", icon: <DollarSign className="w-3.5 h-3.5" />, activeClass: "border-2 border-teal-500 bg-teal-50 text-teal-700" },
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
    <section className="bg-gradient-to-b from-slate-50 to-white py-8 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 space-y-5">

        {/* Header label */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Filter Colleges</span>
        </div>

        {/* Ownership Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ownershipTabs.map((tab) => {
            const active = ownershipFilter === tab.label
            return (
              <button
                key={tab.label}
                onClick={() => onOwnershipChange(tab.label)}
                className={`relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  active
                    ? `${tab.activeClass} ${tab.ringClass}`
                    : "border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                aria-pressed={active}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Stream Tabs + Search Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Stream Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide mr-1">Stream:</span>
            {streamTabs.map((tab) => {
              const active = streamFilter === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => onStreamChange(tab.label)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                    active
                      ? tab.activeClass
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  aria-pressed={active}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-[400px]">
            <label htmlFor="college-search" className="sr-only">Search colleges</label>
            <div className="relative flex items-center gap-2 rounded-2xl border-2 border-indigo-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <input
                id="college-search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search college, city, course, eligibility…"
                className="w-full bg-transparent outline-none text-slate-700 text-sm placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3 text-slate-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
