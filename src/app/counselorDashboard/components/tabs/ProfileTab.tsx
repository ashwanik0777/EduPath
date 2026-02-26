import { Save } from "lucide-react";
import { ProfileDraft } from "../types";

type ProfileTabProps = {
  panelClass: string;
  inputClass: string;
  primaryButtonClass: string;
  profileDraft: ProfileDraft;
  setProfileDraft: React.Dispatch<React.SetStateAction<ProfileDraft>>;
  saveProfile: () => Promise<void>;
  saving: boolean;
};

export function ProfileTab({
  panelClass,
  inputClass,
  primaryButtonClass,
  profileDraft,
  setProfileDraft,
  saveProfile,
  saving,
}: ProfileTabProps) {
  return (
    <div className={`${panelClass} p-6 space-y-5`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm text-slate-600">Full Name</label><input value={profileDraft.name} onChange={(event) => setProfileDraft((prev) => ({ ...prev, name: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
        <div><label className="text-sm text-slate-600">Display Name</label><input value={profileDraft.displayName} onChange={(event) => setProfileDraft((prev) => ({ ...prev, displayName: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
        <div><label className="text-sm text-slate-600">Email</label><input value={profileDraft.email} disabled className={`mt-1 ${inputClass} bg-slate-50`} /></div>
        <div><label className="text-sm text-slate-600">Phone</label><input value={profileDraft.phone} onChange={(event) => setProfileDraft((prev) => ({ ...prev, phone: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
      </div>
      <div><label className="text-sm text-slate-600">Profile Image URL</label><input value={profileDraft.profileImage} onChange={(event) => setProfileDraft((prev) => ({ ...prev, profileImage: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
      <div><label className="text-sm text-slate-600">Bio</label><textarea value={profileDraft.bio} onChange={(event) => setProfileDraft((prev) => ({ ...prev, bio: event.target.value }))} className={`mt-1 min-h-[90px] ${inputClass}`} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm text-slate-600">Specializations (comma separated)</label><input value={profileDraft.specializationsText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, specializationsText: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
        <div><label className="text-sm text-slate-600">Languages (comma separated)</label><input value={profileDraft.languagesText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, languagesText: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div><label className="text-sm text-slate-600">Timezone</label><input value={profileDraft.availability.timezone} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, timezone: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
        <div><label className="text-sm text-slate-600">Start Time</label><input type="time" value={profileDraft.availability.start} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, start: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
        <div><label className="text-sm text-slate-600">End Time</label><input type="time" value={profileDraft.availability.end} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, end: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
        <div className="flex items-end"><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={profileDraft.availability.isAvailable} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, isAvailable: event.target.checked } }))} />Available for booking</label></div>
      </div>
      <div><label className="text-sm text-slate-600">Working Days (comma separated)</label><input value={profileDraft.availability.workingDaysText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, workingDaysText: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
      <button onClick={saveProfile} disabled={saving} className={primaryButtonClass}><Save className="w-4 h-4"/>Save Counselor Profile</button>
    </div>
  );
}
