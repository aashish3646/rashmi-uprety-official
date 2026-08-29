import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  type Enquiry,
  getEnquiries,
  markEnquiryRead,
  deleteEnquiry,
  getUnreadCount,
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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refresh = useCallback(() => setEnquiries(getEnquiries()), []);
  useEffect(() => { refresh(); }, [refresh]);

  const handleSelect = (e: Enquiry) => {
    if (!e.read) { markEnquiryRead(e.id); refresh(); }
    setSelected(e);
  };

  const handleDelete = (id: string) => {
    deleteEnquiry(id);
    if (selected?.id === id) setSelected(null);
    setConfirmDelete(null);
    refresh();
  };

  const displayed = activeTab === "unread" ? enquiries.filter((e) => !e.read) : enquiries;
  const unreadCount = getUnreadCount();

  return (
    <AdminShell activeSection="enquiries">
      <div className="enq-wrap">
        {/* Header */}
        <header className="enq-header">
          <div>
            <h1 className="enq-title">Enquiries</h1>
            <p className="enq-sub">
              {enquiries.length} total · {unreadCount} unread
            </p>
          </div>
          <a href={`mailto:${SITE.email}`} className="enq-action-btn">📧 Open Inbox</a>
        </header>

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

        {/* Tab bar */}
        <div className="enq-tabs">
          <button className={`enq-tab${activeTab === "all" ? " enq-tab-active" : ""}`} onClick={() => setActiveTab("all")}>All ({enquiries.length})</button>
          <button className={`enq-tab${activeTab === "unread" ? " enq-tab-active" : ""}`} onClick={() => setActiveTab("unread")}>Unread ({unreadCount})</button>
        </div>

        {/* List + Detail */}
        <div className="enq-content">
          <div className="enq-list">
            {displayed.length === 0 ? (
              <div className="enq-empty">
                <span style={{ fontSize: "2rem" }}>📭</span>
                <p>No {activeTab === "unread" ? "unread " : ""}enquiries.</p>
                <p style={{ fontSize: "0.72rem", color: "#3a3a3a" }}>Submissions from the contact form will appear here.</p>
              </div>
            ) : displayed.map((e) => (
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
                    <p className="enq-detail-meta">From <strong>{selected.name}</strong> · <a href={`mailto:${selected.email}`} className="enq-email-link">{selected.email}</a></p>
                    <p className="enq-detail-date">{formatDate(selected.submittedAt)}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="enq-action-btn">↩ Reply</a>
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
                <p>Select an enquiry to read it</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .enq-wrap { display:flex; flex-direction:column; flex:1; overflow:hidden; }
        .enq-header { padding:1.5rem 2rem 1rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; }
        .enq-title { font-size:1.35rem; font-weight:700; color:#f5f5f5; margin:0 0 0.15rem; letter-spacing:-0.02em; }
        .enq-sub { font-size:0.8rem; color:#555; margin:0; }
        .enq-action-btn { font-size:0.75rem; font-weight:600; color:#aaa; background:#1a1a1a; border:1px solid #222; border-radius:7px; padding:0.5rem 0.9rem; cursor:pointer; text-decoration:none; transition:all 0.15s; white-space:nowrap; }
        .enq-action-btn:hover { background:#222; color:#f5f5f5; }
        .enq-danger:hover { background:#450a0a; border-color:#ef4444; color:#f87171; }
        .enq-stats { display:flex; border-bottom:1px solid #1e1e1e; }
        .enq-stat { padding:1rem 2rem; border-right:1px solid #1e1e1e; display:flex; flex-direction:column; gap:0.15rem; }
        .enq-stat-n { font-size:1.5rem; font-weight:700; line-height:1; }
        .enq-stat-l { font-size:0.7rem; color:#555; text-transform:uppercase; letter-spacing:0.06em; }
        .enq-tabs { display:flex; gap:0; border-bottom:1px solid #1e1e1e; padding:0 1.5rem; }
        .enq-tab { background:none; border:none; border-bottom:2px solid transparent; padding:0.75rem 0.75rem; font-size:0.8rem; color:#555; cursor:pointer; transition:all 0.15s; }
        .enq-tab:hover { color:#aaa; }
        .enq-tab-active { color:#f5f5f5; border-bottom-color:#c9a96e; }
        .enq-content { display:flex; flex:1; overflow:hidden; }
        .enq-list { width:310px; flex-shrink:0; border-right:1px solid #1e1e1e; overflow-y:auto; display:flex; flex-direction:column; }
        .enq-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem 1.5rem; text-align:center; gap:0.5rem; color:#555; font-size:0.82rem; }
        .enq-item { position:relative; padding:1rem 1.25rem; border-bottom:1px solid #161616; background:none; border-left:none; border-right:none; border-top:none; text-align:left; cursor:pointer; transition:background 0.12s; width:100%; }
        .enq-item:hover { background:#141414; }
        .enq-item-active { background:#181818!important; border-left:2px solid #c9a96e!important; }
        .enq-item-unread { background:#111; }
        .enq-item-top { display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:0.2rem; }
        .enq-item-name { font-size:0.82rem; font-weight:600; color:#e5e5e5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .enq-item-time { font-size:0.65rem; color:#444; flex-shrink:0; }
        .enq-item-subj { font-size:0.78rem; font-weight:500; color:#bbb; margin:0 0 0.25rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .enq-item-prev { font-size:0.72rem; color:#555; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.45; }
        .enq-dot { position:absolute; top:1rem; right:1rem; width:8px; height:8px; border-radius:50%; background:#c9a96e; }
        .enq-detail { flex:1; overflow-y:auto; display:flex; flex-direction:column; min-width:0; }
        .enq-detail-hdr { padding:1.5rem 2rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:flex-start; justify-content:space-between; gap:1.5rem; }
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
      `}</style>
    </AdminShell>
  );
}
