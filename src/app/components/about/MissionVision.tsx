"use client"
import { Award, Eye, Target, Globe2 } from "lucide-react"

export default function MissionVision() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Mission Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col">
          <div className="flex items-center mb-6 gap-4">
            <Award className="w-10 h-10 text-[#704DC6]" />
            <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            To guide every student & professional in making informed career decisions
            by providing expert counselling and advanced psychometric tools.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center text-gray-600 text-sm">
            <div className="flex flex-col items-center space-y-1">
              <Eye className="w-6 h-6 text-[#704DC6]" />
              <span>Clear Vision</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Target className="w-6 h-6 text-[#704DC6]" />
              <span>Focused Goals</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Globe2 className="w-6 h-6 text-[#704DC6]" />
              <span>Global Impact</span>
            </div>
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default flex flex-col">
          <div className="flex items-center mb-6 gap-4">
            <Eye className="w-10 h-10 text-[#704DC6]" />
            <h2 className="text-3xl font-extrabold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            To become the most trusted platform for career guidance, enabling millions
            to unlock their potential and build meaningful careers.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center text-gray-600 text-sm">
            <div className="flex flex-col items-center space-y-1">
              <Award className="w-6 h-6 text-[#704DC6]" />
              <span>Quality Service</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Target className="w-6 h-6 text-[#704DC6]" />
              <span>Innovation</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Globe2 className="w-6 h-6 text-[#704DC6]" />
              <span>Wide Reach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
