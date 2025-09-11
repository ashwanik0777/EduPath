"use client"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#6C63FF] to-[#3F3D56] text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{opacity:0, y:30}} 
          animate={{opacity:1, y:0}} 
          transition={{duration:0.7}}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          About <span className="text-yellow-300">CareerGuide</span>
        </motion.h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Empowering students & professionals through world-class career guidance, 
          assessments, and counselling services.
        </p>
      </div>
    </section>
  )
}
