"use client"
import { useState } from "react"
import HeroSection from "../../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"
import { getCollegeHeroContent, type OwnershipFilter } from "@/app/components/governmentCollege/heroContent"

export default function CentralGovernmentCollegesPage() {
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>("Central Government")
  const [streamFilter, setStreamFilter] = useState<"All" | "Arts" | "Science" | "Commerce">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const heroContent = getCollegeHeroContent(ownershipFilter)

  return (
    <main>
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        bgTheme={6}
      />
      <FilterColleges
        ownershipFilter={ownershipFilter}
        streamFilter={streamFilter}
        searchQuery={searchQuery}
        onOwnershipChange={setOwnershipFilter}
        onStreamChange={setStreamFilter}
        onSearchChange={setSearchQuery}
      />
      <CollegeList ownershipFilter={ownershipFilter} streamFilter={streamFilter} searchQuery={searchQuery} />
      <CTAColleges />
    </main>
  )
}
