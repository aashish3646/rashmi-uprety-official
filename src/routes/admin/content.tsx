import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { type CmsContent, getContent, saveContent } from "@/lib/cms";
import { BIO } from "@/data/site";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

type SaveState = "idle" | "saving" | "saved" | "error";

export default function AdminContent() {
  const [form, setForm] = useState<CmsContent>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    const c = getContent();
    setForm(c);
  }, []);

  const set = (key: keyof CmsContent, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaveState("idle");
  };

  const handleSave = () => {
    setSaveState("saving");
    try {
      saveContent(form);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch {
      setSaveState("error");
    }
  };

  const handleReset = (key: keyof CmsContent) => {
    setForm((f) => { const n = { ...f }; delete n[key]; return n; });
    setSaveState("idle");
  };

  return (
    <AdminShell activeSection="content">
      <div className="con-wrap">
        <header className="con-header">
          <div>
            <h1 className="con-title">Content & Links</h1>
            <p className="con-sub">Edit bio, contact details, and social links — changes appear live on the site instantly.</p>
          </div>
          <button
            className={`con-save-btn${saveState === "saved" ? " con-save-ok" : saveState === "error" ? " con-save-err" : ""}`}
            onClick={handleSave}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" ? "Saving…"
              : saveState === "saved" ? "✓ Saved!"
              : saveState === "error" ? "Error — try again"
              : "Save Changes"}
          </button>
        </header>

        <div className="con-body">
          {/* ── Bio / About ── */}
          <section className="con-section">
            <div className="con-section-hdr">
              <h2 className="con-section-title">Biography</h2>
              <p className="con-section-sub">Appears on the About page. Leave blank to use the default text.</p>
            </div>
            <div className="con-field">
              <div className="con-field-top">
                <label className="con-label">About Page Bio</label>
                {form.bio && (
                  <button className="con-reset" onClick={() => handleReset("bio")}>Reset to default</button>
                )}
              </div>
              <textarea
                className="con-textarea"
                rows={7}
                value={form.bio ?? ""}
                onChange={(e) => set("bio", e.target.value)}
                placeholder={BIO.join("\n")}
              />
              <p className="con-hint">Default: <em style={{ color: "#444" }}>{BIO.join(" ").slice(0, 80)}…</em></p>
            </div>
          </section>

          {/* ── Contact Info ── */}
          <section className="con-section">
            <div className="con-section-hdr">
              <h2 className="con-section-title">Contact Details</h2>
              <p className="con-section-sub">Email and location shown on the Contact and About pages.</p>
            </div>
            <div className="con-grid">
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">Email Address</label>
                  {form.email && <button className="con-reset" onClick={() => handleReset("email")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="rashmiuprety6@gmail.com"
                />
              </div>
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">Based In</label>
                  {form.basedIn && <button className="con-reset" onClick={() => handleReset("basedIn")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  value={form.basedIn ?? ""}
                  onChange={(e) => set("basedIn", e.target.value)}
                  placeholder="Damak, Jhapa, Nepal"
                />
              </div>
            </div>
          </section>

          {/* ── Social Links ── */}
          <section className="con-section">
            <div className="con-section-hdr">
              <h2 className="con-section-title">Social Media Links</h2>
              <p className="con-section-sub">Links shown in the footer, contact page, and showreel page.</p>
            </div>
            <div className="con-grid">
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">🟣 Instagram URL</label>
                  {form.socialInstagram && <button className="con-reset" onClick={() => handleReset("socialInstagram")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  value={form.socialInstagram ?? ""}
                  onChange={(e) => set("socialInstagram", e.target.value)}
                  placeholder="https://www.instagram.com/rashmi_uprety"
                />
              </div>
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">🎵 TikTok URL</label>
                  {form.socialTiktok && <button className="con-reset" onClick={() => handleReset("socialTiktok")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  value={form.socialTiktok ?? ""}
                  onChange={(e) => set("socialTiktok", e.target.value)}
                  placeholder="https://www.tiktok.com/@rashmiuprety"
                />
              </div>
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">▶️ YouTube Channel URL</label>
                  {form.socialYoutube && <button className="con-reset" onClick={() => handleReset("socialYoutube")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  value={form.socialYoutube ?? ""}
                  onChange={(e) => set("socialYoutube", e.target.value)}
                  placeholder="https://www.youtube.com/channel/UCgmOJMMkGPSp97WDvGHeieg"
                />
              </div>
              <div className="con-field">
                <div className="con-field-top">
                  <label className="con-label">🎬 Featured Video YouTube ID</label>
                  {form.featuredVideoId && <button className="con-reset" onClick={() => handleReset("featuredVideoId")}>Reset</button>}
                </div>
                <input
                  className="con-input"
                  value={form.featuredVideoId ?? ""}
                  onChange={(e) => set("featuredVideoId", e.target.value)}
                  placeholder="IzliWJkELqU (YouTube video ID or full URL)"
                />
                <p className="con-hint">This replaces the main featured video embed on the Showreel page.</p>
              </div>
            </div>
          </section>

          {/* ── Save ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "2rem" }}>
            <button
              className={`con-save-btn${saveState === "saved" ? " con-save-ok" : saveState === "error" ? " con-save-err" : ""}`}
              onClick={handleSave}
              disabled={saveState === "saving"}
              style={{ fontSize: "0.9rem", padding: "0.8rem 2rem" }}
            >
              {saveState === "saving" ? "Saving…"
                : saveState === "saved" ? "✓ Saved!"
                : saveState === "error" ? "Error — try again"
                : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .con-wrap { display:flex; flex-direction:column; flex:1; overflow:hidden; }
        .con-header { padding:1.5rem 2rem 1rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .con-title { font-size:1.35rem; font-weight:700; color:#f5f5f5; margin:0 0 0.15rem; letter-spacing:-0.02em; }
        .con-sub { font-size:0.78rem; color:#555; margin:0; }
        .con-save-btn { background:linear-gradient(135deg, #c9a96e, #e8c99a); color:#0a0a0a; font-size:0.78rem; font-weight:700; border:none; border-radius:7px; padding:0.65rem 1.25rem; cursor:pointer; transition:all 0.15s; }
        .con-save-btn:hover { opacity:0.85; }
        .con-save-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .con-save-ok { background:linear-gradient(135deg, #166534, #16a34a) !important; color:white !important; }
        .con-save-err { background:linear-gradient(135deg, #7f1d1d, #991b1b) !important; color:white !important; }
        .con-body { flex:1; overflow-y:auto; padding:1.5rem 2rem; display:flex; flex-direction:column; gap:2rem; }
        .con-section { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:1.75rem; display:flex; flex-direction:column; gap:1.25rem; }
        .con-section-hdr { display:flex; flex-direction:column; gap:0.2rem; }
        .con-section-title { font-size:1rem; font-weight:600; color:#f5f5f5; margin:0; }
        .con-section-sub { font-size:0.75rem; color:#555; margin:0; }
        .con-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .con-field { display:flex; flex-direction:column; gap:0.4rem; }
        .con-field-top { display:flex; align-items:center; justify-content:space-between; }
        .con-label { font-size:0.7rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#666; }
        .con-reset { font-size:0.65rem; color:#555; background:none; border:none; cursor:pointer; text-decoration:underline; padding:0; }
        .con-reset:hover { color:#aaa; }
        .con-input { background:#0a0a0a; border:1px solid #2a2a2a; border-radius:7px; padding:0.65rem 0.85rem; color:#f5f5f5; font-size:0.85rem; outline:none; transition:border-color 0.2s; width:100%; box-sizing:border-box; }
        .con-input:focus { border-color:#c9a96e; }
        .con-textarea { background:#0a0a0a; border:1px solid #2a2a2a; border-radius:7px; padding:0.75rem 0.85rem; color:#f5f5f5; font-size:0.85rem; outline:none; transition:border-color 0.2s; width:100%; box-sizing:border-box; resize:vertical; line-height:1.6; font-family:inherit; }
        .con-textarea:focus { border-color:#c9a96e; }
        .con-hint { font-size:0.7rem; color:#444; margin:0; }
        @media (max-width:700px) { .con-grid { grid-template-columns:1fr; } }
      `}</style>
    </AdminShell>
  );
}
