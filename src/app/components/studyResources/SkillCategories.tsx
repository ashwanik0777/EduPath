"use client"
import { Code, Book, Briefcase, Languages, Brain, Award } from "lucide-react"

const categories = [
  {
    icon: <Code className="h-10 w-10 " />,
    title: "Tech Skills",
    desc: "Web Dev, AI, Data Science, App Dev",
    bg: "bg-[#704DC6]",
  },
  {
    icon: <Book className="h-10 w-10 " />,
    title: "Exam Prep",
    desc: "NEET, JEE, UPSC, SSC, Banking",
    bg: "bg-[#2E969A]",
  },
  {
    icon: <Briefcase className="h-10 w-10" />,
    title: "Career Skills",
    desc: "Resume, Interviews, Aptitude Tests",
    bg: "bg-[#F76CB4]",
  },
  {
    icon: <Languages className="h-10 w-10" />,
    title: "Languages",
    desc: "English, Hindi, French, German",
    bg: "bg-[#8B68D5]",
  },
  {
    icon: <Brain className="h-10 w-10 text-white" />,
    title: "Soft Skills",
    desc: "Leadership, Public Speaking, Time Mgmt",
    bg: "bg-[#FFCC59]",
    textColor: "text-black"
  },
  {
    icon: <Award className="h-10 w-10 " />,
    title: "Govt. Exams",
    desc: "UPSC, SSC, State Level, RRB",
    bg: "bg-[#2E969A]",
  },
]

export default function SkillCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#2E358B]">Skill Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map(({ icon, title, desc, bg, textColor }, i) => (
            <div
              key={i}
              className={`${bg} ${textColor || "text-white"} rounded-2xl shadow-lg p-8 cursor-pointer
                hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col items-start`}
              aria-label={title}
              role="group"
            >
              <div className="mb-6">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className={`text-sm ${textColor === "text-black" ? "text-black/80" : "text-white/85"}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
