"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, UserCircle2, Target, BookCheck, Activity, GraduationCap, Award } from "lucide-react";

type StudentDetailResponse = {
  success: boolean;
  message?: string;
  data?: {
    student: {
      _id: string;
      name: string;
      email: string;
      profileImage?: string;
      phone?: string;
      gender?: string;
      dateOfBirth?: string | null;
      academic: {
        currentLevel?: string;
        institution?: string;
        course?: string;
        year?: number | null;
        percentage?: number | null;
        interests?: string[];
      };
      preferences: {
        careerGoal?: string;
        careerFields?: string[];
        preferredLocations?: string[];
        preferredCourses?: string[];
        targetedExams?: string[];
      };
      createdAt?: string | null;
    };
    stats: {
      totalSessions: number;
      completedSessions: number;
      upcomingSessions: number;
      completionRate: number;
      assessmentsAttempted: number;
      averageAssessmentScore: number;
      latestAssessmentAt?: string | null;
      shortlistedCollegesCount: number;
      savedScholarshipsCount: number;
      savedExamsCount: number;
    };
    progress: {
      updatedAt?: string | null;
      summary: {
        total: number;
        completed: number;
        inProgress: number;
        locked: number;
      };
      steps: Array<{
        stepId: number;
        key: string;
        status: "completed" | "in_progress" | "locked";
        details?: string;
        counselorNotes?: string;
        completedOn?: string | null;
      }>;
    };
    sessions: Array<{
      _id: string;
      type: string;
      scheduledAt: string;
      duration: number;
      status: string;
      platform: string;
      location?: string;
      counselorNotes?: string;
      actionItems?: string[];
    }>;
    psychometric: {
      recentResults: Array<{
        id: string;
        assessmentTitle: string;
        score: number;
        completedAt: string;
        topCategories: Array<{ category: string; percentage: number }>;
      }>;
    };
  };
};

async function fetchStudentDetail(studentId: string) {
  const response = await fetch(`/api/counselor/students/${studentId}`, {
    credentials: "include",
    cache: "no-store",
  });

  const data = (await response.json()) as StudentDetailResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch student details");
  }

  return data.data;
}

function statusStyles(status: string) {
  if (status === "completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "in_progress") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "scheduled") return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (status === "cancelled" || status === "no-show") return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function CounselorStudentDetailPage() {
  const params = useParams<{ studentId: string }>();
  const studentId = params?.studentId || "";

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [payload, setPayload] = React.useState<StudentDetailResponse["data"]>();

  React.useEffect(() => {
    if (!studentId) return;

    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStudentDetail(studentId);
        if (mounted) setPayload(data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Unable to load student details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/counselorDashboard" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">{error || "Student data not found"}</div>
        </div>
      </div>
    );
  }

  const panelClass = "bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-5";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_#f8fafc_38%,_#ffffff_65%)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href="/counselorDashboard" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 mb-3">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Student Progress Workspace</h1>
            <p className="text-slate-600">Detailed tracking, performance stats, and session history for assigned student.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-700 inline-flex w-fit">Counselor-assigned student view</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 ${panelClass}`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                {payload.student.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={payload.student.profileImage} alt={payload.student.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle2 className="w-6 h-6 text-slate-500" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{payload.student.name}</h2>
                <p className="text-sm text-slate-600">{payload.student.email}</p>
                <p className="text-xs text-slate-500 mt-1">Phone: {payload.student.phone || "-"} • Joined: {payload.student.createdAt ? new Date(payload.student.createdAt).toLocaleDateString() : "-"}</p>
              </div>
            </div>
          </div>
          <div className={panelClass}>
            <h3 className="font-semibold text-slate-900 mb-3">Academic Snapshot</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>Level: {payload.student.academic.currentLevel || "-"}</p>
              <p>Institution: {payload.student.academic.institution || "-"}</p>
              <p>Course: {payload.student.academic.course || "-"}</p>
              <p>Percentage: {payload.student.academic.percentage ?? "-"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          <div className={panelClass}><p className="text-xs text-slate-500">Total Sessions</p><p className="text-2xl font-bold text-slate-900">{payload.stats.totalSessions}</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Completed</p><p className="text-2xl font-bold text-emerald-700">{payload.stats.completedSessions}</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Upcoming</p><p className="text-2xl font-bold text-indigo-700">{payload.stats.upcomingSessions}</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Completion</p><p className="text-2xl font-bold text-cyan-700">{payload.stats.completionRate}%</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Assessments</p><p className="text-2xl font-bold text-slate-900">{payload.stats.assessmentsAttempted}</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Avg Score</p><p className="text-2xl font-bold text-violet-700">{payload.stats.averageAssessmentScore}%</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Shortlisted</p><p className="text-2xl font-bold text-slate-900">{payload.stats.shortlistedCollegesCount}</p></div>
          <div className={panelClass}><p className="text-xs text-slate-500">Saved Exams</p><p className="text-2xl font-bold text-slate-900">{payload.stats.savedExamsCount}</p></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className={panelClass}>
            <div className="flex items-center gap-2 mb-3"><BookCheck className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-slate-900">Progress Steps</h3></div>
            <div className="mb-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="rounded-lg border border-slate-200 p-2">Total: <span className="font-semibold">{payload.progress.summary.total}</span></div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2">Completed: <span className="font-semibold">{payload.progress.summary.completed}</span></div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">In Progress: <span className="font-semibold">{payload.progress.summary.inProgress}</span></div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">Locked: <span className="font-semibold">{payload.progress.summary.locked}</span></div>
            </div>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {payload.progress.steps.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 text-center">No progress steps available.</div>
              ) : (
                payload.progress.steps.map((step) => (
                  <div key={step.stepId} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-slate-900">Step {step.stepId}: {step.key.replaceAll("_", " ")}</p>
                      <span className={`text-xs px-2 py-0.5 rounded border capitalize ${statusStyles(step.status)}`}>{step.status.replaceAll("_", " ")}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{step.details || "No details provided."}</p>
                    {step.counselorNotes ? <p className="text-xs text-indigo-700 mt-1">Counselor note: {step.counselorNotes}</p> : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className={panelClass}>
            <div className="flex items-center gap-2 mb-3"><Target className="w-5 h-5 text-violet-600" /><h3 className="font-semibold text-slate-900">Psychometric Results</h3></div>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {payload.psychometric.recentResults.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 text-center">No psychometric attempts yet.</div>
              ) : (
                payload.psychometric.recentResults.map((row) => (
                  <div key={row.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-medium text-slate-900">{row.assessmentTitle}</p>
                    <p className="text-xs text-slate-500">{new Date(row.completedAt).toLocaleDateString()} • Score {row.score}%</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {row.topCategories.map((cat) => (
                        <span key={`${row.id}-${cat.category}`} className="text-[11px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                          {cat.category}: {cat.percentage}%
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className={panelClass}>
            <div className="flex items-center gap-2 mb-3"><Calendar className="w-5 h-5 text-blue-600" /><h3 className="font-semibold text-slate-900">Counseling Timeline</h3></div>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {payload.sessions.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 text-center">No session records yet.</div>
              ) : (
                payload.sessions.map((session) => (
                  <div key={session._id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-slate-900 capitalize">{session.type.replaceAll("-", " ")}</p>
                      <span className={`text-xs px-2 py-0.5 rounded border capitalize ${statusStyles(session.status)}`}>{session.status}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{new Date(session.scheduledAt).toLocaleString()} • {session.duration} min • {session.platform}</p>
                    {session.counselorNotes ? <p className="text-xs text-slate-700 mt-1">Notes: {session.counselorNotes}</p> : null}
                    {session.actionItems?.length ? <p className="text-xs text-slate-700 mt-1">Action items: {session.actionItems.join(", ")}</p> : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className={panelClass}>
            <div className="flex items-center gap-2 mb-3"><Activity className="w-5 h-5 text-cyan-600" /><h3 className="font-semibold text-slate-900">Career & Preference Snapshot</h3></div>
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="text-xs text-slate-500">Career Goal</p>
                <p>{payload.student.preferences.careerGoal || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Career Fields</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(payload.student.preferences.careerFields || []).length === 0 ? <span>-</span> : (payload.student.preferences.careerFields || []).map((field) => (
                    <span key={field} className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">{field}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="rounded-lg border border-slate-200 p-3"><div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-indigo-600" /><span className="text-xs text-slate-500">Shortlisted Colleges</span></div><p className="text-xl font-semibold mt-1">{payload.stats.shortlistedCollegesCount}</p></div>
                <div className="rounded-lg border border-slate-200 p-3"><div className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-600" /><span className="text-xs text-slate-500">Saved Scholarships</span></div><p className="text-xl font-semibold mt-1">{payload.stats.savedScholarshipsCount}</p></div>
                <div className="rounded-lg border border-slate-200 p-3"><div className="flex items-center gap-2"><Target className="w-4 h-4 text-violet-600" /><span className="text-xs text-slate-500">Saved Exams</span></div><p className="text-xl font-semibold mt-1">{payload.stats.savedExamsCount}</p></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
