import { UserCheck } from "lucide-react";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "counselor" | "admin";
  isActive: boolean;
};

type UsersTabProps = {
  panelClass: string;
  inputClass: string;
  primaryButtonClass: string;
  users: AdminUser[];
  userSearch: string;
  setUserSearch: React.Dispatch<React.SetStateAction<string>>;
  loadUsers: (query?: string) => Promise<void>;
  updateUserRole: (userId: string, role: AdminUser["role"]) => Promise<void>;
  askConfirmation: (config: {
    title: string;
    description: string;
    confirmLabel: string;
    confirmVariant?: "default" | "destructive";
    action: () => Promise<void>;
  }) => void;
  toggleUserActive: (user: AdminUser) => Promise<void>;
};

export function UsersTab({
  panelClass,
  inputClass,
  primaryButtonClass,
  users,
  userSearch,
  setUserSearch,
  loadUsers,
  updateUserRole,
  askConfirmation,
  toggleUserActive,
}: UsersTabProps) {
  return (
    <div className={`${panelClass} p-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
        <div className="flex gap-2">
          <input
            value={userSearch}
            onChange={(event) => setUserSearch(event.target.value)}
            placeholder="Search by name or email"
            className={inputClass}
          />
          <button
            onClick={() => loadUsers(userSearch)}
            className={primaryButtonClass}
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 text-slate-500">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No users found for this search.</td>
              </tr>
            ) : null}
            {users.map((user) => (
              <tr key={user._id} className="border-b border-slate-100">
                <td className="p-2 font-medium text-slate-800">{user.name}</td>
                <td className="p-2 text-slate-600">{user.email}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(event) => updateUserRole(user._id, event.target.value as AdminUser["role"])}
                    className="border border-slate-300 rounded px-2 py-1"
                  >
                    <option value="student">student</option>
                    <option value="counselor">counselor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      askConfirmation({
                        title: `${user.isActive ? "Deactivate" : "Activate"} User`,
                        description: `Are you sure you want to ${user.isActive ? "deactivate" : "activate"} ${user.name}?`,
                        confirmLabel: user.isActive ? "Deactivate" : "Activate",
                        confirmVariant: user.isActive ? "destructive" : "default",
                        action: async () => toggleUserActive(user),
                      })
                    }
                    className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                  >
                    <UserCheck className="w-4 h-4" />
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
