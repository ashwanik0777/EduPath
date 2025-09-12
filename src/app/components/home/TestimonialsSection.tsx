"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Engineering Student",
    college: "IIT Delhi",
    image: "/indian-female-student.png",
    rating: 5,
    text: "EduPath's career assessment helped me discover my passion for computer science. The personalized guidance was invaluable in choosing the right college and course.",
    achievement: "Secured admission in IIT Delhi CSE",
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Medical Student",
    college: "AIIMS Delhi",
    image: "/indian-male-student.png",
    rating: 5,
    text: "The counseling sessions were incredibly detailed. My counselor helped me understand the NEET preparation strategy and college selection process thoroughly.",
    achievement: "Cracked NEET with AIR 150",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Commerce Graduate",
    college: "Delhi School of Economics",
    image: "/indian-female-graduate.jpg",
    rating: 5,
    text: "From career confusion to clarity - EduPath transformed my academic journey. The study resources and mock tests were game-changers for my preparation.",
    achievement: "Top 1% in DU entrance exam",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Our Students</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their academic journey with EduPath's personalized guidance and achieved
            their dream college admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute top-4 left-4 text-blue-100 opacity-50">
                <Quote className="h-8 w-8" />
              </div>

              <CardContent className="p-8 pt-12">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.college}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm text-green-800 font-medium">🎉 {testimonial.achievement}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white"
                ></div>
              ))}
            </div>
            <span className="text-sm">Join 10,000+ successful students</span>
          </div>
        </div>
      </div>
    </section>
  )
}
