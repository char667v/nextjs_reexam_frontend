// Persists completed washes so HistoryList can show them.
// Frontend-only for now (localStorage) — swap for a real backend call later.

export type WashHistoryEntry = {
  location: string;
  date: string;
  tier: string;
};

const KEY = "wash_history";

export function getWashHistory(): WashHistoryEntry[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addWashHistoryEntry(entry: WashHistoryEntry) {
  const history = getWashHistory();
  localStorage.setItem(KEY, JSON.stringify([entry, ...history]));
}