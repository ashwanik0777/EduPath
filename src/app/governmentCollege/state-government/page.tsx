"use client"
import { useState } from "react"
import HeroSection from "../../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function StateGovernmentCollegesPage() {
  const [ownershipFilter, setOwnershipFilter] = useState<"Central Government" | "State Government" | "Private">("State Government")
  const [streamFilter, setStreamFilter] = useState<"All" | "Arts" | "Science" | "Commerce">("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main>
      <HeroSection
        title="Top State Government Colleges in India"
        subtitle="Find top state government colleges with quality academics, affordable education, and strong regional opportunities."
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
