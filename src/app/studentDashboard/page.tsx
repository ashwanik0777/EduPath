"use client"

import { useAuth } from "@/app/hooks/useAuth"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { BookOpen, GraduationCap, Target, TrendingUp, Calendar, Award, Users, Clock } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-purple">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">Continue your Counseling journey and explore new opportunities</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            Sign Out
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Counseling Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple">75%</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-brand-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-accent">12</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Counseling */}
          <div className="lg:col-span-2">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-purple" />
                  Continue Counseling
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-muted/50 smooth-transition cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Mathematics Fundamentals</h3>
                    <span className="text-sm text-muted-foreground">85% complete</span>
                  </div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Chapter 5: Algebra Basics</p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-muted/50 smooth-transition cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Science Exploration</h3>
                    <span className="text-sm text-muted-foreground">60% complete</span>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Chapter 3: Physics Principles</p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-muted/50 smooth-transition cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Career Assessment</h3>
                    <span className="text-sm text-muted-foreground">Not started</span>
                  </div>
                  <Progress value={0} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Discover your ideal career path</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-brand-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Find Study Groups
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Completed Math Quiz</p>
                  <p className="text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Started Science Chapter</p>
                  <p className="text-muted-foreground">Yesterday</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Earned "Quick Learner" badge</p>
                  <p className="text-muted-foreground">2 days ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
