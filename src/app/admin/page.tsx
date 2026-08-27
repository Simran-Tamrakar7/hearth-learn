"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PERMISSION_KEYS, PERMISSION_LABELS, STATUS_ACTIVE, STATUS_PENDING, STATUS_REJECTED, type Permissions } from "@/lib/permissions";
import { usePermissions } from "@/lib/useAuthz";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastActiveAt: string | null;
  permissions: Permissions;
  protected?: boolean;
  prefs: Record<string, unknown>;
  activity: {
    highlights: number;
    showcase: number;
    lifeLabAttempts: number;
    lastActiveAt: string | null;
    streak: number;
    studyMinutes: number;
    badges: string[];
    pinned: string[];
    progress: Record<string, unknown>;
  };
};

const STATUS_FILTERS = ["ALL", STATUS_PENDING, STATUS_ACTIVE, STATUS_REJECTED] as const;

function statusLabel(status: string) {
  if (status === STATUS_ACTIVE) return "Approved";
  if (status === STATUS_PENDING) return "Pending";
  if (status === STATUS_REJECTED) return "Rejected";
  return status;
}

export default function AdminPage() {
  const { isAdmin, ready } = usePermissions();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("ALL");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<UserRow | null>(null);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return users.filter((u) => {
      if (statusFilter !== "ALL" && u.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        (u.name || "").toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle) ||
        u.role.toLowerCase().includes(needle)
      );
    });
  }, [users, q, statusFilter]);

  async function patch(body: Record<string, unknown>) {
    setError("");
    setOk("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }
    setOk("Updated.");
    await load();
    if (detail) {
      const nextRes = await fetch("/api/admin/users", { cache: "no-store" });
      const next = nextRes.ok ? ((await nextRes.json()).users as UserRow[]) : [];
      setDetail(next.find((u) => u.id === detail.id) || null);
    }
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
          <p className="text-sm text-[#52635E] mt-2">This panel is restricted to Admin.</p>
        </main>
      </div>
    );
  }

  const allSelected = filtered.length > 0 && filtered.every((u) => selected.has(u.id));

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
        <header>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">Cabin staff</p>
          <h1 className="font-serif-display text-4xl font-semibold">Users</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#52635E]">
            Approve accounts and grant permissions. Room flags and categories live under Settings. Open Admin from your avatar menu.
          </p>
        </header>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        {ok ? <p className="text-sm text-emerald-800">{ok}</p> : null}

        <section className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <input
              className="min-w-[200px] flex-1 rounded-xl border border-[#E7E0D3] bg-white px-3 py-2 text-sm"
              placeholder="Search name, email, role"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  statusFilter === s ? "bg-[#1C2A26] text-[#FAF7F2] border-[#1C2A26]" : "bg-white text-[#52635E] border-[#E7E0D3]"
                }`}
                onClick={() => setStatusFilter(s)}
              >
                {s === "ALL" ? "All" : statusLabel(s)}
              </button>
            ))}
          </div>

          {selected.size > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="self-center text-xs text-[#8A9B95]">{selected.size} selected</span>
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D3] bg-white" onClick={() => void patch({ ids: [...selected], status: STATUS_ACTIVE })}>
                Bulk approve
              </button>
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D3] bg-white" onClick={() => void patch({ ids: [...selected], status: STATUS_REJECTED })}>
                Bulk reject
              </button>
              {PERMISSION_KEYS.map((key) => (
                <button key={key} type="button" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D3] bg-white" onClick={() => void patch({ ids: [...selected], permissions: { [key]: true } })}>
                  Grant {PERMISSION_LABELS[key]}
                </button>
              ))}
            </div>
          ) : null}

          <div className="overflow-x-auto bg-white border border-[#E7E0D3] rounded-2xl">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#E7E0D3] text-[10px] uppercase tracking-widest text-[#8A9B95]">
                <tr>
                  <th className="p-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => {
                        if (allSelected) setSelected(new Set());
                        else setSelected(new Set(filtered.map((u) => u.id)));
                      }}
                    />
                  </th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-[#E7E0D3]/60 hover:bg-[#FAF7F2]">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.has(u.id)}
                        onChange={() => {
                          const next = new Set(selected);
                          if (next.has(u.id)) next.delete(u.id);
                          else next.add(u.id);
                          setSelected(next);
                        }}
                      />
                    </td>
                    <td className="p-3">
                      <button type="button" className="font-medium underline-offset-2 hover:underline" onClick={() => setDetail(u)}>
                        {u.name || "—"}
                      </button>
                    </td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{statusLabel(u.status)}</td>
                    <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {detail ? <UserDetail user={detail} onClose={() => setDetail(null)} onPatch={patch} /> : null}
      </main>
    </div>
  );
}

function UserDetail({
  user,
  onClose,
  onPatch,
}: {
  user: UserRow;
  onClose: () => void;
  onPatch: (body: Record<string, unknown>) => Promise<void>;
}) {
  const [perms, setPerms] = useState(user.permissions);
  useEffect(() => setPerms(user.permissions), [user]);

  function toggle(key: keyof Permissions) {
    if (user.protected || user.role === "ADMIN") return;
    const next = { ...perms, [key]: !perms[key] };
    setPerms(next);
    void onPatch({ id: user.id, permissions: next });
  }

  const progress = user.activity?.progress || {};

  return (
    <section className="bg-white border border-[#E7E0D3] rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif-display text-2xl font-semibold">{user.name || user.email}</h2>
          <p className="text-sm text-[#8A9B95]">{user.email} · {user.role} · {statusLabel(user.status)}</p>
        </div>
        <button type="button" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D3]" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="flex gap-2">
        {user.status !== STATUS_ACTIVE ? (
          <button type="button" className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#1C2A26] text-[#FAF7F2]" onClick={() => void onPatch({ id: user.id, status: STATUS_ACTIVE })}>
            Approve
          </button>
        ) : null}
        {user.status !== STATUS_REJECTED ? (
          <button type="button" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D3]" onClick={() => void onPatch({ id: user.id, status: STATUS_REJECTED })}>
            Reject
          </button>
        ) : null}
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8A9B95]">Permissions</h3>
        {user.protected || user.role === "ADMIN" ? (
          <p className="mt-2 text-xs text-[#8A9B95]">Admin accounts cannot be downgraded.</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {PERMISSION_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  perms[key] ? "bg-[#1C2A26] text-[#FAF7F2] border-[#1C2A26]" : "bg-white text-[#52635E] border-[#E7E0D3]"
                }`}
                onClick={() => toggle(key)}
              >
                {PERMISSION_LABELS[key]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Streak" value={`${user.activity?.streak || 0} days`} />
        <Stat label="Study time" value={`${user.activity?.studyMinutes || 0} min`} />
        <Stat label="Highlights" value={String(user.activity?.highlights || 0)} />
        <Stat label="Last active" value={user.activity?.lastActiveAt ? new Date(user.activity.lastActiveAt).toLocaleString() : "—"} />
      </div>
      <p className="text-sm text-[#52635E]">Pinned manuals: {user.activity?.pinned?.length ? user.activity.pinned.join(", ") : "none"}</p>
      <p className="text-sm text-[#52635E]">Badges: {user.activity?.badges?.length ? user.activity.badges.join(", ") : "none yet"}</p>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8A9B95]">Progress per manual</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {Object.keys(progress).length === 0 ? <li className="text-[#8A9B95]">No progress recorded.</li> : null}
          {Object.entries(progress).map(([slug, value]) => (
            <li key={slug}>
              <span className="font-medium">{slug}</span>{" "}
              <span className="text-[#8A9B95]">{Array.isArray(value) ? `${value.length} chapters` : JSON.stringify(value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] px-3 py-2">
      <p className="text-[10px] uppercase tracking-widest text-[#8A9B95]">{label}</p>
      <p className="font-serif-display text-lg font-semibold">{value}</p>
    </div>
  );
}
