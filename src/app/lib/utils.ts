import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}


export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getEventStatus(startDate: Date, endDate: Date): "upcoming" | "current" | "past" {
  const now = new Date()

  if (now < startDate) {
    return "upcoming"
  } else if (now >= startDate && now <= endDate) {
    return "current"
  } else {
    return "past"
  }
}

export function extractPublicIdFromCloudinaryUrl(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null

  try {
    // Extract the public ID from a Cloudinary URL
    const regex = /\/v\d+\/(.+?)(?:\.\w+)?$/
    const match = url.match(regex)
    return match ? match[1] : null
  } catch (error) {
    console.error("Error extracting public ID:", error)
    return null
  }
}

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "current":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "past":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

// Format large numbers to K/M format
export function formatNumber(num: number | null | undefined): string {
  // Handle null, undefined, or invalid numbers
  if (num == null || isNaN(num) || !isFinite(num)) {
    return "0"
  }

  // Convert to positive number if negative
  const absNum = Math.abs(num)

  if (absNum >= 1000000) {
    const millions = absNum / 1000000
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`
  }

  if (absNum >= 1000) {
    const thousands = absNum / 1000
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`
  }

  return Math.floor(absNum).toString()
}

// Calculate days between dates
export function getDaysLeft(endDateStr: string): number {
  const today = new Date()
  const endDate = new Date(endDateStr)
  const diffMs = endDate.getTime() - today.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

// Safe sum calculation for arrays
export function safeSum(arr: (number | null | undefined)[]): number {
  return arr.reduce<number>((sum: number, val: number | null | undefined) => {
    const numVal = Number(val)
    return sum + (isNaN(numVal) ? 0 : numVal)
  }, 0)
}
