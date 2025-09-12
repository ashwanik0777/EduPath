"use client"
import { User } from "lucide-react"

const testimonials = [
  { name: "Ritika Sharma", feedback: "The Ideal Career Test gave me the clarity I was missing for years. Highly recommended!" },
  { name: "Ankit Verma", feedback: "Stream Selector Test helped me choose my stream confidently. The counselling session was amazing." },
  { name: "Neha Kapoor", feedback: "As a working professional, the Professional Skill Index test showed me exactly where I needed to improve." },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
            >
              <User className="w-12 h-12 text-indigo-600 mb-5" />
              <p className="text-gray-700 italic mb-6 leading-relaxed select-text">“{t.feedback}”</p>
              <h3 className="font-semibold text-indigo-600 text-lg">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
