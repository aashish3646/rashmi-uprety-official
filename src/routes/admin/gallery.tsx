import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { type CmsPhoto, getPhotos, addPhoto, deletePhoto } from "@/lib/cms";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

export default function AdminGallery() {
  const [photos, setPhotos] = useState<CmsPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    const p = await getPhotos();
    setPhotos(p);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const processFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const imageFiles = arr.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      setUploadError("Please select image files (JPG, PNG, WEBP).");
      return;
    }
    setUploadError(null);
    setUploading(true);
    setUploadProgress(0);
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (!file) continue;
        // Warn about very large files
        if (file.size > 20 * 1024 * 1024) {
          setUploadError(`"${file.name}" is too large (max 20 MB).`);
          continue;
        }
        await addPhoto(file);
        setUploadProgress(Math.round(((i + 1) / imageFiles.length) * 100));
      }
      await refresh();
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    await processFiles(e.dataTransfer.files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) await processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    await deletePhoto(id);
    setConfirmDelete(null);
    await refresh();
  };

  return (
    <AdminShell activeSection="gallery">
      <div className="gal-wrap">
        {/* Header */}
        <header className="gal-header">
          <div>
            <h1 className="gal-title">Gallery Management</h1>
            <p className="gal-sub">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} uploaded · Drag to add more
            </p>
          </div>
          <button
            className="gal-btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? `Uploading… ${uploadProgress}%` : "＋ Upload Photos"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
        </header>

        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1, overflow: "auto" }}>
          {/* Drop zone */}
          <div
            className={`gal-dropzone${dragOver ? " gal-dropzone-active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <span style={{ fontSize: "2rem" }}>🖼</span>
            <p className="gal-drop-text">
              {dragOver ? "Drop photos here" : "Drag & drop photos here, or click to browse"}
            </p>
            <p className="gal-drop-sub">JPG, PNG, WEBP · Up to 20 MB each · Multiple files supported</p>
          </div>

          {uploadError && (
            <div className="gal-error" role="alert">{uploadError}</div>
          )}

          {/* Photo grid */}
          {photos.length === 0 ? (
            <div className="gal-empty">
              <span style={{ fontSize: "2.5rem" }}>📷</span>
              <p>No photos uploaded yet.</p>
              <p style={{ fontSize: "0.72rem", color: "#3a3a3a" }}>
                Photos you upload here will appear at the top of the public Gallery page.
              </p>
            </div>
          ) : (
            <div>
              <p className="gal-grid-label">Uploaded Photos ({photos.length})</p>
              <p style={{ fontSize: "0.72rem", color: "#555", margin: "0 0 1rem" }}>
                These photos appear at the top of the public Gallery page, newest first.
              </p>
              <div className="gal-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="gal-card">
                    <div className="gal-card-img-wrap">
                      <img src={photo.dataUrl} alt={photo.name} className="gal-card-img" />
                    </div>
                    <div className="gal-card-footer">
                      <p className="gal-card-name">{photo.name}</p>
                      <p className="gal-card-date">
                        {new Date(photo.uploadedAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                    {confirmDelete === photo.id ? (
                      <div className="gal-confirm-overlay">
                        <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem" }}>Delete this photo?</p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button className="gal-btn-sm gal-btn-danger" onClick={() => handleDelete(photo.id)}>Delete</button>
                          <button className="gal-btn-sm" onClick={() => setConfirmDelete(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="gal-delete-btn"
                        onClick={() => setConfirmDelete(photo.id)}
                        title="Delete photo"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .gal-wrap { display:flex; flex-direction:column; flex:1; overflow:hidden; }
        .gal-header { padding:1.5rem 2rem 1rem; border-bottom:1px solid #1e1e1e; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .gal-title { font-size:1.35rem; font-weight:700; color:#f5f5f5; margin:0 0 0.15rem; letter-spacing:-0.02em; }
        .gal-sub { font-size:0.8rem; color:#555; margin:0; }
        .gal-btn-primary { background:linear-gradient(135deg, #c9a96e, #e8c99a); color:#0a0a0a; font-size:0.8rem; font-weight:700; border:none; border-radius:8px; padding:0.7rem 1.25rem; cursor:pointer; transition:opacity 0.15s; }
        .gal-btn-primary:hover { opacity:0.85; }
        .gal-btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
        .gal-dropzone { border:2px dashed #2a2a2a; border-radius:12px; padding:3rem 2rem; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.75rem; cursor:pointer; transition:all 0.2s; text-align:center; }
        .gal-dropzone:hover { border-color:#444; background:#0f0f0f; }
        .gal-dropzone-active { border-color:#c9a96e; background:#111; }
        .gal-drop-text { font-size:0.9rem; color:#888; margin:0; }
        .gal-drop-sub { font-size:0.72rem; color:#444; margin:0; }
        .gal-error { background:#160808; border:1px solid #450a0a; border-radius:8px; padding:0.85rem 1rem; font-size:0.78rem; color:#f87171; }
        .gal-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem; gap:0.5rem; text-align:center; color:#555; font-size:0.85rem; }
        .gal-grid-label { font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#555; margin:0 0 0.25rem; }
        .gal-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(170px, 1fr)); gap:1rem; }
        .gal-card { position:relative; background:#141414; border:1px solid #1e1e1e; border-radius:8px; overflow:hidden; transition:border-color 0.15s; }
        .gal-card:hover { border-color:#2a2a2a; }
        .gal-card-img-wrap { aspect-ratio:3/4; overflow:hidden; background:#0a0a0a; }
        .gal-card-img { width:100%; height:100%; object-fit:cover; display:block; }
        .gal-card-footer { padding:0.6rem 0.75rem; }
        .gal-card-name { font-size:0.72rem; color:#888; margin:0 0 0.15rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .gal-card-date { font-size:0.65rem; color:#444; margin:0; }
        .gal-delete-btn { position:absolute; top:0.5rem; right:0.5rem; background:#0a0a0a90; border:1px solid #2a2a2a; border-radius:6px; color:#888; font-size:0.85rem; padding:0.3rem 0.5rem; cursor:pointer; opacity:0; transition:opacity 0.15s; }
        .gal-card:hover .gal-delete-btn { opacity:1; }
        .gal-delete-btn:hover { background:#450a0a; border-color:#ef4444; color:#f87171; }
        .gal-confirm-overlay { position:absolute; inset:0; background:#0a0a0acc; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1rem; border-radius:8px; text-align:center; color:#f5f5f5; }
        .gal-btn-sm { font-size:0.72rem; font-weight:600; border:1px solid #333; border-radius:6px; padding:0.35rem 0.7rem; background:#1a1a1a; color:#aaa; cursor:pointer; transition:all 0.15s; }
        .gal-btn-sm:hover { background:#222; color:#f5f5f5; }
        .gal-btn-danger { background:#450a0a; border-color:#ef4444; color:#f87171; }
        .gal-btn-danger:hover { background:#5c0f0f; }
      `}</style>
    </AdminShell>
  );
}
