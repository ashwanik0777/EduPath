"use client"
import { useState } from "react"

export default function FilterColleges({ onFilter }: { onFilter: (filter: string) => void }) {
  const [selected, setSelected] = useState("All")

  const filters = ["All", "Arts", "Science", "Commerce"]

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => { setSelected(f); onFilter(f) }}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              selected === f ? "bg-[#704DC6] text-white" : "bg-white text-gray-700 border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}
