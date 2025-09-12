"use client"
import { motion } from "framer-motion"

// Theme type definition
type Theme = {
  sectionBg: string
  circles: Array<{ class: string }>
}

// Theme gradients (soft, modern, based on given colors)
const bgThemes: Record<number, Theme> = {
  1: {
    sectionBg: "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100",
    circles: [
      { class: "top-10 left-10 w-32 h-32 bg-blue-300/30 animate-pulse" },
      { class: "bottom-10 right-10 w-24 h-24 bg-indigo-300/40 animate-ping" },
    ],
  },
  2: {
    sectionBg: "bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100",
    circles: [
      { class: "top-16 right-16 w-28 h-28 bg-pink-300/30 animate-pulse" },
      { class: "bottom-16 left-20 w-20 h-20 bg-purple-300/30 animate-bounce" },
    ],
  },
  3: {
    sectionBg: "bg-gradient-to-br from-orange-100 via-red-200 to-yellow-100",
    circles: [
      {
        class:
          "top-10 left-1/4 w-48 h-48 bg-orange-400/20 animate-ping blur-xl",
      },
      {
        class:
          "bottom-16 right-1/3 w-40 h-40 bg-yellow-400/30 animate-pulse blur-md",
      },
      {
        class:
          "top-1/2 right-10 w-24 h-24 bg-red-300/30 animate-bounce blur-sm",
      },
    ],
  },

  4: {
    sectionBg: "bg-gradient-to-tr from-cyan-100 via-blue-100 to-sky-100",
    circles: [
      { class: "top-12 right-12 w-24 h-24 bg-cyan-300/30 animate-pulse" },
      { class: "bottom-10 left-16 w-32 h-32 bg-blue-300/20 animate-spin-slow" },
    ],
  },
  5: {
    sectionBg: "bg-gradient-to-br from-fuchsia-100 via-pink-100 to-violet-100",
    circles: [
      { class: "top-20 left-1/2 w-20 h-20 bg-fuchsia-300/30 animate-bounce" },
      { class: "bottom-16 right-1/2 w-28 h-28 bg-violet-300/30 animate-ping" },
    ],
  },
  6: {
    sectionBg: "bg-gradient-to-bl from-emerald-100 via-lime-100 to-green-100",
    circles: [
      { class: "top-10 left-16 w-28 h-28 bg-emerald-300/30 animate-pulse" },
      { class: "bottom-10 right-16 w-36 h-36 bg-lime-300/30 animate-ping" },
    ],
  },
  7: {
    sectionBg: "bg-gradient-to-br from-rose-100 via-pink-100 to-sky-100",
    circles: [
      { class: "top-1/3 right-16 w-32 h-32 bg-rose-300/30 animate-ping" },
      { class: "bottom-1/3 left-20 w-24 h-24 bg-sky-300/30 animate-pulse" },
    ],
  },
   8: {
    sectionBg: "bg-gradient-to-br from-neutral-100 via-zinc-200 to-gray-100",
    circles: [
      {
        class:
          "top-20 left-20 w-64 h-64 bg-gray-500/20 animate-spin-slow blur-xl",
      },
      {
        class:
          "bottom-10 right-10 w-40 h-40 bg-zinc-400/30 animate-pulse blur-md",
      },
      {
        class:
          "top-1/3 right-1/3 w-24 h-24 bg-black/10 animate-none border border-white/20",
      },
    ],
  },
   9: {
    sectionBg: "bg-gradient-to-tr from-red-100 via-orange-200 to-yellow-100",
    circles: [
      {
        class:
          "top-0 left-1/4 w-64 h-64 bg-red-400/20 animate-ping blur-2xl",
      },
      {
        class:
          "bottom-0 right-1/4 w-56 h-56 bg-orange-300/30 animate-bounce blur-md",
      },
      {
        class:
          "top-1/2 left-1/2 w-32 h-32 bg-yellow-300/30 animate-pulse blur-sm",
      },
    ],
  },
  10: {
    sectionBg: "bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100",
    circles: [
      { class: "top-16 left-16 w-24 h-24 bg-indigo-300/30 animate-pulse" },
      { class: "bottom-16 right-16 w-28 h-28 bg-pink-300/30 animate-ping" },
    ],
  },
};
type HeroSectionProps = {
  title: string
  subtitle: string
  bgTheme?: number
}

export default function HeroSection({
  title,
  subtitle,
  bgTheme = 1,
}: HeroSectionProps) {
  const theme = bgThemes[bgTheme] || bgThemes[1]

  return (
    <section
      className={`relative ${theme.sectionBg} text-white py-24 transition-all duration-700 ease-in-out overflow-hidden`}
    >
      {/* Background circles */}
      {theme.circles.map((circle, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${circle.class}`}
        ></div>
      ))}

      {/* Overlay for softness */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-blue-900"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium text-blue-500 drop-shadow-md"
        >
          {subtitle}
        </motion.p>

        {/* Smooth CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10"
        >
          <button className="px-8 py-3 bg-white text-[#704DC6] font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  )
}