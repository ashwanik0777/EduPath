import { Briefcase, Atom, Heart, Palette, Scale, ChartPie } from "lucide-react"

const categories = [
  { name: "Engineering & Technology", icon: <Atom className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  { name: "Management & Marketing", icon: <ChartPie className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  { name: "Healthcare", icon: <Heart className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  { name: "Creativity & Art", icon: <Palette className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  { name: "Science & Research", icon: <Atom className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  { name: "Law & Order", icon: <Scale className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Commerce & Finance", icon: <Briefcase className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Humanities & Literature", icon: <Palette className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Education & Teaching", icon: <ChartPie className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Agriculture & Environment", icon: <Atom className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Media & Communication", icon: <Briefcase className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Sports & Fitness", icon: <Heart className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Hospitality & Tourism", icon: <Heart className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Social Work & NGO", icon: <Scale className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Defense & Security", icon: <Scale className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Fashion & Design", icon: <Palette className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Architecture & Planning", icon: <Briefcase className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
  // { name: "Psychology & Counseling", icon: <Heart className="w-8 h-8 mx-auto mb-3 text-[#704DC6]" /> },
]

export default function Categories() {
  return (
    <section className="py-16 bg-[#F9F6FF]">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#2E358B] tracking-tight drop-shadow-sm">
        Top Career Categories
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-6 max-w-7xl mx-auto">
        {categories.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-md border border-[#D5D5E8] p-6 text-center cursor-pointer
              font-semibold text-[#2E358B] flex flex-col items-center justify-center
              hover:shadow-xl hover:scale-105 transition-transform duration-300
              select-none"
            aria-label={c.name}
          >
            {c.icon}
            <span className="mt-2">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
