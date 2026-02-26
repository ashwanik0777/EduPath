import Link from "next/link";
import { ArrowUpRight, Search, UserCircle2 } from "lucide-react";
import { CounselorStudentItem } from "../types";

type StudentsTabProps = {
  panelClass: string;
  inputClass: string;
  secondaryButtonClass: string;
  students: CounselorStudentItem[];
  studentSearch: string;
  setStudentSearch: React.Dispatch<React.SetStateAction<string>>;
  loadStudents: (query?: string) => Promise<void>;
};

export function StudentsTab({
  panelClass,
  inputClass,
  secondaryButtonClass,
  students,
  studentSearch,
  setStudentSearch,
  loadStudents,
}: StudentsTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Student Insights</h3>
        <div className="flex items-center gap-2">
          <input
            value={studentSearch}
            onChange={(event) => setStudentSearch(event.target.value)}
            className={inputClass}
            placeholder="Search by student name/email"
          />
          <button className={secondaryButtonClass} onClick={() => loadStudents(studentSearch)}>
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>
      {students.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">No assigned students found for this counselor.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {students.map((student) => (
            <div key={student.studentId} className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1"><UserCircle2 className="w-4 h-4 text-slate-500"/><p className="font-medium text-slate-800">{student.name}</p></div>
              <p className="text-xs text-slate-500 truncate">{student.email}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <span>Sessions: {student.totalSessions}</span>
                <span>Completed: {student.completedSessions}</span>
                <span>Upcoming: {student.upcomingSessions}</span>
                <span>Rate: {student.completionRate}%</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{student.lastSessionAt ? `Last session: ${new Date(student.lastSessionAt).toLocaleDateString()}` : "No session date"}</span>
                <Link href={`/counselorDashboard/students/${student.studentId}`} className="inline-flex items-center gap-1 text-indigo-700 font-medium hover:text-indigo-900">
                  View More <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
