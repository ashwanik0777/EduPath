"use client";
import React from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/app/components/ui/button";
import { BookOpen, GraduationCap, Target, TrendingUp, Calendar, Award, Users, Clock } from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";
import Profile from "./components/Profile";
import PsychometricTest from "./components/PsychometricTest";
import GovernmentCollege from "./components/GovernmentCollege";
import Courses from "./components/Courses";
import CareerOption from "./components/CareerOption";
import CompetitiveExams from "./components/CompetitiveExams";
import ShortListedCollege from "./components/ShortListedCollege";
import Scholarships from "./components/Scholarships";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = React.useState("dashboard");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-400">Loading...</h1>
        </div>
      </div>
    );
  }

  // Sidebar menu items
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp, color: "text-indigo-500" },
    { id: "profile", label: "Profile", icon: Users, color: "text-gray-500" },
    { id: "progressTracker", label: "Progress Tracker", icon: TrendingUp, color: "text-rose-500" },
    { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-500" },
    { id: "govCollege", label: "Government College", icon: GraduationCap, color: "text-blue-500" },
    { id: "shortListedColleges", label: "Short Listed College", icon: Calendar, color: "text-teal-500" },
    { id: "carrerOption", label: "Career Option", icon: Target, color: "text-emerald-500" },
    { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-500" },
    { id: "competitiveExams", label: "Competitive Exams", icon: Award, color: "text-orange-500" },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap, color: "text-yellow-500" },
    { id: "feedback&Suggestions", label: "Feedback & Suggestions", icon: Users, color: "text-violet-500" },
    
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        activePage={activeTab}
        onPageChange={setActiveTab}
        userInfo={{ name: user.name, role: "Student" }}
        onLogout={logout}
      />
      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "dashboard" && (
          <>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user.name}!</h1>
                <p className="text-gray-500">Your personalized student dashboard</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">Take Psychometric Test</button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">Browse Courses</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">View Scholarships</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">Find Colleges</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">Career Options</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-indigo-500">
                <TrendingUp className="h-8 w-8 text-indigo-500 mb-2" />
                <div className="text-2xl font-bold text-indigo-700">75%</div>
                <div className="text-xs text-gray-500 mt-1">Counseling Progress</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-green-500">
                <BookOpen className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-green-700">12</div>
                <div className="text-xs text-gray-500 mt-1">Courses Completed</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-500">
                <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-blue-700">7 days</div>
                <div className="text-xs text-gray-500 mt-1">Study Streak</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-yellow-500">
                <Award className="h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-yellow-700">8</div>
                <div className="text-xs text-gray-500 mt-1">Badges earned</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2"><BookOpen className="h-5 w-5 text-indigo-500" /> Continue Counseling</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Mathematics Fundamentals</h3>
                        <p className="text-sm text-gray-500">Chapter 5: Algebra Basics</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-400 mb-1">85% complete</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-400" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Science Exploration</h3>
                        <p className="text-sm text-gray-500">Chapter 3: Physics Principles</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-400 mb-1">60% complete</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Career Assessment</h3>
                        <p className="text-sm text-gray-500">Discover your ideal career path</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-400 mb-1">Not started</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-300" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800"><Clock className="h-5 w-5 text-gray-400" /> Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Completed Math Quiz</p>
                      <p className="text-gray-400">2 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Started Science Chapter</p>
                      <p className="text-gray-400">Yesterday</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Earned "Quick Learner" badge</p>
                      <p className="text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === "profile" && <Profile />}
        {activeTab === "psychometricTest" && <PsychometricTest />}
        {activeTab === "govCollege" && <GovernmentCollege />}
        {activeTab === "courses" && <Courses />}
        {activeTab === "carrerOption" && <CareerOption />}
        {activeTab === "competitiveExams" && <CompetitiveExams />}
        {activeTab === "shortListedColleges" && <ShortListedCollege />}
        {activeTab === "scholarships" && <Scholarships />}
      </main>
    </div>
  );
}
