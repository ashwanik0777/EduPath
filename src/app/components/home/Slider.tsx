
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/app/lib/utils"

const heroSlides = [
  {
    id: 1,
    title: "National Service Scheme",
    subtitle: "Empowering Students Through Service",
    description:
      "Join thousands of students making a difference in their communities through meaningful volunteer work and social service initiatives.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUK1wl0QZRv9zqnpwlBOQC5xSQ-Tm9EXkPOEsHg5-xxAEXUtJ6ryLEpXC2GgzKx5Od6_E&usqp=CAU",
    cta: { text: "Join NSS Today", href: "/register" },
  },
  {
    id: 2,
    title: "Build Leadership Skills",
    subtitle: "Develop Through Service",
    description:
      "Enhance your leadership abilities, communication skills, and social awareness while contributing to society's betterment.",
    image: "https://www.sessionlab.com/wp-content/uploads/Leadership-training-workshop-discussion.jpg",
    cta: { text: "Explore Opportunities", href: "/activities" },
  },
  {
    id: 3,
    title: "Community Impact",
    subtitle: "Creating Lasting Change",
    description:
      "Be part of initiatives that create real, measurable impact in education, health, environment, and social welfare.",
    image: "https://baobinhduong.vn/image/fckeditor/upload/2023/20230614/images/mohinh%20(2).jpg",
    cta: { text: "See Our Impact", href: "/about" },
  },
]

function ImageSlider({ slides, autoPlay = true, autoPlayInterval = 5000 }: {
  slides: typeof heroSlides;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, slides.length])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const togglePlayPause = () => setIsPlaying(!isPlaying)

  if (slides.length === 0) return null

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-b-xl shadow-2xl">
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-blue-600 font-medium">Loading NSS Portal...</p>
          </div>
        </div>
      )}

      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out transform",
              index === currentSlide
                ? "opacity-100 scale-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 scale-95 -translate-x-full"
                : "opacity-0 scale-95 translate-x-full"
            )}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Light overlay for text readability */}
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white max-w-5xl px-6">
                  <h1
                    className={cn(
                      "text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-300",
                      index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={cn(
                      "text-xl md:text-3xl mb-4 font-medium transition-all duration-1000 delay-500",
                      index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                  >
                    {slide.subtitle}
                  </p>
                  <p
                    className={cn(
                      "text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700",
                      index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                  >
                    {slide.description}
                  </p>
                  {slide.cta && (
                    <Button
                      size="lg"
                      className={cn(
                        "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 delay-900 hover:scale-105",
                        index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      )}
                    >
                      {slide.cta.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full shadow-lg"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full shadow-lg"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Play/Pause */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 w-12 h-12 rounded-full shadow-lg"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "relative w-4 h-4 rounded-full transition-all duration-300 hover:scale-125",
              index === currentSlide ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => goToSlide(index)}
          >
            {index === currentSlide && isPlaying && (
              <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-6 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="w-full">
      <ImageSlider slides={heroSlides} autoPlay={true} autoPlayInterval={6000} />
    </section>
  )
}
