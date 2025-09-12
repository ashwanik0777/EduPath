"use client"
import { ShieldCheck, Zap, HeartHandshake, Star } from "lucide-react"

const values = [
  {
    title: "Integrity",
    desc: "We believe in transparency and honesty in every counselling session.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    desc: "We bring the latest tools, assessments, and learning methods.",
    icon: Zap,
  },
  {
    title: "Empathy",
    desc: "We understand and respect every individual's career journey.",
    icon: HeartHandshake,
  },
  {
    title: "Excellence",
    desc: "We strive to deliver world-class services with measurable impact.",
    icon: Star,
  },
]

export default function Values() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map(({ title, desc, icon: Icon }, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col items-center"
            >
              <Icon className="w-12 h-12 text-[#704DC6] mb-4" />
              <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
