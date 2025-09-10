"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const slides = [
  {
    title: "Discover Your True Career Path",
    desc: "Get AI-powered guidance, psychometric tests & expert counsellors",
    btn: "Get Started",
  },
  {
    title: "Find The Right College & Course",
    desc: "Explore government colleges & admission updates near you",
    btn: "Explore Now",
  },
  {
    title: "Shape Your Future With Confidence",
    desc: "Personalized career guidance for students & professionals",
    btn: "Join Us",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-gradient-to-r from-[#704DC6] via-[#8B68D5] to-[#CD3A99] text-white">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
          <p className="max-w-2xl mb-6">{slide.desc}</p>
          <button className="bg-[#FFCC59] text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition">
            {slide.btn}
          </button>
        </motion.div>
      ))}
    </div>
  )
}
