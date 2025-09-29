"use client";
import React from 'react';
import { Bell, Award, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const tabs = [
    { path: '/notifications/scholarship', label: 'Scholarships', icon: Award },
    { path: '/notifications/examDate', label: 'Exam Dates', icon: Calendar },
    { path: '/notifications/counselingSchedule', label: 'Counseling', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
                {tabs.find(tab => tab.path === pathname)?.label || 'Notifications'} Notifications Center
            </h1>
          </div>
          {/* <p className="text-gray-600 text-lg">Stay updated with important announcements and deadlines</p> */}
        </div>

        {/* Navigation Tabs */}
        {/* <div className="flex items-center flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center px-6 py-3 rounded-lg mx-1 mb-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Link>
            );
          })}
        </div> */}

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NotificationLayout;