"use client"
import { BookOpen, Clock, Star, Users } from "lucide-react"

const resources = [
  { title: "Full Stack Development", provider: "Coursera", duration: "6 Months", rating: "4.8/5" },
  { title: "AI & Machine Learning", provider: "Udemy", duration: "4 Months", rating: "4.7/5" },
  { title: "UPSC General Studies", provider: "BYJU's", duration: "1 Year", rating: "4.9/5" },
  { title: "Bank PO Prep", provider: "Adda247", duration: "8 Months", rating: "4.6/5" },
  { title: "Spoken English Mastery", provider: "Duolingo", duration: "Ongoing", rating: "4.8/5" },
]

export default function FeaturedResources() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-14 text-center text-[#704DC6]">Featured Learning Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resources.map(({ title, provider, duration, rating }, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default flex flex-col"
              aria-label={`Resource ${title} provided by ${provider}`}
            >
              <h3 className="text-xl font-bold text-[#704DC6] mb-4">{title}</h3>
              <div className="flex flex-col space-y-3 text-gray-600 text-sm flex-grow">
                <p className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#704DC6]" aria-hidden="true" />
                  <span><strong>Provider:</strong> {provider}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#704DC6]" aria-hidden="true" />
                  <span><strong>Duration:</strong> {duration}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                  <span><strong>Rating:</strong> {rating}</span>
                </p>
              </div>
              <a
                href="#"
                className="mt-6 inline-block rounded-lg bg-[#704DC6] px-6 py-2 text-white font-semibold text-center shadow hover:bg-[#5a3aa8] hover:scale-105 transition transform duration-300"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
