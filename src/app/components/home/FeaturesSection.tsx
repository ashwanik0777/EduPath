import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Brain, Target, BookOpen, Users, TrendingUp, Award } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your responses to provide accurate career recommendations tailored to your unique profile.",
    color: "text-brand-purple",
  },
  {
    icon: Target,
    title: "Personalized Matching",
    description:
      "Get matched with careers and colleges that align with your interests, skills, and academic performance.",
    color: "text-brand-accent",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Database",
    description:
      "Access detailed information about 500+ colleges, courses, admission requirements, and career prospects.",
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Connect with experienced counselors and mentors who provide personalized advice for your educational journey.",
    color: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your academic progress, set goals, and track your journey towards your dream career.",
    color: "text-orange-600",
  },
  {
    icon: Award,
    title: "Success Stories",
    description:
      "Learn from thousands of students who have successfully found their ideal career path through our platform.",
    color: "text-purple-600",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose EduPath?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with expert guidance to help you make informed
            decisions about your future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="card-hover group">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
