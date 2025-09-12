"use client"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Discover your hidden strengths & weaknesses",
  "Choose the right stream, course, or career path",
  "Avoid wrong career decisions & save years of struggle",
  "Boost your confidence with career clarity",
  "Trusted by schools, colleges, and professionals worldwide",
]

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">Benefits of Career Assessments</h2>
        <ul className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
          {benefits.map((b, i) => (
            <li 
              key={i} 
              className="flex items-center justify-center gap-4 select-text"
            >
              <CheckCircle2 
                className="w-6 h-6 text-indigo-600 flex-shrink-0 transition-transform duration-300 hover:scale-110" 
                aria-hidden="true"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
