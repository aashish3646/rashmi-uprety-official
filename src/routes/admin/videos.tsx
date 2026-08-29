import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { type CmsVideo, getVideos, addVideo, deleteVideo, extractYoutubeId } from "@/lib/cms";

export const Route = createFileRoute("/admin/videos")({
  component: AdminVideos,
});

export default function AdminVideos() {
  const [videos, setVideos] = useState<CmsVideo[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refresh = useCallback(() => setVideos(getVideos()), []);
  useEffect(() => { refresh(); }, [refresh]);

  const handleAdd = () => {
    setError(null);
    setSuccess(false);
    if (!title.trim()) { setError("Please enter a title for this video."); return; }
    if (!url.trim()) { setError("Please enter a YouTube URL or video ID."); return; }
    const id = extractYoutubeId(url.trim());
    if (!id) { setError("Could not parse a valid YouTube video ID from that URL."); return; }
    const result = addVideo(title.trim(), url.trim(), description.trim() || undefined);
    if (!result) { setError("Failed to save video."); return; }
    setTitle("");
    setUrl("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteVideo(id);
    setConfirmDelete(null);
    refresh();
  };

  return (
    <AdminShell activeSection="videos">
      <div className="vid-wrap">
        <header className="vid-header">
          <div>
            <h1 className="vid-title">Showreel & Videos</h1>
            <p className="vid-sub">
              {videos.length} video{videos.length !== 1 ? "s" : ""} · Shown on the Showreel page
            </p>
          </div>
        </header>

        <div className="vid-body">
          {/* Add form */}
          <div className="vid-add-card">
            <h2 className="vid-card-title">Add a YouTube Video</h2>
            <p className="vid-card-sub">Paste any YouTube link and it will appear on the public Showreel page.</p>

            <div className="vid-form-row">
              <div className="vid-field">
                <label className="vid-label">Video Title <span style={{ color: "#c9a96e" }}>*</span></label>
                <input
                  className="vid-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Theatre Performance — Kadam 2024"
                  maxLength={150}
                />
              </div>
              <div className="vid-field">
                <label className="vid-label">YouTube URL <span style={{ color: "#c9a96e" }}>*</span></label>
                <input
                  className="vid-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div className="vid-field" style={{ marginTop: "0.75rem" }}>
              <label className="vid-label">Short Description (optional)</label>
              <input
                className="vid-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short caption shown below the video"
                maxLength={200}
              />
            </div>

            {error && <div className="vid-error" role="alert">{error}</div>}
            {success && <div className="vid-success">✓ Video added successfully!</div>}

            <button className="vid-btn-primary" onClick={handleAdd}>
              ＋ Add Video
            </button>
          </div>

          {/* Video list */}
          {videos.length === 0 ? (
            <div className="vid-empty">
              <span style={{ fontSize: "2.5rem" }}>🎬</span>
              <p>No videos added yet.</p>
              <p style={{ fontSize: "0.72rem", color: "#3a3a3a" }}>
                Videos you add here will appear on the public Showreel page alongside the default featured video.
              </p>
            </div>
          ) : (
            <div>
              <p className="vid-list-label">Your Videos ({videos.length})</p>
              <div className="vid-list">
                {videos.map((v) => (
                  <div key={v.id} className="vid-item">
                    {/* Thumbnail */}
                    <div className="vid-thumb-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        className="vid-thumb"
                      />
                      <a
                        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vid-play-overlay"
                        title="Watch on YouTube"
                      >
                        ▶
                      </a>
                    </div>
                    <div className="vid-item-info">
                      <p className="vid-item-title">{v.title}</p>
                      {v.description && (
                        <p className="vid-item-desc">{v.description}</p>
                      )}
                      <p className="vid-item-id">
                        ID: <code style={{ color: "#c9a96e", fontSize: "0.7rem" }}>{v.youtubeId}</code>
                        {" · "}
                        Added {new Date(v.addedAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                    <div className="vid-item-actions">
                      <a
                        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vid-action-btn"
                      >
                        Watch ↗
                      </a>
                      {confirmDelete === v.id ? (
                        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                          <button className="vid-action-btn vid-danger" onClick={() => handleDelete(v.id)}>Delete</button>
                          <button className="vid-action-btn" onClick={() => setConfirmDelete(null)}>Cancel</button>
                        </div>
                      ) : (
                        <button className="vid-action-btn vid-danger" onClick={() => setConfirmDelete(v.id)}>🗑</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .vid-wrap { display:flex; flex-direction:column; flex:1; overflow:hidden; }
        .vid-header { padding:1.5rem 2rem 1rem; border-bottom:1px solid #1e1e1e; }
        .vid-title { font-size:1.35rem; font-weight:700; color:#f5f5f5; margin:0 0 0.15rem; letter-spacing:-0.02em; }
        .vid-sub { font-size:0.8rem; color:#555; margin:0; }
        .vid-body { flex:1; overflow-y:auto; padding:1.5rem 2rem; display:flex; flex-direction:column; gap:2rem; }
        .vid-add-card { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:1.75rem; display:flex; flex-direction:column; gap:0.75rem; }
        .vid-card-title { font-size:1rem; font-weight:600; color:#f5f5f5; margin:0; }
        .vid-card-sub { font-size:0.78rem; color:#555; margin:0; }
        .vid-form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
        .vid-field { display:flex; flex-direction:column; gap:0.35rem; }
        .vid-label { font-size:0.7rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#666; }
        .vid-input { background:#0a0a0a; border:1px solid #2a2a2a; border-radius:7px; padding:0.65rem 0.85rem; color:#f5f5f5; font-size:0.85rem; outline:none; transition:border-color 0.2s; }
        .vid-input:focus { border-color:#c9a96e; }
        .vid-error { background:#160808; border:1px solid #450a0a; border-radius:7px; padding:0.75rem 1rem; font-size:0.78rem; color:#f87171; }
        .vid-success { background:#0a1a10; border:1px solid #166534; border-radius:7px; padding:0.75rem 1rem; font-size:0.78rem; color:#4ade80; }
        .vid-btn-primary { align-self:flex-start; background:linear-gradient(135deg, #c9a96e, #e8c99a); color:#0a0a0a; font-size:0.8rem; font-weight:700; border:none; border-radius:7px; padding:0.7rem 1.25rem; cursor:pointer; transition:opacity 0.15s; margin-top:0.25rem; }
        .vid-btn-primary:hover { opacity:0.85; }
        .vid-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem; gap:0.5rem; text-align:center; color:#555; font-size:0.85rem; }
        .vid-list-label { font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#555; margin:0 0 0.75rem; }
        .vid-list { display:flex; flex-direction:column; gap:0.75rem; }
        .vid-item { background:#141414; border:1px solid #1e1e1e; border-radius:9px; padding:1rem; display:flex; gap:1rem; align-items:flex-start; }
        .vid-thumb-wrap { position:relative; flex-shrink:0; width:140px; aspect-ratio:16/9; border-radius:6px; overflow:hidden; background:#0a0a0a; }
        .vid-thumb { width:100%; height:100%; object-fit:cover; display:block; }
        .vid-play-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:#0007; color:white; font-size:1.2rem; text-decoration:none; opacity:0; transition:opacity 0.15s; }
        .vid-thumb-wrap:hover .vid-play-overlay { opacity:1; }
        .vid-item-info { flex:1; min-width:0; }
        .vid-item-title { font-size:0.88rem; font-weight:600; color:#f5f5f5; margin:0 0 0.2rem; }
        .vid-item-desc { font-size:0.78rem; color:#777; margin:0 0 0.35rem; }
        .vid-item-id { font-size:0.72rem; color:#444; margin:0; }
        .vid-item-actions { display:flex; flex-direction:column; gap:0.35rem; flex-shrink:0; }
        .vid-action-btn { font-size:0.72rem; font-weight:600; color:#aaa; background:#1a1a1a; border:1px solid #222; border-radius:6px; padding:0.4rem 0.7rem; cursor:pointer; text-decoration:none; transition:all 0.15s; text-align:center; }
        .vid-action-btn:hover { background:#222; color:#f5f5f5; }
        .vid-danger:hover { background:#450a0a; border-color:#ef4444; color:#f87171; }
        @media (max-width:700px) { .vid-form-row { grid-template-columns:1fr; } .vid-thumb-wrap { width:100px; } }
      `}</style>
    </AdminShell>
  );
}
