"use client"
import { ClipboardList, Edit3, FileText, Headphones } from "lucide-react"

const steps = [
  {
    step: "1",
    title: "Choose Assessment",
    desc: "Pick the test that suits your education or career stage.",
    icon: ClipboardList,
  },
  {
    step: "2",
    title: "Attempt Online Test",
    desc: "Answer questions designed by experts in 30-60 minutes.",
    icon: Edit3,
  },
  {
    step: "3",
    title: "Get Instant Report",
    desc: "Receive detailed insights with career path suggestions.",
    icon: FileText,
  },
  {
    step: "4",
    title: "Counselling Support",
    desc: "Book a session with certified counsellors for guidance.",
    icon: Headphones,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map(({ step, title, desc, icon: Icon }, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col items-center"
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-bold shadow-lg hover:scale-110 transition-transform duration-300">
                {Icon ? <Icon className="w-7 h-7" /> : step}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
