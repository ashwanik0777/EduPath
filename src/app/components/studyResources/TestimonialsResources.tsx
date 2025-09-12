"use client"
import { User } from "lucide-react"

const testimonials = [
  { name: "Rahul Sharma", feedback: "EduPath helped me crack SSC exam with right study materials!", role: "SSC Qualified" },
  { name: "Anjali Gupta", feedback: "The mock tests and career guidance gave me clarity for NEET.", role: "Medical Student" },
  { name: "Arjun Singh", feedback: "Soft skills courses improved my confidence in interviews.", role: "MBA Graduate" },
]

export default function TestimonialsResources() {
  return (
    <section className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#2E358B]">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-8 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col items-center"
            >
              <User className="w-12 h-12 text-[#704DC6] mb-6" />
              <p className="italic text-center mb-6 select-text leading-relaxed">“{t.feedback}”</p>
              <h4 className="font-semibold text-[#2E358B] text-lg">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
