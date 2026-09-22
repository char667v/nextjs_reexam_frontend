// Carries the in-progress wash (selected hall + tier) across the multi-page flow.
// Uses sessionStorage: survives page navigation, clears when the tab closes.

export type WashSession = {
  locationId: string;
  locationName: string;
  locationAddress: string;
  tier?: string;
  price?: string;
};

const KEY = "wash_session";

export function setWashSession(session: WashSession) {
  sessionStorage.setItem(KEY, JSON.stringify(session));
}

export function getWashSession(): WashSession | null {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function updateWashSession(partial: Partial<WashSession>) {
  const current = getWashSession();
  if (!current) return;
  setWashSession({ ...current, ...partial });
}

export function clearWashSession() {
  sessionStorage.removeItem(KEY);
}