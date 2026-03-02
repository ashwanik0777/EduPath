"use client"
import { useState } from "react"
import { BookOpen, Atom, DollarSign, Layers, Landmark, Building2, GraduationCap } from "lucide-react"

const filterIcons = {
  All: <Layers className="w-5 h-5 mr-2" />,
  "State Government": <Landmark className="w-5 h-5 mr-2" />,
  "Central Government": <GraduationCap className="w-5 h-5 mr-2" />,
  Private: <Building2 className="w-5 h-5 mr-2" />,
  Arts: <BookOpen className="w-5 h-5 mr-2" />,
  Science: <Atom className="w-5 h-5 mr-2" />,
  Commerce: <DollarSign className="w-5 h-5 mr-2" />,
}

export default function FilterColleges({ onFilter, initialFilter = "All" }: { onFilter: (filter: string) => void; initialFilter?: string }) {
  const [selected, setSelected] = useState(initialFilter)

  const filters = ["All", "Private", "State Government", "Central Government", "Arts", "Science", "Commerce"]

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
        {filters.map((f) => {
          const isSelected = selected === f
          return (
            <button
              key={f}
              onClick={() => {
                setSelected(f)
                onFilter(f)
              }}
              className={`flex items-center px-6 py-2 rounded-full font-medium shadow-sm transition-all duration-300
                ${
                  isSelected
                    ? "bg-[#704DC6] text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              aria-pressed={isSelected}
              aria-label={`Filter by ${f}`}
            >
              {filterIcons[f as keyof typeof filterIcons]}
              {f}
            </button>
          )
        })}
      </div>
    </div>
  )
}
