"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "counselor";
  class?: string;
  stream?: string;
  quizCompleted?: boolean;
  quizResult?: any;
  profile?: {
    phone?: string;
    dateOfBirth?: string;
    firstName?: string;
    lastName?: string;
    gender?: "male" | "female" | "other";
    address?: {
      street?: string;
      city?: string;
      state?: string;
      pincode?: string;
      country?: string;
    };
    profileImage?: string;
  };
  academic?: {
    currentLevel?: string;
    course?: string;
    institution?: string;
    year?: string;
    percentage?: string;
    board?: string;
  };
  preferences?: {
    careerFields?: string[];
    preferredCourses?: string[];
    targetedExams?: string[];
    careerGoal?: string;
  };
  psychometric?: {
    testTaken?: string;
    testDate?: string;
    strengths?: string;
    suggestedCareers?: string;
  };
  counseling?: {
    sessionsAttended?: string;
    lastCounselingDate?: string;
    counselorRemarks?: string;
    actionItems?: string;
  };
  photo?: string; // Cloudinary or other URL
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  refetchAuthUser?: () => Promise<void>;
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  dateOfBirth?: string
  class?: string
  stream?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      await checkAuth();
      router.push("/studentDashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      await checkAuth();
      router.push("/studentDashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const forgotPassword = async (email: string) => {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset email")
    }

    return data
  }

  // Expose a refetch function for user data
  const refetchAuthUser = checkAuth;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        refetchAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
