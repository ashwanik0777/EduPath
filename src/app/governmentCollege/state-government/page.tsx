"use client"
import { useState } from "react"
import HeroSection from "../../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function StateGovernmentCollegesPage() {
  const [filter, setFilter] = useState("State Government")

  return (
    <main>
      <HeroSection
        title="Top State Government Colleges in India"
        subtitle="Find top state government colleges with quality academics, affordable education, and strong regional opportunities."
        bgTheme={6}
      />
      <FilterColleges onFilter={setFilter} initialFilter="State Government" />
      <CollegeList filter={filter} />
      <CTAColleges />
    </main>
  )
}
