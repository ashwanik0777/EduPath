

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/hooks/useAuth";

const classOptions = [
  "9th", "10th", "11th", "12th", "Undergraduate", "Postgraduate"
];
const streamOptions = [
  "Science", "Commerce", "Arts", "Other"
];


export default function Profile() {
  const { user, loading, refetchAuthUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    class: "",
    stream: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch latest user data on mount or when user changes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.profile?.phone || "",
        dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0] : "",
        class: user.class || "",
        stream: user.stream || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setError(null);
    setSuccess(null);
    setEditMode(true);
  };
  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.profile?.phone || "",
        dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0] : "",
        class: user.class || "",
        stream: user.stream || "",
      });
    }
    setError(null);
    setSuccess(null);
    setEditMode(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update profile");
      } else {
        setSuccess("Profile updated successfully!");
        setEditMode(false);
        if (refetchAuthUser) await refetchAuthUser();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-400 text-lg">Loading...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        {!editMode && (
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </div>
      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
      {success && <div className="mb-4 text-green-600 font-medium">{success}</div>}
      <form className="space-y-6" onSubmit={handleSave}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode || formLoading}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode || formLoading}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            disabled={!editMode || formLoading}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select
            name="class"
            value={form.class}
            onChange={handleChange}
            disabled={!editMode || formLoading}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          >
            <option value="">Select Class</option>
            {classOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
          <select
            name="stream"
            value={form.stream}
            onChange={handleChange}
            disabled={!editMode || formLoading}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          >
            <option value="">Select Stream</option>
            {streamOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        {editMode && (
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={formLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={formLoading}>
              {formLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
