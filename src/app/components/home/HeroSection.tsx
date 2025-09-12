"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { ArrowRight, BookOpen, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { number: "10,000+", label: "Students Guided", icon: Users },
    { number: "500+", label: "Colleges Listed", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Target },
    { number: "50+", label: "Career Paths", icon: TrendingUp },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-brand-purple/5 flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-purple/5 to-brand-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              AI-Powered Career Guidance
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your
              <span className="text-brand-purple block">Perfect Career Path</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Take our comprehensive assessment, get personalized recommendations, and find the ideal college for your
              dream career. Your educational journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple hover:bg-brand-light-purple text-white px-8 py-6 text-lg"
              >
                <Link href="/auth/register">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white bg-transparent"
              >
                <Link href="/assessment">Take Assessment</Link>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg smooth-transition ${
                      index === currentStat ? "bg-brand-purple/10 scale-105" : "bg-card/50"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 mx-auto mb-2 ${index === currentStat ? "text-brand-purple" : "text-muted-foreground"}`}
                    />
                    <div
                      className={`text-2xl font-bold ${index === currentStat ? "text-brand-purple" : "text-foreground"}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Interactive Visual */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Card */}
              <div className="bg-card rounded-2xl shadow-2xl p-8 border smooth-transition hover:shadow-3xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Career Assessment</h3>
                  <p className="text-muted-foreground">Discover your strengths and interests</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">✓</span>
                    </div>
                    <span className="text-sm text-foreground">Personality Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">✓</span>
                    </div>
                    <span className="text-sm text-foreground">Skills Assessment</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-brand-purple/10 rounded-lg">
                    <div className="w-8 h-8 bg-brand-purple/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-purple font-semibold text-sm">3</span>
                    </div>
                    <span className="text-sm text-foreground">Career Matching</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-brand-purple hover:bg-brand-light-purple">Start Assessment</Button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center animate-bounce">
                <BookOpen className="h-8 w-8 text-brand-accent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center animate-pulse">
                <TrendingUp className="h-6 w-6 text-brand-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
