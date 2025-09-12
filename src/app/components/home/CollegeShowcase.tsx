"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { MapPin, Users, Award, Star } from "lucide-react"
import Image from "next/image"

const featuredColleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Engineering",
    rating: 4.8,
    students: "8,000+",
    established: 1961,
    image: "/iit-delhi-campus.jpg",
    highlights: ["Top Engineering College", "NIRF Rank 2", "100% Placement"],
    fees: "₹2.5L/year",
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    type: "Medical",
    rating: 4.9,
    students: "3,000+",
    established: 1956,
    image: "/aiims-delhi-hospital.jpg",
    highlights: ["Premier Medical Institute", "NIRF Rank 1", "Research Excellence"],
    fees: "₹1.4L/year",
  },
  {
    id: 3,
    name: "Indian Statistical Institute",
    location: "Kolkata",
    type: "Statistics & Mathematics",
    rating: 4.7,
    students: "2,500+",
    established: 1931,
    image: "/isi-kolkata-campus.jpg",
    highlights: ["Statistics Pioneer", "Research Focus", "Global Recognition"],
    fees: "₹1.8L/year",
  },
  {
    id: 4,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    type: "Liberal Arts & Sciences",
    rating: 4.6,
    students: "8,500+",
    established: 1969,
    image: "/jnu-delhi-campus.jpg",
    highlights: ["Liberal Arts Excellence", "Diverse Programs", "Research Hub"],
    fees: "₹0.3L/year",
  },
]

export default function CollegeShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Government Colleges in India</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premier government institutions offering world-class education at affordable fees with excellent
            placement records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredColleges.map((college) => (
            <Card key={college.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">{college.type}</Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{college.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {college.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {college.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {college.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Est. {college.established}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {college.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">Annual Fees</span>
                    <div className="text-lg font-bold text-green-600">{college.fees}</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
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
