"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PERMISSION_KEYS, PERMISSION_LABELS, type PermissionKey, type Permissions } from "@/lib/permissions";
import { usePermissions } from "@/lib/useAuthz";
import { CategoryManager } from "@/app/manuals/_ui/CategoryManager";

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  permissions: Permissions;
  createdAt: string;
  protected: boolean;
};

export default function AdminPage() {
  const { isAdmin, ready } = usePermissions();
  const [pending, setPending] = useState<AdminUser[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Not authorized");
      return;
    }
    setPending(data.pending || []);
    setUsers(data.users || []);
  }

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  async function patch(id: string, body: Record<string, unknown>) {
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }
    await load();
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-16">
          <h1 className="font-serif-display text-2xl font-bold">Not authorized</h1>
          <p className="text-sm text-[#52635E] mt-2">Only admins can manage users and approvals.</p>
        </main>
      </div>
    );
  }

  const approved = users.filter((u) => u.status !== "PENDING");

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="font-serif-display text-3xl font-bold">User requests</h1>
          <p className="text-sm text-[#52635E] mt-1">Approve signups, then grant permissions per person. Categories for the manuals catalog live here too.</p>
        </div>
        {error ? <p className="text-xs text-red-700">{error}</p> : null}

        <CategoryManager />

        <section className="space-y-3">
          <h2 className="font-serif-display text-xl font-bold">Pending approvals ({pending.length})</h2>
          {pending.length === 0 ? (
            <p className="text-xs text-[#8A9B95]">No pending signups.</p>
          ) : (
            pending.map((u) => (
              <Card key={u.id} hoverable={false} className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{u.name || u.email}</p>
                  <p className="text-xs text-[#8A9B95]">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" onClick={() => patch(u.id, { status: "ACTIVE" })}>
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => patch(u.id, { status: "REJECTED" })}>
                    Reject
                  </Button>
                </div>
              </Card>
            ))
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-xl font-bold">People</h2>
          {approved.map((u) => (
            <Card key={u.id} hoverable={false} className="p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">
                    {u.name || u.email}{" "}
                    <span className="text-[10px] uppercase tracking-wider text-[#D97706]">{u.role}</span>
                  </p>
                  <p className="text-xs text-[#8A9B95]">
                    {u.email} · {u.status}
                    {u.protected ? " · seed admin" : ""}
                  </p>
                </div>
                {u.status === "REJECTED" && !u.protected ? (
                  <Button size="sm" variant="outline" onClick={() => patch(u.id, { status: "ACTIVE" })}>
                    Restore
                  </Button>
                ) : null}
              </div>
              {u.protected || u.role === "ADMIN" ? (
                <p className="text-[11px] text-[#8A9B95]">All permissions on. Cannot be downgraded here.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2">
                  {PERMISSION_KEYS.map((key: PermissionKey) => (
                    <label key={key} className="flex items-center gap-2 text-xs text-[#1C2A26]">
                      <input
                        type="checkbox"
                        checked={u.permissions[key]}
                        onChange={(e) =>
                          patch(u.id, { permissions: { ...u.permissions, [key]: e.target.checked } })
                        }
                      />
                      {PERMISSION_LABELS[key]}
                    </label>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
