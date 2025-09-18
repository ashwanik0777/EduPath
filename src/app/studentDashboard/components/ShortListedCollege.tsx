import { useState } from "react";
import { Trash2, Info, Users, FileDown, AlertTriangle, CheckCircle, ClipboardList, MessageCircle, School } from "lucide-react";

const MOCK_COLLEGES = [
  {
    college_id: "JK-GOV-001",
    name: "Govt. Degree College, Baramulla",
    type: "Government",
    district: "Baramulla",
    city: "Baramulla",
    state: "Jammu & Kashmir",
    courses_interested: ["B.A", "B.Sc"],
    affiliated_to: "University of Kashmir",
    application_status: "not_applied",
    saved_on: "2025-09-17",
    student_note: "Good hostel, close to home",
    image: "/college1.jpg",
    fees: "₹12,000/yr",
    facilities: ["Hostel", "Library", "Sports"],
    deadline: "2025-10-10",
    match: 92,
  },
  {
    college_id: "JK-PRI-002",
    name: "ABC Private College, Srinagar",
    type: "Private",
    district: "Srinagar",
    city: "Srinagar",
    state: "Jammu & Kashmir",
    courses_interested: ["B.Com", "BBA"],
    affiliated_to: "Cluster University Srinagar",
    application_status: "applied",
    saved_on: "2025-09-16",
    student_note: "Offers scholarship",
    image: "/college2.jpg",
    fees: "₹25,000/yr",
    facilities: ["WiFi", "Cafeteria", "Transport"],
    deadline: "2025-09-30",
    match: 85,
  },
  {
    college_id: "JK-GOV-003",
    name: "Govt. Science College, Jammu",
    type: "Government",
    district: "Jammu",
    city: "Jammu",
    state: "Jammu & Kashmir",
    courses_interested: ["B.Sc", "M.Sc"],
    affiliated_to: "University of Jammu",
    application_status: "not_applied",
    saved_on: "2025-09-15",
    student_note: "Top science faculty",
    image: "/college3.jpg",
    fees: "₹15,000/yr",
    facilities: ["Lab", "Library", "Sports"],
    deadline: "2025-10-05",
    match: 88,
  },
  {
    college_id: "JK-CEN-004",
    name: "Central University of Kashmir",
    type: "Central",
    district: "Ganderbal",
    city: "Ganderbal",
    state: "Jammu & Kashmir",
    courses_interested: ["B.A", "MA"],
    affiliated_to: "Central University",
    application_status: "not_applied",
    saved_on: "2025-09-14",
    student_note: "Modern campus, good placements",
    image: "/college4.jpg",
    fees: "₹20,000/yr",
    facilities: ["Hostel", "WiFi", "Library"],
    deadline: "2025-10-15",
    match: 90,
  },
  {
    college_id: "JK-PRI-005",
    name: "Sunshine Private College, Anantnag",
    type: "Private",
    district: "Anantnag",
    city: "Anantnag",
    state: "Jammu & Kashmir",
    courses_interested: ["BBA", "MBA"],
    affiliated_to: "Cluster University Srinagar",
    application_status: "not_applied",
    saved_on: "2025-09-13",
    student_note: "Good for management studies",
    image: "/college5.jpg",
    fees: "₹30,000/yr",
    facilities: ["Cafeteria", "Transport", "Hostel"],
    deadline: "2025-10-20",
    match: 80,
  },
];

const FILTERS = {
  district: ["All", "Baramulla", "Srinagar"],
  type: ["All", "Government", "Private"],
  course: ["All", "B.A", "B.Sc", "B.Com", "BBA"],
  application_status: ["All", "applied", "not_applied"],
};

const SORTS = [
  { value: "az", label: "Alphabetical (A-Z)" },
  { value: "recent", label: "Recently Added" },
  { value: "status", label: "Application Status" },
];

export default function ShortListedCollege() {

  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState({ district: "All", type: "All", course: "All", application_status: "All" });
  const [sort, setSort] = useState("recent");
  const [notes, setNotes] = useState<{ [id: string]: string }>(() => Object.fromEntries(MOCK_COLLEGES.map(c => [c.college_id, c.student_note])));
  const [showCompare, setShowCompare] = useState(false);

  // Mock counselor comments
  const counselorComments: { [id: string]: string } = {
    "JK-GOV-001": "Recommended for science stream. Good placement record.",
    "JK-PRI-002": "Check for hostel availability before applying.",
    "JK-GOV-003": "Excellent labs and faculty.",
    "JK-CEN-004": "Modern campus, good for research.",
    "JK-PRI-005": "Strong management program.",
  };

  // Filter and sort logic (mock)
  const filtered = colleges.filter(c =>
    (filters.district === "All" || c.district === filters.district) &&
    (filters.type === "All" || c.type === filters.type) &&
    (filters.course === "All" || c.courses_interested.includes(filters.course)) &&
    (filters.application_status === "All" || c.application_status === filters.application_status)
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "status") return a.application_status.localeCompare(b.application_status);
    return new Date(b.saved_on).getTime() - new Date(a.saved_on).getTime();
  });

  // Empty state
  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">You haven’t shortlisted any colleges yet.</h2>
        <p className="text-zinc-500 mb-4">Explore and save colleges to view them here.</p>
        <img src="/empty-state-college.svg" alt="No colleges" className="w-48 h-48 mx-auto mb-4 opacity-80" />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Explore Colleges</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-1">Your Shortlisted Colleges</h1>
        <p className="text-zinc-600 mb-2">Review, compare, and apply to colleges you’ve saved.</p>
        <span className="text-sm text-zinc-500">You have <span className="font-bold text-indigo-700">{colleges.length}</span> colleges shortlisted.</span>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-indigo-50 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {Object.entries(FILTERS).map(([key, options]) => (
            <select
              key={key}
              className="rounded-lg border border-indigo-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={filters[key as keyof typeof filters]}
              onChange={e => setFilters(f => ({ ...f, [key]: e.target.value }))}
            >
              {options.map(opt => <option key={opt} value={opt}>{opt.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>)}
            </select>
          ))}
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <span className="text-xs text-zinc-500">Sort by:</span>
          <select
            className="rounded-lg border border-indigo-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* Compare Bar */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="text-sm text-zinc-600 flex items-center gap-1"><Users className="w-4 h-4" />Select up to 3 colleges to compare</span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow disabled:opacity-50 flex items-center gap-2"
          disabled={selected.length < 2}
          onClick={() => setShowCompare(true)}
        >
          <ClipboardList className="w-4 h-4" /> Compare Colleges
        </button>
      </div>

      {/* College List (Grid on desktop, list on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorted.map(college => (
          <div key={college.college_id} className="bg-white rounded-3xl shadow-xl p-0 flex flex-col group border border-indigo-100 hover:shadow-2xl transition-shadow relative overflow-hidden">
            {/* College Image */}
            <div className="h-36 w-full bg-gradient-to-tr from-indigo-100 to-blue-100 flex items-end justify-between p-3 relative">
              <div className="relative h-24 w-24 -mb-8 z-10">
                <img 
                  src={college.image} 
                  alt={college.name} 
                  className="h-24 w-24 object-cover rounded-2xl border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="h-24 w-24 bg-white rounded-2xl border-4 border-white shadow-lg hidden items-center justify-center">
                  <School className="w-12 h-12 text-indigo-400" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-bold shadow ${college.type === "Government" ? "bg-green-100 text-green-700" : college.type === "Private" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>{college.type}</span>
                <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full font-semibold shadow flex items-center gap-1"><CheckCircle className="w-3 h-3" />{college.match}% Match</span>
              </div>
              {/* Select for compare */}
              <input
                type="checkbox"
                className="absolute top-3 right-3 w-5 h-5 accent-indigo-600 z-20"
                checked={selected.includes(college.college_id)}
                onChange={e => {
                  if (e.target.checked && selected.length < 3) setSelected(sel => [...sel, college.college_id]);
                  else setSelected(sel => sel.filter(id => id !== college.college_id));
                }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 px-5 pt-10 pb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-extrabold text-indigo-800 leading-tight">{college.name}</span>
                {new Date(college.deadline) < new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) && (
                  <span className="ml-2 text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full animate-pulse flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Deadline Soon!</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-zinc-600">
                <span className="flex items-center gap-1"><Info className="w-4 h-4 text-indigo-500" />{college.city}, {college.district}</span>
                <span className="flex items-center gap-1"><FileDown className="w-4 h-4 text-indigo-500" />{college.state}</span>
                <span className="ml-2">Affiliated: <span className="font-medium text-indigo-700">{college.affiliated_to}</span></span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Courses: {college.courses_interested.join(", ")}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Fees: {college.fees}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
                {college.facilities.map(fac => <span key={fac} className="bg-zinc-100 px-2 py-1 rounded-full">{fac}</span>)}
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="font-medium">Status:</span>
                {college.application_status === "applied" ? (
                  <span className="text-green-600 font-bold flex items-center gap-1">Applied <span className="text-xs">✅</span></span>
                ) : (
                  <span className="text-zinc-500">Not Applied</span>
                )}
                <span className="ml-auto text-xs text-zinc-400">Saved on {college.saved_on}</span>
              </div>
              {/* Counselor Comment */}
              {counselorComments[college.college_id] && (
                <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1"><MessageCircle className="w-4 h-4" />{counselorComments[college.college_id]}</div>
              )}
              {/* Notes */}
              <textarea
                className="w-full mt-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                rows={2}
                placeholder="Add a note..."
                value={notes[college.college_id] || ""}
                onChange={e => setNotes(n => ({ ...n, [college.college_id]: e.target.value }))}
              />
              {/* Actions */}
              <div className="flex gap-2 mt-2 items-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1 rounded-lg shadow transition-all">View Details</button>
                {college.application_status !== "applied" && (
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-2 py-1 rounded-lg shadow transition-all">Apply Now</button>
                )}
                {college.application_status === "applied" && (
                  <span className="text-green-700 font-semibold px-2 py-1">Applied on {college.saved_on}</span>
                )}
                <button
                  className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-3 py-2 rounded-lg shadow transition-all ml-auto flex items-center gap-1"
                  onClick={() => setColleges(colleges.filter(c => c.college_id !== college.college_id))}
                  title="Remove from list"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Modal */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative animate-fade-in">
            <button className="absolute top-4 right-4 text-zinc-400 hover:text-rose-500" onClick={() => setShowCompare(false)}><Trash2 className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2"><ClipboardList className="w-5 h-5" />Compare Colleges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.filter(c => selected.includes(c.college_id)).map(college => (
                <div key={college.college_id} className="bg-indigo-50 rounded-xl p-4 flex flex-col gap-2 border border-indigo-200">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={college.image} alt={college.name} className="h-12 w-12 object-cover rounded-lg border-2 border-white shadow" />
                    <span className="font-bold text-indigo-700">{college.name}</span>
                  </div>
                  <div className="text-xs text-zinc-600">{college.city}, {college.district}, {college.state}</div>
                  <div className="text-xs">Type: <span className="font-semibold">{college.type}</span></div>
                  <div className="text-xs">Courses: {college.courses_interested.join(", ")}</div>
                  <div className="text-xs">Fees: {college.fees}</div>
                  <div className="text-xs">Facilities: {college.facilities.join(", ")}</div>
                  <div className="text-xs">Affiliated: {college.affiliated_to}</div>
                  <div className="text-xs">Deadline: <span className="font-semibold text-rose-600">{college.deadline}</span></div>
                  <div className="text-xs">Match: <span className="font-semibold text-indigo-700">{college.match}%</span></div>
                  <div className="text-xs">Status: {college.application_status === "applied" ? "Applied" : "Not Applied"}</div>
                  <div className="text-xs">Note: {notes[college.college_id]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Download/Export */}
      <div className="flex justify-end mt-8">
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Download My College List (PDF)</button>
      </div>
    </div>
  );
}
