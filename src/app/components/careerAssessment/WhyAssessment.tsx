"use client"
import { CheckCircle, BarChart2, Layers, FileText } from "lucide-react"

const points = [
  {
    title: "Scientific & Reliable",
    desc: "Meticulously designed tests based on global career frameworks.",
    icon: CheckCircle,
  },
  {
    title: "Personalized Insights",
    desc: "Get deep insights about your career interests, skills, and personality.",
    icon: BarChart2,
  },
  {
    title: "For Every Stage",
    desc: "Whether you are in school, college, or working – we have the right test.",
    icon: Layers,
  },
  {
    title: "Instant Reports",
    desc: "Get detailed results immediately with career recommendations.",
    icon: FileText,
  },
]

export default function WhyAssessment() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">Why Choose Our Assessments?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map(({ title, desc, icon: Icon }, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col items-center"
            >
              <Icon className="w-12 h-12 text-[#704DC6] mb-6" />
              <h3 className="font-semibold text-xl mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
