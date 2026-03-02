export type OwnershipFilter = "Central Government" | "State Government" | "Private"

export function getCollegeHeroContent(filter: OwnershipFilter) {
  if (filter === "Central Government") {
    return {
      title: "Top Central Government Colleges in India",
      subtitle: "Browse leading central government institutions known for national-level excellence and diverse programs.",
    }
  }

  if (filter === "State Government") {
    return {
      title: "Top State Government Colleges in India",
      subtitle: "Find top state government colleges with quality academics, affordable education, and strong regional opportunities.",
    }
  }

  return {
    title: "Top Private Colleges in India",
    subtitle: "Explore top private colleges across India with key details on courses, admissions, and campus opportunities.",
  }
}
