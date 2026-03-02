"use client"
import { useState } from "react"
import HeroSection from "../../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function CentralGovernmentCollegesPage() {
  const [filter, setFilter] = useState("Central Government")

  return (
    <main>
      <HeroSection
        title="Top Central Government Colleges in India"
        subtitle="Browse leading central government institutions known for national-level excellence and diverse programs."
        bgTheme={6}
      />
      <FilterColleges onFilter={setFilter} initialFilter="Central Government" />
      <CollegeList filter={filter} />
      <CTAColleges />
    </main>
  )
}
