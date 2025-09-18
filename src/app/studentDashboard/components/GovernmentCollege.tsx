
import React, { useEffect, useState } from "react";
import { Loader2, MapPin, School, University, BookOpen, Info, Star, Phone, Mail, Globe, Users, Building2 } from "lucide-react";



const typeOptions = [
  { value: "school", label: "Govt. School" },
  { value: "college", label: "Govt. College" },
  { value: "university", label: "Govt. University" },
  { value: "polytechnic", label: "Polytechnic" },
];

const streamOptions = ["Science", "Arts", "Commerce", "Vocational"];
const mediumOptions = ["English", "Urdu", "Hindi"];
const coedOptions = [
  { value: "coed", label: "Co-ed" },
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
];

function getTypeIcon(typeValue: string) {
  if (typeValue === "school") return <School className="text-indigo-500" size={22} />;
  if (typeValue === "college" || typeValue === "polytechnic") return <Building2 className="text-indigo-500" size={22} />;
  if (typeValue === "university") return <University className="text-indigo-500" size={22} />;
  return <BookOpen className="text-indigo-500" size={22} />;
}

export default function GovernmentCollege() {
  const [academic, setAcademic] = useState<string | null>(null);
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [stream, setStream] = useState("");
  const [medium, setMedium] = useState("");
  const [coed, setCoed] = useState("");
  const [institutes, setInstitutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<any | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);

  // Fetch user's academic stage from profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setAcademic(data?.user?.academic_stage || "10th");
      } catch {
        setAcademic("10th");
      }
    }
    fetchProfile();
    setDistricts(["Srinagar", "Baramulla", "Budgam", "Anantnag", "Jammu", "Pulwama", "Kupwara", "Kathua"]);
  }, []);

  // Fetch institutes from API (wait for academic)
  useEffect(() => {
    if (!academic) return;
    async function fetchInstitutes() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          academic: academic || "",
          district,
          type,
          stream,
          medium,
          coed,
        });
        const res = await fetch(`/api/institutes?${params.toString()}`);
        const data = await res.json();
        setInstitutes(data.institutes || []);
      } catch {
        // fallback to demo data
        const demo = await import("@/app/data/institutes-demo.json");
        setInstitutes(demo.default);
      }
      setLoading(false);
    }
    fetchInstitutes();
  }, [academic, district, type, stream, medium, coed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-0 md:p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto py-8 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-2 text-center">Explore Government Schools & Colleges in Jammu & Kashmir</h1>
        <div className="text-center text-zinc-600 mb-6 text-base md:text-lg">Based on your profile, we’ve listed relevant institutions.</div>

        {/* Filters (to be redesigned in next step) */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select value={district} onChange={e => setDistrict(e.target.value)} className="rounded-lg border px-3 py-2 text-sm text-zinc-700 bg-white shadow min-w-[120px]">
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border px-3 py-2 text-sm text-zinc-700 bg-white shadow min-w-[120px]">
            <option value="">All Types</option>
            {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select value={stream} onChange={e => setStream(e.target.value)} className="rounded-lg border px-3 py-2 text-sm text-zinc-700 bg-white shadow min-w-[120px]">
            <option value="">All Streams</option>
            {streamOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={medium} onChange={e => setMedium(e.target.value)} className="rounded-lg border px-3 py-2 text-sm text-zinc-700 bg-white shadow min-w-[120px]">
            <option value="">All Mediums</option>
            {mediumOptions.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={coed} onChange={e => setCoed(e.target.value)} className="rounded-lg border px-3 py-2 text-sm text-zinc-700 bg-white shadow min-w-[120px]">
            <option value="">Co-ed/Boys/Girls</option>
            {coedOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Institute Listing (unchanged, will improve in next step) */}
        {loading ? (
          <div className="flex justify-center items-center py-16"><Loader2 className="animate-spin text-indigo-500" size={36} /></div>
        ) : institutes.length === 0 ? (
          <div className="text-center text-zinc-500 py-16">No institutes found for selected filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutes.map(inst => (
              <div key={inst._id} className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-5 flex flex-col gap-2 hover:shadow-indigo-200 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(inst.type)}
                  <div className="font-bold text-lg text-indigo-800">{inst.name}</div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-zinc-500 mb-1">
                  <span className="flex items-center gap-1"><MapPin size={14} />{inst.district}, {inst.city}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} />{inst.grade_level}</span>
                  <span className="flex items-center gap-1"><Info size={14} />{inst.type.charAt(0).toUpperCase() + inst.type.slice(1)}</span>
                </div>
                <div className="text-sm text-zinc-700 mb-1">Courses: {inst.courses?.map((c: any) => `${c.level} (${c.streams.join(", ")})`).join(", ")}</div>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{inst.courses?.[0]?.medium}</span>
                  <span className="bg-zinc-50 text-zinc-700 px-2 py-0.5 rounded">{inst.courses?.[0]?.affiliated_to}</span>
                </div>
                <button className="mt-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition-all" onClick={() => setShowDetails(inst)}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal/Panel (unchanged) */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-auto z-50 relative animate-fade-in">
            <button className="absolute top-3 right-3 text-zinc-400 hover:text-indigo-600 text-xl" onClick={() => setShowDetails(null)}>&times;</button>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(showDetails.type)}
                  <div className="font-bold text-2xl text-indigo-800">{showDetails.name}</div>
                </div>
                <div className="text-zinc-600 mb-1">{showDetails.address}</div>
                <div className="flex flex-wrap gap-2 text-xs text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><MapPin size={14} />{showDetails.district}, {showDetails.city}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} />{showDetails.grade_level}</span>
                  <span className="flex items-center gap-1"><Info size={14} />{showDetails.type.charAt(0).toUpperCase() + showDetails.type.slice(1)}</span>
                </div>
                <div className="mb-2 text-sm text-zinc-700">Courses: {showDetails.courses?.map((c: any) => `${c.level} (${c.streams.join(", ")})`).join(", ")}</div>
                <div className="mb-2 text-sm text-zinc-700">Facilities: {showDetails.facilities?.join(", ")}</div>
                <div className="mb-2 text-sm text-zinc-700">Year Established: {showDetails.year_established || "-"}</div>
                {showDetails.principal && <div className="mb-2 text-sm text-zinc-700">Principal: {showDetails.principal}</div>}
                <div className="mb-2 text-sm text-zinc-700">Admission: {showDetails.admission_process}</div>
                <div className="mb-2 text-sm text-zinc-700">Medium: {showDetails.courses?.[0]?.medium}</div>
                <div className="mb-2 text-sm text-zinc-700">Affiliated: {showDetails.courses?.[0]?.affiliated_to}</div>
                <div className="mb-2 text-sm text-zinc-700">Co-ed: {showDetails.coed_type}</div>
                <div className="mb-2 text-sm text-zinc-700">Contact: {showDetails.contact_phone} {showDetails.contact_email && <span>| {showDetails.contact_email}</span>}</div>
                {showDetails.website && <div className="mb-2 text-sm"><a href={showDetails.website} target="_blank" rel="noopener" className="text-indigo-600 underline">Visit Website</a></div>}
                {showDetails.location_map_url && <div className="mb-2"><a href={showDetails.location_map_url} target="_blank" rel="noopener" className="text-blue-600 underline">View on Map</a></div>}
                <div className="mb-2 text-sm text-zinc-700">Testimonials:</div>
                <ul className="mb-2">
                  {showDetails.testimonials?.map((t: any, i: number) => (
                    <li key={i} className="text-zinc-600 text-xs flex items-center gap-2"><Star className="text-yellow-400" size={14} />{t.student}: {t.text}</li>
                  ))}
                </ul>
                <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition-all">Save to My List</button>
              </div>
              {/* Map/Sidebar */}
              {showDetails.location_map_url && (
                <iframe
                  src={showDetails.location_map_url}
                  title="Map"
                  className="rounded-xl border w-full md:w-80 h-56 md:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
            <div className="mt-4 text-sm text-zinc-500">Nearby Institutes: <span className="text-indigo-600">(Coming soon)</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
