"use client";
import React, { useState, useEffect } from 'react';
import { Award, Calendar, DollarSign, Users, ExternalLink, Bookmark, Filter, Search } from 'lucide-react';

interface ScholarshipNotification {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  category: string;
  description: string;
  applyLink: string;
  isNew: boolean;
  priority: 'high' | 'medium' | 'low';
}

const ScholarshipNotifications = () => {
  const [scholarships, setScholarships] = useState<ScholarshipNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [savedScholarships, setSavedScholarships] = useState<Set<string>>(new Set());

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockData: ScholarshipNotification[] = [
      {
        id: '1',
        title: 'JK Government Merit Scholarship 2024',
        provider: 'J&K Social Welfare Department',
        amount: '₹25,000 per year',
        deadline: '2024-12-30',
        eligibility: '12th Pass, Family Income < ₹2.5L',
        category: 'Merit',
        description: 'Scholarship for meritorious students from J&K state.',
        applyLink: 'https://jk.gov.in/scholarships',
        isNew: true,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Minority Community Scholarship',
        provider: 'Central Government',
        amount: '₹15,000 per year',
        deadline: '2024-11-15',
        eligibility: 'Minority Community, Graduate',
        category: 'Minority',
        description: 'Financial assistance for minority community students.',
        applyLink: 'https://scholarships.gov.in',
        isNew: true,
        priority: 'high'
      },
      {
        id: '3',
        title: 'SC/ST Post-Matric Scholarship',
        provider: 'J&K Government',
        amount: '₹12,000 per year',
        deadline: '2024-10-25',
        eligibility: 'SC/ST Category, 12th Pass',
        category: 'SC/ST',
        description: 'Post-matric scholarship for SC/ST students.',
        applyLink: 'https://jkscst.gov.in',
        isNew: false,
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Women Empowerment Scholarship',
        provider: 'NGO Foundation',
        amount: '₹30,000 per year',
        deadline: '2024-12-20',
        eligibility: 'Female Students, Graduate',
        category: 'Women',
        description: 'Empowering women through education and financial support.',
        applyLink: 'https://womenempowerment.org',
        isNew: true,
        priority: 'high'
      }
    ];

    setTimeout(() => {
      setScholarships(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || scholarship.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleSaveScholarship = (id: string) => {
    setSavedScholarships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
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
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="merit">Merit</option>
              <option value="minority">Minority</option>
              <option value="sc/st">SC/ST</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarships List */}
      <div className="grid gap-6">
        {filteredScholarships.map((scholarship) => {
          const daysLeft = getDaysLeft(scholarship.deadline);
          const isUrgent = daysLeft <= 7;
          
          return (
            <div
              key={scholarship.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                scholarship.priority === 'high' ? 'border-red-500' : 
                scholarship.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            {scholarship.title}
                          </h3>
                          {scholarship.isNew && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mt-1">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveScholarship(scholarship.id)}
                        className={`p-2 rounded-full transition-colors ${
                          savedScholarships.has(scholarship.id)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{scholarship.provider}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className={`text-sm ${isUrgent ? 'text-red-600 font-medium' : ''}`}>
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                          {isUrgent && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {daysLeft} days left
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(scholarship.priority)}`}>
                          {scholarship.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Eligibility:</strong> {scholarship.eligibility}
                      </p>
                      <p className="text-gray-700">{scholarship.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <a
                      href={scholarship.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Scholarships Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ScholarshipNotifications;