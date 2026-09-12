/**
 * Admin enquiry storage utilities.
 * Enquiries are stored in localStorage under "admin_enquiries".
 */

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: number; // Unix timestamp ms
  read: boolean;
};

const STORAGE_KEY = "admin_enquiries";

// ── Broadcast & Notification System ─────────────────────────
const BC_NAME = "rashmi_admin_notifications";

export function requestNotificationPermission(): void {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "default") {
      void Notification.requestPermission();
    }
  }
}

export function playNotificationSound(): void {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignore audio autoplay policy restrictions if inactive
  }
}

export function saveEnquiry(data: Omit<Enquiry, "id" | "submittedAt" | "read">): Enquiry {
  const enquiry: Enquiry = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: Date.now(),
    read: false,
  };

  const existing = getEnquiries();
  existing.unshift(enquiry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  // Broadcast event across open tabs
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const bc = new BroadcastChannel(BC_NAME);
      bc.postMessage({ type: "NEW_ENQUIRY", enquiry });
      bc.close();
    }
  } catch {
    // Fallback handled via storage event listeners
  }

  return enquiry;
}

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Enquiry[];
  } catch {
    return [];
  }
}

export function markEnquiryRead(id: string): void {
  const enquiries = getEnquiries().map((e) =>
    e.id === id ? { ...e, read: true } : e
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
}

export function markAllEnquiriesRead(): void {
  const enquiries = getEnquiries().map((e) => ({ ...e, read: true }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
}

export function deleteEnquiry(id: string): void {
  const enquiries = getEnquiries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
}

export function clearAllEnquiries(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUnreadCount(): number {
  return getEnquiries().filter((e) => !e.read).length;
}

export function exportEnquiriesJson(): string {
  const data = getEnquiries();
  return JSON.stringify(data, null, 2);
}

// ─── Admin Auth ────────────────────────────────────────────────
const SESSION_KEY = "admin_auth";
// Simple password — change this to something secure
export const ADMIN_PASSWORD = "rashmi2024admin";

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}
