/**
 * CMS — client-side content management system.
 * Photos → IndexedDB (handles large files)
 * Videos, Bio, Social Links → localStorage
 */

// ─────────────────────────────────────────────
// GALLERY PHOTOS (IndexedDB)
// ─────────────────────────────────────────────

const DB_NAME = "rashmi_cms_db";
const DB_VERSION = 1;
const PHOTOS_STORE = "gallery_photos";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
        db.createObjectStore(PHOTOS_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export type CmsPhoto = {
  id: string;
  name: string;
  dataUrl: string;
  uploadedAt: number;
  caption?: string;
};

export async function addPhoto(
  file: File,
  caption?: string
): Promise<CmsPhoto> {
  const dataUrl = await fileToDataUrl(file);
  const photo: CmsPhoto = {
    id: crypto.randomUUID(),
    name: file.name,
    dataUrl,
    uploadedAt: Date.now(),
    ...(caption ? { caption } : {}),
  };
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTOS_STORE, "readwrite");
    tx.objectStore(PHOTOS_STORE).put(photo);
    tx.oncomplete = () => resolve(photo);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getPhotos(): Promise<CmsPhoto[]> {
  if (typeof window === "undefined") return [];
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTOS_STORE, "readonly");
    const req = tx.objectStore(PHOTOS_STORE).getAll();
    req.onsuccess = () =>
      resolve(
        (req.result as CmsPhoto[]).sort((a, b) => b.uploadedAt - a.uploadedAt)
      );
    req.onerror = () => reject(req.error);
  });
}

export async function deletePhoto(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTOS_STORE, "readwrite");
    tx.objectStore(PHOTOS_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─────────────────────────────────────────────
// SHOWREEL VIDEOS (localStorage)
// ─────────────────────────────────────────────

export type CmsVideo = {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  addedAt: number;
};

const VIDEOS_KEY = "cms_videos";

export function getVideos(): CmsVideo[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(VIDEOS_KEY) ?? "[]") as CmsVideo[];
  } catch {
    return [];
  }
}

export function addVideo(
  title: string,
  youtubeUrl: string,
  description?: string
): CmsVideo | null {
  const youtubeId = extractYoutubeId(youtubeUrl);
  if (!youtubeId) return null;
  const video: CmsVideo = {
    id: crypto.randomUUID(),
    title,
    youtubeId,
    ...(description ? { description } : {}),
    addedAt: Date.now(),
  };
  const all = getVideos();
  all.unshift(video);
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(all));
  return video;
}

export function deleteVideo(id: string): void {
  localStorage.setItem(
    VIDEOS_KEY,
    JSON.stringify(getVideos().filter((v) => v.id !== id))
  );
}

export function extractYoutubeId(input: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m?.[1]) return m[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return null;
}

// ─────────────────────────────────────────────
// EDITABLE SITE CONTENT (localStorage)
// ─────────────────────────────────────────────

export type CmsContent = {
  bio?: string;
  heroTagline?: string;
  email?: string;
  socialInstagram?: string;
  socialTiktok?: string;
  socialYoutube?: string;
  featuredVideoId?: string;  // YouTube ID for main showreel
  basedIn?: string;
};

const CONTENT_KEY = "cms_content";

export function getContent(): CmsContent {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CONTENT_KEY) ?? "{}") as CmsContent;
  } catch {
    return {};
  }
}

export function saveContent(patch: CmsContent): void {
  localStorage.setItem(
    CONTENT_KEY,
    JSON.stringify({ ...getContent(), ...patch })
  );
}
