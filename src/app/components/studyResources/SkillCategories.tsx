"use client"
import { Code, Book, Briefcase, Languages, Brain, Award, ArrowRight } from "lucide-react"

const categories = [
  {
    icon: Code,
    title: "Tech Skills",
    desc: "Web Dev, AI, Data Science, App Development & more",
    tag: "50+ Courses",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-200",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    accent: "from-violet-500 to-violet-600",
    tagClass: "bg-violet-100 text-violet-700",
    tagHover: "group-hover:bg-violet-600 group-hover:text-white",
  },
  {
    icon: Book,
    title: "Exam Prep",
    desc: "NEET, JEE, UPSC, SSC, Banking & competitive exams",
    tag: "100+ Tests",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    accent: "from-blue-500 to-blue-600",
    tagClass: "bg-blue-100 text-blue-700",
    tagHover: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    icon: Briefcase,
    title: "Career Skills",
    desc: "Resume building, Interview prep & Aptitude tests",
    tag: "Job Ready",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    accent: "from-emerald-500 to-emerald-600",
    tagClass: "bg-emerald-100 text-emerald-700",
    tagHover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    icon: Languages,
    title: "Languages",
    desc: "English, Hindi, French, German & more languages",
    tag: "10+ Languages",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    accent: "from-amber-500 to-amber-600",
    tagClass: "bg-amber-100 text-amber-700",
    tagHover: "group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    icon: Brain,
    title: "Soft Skills",
    desc: "Leadership, Public Speaking & Time Management",
    tag: "In Demand",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    accent: "from-rose-500 to-rose-600",
    tagClass: "bg-rose-100 text-rose-700",
    tagHover: "group-hover:bg-rose-600 group-hover:text-white",
  },
  {
    icon: Award,
    title: "Govt. Exams",
    desc: "UPSC, SSC, State Level, RRB & defence exams",
    tag: "Updated 2025",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50 border-teal-200",
    border: "border-teal-200",
    hoverBorder: "hover:border-teal-300",
    accent: "from-teal-500 to-teal-600",
    tagClass: "bg-teal-100 text-teal-700",
    tagHover: "group-hover:bg-teal-600 group-hover:text-white",
  },
]

export default function SkillCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
            <Book className="w-4 h-4" />
            Explore by Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
            Skill Categories
          </h2>
         
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ icon: Icon, title, desc, tag, iconColor, iconBg, border, hoverBorder, accent, tagClass, tagHover }, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${border} ${hoverBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden cursor-pointer`}
              aria-label={title}
              role="group"
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accent} rounded-t-3xl`} />
              {/* Bottom hover accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Tag badge */}
              <span className={`self-end text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-200 ${tagClass} ${tagHover}`}>
                {tag}
              </span>

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl border ${iconBg} flex items-center justify-center`}>
                <div className="absolute top-0 left-2 right-2 h-[2px] bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full" />
                <Icon className={`w-7 h-7 ${iconColor} group-hover:scale-110 transition-transform duration-200`} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>

              {/* Explore link */}
              <div className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${iconColor}`}>
                Explore
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
