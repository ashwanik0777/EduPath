"use client"
import { useState } from "react"
import HeroSection from "../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function CollegesPage() {
  const [ownershipFilter, setOwnershipFilter] = useState<"Central Government" | "State Government" | "Private">("Central Government")
  const [streamFilter, setStreamFilter] = useState<"All" | "Arts" | "Science" | "Commerce">("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main>
      <HeroSection 
        title="Top Colleges in India"
        subtitle="Explore top government and private colleges across India. Find courses, admissions, and campus details."
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
