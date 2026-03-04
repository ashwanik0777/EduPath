"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"

const featuredColleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Engineering",
    rating: 4.8,
    image: "/blog.jpg",
    shortTag: "NIRF Top Engineering",
    fees: "₹2.5L/year",
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    type: "Medical",
    rating: 4.9,
    image: "/blog.jpg",
    shortTag: "NIRF Top Medical",
    fees: "₹1.4L/year",
  },
  {
    id: 3,
    name: "Indian Statistical Institute",
    location: "Kolkata",
    type: "Statistics & Mathematics",
    rating: 4.7,
    image: "/blog.jpg",
    shortTag: "Research Focused",
    fees: "₹1.8L/year",
  },
  {
    id: 4,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    type: "Liberal Arts & Sciences",
    rating: 4.6,
    image: "/blog.jpg",
    shortTag: "Top Arts & Research",
    fees: "₹0.3L/year",
  },
]

export default function CollegeShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-1 text-sm font-medium">
            Featured Institutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">Top Government Colleges in India</h2>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {featuredColleges.map((college) => (
            <Card key={college.id} className="group overflow-hidden border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={college.image}
                  alt={college.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white text-[11px]">{college.type}</Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{college.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-[44px]">
                  {college.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {college.location}
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 line-clamp-1">{college.shortTag}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-500">Annual Fees</span>
                    <div className="text-base font-bold text-emerald-600">{college.fees}</div>
                  </div>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-medium">
                    Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl">
            Explore All Colleges
          </button>
        </div>
      </div>
    </section>
  )
}
