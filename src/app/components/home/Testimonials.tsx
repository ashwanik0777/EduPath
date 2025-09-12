"use client"
import { User } from "lucide-react"

const testimonials = [
  {
    name: "Rohit Sharma",
    text: "This platform helped me choose the right course after 12th. I am confident about my future now.",
    occupation: "Student · Class 12th",
    location: "Mumbai, India",
  },
  {
    name: "Priya Mehta",
    text: "The psychometric test was eye-opening. Counsellors guided me step by step.",
    occupation: "Aspiring Counsellor",
    location: "Delhi, India",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#F9F6FF]  mx-auto px-4 sm:px-6 lg:px-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#2E358B] tracking-tight drop-shadow-sm">
        What Students Say
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <User className="absolute -top-6 left-6 w-10 h-10 text-[#704DC6]/80 bg-white rounded-full p-1 shadow-md" />
            <p className="text-gray-700 mb-6 italic leading-relaxed min-h-[80px] select-text">"{t.text}"</p>
            <h4 className="font-semibold text-[#CD3A99] text-lg">{t.name}</h4>
            <p className="text-sm text-blue-600 mt-1">{t.occupation}</p>
            <p className="text-xs text-gray-400 mt-0.5 italic">{t.location}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
