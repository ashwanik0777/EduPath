"use client";
import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, MapPin, Video, Phone, MessageSquare, User, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

interface CounselingNotification {
  id: string;
  title: string;
  counselorName: string;
  date: string;
  time: string;
  duration: string;
  mode: 'video' | 'audio' | 'chat' | 'in-person';
  topic: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  venue?: string;
  meetingLink?: string;
  description: string;
  isNew: boolean;
  priority: 'high' | 'medium' | 'low';
  counselorImage?: string;
}

const CounselingScheduleNotifications = () => {
  const [sessions, setSessions] = useState<CounselingNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const mockData: CounselingNotification[] = [
      {
        id: '1',
        title: 'Career Guidance Session',
        counselorName: 'Dr. Priya Sharma',
        date: '2024-10-25',
        time: '2:00 PM',
        duration: '45 minutes',
        mode: 'video',
        topic: 'Engineering vs Medical Career Path',
        status: 'upcoming',
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        description: 'Detailed discussion about career options after 12th PCM.',
        isNew: true,
        priority: 'high',
        counselorImage: '/counselor1.jpg'
      },
      {
        id: '2',
        title: 'College Selection Counseling',
        counselorName: 'Mr. Rajesh Kumar',
        date: '2024-10-22',
        time: '11:00 AM',
        duration: '30 minutes',
        mode: 'audio',
        topic: 'Best Colleges for Computer Science',
        status: 'completed',
        description: 'Discussion about top engineering colleges in J&K and admission process.',
        isNew: false,
        priority: 'medium',
        counselorImage: '/counselor2.jpg'
      },
      {
        id: '3',
        title: 'Scholarship Guidance',
        counselorName: 'Ms. Ankita Verma',
        date: '2024-10-28',
        time: '10:30 AM',
        duration: '40 minutes',
        mode: 'in-person',
        topic: 'Available Scholarships for Minorities',
        status: 'upcoming',
        venue: 'EduPath Office, Srinagar',
        description: 'Comprehensive guidance on scholarship opportunities and application process.',
        isNew: true,
        priority: 'high',
        counselorImage: '/counselor3.jpg'
      },
      {
        id: '4',
        title: 'Psychometric Test Discussion',
        counselorName: 'Dr. Amit Singh',
        date: '2024-10-20',
        time: '4:00 PM',
        duration: '60 minutes',
        mode: 'video',
        topic: 'Understanding Your Personality Report',
        status: 'cancelled',
        description: 'Detailed analysis of psychometric test results and career recommendations.',
        isNew: false,
        priority: 'medium',
        counselorImage: '/counselor4.jpg'
      },
      {
        id: '5',
        title: 'Stream Selection Guidance',
        counselorName: 'Mrs. Sunita Devi',
        date: '2024-10-30',
        time: '3:30 PM',
        duration: '35 minutes',
        mode: 'chat',
        topic: 'Science vs Commerce vs Arts',
        status: 'upcoming',
        description: 'Helping 10th pass students choose the right stream for 11th.',
        isNew: true,
        priority: 'high',
        counselorImage: '/counselor5.jpg'
      }
    ];

    setTimeout(() => {
      setSessions(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.counselorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'rescheduled': return <Calendar className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const sessionDate = new Date(date);
    const diffTime = sessionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const joinSession = (session: CounselingNotification) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
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
              placeholder="Search counseling sessions..."
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
              <option value="all">All Sessions</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="grid gap-6">
        {filteredSessions.map((session) => {
          const daysUntil = getDaysUntil(session.date);
          const isToday = daysUntil === 0;
          const isTomorrow = daysUntil === 1;
          
          return (
            <div
              key={session.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                session.priority === 'high' ? 'border-red-500' : 
                session.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
              } ${isToday ? 'ring-2 ring-blue-200 ring-opacity-50' : ''}`}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            {session.title}
                          </h3>
                          <p className="text-gray-600 text-sm">with {session.counselorName}</p>
                          <p className="text-blue-600 text-sm font-medium">{session.topic}</p>
                          {session.isNew && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mt-1">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(session.status)}
                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(session.status)}`}>
                          {session.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center text-blue-700 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">DATE</span>
                        </div>
                        <p className="text-blue-900 font-bold text-sm">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-blue-600 text-xs">
                          {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : `${daysUntil} days`}
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center text-green-700 mb-1">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">TIME</span>
                        </div>
                        <p className="text-green-900 font-bold text-sm">{session.time}</p>
                        <p className="text-green-600 text-xs">{session.duration}</p>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center text-purple-700 mb-1">
                          {getModeIcon(session.mode)}
                          <span className="text-xs font-medium ml-2">MODE</span>
                        </div>
                        <p className="text-purple-900 font-bold text-sm capitalize">{session.mode}</p>
                        {session.mode === 'in-person' && session.venue && (
                          <p className="text-purple-600 text-xs">{session.venue}</p>
                        )}
                      </div>

                      {session.status === 'upcoming' && isToday && (
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <div className="flex items-center text-yellow-700 mb-1">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-xs font-medium">STARTS IN</span>
                          </div>
                          <p className="text-yellow-900 font-bold text-sm">Few Hours</p>
                          <p className="text-yellow-600 text-xs">Be Ready!</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700">{session.description}</p>
                    </div>

                    {isToday && session.status === 'upcoming' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-blue-700">
                          <Clock className="w-5 h-5 mr-2" />
                          <span className="font-medium text-sm">
                            Your counseling session is today at {session.time}. Don't forget to join!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    {session.status === 'upcoming' && (
                      <>
                        {session.meetingLink && (
                          <button
                            onClick={() => joinSession(session)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Join Session
                          </button>
                        )}
                        <button className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-6 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {session.status === 'completed' && (
                      <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        View Summary
                      </button>
                    )}
                    
                    {session.status === 'cancelled' && (
                      <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Counseling Sessions Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CounselingScheduleNotifications;