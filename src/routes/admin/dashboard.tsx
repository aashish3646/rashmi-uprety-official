import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  type Enquiry,
  getEnquiries,
  markEnquiryRead,
  deleteEnquiry,
  adminLogout,
  isAdminAuthenticated,
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
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setEnquiries(getEnquiries());
  }, []);

  // Auth guard
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      void navigate({ to: "/admin" });
      return;
    }
    refresh();
  }, [navigate, refresh]);

  const handleLogout = () => {
    adminLogout();
    void navigate({ to: "/admin" });
  };

  const handleSelect = (e: Enquiry) => {
    if (!e.read) {
      markEnquiryRead(e.id);
      refresh();
    }
    setSelected(e);
  };

  const handleDelete = (id: string) => {
    deleteEnquiry(id);
    if (selected?.id === id) setSelected(null);
    setConfirmDelete(null);
    refresh();
  };

  const displayed =
    activeTab === "unread" ? enquiries.filter((e) => !e.read) : enquiries;

  const unreadCount = getUnreadCount();
  const totalCount = enquiries.length;

  const SITE_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Theatre", href: "/theatre" },
    { label: "Work", href: "/work" },
    { label: "Showreel", href: "/showreel" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="ad-root">
      {/* ─── Sidebar ─── */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-top">
          <div className="ad-logo">
            <span className="ad-logo-init">RU</span>
          </div>
          <div>
            <p className="ad-sidebar-name">Rashmi Uprety</p>
            <p className="ad-sidebar-role">Portfolio Admin</p>
          </div>
        </div>

        <nav className="ad-nav">
          <p className="ad-nav-label">Dashboard</p>
          <button
            className={`ad-nav-item${activeTab === "all" ? " active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <span className="ad-nav-icon">📬</span>
            All Enquiries
            {totalCount > 0 && (
              <span className="ad-badge">{totalCount}</span>
            )}
          </button>
          <button
            className={`ad-nav-item${activeTab === "unread" ? " active" : ""}`}
            onClick={() => setActiveTab("unread")}
          >
            <span className="ad-nav-icon">🔴</span>
            Unread
            {unreadCount > 0 && (
              <span className="ad-badge ad-badge-red">{unreadCount}</span>
            )}
          </button>

          <p className="ad-nav-label" style={{ marginTop: "1.5rem" }}>
            Site Pages
          </p>
          {SITE_LINKS.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ad-nav-item">
              <span className="ad-nav-icon">↗</span>
              {l.label}
            </a>
          ))}
        </nav>

        <button className="ad-logout" onClick={handleLogout}>
          Sign out
        </button>
      </aside>

      {/* ─── Main ─── */}
      <main className="ad-main">
        {/* Header */}
        <header className="ad-header">
          <div>
            <h1 className="ad-header-title">
              {activeTab === "unread" ? "Unread Enquiries" : "All Enquiries"}
            </h1>
            <p className="ad-header-sub">
              {displayed.length} {displayed.length === 1 ? "message" : "messages"}{" "}
              {unreadCount > 0 && activeTab !== "unread"
                ? `· ${unreadCount} unread`
                : ""}
            </p>
          </div>
          <div className="ad-header-actions">
            <a href={`mailto:${SITE.email}`} className="ad-action-btn">
              📧 Open Inbox
            </a>
          </div>
        </header>

        {/* Stats strip */}
        <div className="ad-stats">
          <div className="ad-stat">
            <span className="ad-stat-num">{totalCount}</span>
            <span className="ad-stat-lbl">Total Enquiries</span>
          </div>
          <div className="ad-stat">
            <span className="ad-stat-num" style={{ color: "#f87171" }}>
              {unreadCount}
            </span>
            <span className="ad-stat-lbl">Unread</span>
          </div>
          <div className="ad-stat">
            <span className="ad-stat-num" style={{ color: "#4ade80" }}>
              {totalCount - unreadCount}
            </span>
            <span className="ad-stat-lbl">Read</span>
          </div>
          <div className="ad-stat">
            <span className="ad-stat-num" style={{ color: "#c9a96e" }}>
              {enquiries.length > 0
                ? formatDate(enquiries[0]?.submittedAt ?? Date.now()).split(",")[0] ?? "—"
                : "—"}
            </span>
            <span className="ad-stat-lbl">Latest Enquiry</span>
          </div>
        </div>

        {/* Content: list + detail pane */}
        <div className="ad-content">
          {/* Enquiry list */}
          <div className="ad-list">
            {displayed.length === 0 ? (
              <div className="ad-empty">
                <span className="ad-empty-icon">📭</span>
                <p>No {activeTab === "unread" ? "unread " : ""}enquiries yet.</p>
                <p className="ad-empty-sub">
                  When someone fills in the contact form, their message will appear here.
                </p>
              </div>
            ) : (
              displayed.map((e) => (
                <button
                  key={e.id}
                  className={`ad-list-item${selected?.id === e.id ? " ad-list-item-active" : ""}${!e.read ? " ad-list-item-unread" : ""}`}
                  onClick={() => handleSelect(e)}
                >
                  <div className="ad-list-item-top">
                    <span className="ad-list-name">{e.name}</span>
                    <span className="ad-list-time">{formatDate(e.submittedAt)}</span>
                  </div>
                  <p className="ad-list-subject">{e.subject}</p>
                  <p className="ad-list-preview">
                    {e.message.length > 90
                      ? e.message.slice(0, 90) + "…"
                      : e.message}
                  </p>
                  {!e.read && <span className="ad-unread-dot" />}
                </button>
              ))
            )}
          </div>

          {/* Detail pane */}
          <div className="ad-detail">
            {selected ? (
              <>
                <div className="ad-detail-header">
                  <div>
                    <h2 className="ad-detail-subject">{selected.subject}</h2>
                    <p className="ad-detail-meta">
                      From <strong>{selected.name}</strong> ·{" "}
                      <a href={`mailto:${selected.email}`} className="ad-detail-email">
                        {selected.email}
                      </a>
                    </p>
                    <p className="ad-detail-date">{formatDate(selected.submittedAt)}</p>
                  </div>
                  <div className="ad-detail-actions">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                      className="ad-action-btn"
                    >
                      ↩ Reply
                    </a>
                    <button
                      className="ad-action-btn ad-action-btn-danger"
                      onClick={() => setConfirmDelete(selected.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
                <div className="ad-detail-body">
                  {selected.message.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "0 0 0.5rem" }}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* Confirm delete dialog */}
                {confirmDelete === selected.id && (
                  <div className="ad-confirm">
                    <p>Delete this enquiry from <strong>{selected.name}</strong>? This cannot be undone.</p>
                    <div className="ad-confirm-actions">
                      <button
                        className="ad-action-btn ad-action-btn-danger"
                        onClick={() => handleDelete(selected.id)}
                      >
                        Yes, delete
                      </button>
                      <button
                        className="ad-action-btn"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="ad-detail-empty">
                <span style={{ fontSize: "2.5rem" }}>👈</span>
                <p>Select an enquiry to read it</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .ad-root {
          display: flex;
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          color: #e5e5e5;
        }

        /* ── Sidebar ── */
        .ad-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #111;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .ad-sidebar-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #1e1e1e;
        }
        .ad-logo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #e8c99a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ad-logo-init {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0a0a0a;
        }
        .ad-sidebar-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0;
          line-height: 1.2;
        }
        .ad-sidebar-role {
          font-size: 0.7rem;
          color: #555;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .ad-nav { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
        .ad-nav-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #444;
          padding: 0.25rem 0.5rem;
          margin: 0.5rem 0 0.25rem;
        }
        .ad-nav-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          border-radius: 7px;
          font-size: 0.82rem;
          color: #888;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          width: 100%;
        }
        .ad-nav-item:hover { background: #1a1a1a; color: #e5e5e5; }
        .ad-nav-item.active { background: #1e1e1e; color: #f5f5f5; }
        .ad-nav-icon { font-size: 0.9rem; }
        .ad-badge {
          margin-left: auto;
          background: #222;
          color: #aaa;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1em 0.5em;
          border-radius: 20px;
        }
        .ad-badge-red { background: #450a0a; color: #f87171; }
        .ad-logout {
          margin-top: auto;
          background: none;
          border: 1px solid #222;
          border-radius: 7px;
          color: #555;
          font-size: 0.78rem;
          padding: 0.55rem;
          cursor: pointer;
          transition: all 0.15s;
          width: 100%;
        }
        .ad-logout:hover { border-color: #ef4444; color: #ef4444; }

        /* ── Main ── */
        .ad-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
        .ad-header {
          padding: 1.5rem 2rem 1rem;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .ad-header-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 0.15rem;
          letter-spacing: -0.02em;
        }
        .ad-header-sub {
          font-size: 0.8rem;
          color: #555;
          margin: 0;
        }
        .ad-header-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .ad-action-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: #aaa;
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 7px;
          padding: 0.5rem 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .ad-action-btn:hover { background: #222; color: #f5f5f5; }
        .ad-action-btn-danger:hover { background: #450a0a; border-color: #ef4444; color: #f87171; }

        /* ── Stats ── */
        .ad-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-bottom: 1px solid #1e1e1e;
        }
        .ad-stat {
          padding: 1.1rem 2rem;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .ad-stat:last-child { border-right: none; }
        .ad-stat-num {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f5f5f5;
          line-height: 1;
        }
        .ad-stat-lbl {
          font-size: 0.7rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ── Content ── */
        .ad-content {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .ad-list {
          width: 320px;
          flex-shrink: 0;
          border-right: 1px solid #1e1e1e;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .ad-list-item {
          position: relative;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #161616;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          text-align: left;
          cursor: pointer;
          transition: background 0.12s;
          width: 100%;
        }
        .ad-list-item:hover { background: #141414; }
        .ad-list-item-active { background: #181818 !important; border-left: 2px solid #c9a96e !important; }
        .ad-list-item-unread { background: #111; }
        .ad-list-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }
        .ad-list-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #e5e5e5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ad-list-time {
          font-size: 0.65rem;
          color: #444;
          flex-shrink: 0;
        }
        .ad-list-subject {
          font-size: 0.78rem;
          font-weight: 500;
          color: #bbb;
          margin: 0 0 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ad-list-preview {
          font-size: 0.72rem;
          color: #555;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
        }
        .ad-unread-dot {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c9a96e;
        }
        .ad-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          text-align: center;
          gap: 0.5rem;
        }
        .ad-empty-icon { font-size: 2.5rem; }
        .ad-empty p { font-size: 0.85rem; color: #555; margin: 0; }
        .ad-empty-sub { font-size: 0.75rem !important; color: #3a3a3a !important; }

        /* ── Detail ── */
        .ad-detail {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .ad-detail-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .ad-detail-subject {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 0.3rem;
          letter-spacing: -0.01em;
        }
        .ad-detail-meta {
          font-size: 0.8rem;
          color: #777;
          margin: 0 0 0.15rem;
        }
        .ad-detail-email {
          color: #c9a96e;
          text-decoration: none;
          font-weight: 500;
        }
        .ad-detail-email:hover { text-decoration: underline; }
        .ad-detail-date {
          font-size: 0.72rem;
          color: #444;
          margin: 0;
        }
        .ad-detail-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .ad-detail-body {
          padding: 2rem;
          flex: 1;
          font-size: 0.88rem;
          color: #aaa;
          line-height: 1.75;
          white-space: pre-wrap;
        }
        .ad-detail-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: #333;
          font-size: 0.85rem;
        }
        .ad-confirm {
          margin: 0 2rem 2rem;
          padding: 1.25rem;
          background: #160808;
          border: 1px solid #450a0a;
          border-radius: 8px;
          font-size: 0.82rem;
          color: #ccc;
        }
        .ad-confirm p { margin: 0 0 1rem; }
        .ad-confirm strong { color: #f5f5f5; }
        .ad-confirm-actions { display: flex; gap: 0.5rem; }

        @media (max-width: 900px) {
          .ad-stats { grid-template-columns: repeat(2, 1fr); }
          .ad-list { width: 260px; }
        }
        @media (max-width: 700px) {
          .ad-sidebar { display: none; }
          .ad-content { flex-direction: column; }
          .ad-list { width: 100%; border-right: none; border-bottom: 1px solid #1e1e1e; max-height: 40vh; }
        }
      `}</style>
    </div>
  );
}
