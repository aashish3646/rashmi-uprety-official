import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  type Enquiry,
  getEnquiries,
  markEnquiryRead,
  markAllEnquiriesRead,
  deleteEnquiry,
  getUnreadCount,
  exportEnquiriesJson,
  requestNotificationPermission,
  playNotificationSound,
} from "@/lib/admin";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function formatDate(ts: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [newEnquiryToast, setNewEnquiryToast] = useState<Enquiry | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const refresh = useCallback(() => setEnquiries(getEnquiries()), []);
  useEffect(() => { refresh(); }, [refresh]);

  // Request browser notification permission on dashboard load
  useEffect(() => {
    requestNotificationPermission();

    const handleNewEnquiry = (enquiry: Enquiry) => {
      refresh();
      setNewEnquiryToast(enquiry);

      if (soundEnabled) {
        playNotificationSound();
      }

      // Trigger native OS desktop notification if window is minimized or unfocused
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(`New Enquiry from ${enquiry.name}`, {
          body: `${enquiry.subject}\n"${enquiry.message.slice(0, 100)}..."`,
          icon: "/favicon.ico",
        });
      }
    };

    // Listen on BroadcastChannel for real-time cross-tab updates
    if (typeof BroadcastChannel !== "undefined") {
      const bc = new BroadcastChannel("rashmi_admin_notifications");
      bc.onmessage = (event) => {
        if (event.data?.type === "NEW_ENQUIRY") {
          handleNewEnquiry(event.data.enquiry);
        }
      };
      return () => bc.close();
    }
  }, [refresh, soundEnabled]);

  const handleSelect = (e: Enquiry) => {
    if (!e.read) { markEnquiryRead(e.id); refresh(); }
    setSelected(e);
  };

  const handleMarkAllRead = () => {
    markAllEnquiriesRead();
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteEnquiry(id);
    if (selected?.id === id) setSelected(null);
    setConfirmDelete(null);
    refresh();
  };

  const handleExport = () => {
    const json = exportEnquiriesJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEmail = (email: string) => {
    void navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filtered = enquiries.filter((e) => {
    const matchesTab = activeTab === "unread" ? !e.read : true;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.message.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const unreadCount = getUnreadCount();

  return (
    <AdminShell activeSection="enquiries">
      <div className="enq-wrap">
        {/* Header */}
        <header className="enq-header">
          <div>
            <h1 className="enq-title">Enquiries & Messages</h1>
            <p className="enq-sub">
              {enquiries.length} total · {unreadCount} unread
            </p>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="enq-action-btn"
              title={soundEnabled ? "Sound alerts enabled" : "Sound alerts muted"}
            >
              {soundEnabled ? "🔔 Sound On" : "🔕 Sound Muted"}
            </button>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="enq-action-btn">
                ✓ Mark all read
              </button>
            )}
            <button onClick={handleExport} className="enq-action-btn">
              📥 Export JSON
            </button>
            <a href={`mailto:${SITE.email}`} className="enq-action-btn">
              📧 Open Inbox
            </a>
          </div>
        </header>

        {/* Live Notification Toast Banner */}
        {newEnquiryToast && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-3.5 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">New Real-time Enquiry Received!</p>
                <p className="text-sm font-medium text-neutral-200">
                  {newEnquiryToast.name} (<span className="text-amber-400">{newEnquiryToast.email}</span>): "{newEnquiryToast.subject}"
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelect(newEnquiryToast)}
                className="text-xs font-semibold px-3 py-1.5 rounded bg-amber-500 text-neutral-950 hover:bg-amber-400"
              >
                Read Message →
              </button>
              <button
                onClick={() => setNewEnquiryToast(null)}
                className="text-xs text-neutral-400 hover:text-white px-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="enq-stats">
          {[
            { n: enquiries.length, lbl: "Total", col: "#f5f5f5" },
            { n: unreadCount, lbl: "Unread", col: "#f87171" },
            { n: enquiries.length - unreadCount, lbl: "Read", col: "#4ade80" },
          ].map((s) => (
            <div className="enq-stat" key={s.lbl}>
              <span className="enq-stat-n" style={{ color: s.col }}>{s.n}</span>
              <span className="enq-stat-l">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Tab & Search bar */}
        <div className="enq-toolbar">
          <div className="enq-tabs">
            <button className={`enq-tab${activeTab === "all" ? " enq-tab-active" : ""}`} onClick={() => setActiveTab("all")}>All ({enquiries.length})</button>
            <button className={`enq-tab${activeTab === "unread" ? " enq-tab-active" : ""}`} onClick={() => setActiveTab("unread")}>Unread ({unreadCount})</button>
          </div>
          <div className="enq-search-wrap">
            <input
              type="text"
              placeholder="Search by name, email, or content…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="enq-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="enq-search-clear">×</button>
            )}
          </div>
        </div>

        {/* List + Detail */}
        <div className="enq-content">
          <div className="enq-list">
            {filtered.length === 0 ? (
              <div className="enq-empty">
                <span style={{ fontSize: "2rem" }}>📭</span>
                <p>No {activeTab === "unread" ? "unread " : ""}enquiries found.</p>
                <p style={{ fontSize: "0.72rem", color: "#444" }}>
                  {searchQuery ? "Try clearing your search query." : "Submissions from the contact form will appear here."}
                </p>
              </div>
            ) : filtered.map((e) => (
              <button
                key={e.id}
                className={`enq-item${selected?.id === e.id ? " enq-item-active" : ""}${!e.read ? " enq-item-unread" : ""}`}
                onClick={() => handleSelect(e)}
              >
                <div className="enq-item-top">
                  <span className="enq-item-name">{e.name}</span>
                  <span className="enq-item-time">{formatDate(e.submittedAt)}</span>
                </div>
                <p className="enq-item-subj">{e.subject}</p>
                <p className="enq-item-prev">{e.message.length > 90 ? e.message.slice(0, 90) + "…" : e.message}</p>
                {!e.read && <span className="enq-dot" />}
              </button>
            ))}
          </div>

          <div className="enq-detail">
            {selected ? (
              <>
                <div className="enq-detail-hdr">
                  <div>
                    <h2 className="enq-detail-subj">{selected.subject}</h2>
                    <p className="enq-detail-meta">
                      From <strong>{selected.name}</strong> ·{" "}
                      <a href={`mailto:${selected.email}`} className="enq-email-link">{selected.email}</a>
                      <button onClick={() => handleCopyEmail(selected.email)} className="ml-2 text-xs text-neutral-400 hover:text-white underline">
                        {copiedEmail ? "✓ Copied" : "Copy email"}
                      </button>
                    </p>
                    <p className="enq-detail-date">{formatDate(selected.submittedAt)}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="enq-action-btn">↩ Reply Email</a>
                    <button className="enq-action-btn enq-danger" onClick={() => setConfirmDelete(selected.id)}>🗑 Delete</button>
                  </div>
                </div>
                <div className="enq-detail-body">
                  {selected.message.split("\n").map((l, i) => <p key={i} style={{ margin: "0 0 0.5rem" }}>{l}</p>)}
                </div>
                {confirmDelete === selected.id && (
                  <div className="enq-confirm">
                    <p>Delete enquiry from <strong>{selected.name}</strong>? This cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="enq-action-btn enq-danger" onClick={() => handleDelete(selected.id)}>Yes, delete</button>
                      <button className="enq-action-btn" onClick={() => setConfirmDelete(null)}>Cancel</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="enq-detail-empty">
                <span style={{ fontSize: "2rem" }}>👈</span>
                <p>Select an enquiry to read details and reply</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .enq-wrap { display:flex; flex-direction:column; flex:1; overflow:hidden; }
        .enq-header { padding:1.5rem 2rem 1rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .enq-title { font-size:1.35rem; font-weight:700; color:#f5f5f5; margin:0 0 0.15rem; letter-spacing:-0.02em; }
        .enq-sub { font-size:0.8rem; color:#555; margin:0; }
        .enq-action-btn { font-size:0.75rem; font-weight:600; color:#aaa; background:#1a1a1a; border:1px solid #222; border-radius:7px; padding:0.5rem 0.9rem; cursor:pointer; text-decoration:none; transition:all 0.15s; white-space:nowrap; }
        .enq-action-btn:hover { background:#222; color:#f5f5f5; }
        .enq-danger:hover { background:#450a0a; border-color:#ef4444; color:#f87171; }
        .enq-stats { display:flex; border-bottom:1px solid #1e1e1e; flex-wrap:wrap; }
        .enq-stat { padding:1rem 2rem; border-right:1px solid #1e1e1e; display:flex; flex-direction:column; gap:0.15rem; min-width:120px; }
        .enq-stat-n { font-size:1.5rem; font-weight:700; line-height:1; }
        .enq-stat-l { font-size:0.7rem; color:#555; text-transform:uppercase; letter-spacing:0.06em; }
        .enq-toolbar { display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #1e1e1e; padding:0 1.5rem; flex-wrap:wrap; gap:0.75rem; }
        .enq-tabs { display:flex; gap:0; }
        .enq-tab { background:none; border:none; border-bottom:2px solid transparent; padding:0.75rem 0.75rem; font-size:0.8rem; color:#555; cursor:pointer; transition:all 0.15s; }
        .enq-tab:hover { color:#aaa; }
        .enq-tab-active { color:#f5f5f5; border-bottom-color:#c9a96e; font-weight:600; }
        .enq-search-wrap { position:relative; display:flex; align-items:center; }
        .enq-search-input { background:#141414; border:1px solid #262626; border-radius:6px; padding:0.4rem 2rem 0.4rem 0.75rem; color:#eee; font-size:0.78rem; outline:none; width:260px; transition:border-color 0.2s; }
        .enq-search-input:focus { border-color:#c9a96e; }
        .enq-search-clear { position:absolute; right:0.5rem; background:none; border:none; color:#777; cursor:pointer; font-size:1rem; }
        .enq-content { display:flex; flex:1; overflow:hidden; }
        .enq-list { width:340px; flex-shrink:0; border-right:1px solid #1e1e1e; overflow-y:auto; display:flex; flex-direction:column; }
        .enq-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem 1.5rem; text-align:center; gap:0.5rem; color:#555; font-size:0.82rem; }
        .enq-item { position:relative; padding:1rem 1.25rem; border-bottom:1px solid #161616; background:none; border-left:none; border-right:none; border-top:none; text-align:left; cursor:pointer; transition:background 0.12s; width:100%; }
        .enq-item:hover { background:#141414; }
        .enq-item-active { background:#181818!important; border-left:3px solid #c9a96e!important; }
        .enq-item-unread { background:#111; }
        .enq-item-top { display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:0.2rem; }
        .enq-item-name { font-size:0.82rem; font-weight:600; color:#e5e5e5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .enq-item-time { font-size:0.65rem; color:#444; flex-shrink:0; }
        .enq-item-subj { font-size:0.78rem; font-weight:500; color:#bbb; margin:0 0 0.25rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .enq-item-prev { font-size:0.72rem; color:#555; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.45; }
        .enq-dot { position:absolute; top:1rem; right:1rem; width:8px; height:8px; border-radius:50%; background:#c9a96e; }
        .enq-detail { flex:1; overflow-y:auto; display:flex; flex-direction:column; min-width:0; }
        .enq-detail-hdr { padding:1.5rem 2rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:flex-start; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
        .enq-detail-subj { font-size:1.1rem; font-weight:700; color:#f5f5f5; margin:0 0 0.3rem; letter-spacing:-0.01em; }
        .enq-detail-meta { font-size:0.8rem; color:#777; margin:0 0 0.15rem; }
        .enq-email-link { color:#c9a96e; text-decoration:none; font-weight:500; }
        .enq-email-link:hover { text-decoration:underline; }
        .enq-detail-date { font-size:0.72rem; color:#444; margin:0; }
        .enq-detail-body { padding:2rem; flex:1; font-size:0.88rem; color:#aaa; line-height:1.75; }
        .enq-detail-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.75rem; color:#333; font-size:0.85rem; }
        .enq-confirm { margin:0 2rem 2rem; padding:1.25rem; background:#160808; border:1px solid #450a0a; border-radius:8px; font-size:0.82rem; color:#ccc; }
        .enq-confirm p { margin:0 0 1rem; }
        .enq-confirm strong { color:#f5f5f5; }
        @media (max-width: 900px) {
          .enq-content { flex-direction:column; overflow:auto; }
          .enq-list { width:100%; max-height:280px; border-right:none; border-bottom:1px solid #1e1e1e; }
        }
      `}</style>
    </AdminShell>
  );
}
