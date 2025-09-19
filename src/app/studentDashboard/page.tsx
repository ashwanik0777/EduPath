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
import ProgressTracker from "./components/ProgressTracker";
import CounselingBooking from "./components/CounselingBooking";
import Feedback from "./components/Feedback";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = React.useState("dashboard");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-indigo-400 animate-pulse">Loading your dashboard...</h1>
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
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      <div className="h-screen min-h-screen sticky top-0 left-0 z-20">
        <Sidebar
          menuItems={menuItems}
          activePage={activeTab}
          onPageChange={setActiveTab}
          userInfo={{ name: user.name, role: "Student" }}
          onLogout={logout}
        />
      </div>
      {/* Main Content */}
      <main className="flex-1 h-screen min-h-screen overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard user={user} />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "progressTracker" && <ProgressTracker />}
        {activeTab === "psychometricTest" && <PsychometricTest />}
        {activeTab === "govCollege" && <GovernmentCollege />}
        {activeTab === "courses" && <Courses />}
        {activeTab === "carrerOption" && <CareerOption />}
        {activeTab === "counselingBooking" && <CounselingBooking />}
        {activeTab === "competitiveExams" && <CompetitiveExams />}
        {activeTab === "shortListedColleges" && <ShortListedCollege />}
        {activeTab === "scholarships" && <Scholarships />}
        {activeTab === "feedback&Suggestions" && <Feedback />}
      </main>
    </div>
  );
}
