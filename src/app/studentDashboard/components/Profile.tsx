import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import {
  User as UserIcon,
  Phone,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Pencil,
  Check,
  X,
  Mail,
  MapPin,
  Map,
  Landmark,
  School,
  Star,
  Target,
  Briefcase,
  FileText,
  Users,
  ClipboardList,
  Layers,
  Award,
  MessageCircle,
  ListChecks
} from "lucide-react";

// Use backend enum values for academic.currentLevel
const classOptions = [
  { label: "High School (9th-12th)", value: "high-school" },
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Postgraduate", value: "postgraduate" },
  { label: "Other", value: "other" },
];
const streamOptions = ["Science", "Commerce", "Arts", "Other"];
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
const stateOptions = ["Jammu & Kashmir", "Delhi", "Maharashtra", "Uttar Pradesh", "Other"];
const careerFields = ["Engineering", "Medical", "Civil Services", "Business", "Teaching", "Design", "Other"];
const courseOptions = ["B.Tech", "MBBS", "B.Com", "BA", "B.Sc", "Other"];
const examOptions = ["JEE", "NEET", "UPSC", "CAT", "Other"];
const careerGoals = ["Job", "Business", "Govt. Job", "Entrepreneur", "Other"];

type ProfileForm = {
  name: string;
  profilePhoto: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  class: string; // will store backend value (e.g. class9)
  stream: string;
  board: string;
  prevMarks: string;
  school: string;
  passingYear: string;
  careerFields: string[];
  preferredCourses: string[];
  targetedExams: string[];
  careerGoal: string;
  testTaken: string;
  testDate: string;
  strengths: string;
  suggestedCareers: string;
  sessionsAttended: string;
  lastCounselingDate: string;
  counselorRemarks: string;
  actionItems: string;
};

export default function Profile() {
  const { user, loading, refetchAuthUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    profilePhoto: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    class: "",
    stream: "",
    board: "",
    prevMarks: "",
    school: "",
    passingYear: "",
    careerFields: [],
    preferredCourses: [],
    targetedExams: [],
    careerGoal: "",
    testTaken: "",
    testDate: "",
    strengths: "",
    suggestedCareers: "",
    sessionsAttended: "",
    lastCounselingDate: "",
    counselorRemarks: "",
    actionItems: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        profilePhoto: user.profile?.profileImage || "",
        dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0] : "",
        gender: user.profile?.gender || "",
        phone: user.profile?.phone || "",
        email: user.email || "",
        address: user.profile?.address?.street || "",
        state: user.profile?.address?.state || "",
        district: user.profile?.address?.city || "",
        city: user.profile?.address?.city || "",
        pincode: user.profile?.address?.pincode || "",
        class: user.academic?.currentLevel || "",
        stream: user.academic?.course || "",
        board: user.academic?.board || "",
        prevMarks: user.academic?.percentage !== undefined && user.academic?.percentage !== null ? String(user.academic.percentage) : "",
        school: user.academic?.institution || "",
        passingYear: user.academic?.year !== undefined && user.academic?.year !== null ? String(user.academic.year) : "",
        careerFields: Array.isArray(user.preferences?.careerFields) ? user.preferences.careerFields : [],
        preferredCourses: Array.isArray(user.preferences?.preferredCourses) ? user.preferences.preferredCourses : [],
        targetedExams: Array.isArray(user.preferences?.targetedExams) ? user.preferences.targetedExams : [],
        careerGoal: user.preferences?.careerGoal || "",
        testTaken: user.psychometric?.testTaken || "",
        testDate: user.psychometric?.testDate || "",
        strengths: user.psychometric?.strengths || "",
        suggestedCareers: user.psychometric?.suggestedCareers || "",
        sessionsAttended: user.counseling?.sessionsAttended || "",
        lastCounselingDate: user.counseling?.lastCounselingDate || "",
        counselorRemarks: user.counseling?.counselorRemarks || "",
        actionItems: user.counseling?.actionItems || "",
      });
    }
  }, [user]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "select-multiple") {
      const options = (e.target as HTMLSelectElement).selectedOptions;
      const values = Array.from(options).map((option) => option.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      // Map display value to backend value for enums
      if (name === "gender") {
        setForm((prev) => ({ ...prev, gender: value }));
      } else if (name === "class") {
        setForm((prev) => ({ ...prev, class: value }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    }
  }

  function handleCancel(): void {
    // Reset form to current user info and exit edit mode
    if (user) {
      setForm({
        name: user.name || "",
        profilePhoto: user.profile?.profileImage || "",
        dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0] : "",
        gender: user.profile?.gender || "",
        phone: user.profile?.phone || "",
        email: user.email || "",
        address: user.profile?.address?.street || "",
        state: user.profile?.address?.state || "",
  district: user.profile?.address?.city || "",
        city: user.profile?.address?.city || "",
        pincode: user.profile?.address?.pincode || "",
        class: user.academic?.currentLevel || "",
        stream: user.academic?.course || "",
        board: user.academic?.board || "",
        prevMarks: user.academic?.percentage || "",
        school: user.academic?.institution || "",
        passingYear: user.academic?.year || "",
        careerFields: user.preferences?.careerFields || [],
        preferredCourses: user.preferences?.preferredCourses || [],
        targetedExams: user.preferences?.targetedExams || [],
        careerGoal: user.preferences?.careerGoal || "",
        testTaken: user.psychometric?.testTaken || "",
        testDate: user.psychometric?.testDate || "",
        strengths: user.psychometric?.strengths || "",
        suggestedCareers: user.psychometric?.suggestedCareers || "",
        sessionsAttended: user.counseling?.sessionsAttended || "",
        lastCounselingDate: user.counseling?.lastCounselingDate || "",
        counselorRemarks: user.counseling?.counselorRemarks || "",
        actionItems: user.counseling?.actionItems || "",
      });
    }
    setError(null);
    setSuccess(null);
    setEditMode(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Map flat form to backend structure
      // Only allow valid year (1-10) for academic.year, or map to backend expectation
      // Ensure correct types for backend
      let passingYear = form.passingYear ? form.passingYear : "";
      if (Number(passingYear) > 10) passingYear = "10";
      if (Number(passingYear) < 1 && passingYear !== "") passingYear = "1";
      const payload = {
        ...form,
        gender: form.gender,
        class: form.class,
        passingYear: passingYear,
        prevMarks: form.prevMarks ? String(form.prevMarks) : "",
        careerFields: Array.isArray(form.careerFields) ? form.careerFields : [form.careerFields].filter(Boolean),
        preferredCourses: Array.isArray(form.preferredCourses) ? form.preferredCourses : [form.preferredCourses].filter(Boolean),
        targetedExams: Array.isArray(form.targetedExams) ? form.targetedExams : [form.targetedExams].filter(Boolean),
      };
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save profile.");
      } else {
        setSuccess("Profile saved successfully.");
        setEditMode(false);
        refetchAuthUser?.();
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setFormLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-400 text-xl animate-pulse gap-2">
        <UserIcon size={40} className="text-indigo-500" />
        Loading profile...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="mx-auto p-10 space-y-10 bg-white rounded-xl shadow-lg border border-zinc-200">

      <div className="flex items-center gap-6 border-b border-zinc-200 pb-4">
        <Avatar className="w-24 h-24 border-2 border-indigo-300 shadow-sm">
          <AvatarImage src={form.profilePhoto} alt={form.name} />
          <AvatarFallback>{form.name ? form.name[0] : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-2">
            <UserIcon className="text-indigo-600" /> {form.name || "Full Name"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">{form.email}</p>
        </div>
        <div className="flex gap-3">
          {!editMode ? (
            <Button type="button" onClick={() => setEditMode(true)} className="!bg-white border text-indigo-700 hover:bg-indigo-50 flex items-center gap-1 px-4">
              <Pencil size={16} /> Edit
            </Button>
          ) : (
            <>
              <Button type="button" onClick={handleCancel} className="!bg-white border text-gray-600 hover:bg-gray-100 flex items-center gap-1 px-4">
                <X size={16} /> Cancel
              </Button>
              <Button type="submit" disabled={formLoading} className="bg-indigo-700 hover:bg-indigo-800 text-white shadow flex items-center gap-1 px-5" >
                <Check size={16} /> {formLoading ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}

      {/* Basic Details */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
            <UserIcon /> Basic Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileInput label="Full Name" name="name" icon={<UserIcon size={18} />} value={form.name} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="Email ID" name="email" icon={<Mail size={18} />} value={form.email} edit={editMode} onChange={handleInputChange} type="email" />
          <ProfileInput label="Mobile Number" name="phone" icon={<Phone size={18} />} value={form.phone} edit={editMode} onChange={handleInputChange} type="tel" />
          <ProfileInput label="Date of Birth" name="dateOfBirth" icon={<CalendarDays size={18} />} value={form.dateOfBirth} edit={editMode} onChange={handleInputChange} type="date" />
      <ProfileSelect label="Gender" name="gender" options={genderOptions} icon={<Users size={18} />} value={form.gender} edit={editMode} onChange={handleInputChange} enumOptions />
          <ProfileInput label="Address" name="address" icon={<MapPin size={18} />} value={form.address} edit={editMode} onChange={handleInputChange} />
          <ProfileSelect label="State" name="state" options={stateOptions} icon={<Map size={18} />} value={form.state} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="District" name="district" icon={<Landmark size={18} />} value={form.district} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="City/Village" name="city" icon={<School size={18} />} value={form.city} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="Pincode" name="pincode" icon={<ClipboardList size={18} />} value={form.pincode} edit={editMode} onChange={handleInputChange} />
        </CardContent>
      </Card>

      {/* Academic Details */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
            <GraduationCap /> Academic Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {editMode ? (
            <ProfileSelect label="Current Class" name="class" options={classOptions} icon={<GraduationCap size={18} />} value={form.class} edit={editMode} onChange={handleInputChange} enumOptions />
          ) : (
            <ProfileInput label="Current Class" name="class" icon={<GraduationCap size={18} />} value={classOptions.find(opt => opt.value === form.class)?.label || ""} edit={false} onChange={() => {}} />
          )}
          <ProfileSelect label="Stream" name="stream" options={streamOptions} icon={<Layers size={18} />} value={form.stream} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="Board/University" name="board" icon={<Landmark size={18} />} value={form.board} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="Previous Class Marks/CGPA" name="prevMarks" icon={<Award size={18} />} value={form.prevMarks} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="School/College Name" name="school" icon={<School size={18} />} value={form.school} edit={editMode} onChange={handleInputChange} />
          <ProfileInput label="Passing Year" name="passingYear" icon={<CalendarDays size={18} />} value={form.passingYear} edit={editMode} onChange={handleInputChange} />
        </CardContent>
      </Card>

      {/* Career & Course Preferences */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
            <Target /> Career & Course Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {editMode ? (
            <ProfileSelect label="Interested Career Fields" name="careerFields" options={careerFields} icon={<Layers size={18} />} value={form.careerFields} multiple edit={editMode} onChange={handleInputChange} />
          ) : (
            <ProfileInput label="Interested Career Fields" name="careerFields" icon={<Layers size={18} />} value={Array.isArray(form.careerFields) ? form.careerFields.join(", ") : form.careerFields} edit={false} onChange={() => {}} />
          )}
          {editMode ? (
            <ProfileSelect label="Preferred Courses" name="preferredCourses" options={courseOptions} icon={<BookOpen size={18} />} value={form.preferredCourses} multiple edit={editMode} onChange={handleInputChange} />
          ) : (
            <ProfileInput label="Preferred Courses" name="preferredCourses" icon={<BookOpen size={18} />} value={Array.isArray(form.preferredCourses) ? form.preferredCourses.join(", ") : form.preferredCourses} edit={false} onChange={() => {}} />
          )}
          {editMode ? (
            <ProfileSelect label="Targeted Exams" name="targetedExams" options={examOptions} icon={<FileText size={18} />} value={form.targetedExams} multiple edit={editMode} onChange={handleInputChange} />
          ) : (
            <ProfileInput label="Targeted Exams" name="targetedExams" icon={<FileText size={18} />} value={Array.isArray(form.targetedExams) ? form.targetedExams.join(", ") : form.targetedExams} edit={false} onChange={() => {}} />
          )}
          <ProfileSelect label="Long-Term Career Goal" name="careerGoal" options={careerGoals} icon={<Briefcase size={18} />} value={form.careerGoal} edit={editMode} onChange={handleInputChange} />
        </CardContent>
      </Card>

      {/* Psychometric Test Data (Read-only) */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
            <ClipboardList /> Psychometric Test Data
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileInput label="Test Taken" name="testTaken" icon={<Check size={18} />} value={form.testTaken} edit={false} onChange={() => {}} />
          <ProfileInput label="Test Date" name="testDate" icon={<CalendarDays size={18} />} value={form.testDate} edit={false} onChange={() => {}} type="date" />
          <ProfileTextarea label="Key Strengths/Skills" name="strengths" icon={<Star size={18} />} value={form.strengths} rows={2} edit={false} onChange={() => {}} colSpan={2} />
          <ProfileTextarea label="Suggested Career Options" name="suggestedCareers" icon={<Target size={18} />} value={form.suggestedCareers} rows={2} edit={false} onChange={() => {}} colSpan={2} />
        </CardContent>
      </Card>

      {/* Counseling History (Read-only) */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
            <MessageCircle /> Counseling History
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileInput label="Sessions Attended" name="sessionsAttended" icon={<Users size={18} />} value={form.sessionsAttended} edit={false} onChange={() => {}} />
          <ProfileInput label="Last Counseling Date" name="lastCounselingDate" icon={<CalendarDays size={18} />} value={form.lastCounselingDate} edit={false} onChange={() => {}} type="date" />
          <ProfileTextarea label="Counselor Remarks / Notes" name="counselorRemarks" icon={<FileText size={18} />} value={form.counselorRemarks} rows={2} edit={false} onChange={() => {}} colSpan={2} />
          <ProfileTextarea label="Action Items / Next Steps" name="actionItems" icon={<ListChecks size={18} />} value={form.actionItems} rows={2} edit={false} onChange={() => {}} colSpan={2} />
        </CardContent>
      </Card>
    </form>
  );
}

type ProfileInputProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  edit: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
};
function ProfileInput({ label, icon, value, edit, onChange, name, type = "text" }: ProfileInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm flex items-center gap-2 text-zinc-700 select-none">
        {icon} {label}
      </label>
      <input
        className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
        type={type}
        name={name}
        value={value}
        disabled={!edit}
        onChange={onChange}
      />
    </div>
  );
}

type ProfileSelectProps = {
  label: string;
  icon: React.ReactNode;
  options: any[];
  value: string | string[];
  edit: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  multiple?: boolean;
  enumOptions?: boolean;
};
function ProfileSelect({ label, icon, options, value, edit, onChange, name, multiple = false, enumOptions = false }: ProfileSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm flex items-center gap-2 text-zinc-700 select-none">
        {icon} {label}
      </label>
      <select
        multiple={multiple}
        name={name}
        value={value}
        disabled={!edit}
        onChange={onChange}
        className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
        size={multiple ? Math.min(4, options.length) : undefined}
      >
        {!multiple && <option value="">Select {label}</option>}
        {options.map((opt: any) => (
          <option key={enumOptions ? opt.value : opt} value={enumOptions ? opt.value : opt}>
            {enumOptions ? opt.label : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

type ProfileTextareaProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  edit: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  rows?: number;
  colSpan?: number;
};
function ProfileTextarea({ label, icon, value, edit, onChange, name, rows = 3, colSpan = 1 }: ProfileTextareaProps) {
  return (
    <div className={`flex flex-col gap-1 ${colSpan > 1 ? "md:col-span-" + colSpan : ""}`}>
      <label className="font-semibold text-sm flex items-center gap-2 text-zinc-700 select-none">
        {icon} {label}
      </label>
      <textarea
        rows={rows}
        name={name}
        value={value}
        disabled={!edit}
        onChange={onChange}
        className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 resize-none"
      />
    </div>
  );
}
