import { Save } from "lucide-react";

type ProfileTabProps = {
  panelClass: string;
  inputClass: string;
  primaryButtonClass: string;
  profile: { name: string; phone: string; profileImage: string };
  setProfile: React.Dispatch<React.SetStateAction<{ name: string; phone: string; profileImage: string }>>;
  saveProfile: () => Promise<void>;
};

export function ProfileTab({ panelClass, inputClass, primaryButtonClass, profile, setProfile, saveProfile }: ProfileTabProps) {
  return (
    <div className={`${panelClass} p-6 space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-600">Full Name</label>
          <input
            value={profile.name}
            onChange={(event) => setProfile((previous) => ({ ...previous, name: event.target.value }))}
            className={`mt-1 ${inputClass}`}
            placeholder="Admin name"
          />
        </div>
        <div>
          <label className="text-sm text-slate-600">Phone</label>
          <input
            value={profile.phone}
            onChange={(event) => setProfile((previous) => ({ ...previous, phone: event.target.value }))}
            className={`mt-1 ${inputClass}`}
            placeholder="+91 ..."
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-600">Profile Image URL</label>
        <input
          value={profile.profileImage}
          onChange={(event) => setProfile((previous) => ({ ...previous, profileImage: event.target.value }))}
          className={`mt-1 ${inputClass}`}
          placeholder="https://..."
        />
      </div>

      <button onClick={saveProfile} className={primaryButtonClass}>
        <Save className="w-4 h-4" /> Save Profile
      </button>
    </div>
  );
}
