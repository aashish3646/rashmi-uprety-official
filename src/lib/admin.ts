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

export function deleteEnquiry(id: string): void {
  const enquiries = getEnquiries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
}

export function getUnreadCount(): number {
  return getEnquiries().filter((e) => !e.read).length;
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
