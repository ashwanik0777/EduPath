"use client"
import { BookOpen, Youtube, FileText, Edit, BellRing } from "lucide-react"

const tools = [
  {
    name: "NCERT PDFs",
    desc: "Free NCERT books & solutions for all classes",
    details: "Download comprehensive textbooks to boost your learning",
    icon: BookOpen,
  },
  {
    name: "YouTube Learning Channels",
    desc: "Top free channels for JEE, NEET, UPSC",
    details: "Stay updated with expert tutorials and live sessions",
    icon: Youtube,
  },
  {
    name: "Mock Test Platform",
    desc: "Attempt free mock tests for various exams",
    details: "Practice with real exam pattern tests to improve scores",
    icon: FileText,
  },
  {
    name: "Resume Builder",
    desc: "AI-powered free resume creation tool",
    details: "Create professional resumes in minutes tailored for your field",
    icon: Edit,
  },
  {
    name: "Scholarship Alerts",
    desc: "Get notified of all govt. scholarships",
    details: "Never miss out on timely opportunities to fund your education",
    icon: BellRing,
  },
]

export default function FreeTools() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-14 text-center text-[#704DC6]">Free Tools & Materials</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tools.map(({ name, desc, details, icon: Icon }, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-default flex flex-col"
              aria-label={`Free tool: ${name}`}
            >
              <Icon className="w-10 h-10 text-[#704DC6] mb-5" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{name}</h3>
              <p className="text-gray-700 mb-2">{desc}</p>
              <p className="text-gray-500 text-sm">{details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
