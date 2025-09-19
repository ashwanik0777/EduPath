"use client"
import { HelpCircle, Clock, Users } from "lucide-react"

const tests = [
  { name: "Ideal Career Test", q: 180, time: "45 Min", price: "₹2000", offer: "₹1000", audience: "For All Age Groups" },
  { name: "Skill Based Test (Class 9th)", q: 40, time: "30 Min", price: "₹2000", offer: "₹1000", audience: "For Class 9th" },
  { name: "Stream Selector Test", q: 76, time: "40 Min", price: "₹2000", offer: "₹1000", audience: "For Class 10th" },
  { name: "Engineering Selector", q: 100, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th & 12th" },
  { name: "Humanities Selector", q: 76, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th, 12th & B.A" },
  { name: "Commerce Selector", q: 72, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th, 12th & B.Com" },
  { name: "Professional Skill Index", q: 80, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "Grads & Working" },
  { name: "Educator Professional Skills", q: 63, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For Educators" },
]

export default function AssessmentsList() {
  return (
    <section id="assessments" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#2E358B]">Available Assessments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#2E358B]">{test.name}</h3>
              <p className="text-gray-600 text-sm mb-4 flex items-center justify-center space-x-6">
                <span className="flex items-center space-x-1">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  <span>{test.audience}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M12 12v4m-4 4h8m-6-4h4" />
                  </svg>
                  <span>{test.q} Questions</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>{test.time}</span>
                </span>
              </p>
              {/* <div className="mt-auto flex items-center justify-center space-x-3">
                <span className="line-through text-gray-400">{test.price}</span>
                <span className="text-indigo-600 font-bold text-lg">{test.offer}</span>
              </div> */}
              <a
                href="/buy"
                className="mt-6 inline-block bg-indigo-600 text-white rounded-xl px-6 py-2 font-semibold text-center
                  hover:bg-indigo-700 hover:scale-105 transition transform duration-300"
              >
                Take Test
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
