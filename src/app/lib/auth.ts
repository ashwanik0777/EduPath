import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import User from "@/app/models/User"
import connectDB from "@/app/lib/mongoose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    await connectDB()
    const user = await User.findById(decoded.userId).select("-password")
    return user
  } catch (error) {
    return null
  }
}

export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function loginUser(email: string, password: string) {
  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" })

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export async function registerUser(name: string, email: string, password: string) {
  await connectDB()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
  })

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" })

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}
