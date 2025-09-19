"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { Briefcase, GraduationCap, TrendingUp, Users, Star, BookOpen, UserCheck, BadgeCheck, X, Search, Heart, CopyPlus } from 'lucide-react';

const STREAMS = ['All', 'Science', 'Commerce', 'Arts', 'Vocational'];
const EDUCATION_LEVELS = ['All', 'After 10th', 'After 12th', 'After Graduation'];
const INTEREST_AREAS = ['Technology', 'Medicine', 'Design', 'Business', 'Education', 'Law', 'Art', 'Other'];
const SKILLS = ['Logical Thinking', 'Creativity', 'Communication', 'Problem Solving', 'Leadership'];
const CAREER_NATURES = ['All', 'Govt.', 'Private', 'Freelance', 'Entrepreneurship'];

type SavedCareer = { career_id: string };

export default function CareerOption() {
  // Compare feature state (must be inside component)
  const [compareList, setCompareList] = useState<any[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const isInCompare = (careerId: string) => compareList.some((c: any) => c.career_id === careerId);
  const handleToggleCompare = (career: any) => {
    setCompareList((prev: any[]) => {
      if (isInCompare(career.career_id)) {
        return prev.filter((c: any) => c.career_id !== career.career_id);
      } else if (prev.length < 3) {
        return [...prev, career];
      } else {
        return prev;
      }
    });
  };
  const handleOpenCompareModal = () => setCompareModalOpen(true);
  const handleCloseCompareModal = () => setCompareModalOpen(false);
  const [search, setSearch] = useState('');
  const [stream, setStream] = useState('All');
  const [educationLevel, setEducationLevel] = useState('All');
  const [interestArea, setInterestArea] = useState('');
  const [skill, setSkill] = useState('');
  const [careerNature, setCareerNature] = useState('All');

  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedCareers, setSavedCareers] = useState<SavedCareer[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  // Fetch saved careers for user
  const fetchSavedCareers = useCallback(async () => {
    try {
      const res = await fetch('/api/user/savedCareers');
      const data = await res.json();
      setSavedCareers(data.saved || []);
    } catch {}
  }, []);


  // Modal state and handlers
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any | null>(null);


  // Fetch careers from backend
  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (stream && stream !== 'All') params.append('stream', stream);
      if (educationLevel && educationLevel !== 'All') params.append('education_level', educationLevel);
      if (interestArea) params.append('interest_area', interestArea);
      if (skill) params.append('skills', skill);
      if (careerNature && careerNature !== 'All') params.append('career_nature', careerNature);
      const res = await fetch(`/api/careers?${params.toString()}`);
      const data = await res.json();
      setCareers(data.careers || []);
    } catch (e) {
      setError('Failed to load careers.');
    } finally {
      setLoading(false);
    }
  }, [search, stream, educationLevel, interestArea, skill, careerNature]);

  const handleOpenModal = useCallback(async (careerId: string) => {
    setModalOpen(true);
    setSelectedCareer(null);
    try {
      const res = await fetch(`/api/careers/${careerId}`);
      const data = await res.json();
      setSelectedCareer(data.career);
    } catch {
      setSelectedCareer({ title: 'Error loading details.' });
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedCareer(null);
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  useEffect(() => {
    fetchSavedCareers();
  }, [fetchSavedCareers]);
  // Save/unsave career
  const isCareerSaved = (careerId: string) => savedCareers.some((c) => c.career_id === careerId);
  const handleToggleSave = async (careerId: string) => {
    setSaving(careerId);
    try {
      if (isCareerSaved(careerId)) {
        await fetch('/api/user/savedCareers', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ career_id: careerId }),
        });
        setSavedCareers((prev) => prev.filter((c) => c.career_id !== careerId));
      } else {
        await fetch('/api/user/savedCareers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ career_id: careerId }),
        });
        setSavedCareers((prev) => [...prev, { career_id: careerId }]);
      }
    } catch {}
    setSaving(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900 tracking-tight flex items-center justify-center gap-2">
          <Briefcase className="inline-block w-8 h-8 text-blue-600" />
          Explore Career Options
        </h1>
        <p className="text-gray-500 mb-6 text-lg">Find out what careers fit your interest, education, and passion.</p>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search careers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-blue-200 focus:border-blue-500 rounded-lg pl-10 pr-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <select value={stream} onChange={e => setStream(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            {STREAMS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={educationLevel} onChange={e => setEducationLevel(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            {EDUCATION_LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={interestArea} onChange={e => setInterestArea(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="">Interest Area</option>
            {INTEREST_AREAS.map(i => <option key={i}>{i}</option>)}
          </select>
          <select value={skill} onChange={e => setSkill(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="">Skill</option>
            {SKILLS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={careerNature} onChange={e => setCareerNature(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            {CAREER_NATURES.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading careers...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : careers.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No career found with selected filters. Try changing stream or interest area.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {careers.map((career) => (
              <div key={career.career_id} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition group relative">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    className={`p-1 rounded-full ${isCareerSaved(career.career_id) ? 'bg-red-100' : 'bg-blue-100'} hover:bg-red-200 transition`}
                    title={isCareerSaved(career.career_id) ? 'Remove from My Careers' : 'Save to My Careers'}
                    onClick={() => handleToggleSave(career.career_id)}
                    disabled={saving === career.career_id}
                  >
                    <Heart className={`w-6 h-6 ${isCareerSaved(career.career_id) ? 'fill-red-500 text-red-500' : 'text-blue-400'} transition`} />
                  </button>
                  <button
                    className={`p-1 rounded-full ${isInCompare(career.career_id) ? 'bg-green-100' : 'bg-gray-100'} hover:bg-green-200 transition`}
                    title={isInCompare(career.career_id) ? 'Remove from Compare' : 'Add to Compare'}
                    onClick={() => handleToggleCompare(career)}
                  >
                    <CopyPlus className={`w-6 h-6 ${isInCompare(career.career_id) ? 'text-green-600' : 'text-gray-400'} transition`} />
                  </button>
                </div>
      {/* Floating compare bar */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-blue-200 shadow-lg rounded-full px-6 py-3 flex items-center gap-4 animate-fadeIn">
          <span className="font-semibold text-blue-900">Compare:</span>
          {compareList.map((c) => (
            <span key={c.career_id} className="flex items-center gap-1 text-blue-700 font-medium text-sm bg-blue-50 rounded-full px-3 py-1">
              {c.title}
              <button className="ml-1 text-red-400 hover:text-red-600" onClick={() => handleToggleCompare(c)} title="Remove">
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          <button
            className="ml-4 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-full px-5 py-2 font-semibold shadow-md transition"
            onClick={handleOpenCompareModal}
          >
            Compare ({compareList.length})
          </button>
        </div>
      )}

      {/* Compare Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-8 relative overflow-x-auto max-h-[95vh] border-2 border-blue-100 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition"
              onClick={handleCloseCompareModal}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-extrabold text-blue-900 mb-6">Compare Careers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-x-6">
                <thead>
                  <tr>
                    <th className="text-left text-blue-700 text-lg font-bold">Field</th>
                    {compareList.map((c) => (
                      <th key={c.career_id} className="text-left text-blue-900 text-lg font-bold">{c.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Stream', key: 'stream' },
                    { label: 'Education Path', key: 'education_path', render: (v: any) => v?.join(', ') },
                    { label: 'Growth', key: 'growth_scope' },
                    { label: 'Skills', key: 'required_skills', render: (v: any) => v?.join(', ') },
                    { label: 'Nature', key: 'career_nature' },
                    { label: 'Interest Area', key: 'interest_area', render: (v: any) => v?.join(', ') },
                    { label: 'Salary', key: 'salary_range' },
                    { label: 'Key Roles', key: 'key_roles', render: (v: any) => v?.join(', ') },
                    { label: 'Pros', key: 'pros', render: (v: any) => v?.join(', ') },
                    { label: 'Cons', key: 'cons', render: (v: any) => v?.join(', ') },
                  ].map((row) => (
                    <tr key={row.key}>
                      <td className="py-2 font-semibold text-blue-700">{row.label}</td>
                      {compareList.map((c) => (
                        <td key={c.career_id} className="py-2 text-gray-700">
                          {row.render ? row.render(c[row.key]) : c[row.key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <span className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition">{career.title}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 ml-2 font-semibold">{career.stream}</span>
                  </div>
                  <div className="text-gray-600 text-base mb-2 line-clamp-2">{career.short_description || career.description}</div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-1 items-center">
                    <BookOpen className="w-4 h-4 inline-block mr-1 text-blue-300" />
                    <span>Education: {career.education_path?.join(', ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-1 items-center">
                    <TrendingUp className="w-4 h-4 inline-block mr-1 text-green-400" />
                    <span>Growth: {career.growth_scope}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-1 items-center">
                    <Star className="w-4 h-4 inline-block mr-1 text-yellow-400" />
                    <span>Skills: {career.required_skills?.slice(0, 3).join(', ')}</span>
                  </div>
                </div>
                <button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg px-5 py-2 text-base font-semibold shadow-md group-hover:scale-105 transition"
                  onClick={() => handleOpenModal(career.career_id)}
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Career Details Modal */}
      {modalOpen && selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[95vh] border-2 border-blue-100 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className={`absolute top-3 left-3 z-10 p-1 rounded-full ${isCareerSaved(selectedCareer.career_id) ? 'bg-red-100' : 'bg-blue-100'} hover:bg-red-200 transition`}
              title={isCareerSaved(selectedCareer.career_id) ? 'Remove from My Careers' : 'Save to My Careers'}
              onClick={() => handleToggleSave(selectedCareer.career_id)}
              disabled={saving === selectedCareer.career_id}
            >
              <Heart className={`w-6 h-6 ${isCareerSaved(selectedCareer.career_id) ? 'fill-red-500 text-red-500' : 'text-blue-400'} transition`} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-extrabold text-blue-900 mb-0">{selectedCareer.title}</h2>
              <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 ml-2 font-semibold">{selectedCareer.stream}</span>
            </div>
            <div className="text-gray-600 mb-4 text-lg">{selectedCareer.overview || selectedCareer.description}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700"><UserCheck className="w-5 h-5 text-green-500" /> <span className="font-semibold">Eligibility:</span> {selectedCareer.eligibility}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><BookOpen className="w-5 h-5 text-blue-400" /> <span className="font-semibold">Entry Courses:</span> {selectedCareer.entry_courses?.join(', ')}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Star className="w-5 h-5 text-yellow-400" /> <span className="font-semibold">Skills:</span> {selectedCareer.required_skills?.join(', ')}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><TrendingUp className="w-5 h-5 text-green-400" /> <span className="font-semibold">Growth:</span> {selectedCareer.growth_scope}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><BadgeCheck className="w-5 h-5 text-blue-500" /> <span className="font-semibold">Nature:</span> {selectedCareer.career_nature}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Users className="w-5 h-5 text-purple-400" /> <span className="font-semibold">Interest:</span> {selectedCareer.interest_area?.join(', ')}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Briefcase className="w-5 h-5 text-blue-700" /> <span className="font-semibold">Salary:</span> {selectedCareer.salary_range}</div>
            </div>
            <div className="mb-2"><span className="font-semibold text-blue-900">Key Roles:</span> <span className="text-gray-700">{selectedCareer.key_roles?.join(', ')}</span></div>
            <div className="mb-2"><span className="font-semibold text-blue-900">Pros:</span> <span className="text-green-700">{selectedCareer.pros?.join(', ')}</span></div>
            <div className="mb-2"><span className="font-semibold text-blue-900">Cons:</span> <span className="text-red-700">{selectedCareer.cons?.join(', ')}</span></div>
            {selectedCareer.famous_people?.length > 0 && (
              <div className="mb-2"><span className="font-semibold text-blue-900">Famous People:</span> <span className="text-gray-700">{selectedCareer.famous_people.join(', ')}</span></div>
            )}
            {selectedCareer.related_careers?.length > 0 && (
              <div className="mb-2"><span className="font-semibold text-blue-900">Related Careers:</span> <span className="text-gray-700">{selectedCareer.related_careers.join(', ')}</span></div>
            )}
            {/* Save/Shortlist, Export, Compare, Reminder buttons can be added here */}
          </div>
        </div>
      )}
    </div>
  );
}

