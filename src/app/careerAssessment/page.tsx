import HeroSection from "@/app/components/HeroSection"
import WhyAssessment from "@/app/components/careerAssessment/WhyAssessment"
import AssessmentsList from "@/app/components/careerAssessment/AssessmentsList"
import HowItWorks from "@/app/components/careerAssessment/HowItWorks"
import Benefits from "@/app/components/careerAssessment/Benefits"
import Pricing from "@/app/components/careerAssessment/Pricing"
import Testimonials from "@/app/components/careerAssessment/Testimonials"
import CTASection from "@/app/components/careerAssessment/CTASection"

export default function CareerAssessmentPage() {
  return (
    <main>
      <HeroSection 
        title="Discover Your Ideal Career Path"
        subtitle="Take our comprehensive career assessment to find the best fit for your skills and interests."
        bgTheme={4}
        />
      <WhyAssessment />
      <AssessmentsList />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <Testimonials />
      <CTASection />
    </main>
  )
}
