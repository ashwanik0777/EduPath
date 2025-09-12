"use client"
import { useState } from "react"
import { BookOpen, Atom, DollarSign, Layers } from "lucide-react"

const filterIcons = {
  All: <Layers className="w-5 h-5 mr-2" />,
  Arts: <BookOpen className="w-5 h-5 mr-2" />,
  Science: <Atom className="w-5 h-5 mr-2" />,
  Commerce: <DollarSign className="w-5 h-5 mr-2" />,
}

export default function FilterColleges({ onFilter }: { onFilter: (filter: string) => void }) {
  const [selected, setSelected] = useState("All")

  const filters = ["All", "Arts", "Science", "Commerce"]

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
