"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, FileText, AlertCircle, Bell, Download, Search, Filter } from 'lucide-react';

interface ExamNotification {
  id: string;
  examName: string;
  conductingBody: string;
  examDate: string;
  registrationDeadline: string;
  admitCardDate: string;
  resultDate: string;
  examMode: 'Online' | 'Offline' | 'Both';
  venue: string;
  category: string;
  isNew: boolean;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'registration-open' | 'registration-closed' | 'completed';
  officialLink: string;
}

const ExamDateNotifications = () => {
  const [exams, setExams] = useState<ExamNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [reminders, setReminders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mockData: ExamNotification[] = [
      {
        id: '1',
        examName: 'JKSSB Panchayat Secretary Exam',
        conductingBody: 'JKSSB',
        examDate: '2024-11-20',
        registrationDeadline: '2024-10-30',
        admitCardDate: '2024-11-10',
        resultDate: '2024-12-15',
        examMode: 'Online',
        venue: 'Various Centers in J&K',
        category: 'Government Jobs',
        isNew: true,
        priority: 'high',
        status: 'registration-open',
        officialLink: 'https://jkssb.nic.in'
      },
      {
        id: '2',
        examName: 'SSC CHSL 2024',
        conductingBody: 'Staff Selection Commission',
        examDate: '2024-12-05',
        registrationDeadline: '2024-11-05',
        admitCardDate: '2024-11-25',
        resultDate: '2025-01-10',
        examMode: 'Online',
        venue: 'All India Centers',
        category: 'Central Government',
        isNew: false,
        priority: 'high',
        status: 'registration-open',
        officialLink: 'https://ssc.nic.in'
      },
      {
        id: '3',
        examName: 'JK Bank PO Exam',
        conductingBody: 'J&K Bank',
        examDate: '2024-10-28',
        registrationDeadline: '2024-10-15',
        admitCardDate: '2024-10-20',
        resultDate: '2024-11-20',
        examMode: 'Online',
        venue: 'J&K Centers',
        category: 'Banking',
        isNew: false,
        priority: 'medium',
        status: 'registration-closed',
        officialLink: 'https://jkbank.com'
      },
      {
        id: '4',
        examName: 'Indian Army Agniveer Recruitment',
        conductingBody: 'Indian Army',
        examDate: '2024-11-15',
        registrationDeadline: '2024-10-25',
        admitCardDate: '2024-11-05',
        resultDate: '2024-12-01',
        examMode: 'Offline',
        venue: 'Army Recruitment Centers',
        category: 'Defense',
        isNew: true,
        priority: 'high',
        status: 'upcoming',
        officialLink: 'https://joinindianarmy.nic.in'
      }
    ];

    setTimeout(() => {
      setExams(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.conductingBody.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration-open': return 'bg-green-100 text-green-800 border-green-200';
      case 'registration-closed': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="registration-open">Registration Open</option>
              <option value="registration-closed">Registration Closed</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="grid gap-6">
        {filteredExams.map((exam) => {
          const examDaysLeft = getDaysUntil(exam.examDate);
          const regDaysLeft = getDaysUntil(exam.registrationDeadline);
          const isUrgent = regDaysLeft <= 7 && exam.status === 'registration-open';
          
          return (
            <div
              key={exam.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                exam.priority === 'high' ? 'border-red-500' : 
                exam.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            {exam.examName}
                          </h3>
                          <p className="text-gray-600 text-sm">{exam.conductingBody}</p>
                          {exam.isNew && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mt-1">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(exam.status)}`}>
                          {exam.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <button
                          onClick={() => toggleReminder(exam.id)}
                          className={`p-2 rounded-full transition-colors ${
                            reminders.has(exam.id)
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          title="Set Reminder"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Important Dates */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center text-blue-700 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">EXAM DATE</span>
                        </div>
                        <p className="text-blue-900 font-bold text-sm">
                          {new Date(exam.examDate).toLocaleDateString()}
                        </p>
                        <p className="text-blue-600 text-xs">{examDaysLeft} days left</p>
                      </div>

                      <div className={`rounded-lg p-3 ${isUrgent ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className={`flex items-center mb-1 ${isUrgent ? 'text-red-700' : 'text-green-700'}`}>
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">REGISTRATION</span>
                        </div>
                        <p className={`font-bold text-sm ${isUrgent ? 'text-red-900' : 'text-green-900'}`}>
                          {new Date(exam.registrationDeadline).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                          {regDaysLeft > 0 ? `${regDaysLeft} days left` : 'Closed'}
                        </p>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center text-yellow-700 mb-1">
                          <Download className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">ADMIT CARD</span>
                        </div>
                        <p className="text-yellow-900 font-bold text-sm">
                          {new Date(exam.admitCardDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center text-purple-700 mb-1">
                          <FileText className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">RESULT</span>
                        </div>
                        <p className="text-purple-900 font-bold text-sm">
                          {new Date(exam.resultDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Exam Details */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{exam.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm">{exam.examMode} Mode</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="text-sm">{exam.category}</span>
                      </div>
                    </div>

                    {isUrgent && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-red-700">
                          <AlertCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium text-sm">
                            Registration closes in {regDaysLeft} days! Apply now.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <a
                      href={exam.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Visit Official Site
                    </a>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Download Notification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Exams Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ExamDateNotifications;