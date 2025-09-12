"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { ArrowRight, CheckCircle2, Clock, Users } from "lucide-react"
import Link from "next/link"

const sampleQuestions = [
  "I enjoy solving complex mathematical problems",
  "I prefer working with people rather than data",
  "I am interested in understanding how things work",
  "I like to express myself through creative activities",
]

export default function AssessmentPreview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Take Our Career Assessment</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our scientifically-designed assessment evaluates your interests, personality, and skills to recommend the
              most suitable career paths and educational programs.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Quick & Easy</h3>
                  <p className="text-muted-foreground">Complete in just 15-20 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Scientifically Validated</h3>
                  <p className="text-muted-foreground">Based on proven psychological frameworks</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trusted by Thousands</h3>
                  <p className="text-muted-foreground">Over 10,000 students have found their path</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-light-purple">
              <Link href="/assessment">
                Start Full Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Interactive Preview */}
          <div>
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assessment Preview</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {sampleQuestions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">{sampleQuestions[currentQuestion]}</h3>

                  <div className="space-y-3">
                    {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-3 text-left rounded-lg border smooth-transition ${
                          selectedAnswer === index
                            ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                            : "border-border hover:border-brand-purple/50 hover:bg-muted/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null || currentQuestion === sampleQuestions.length - 1}
                    className="bg-brand-purple hover:bg-brand-light-purple"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
