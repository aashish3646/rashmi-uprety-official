import { useEffect, type ReactNode } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { isAdminAuthenticated, adminLogout } from "@/lib/admin";

type AdminShellProps = {
  children: ReactNode;
  activeSection: "enquiries" | "gallery" | "videos" | "content";
};

const NAV = [
  { id: "enquiries" as const, label: "Enquiries", icon: "📬", href: "/admin/dashboard" },
  { id: "gallery" as const, label: "Gallery", icon: "🖼", href: "/admin/gallery" },
  { id: "videos" as const, label: "Showreel & Videos", icon: "🎬", href: "/admin/videos" },
  { id: "content" as const, label: "Content & Links", icon: "✏️", href: "/admin/content" },
];

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Theatre", href: "/theatre" },
  { label: "Work", href: "/work" },
  { label: "Showreel", href: "/showreel" },
  { label: "Contact", href: "/contact" },
];

export function AdminShell({ children, activeSection }: AdminShellProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      void navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    void navigate({ to: "/admin" });
  };

  return (
    <div className="ash-root">
      {/* ── Sidebar ── */}
      <aside className="ash-sidebar">
        <div className="ash-sidebar-top">
          <div className="ash-logo">
            <span className="ash-logo-init">RU</span>
          </div>
          <div>
            <p className="ash-name">Rashmi Uprety</p>
            <p className="ash-role">Portfolio Admin</p>
          </div>
        </div>

        <nav className="ash-nav">
          <p className="ash-nav-label">Manage</p>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`ash-nav-item${activeSection === item.id ? " ash-active" : ""}`}
            >
              <span className="ash-nav-icon">{item.icon}</span>
              {item.label}
            </a>
          ))}

          <p className="ash-nav-label" style={{ marginTop: "1.5rem" }}>Site Pages</p>
          {SITE_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ash-nav-item ash-nav-external"
            >
              <span className="ash-nav-icon">↗</span>
              {l.label}
            </a>
          ))}
        </nav>

        <button className="ash-logout" onClick={handleLogout}>
          Sign out
        </button>
      </aside>

      {/* ── Content ── */}
      <main className="ash-main">{children}</main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .ash-root {
          display: flex;
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          color: #e5e5e5;
        }
        .ash-sidebar {
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
          flex-shrink: 0;
        }
        .ash-sidebar-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #1e1e1e;
        }
        .ash-logo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #e8c99a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ash-logo-init { font-size: 0.75rem; font-weight: 700; color: #0a0a0a; }
        .ash-name { font-size: 0.85rem; font-weight: 600; color: #f5f5f5; margin: 0; line-height: 1.2; }
        .ash-role { font-size: 0.7rem; color: #555; margin: 0; text-transform: uppercase; letter-spacing: 0.04em; }
        .ash-nav { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
        .ash-nav-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #444;
          padding: 0.25rem 0.5rem;
          margin: 0.5rem 0 0.25rem;
        }
        .ash-nav-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          border-radius: 7px;
          font-size: 0.82rem;
          color: #888;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          width: 100%;
        }
        .ash-nav-item:hover { background: #1a1a1a; color: #e5e5e5; }
        .ash-active { background: #1e1e1e !important; color: #f5f5f5 !important; }
        .ash-nav-external { color: #555; }
        .ash-nav-icon { font-size: 0.9rem; flex-shrink: 0; }
        .ash-logout {
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
        .ash-logout:hover { border-color: #ef4444; color: #ef4444; }
        .ash-main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }
        @media (max-width: 700px) {
          .ash-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
