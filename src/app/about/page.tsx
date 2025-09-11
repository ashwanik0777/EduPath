import HeroSection from "@/app/components/HeroSection"
import MissionVision from "@/app/components/about/MissionVision"
import Journey from "@/app/components/about/Journey"
import Values from "@/app/components/about/Values"
import Achievements from "@/app/components/about/Achievements"
import TeamSection from "@/app/components/about/TeamSection"
import CTASection from "@/app/components/about/CTASection"

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <MissionVision />
      <Journey />
      <Values />
      <Achievements />
      <TeamSection />
      <CTASection />
    </main>
  )
}
