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
      <HeroSection />
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
