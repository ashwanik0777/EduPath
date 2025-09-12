"use client"
import HeroSection from "../components/HeroSection"
import SkillCategories from "@/app/components/studyResources/SkillCategories"
import FeaturedResources from "@/app/components/studyResources/FeaturedResources"
import FreeTools from "@/app/components/studyResources/FreeTools"
import TestimonialsResources from "@/app/components/studyResources/TestimonialsResources"
import CTAResources from "@/app/components/studyResources/CTAResources"

export default function StudyResourcesPage() {
  return (
    <main>
      <HeroSection 
        title="Empower Your Learning Journey"
        subtitle="Discover a wealth of resources to enhance your skills and knowledge."
       bgTheme={10}
      />
      <SkillCategories />
      <FeaturedResources />
      <FreeTools />
      <TestimonialsResources />
      <CTAResources />
    </main>
  )
}
