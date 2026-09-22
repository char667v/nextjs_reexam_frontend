// Persists the user's chosen membership tier (Guld/Premium/Brilliant).
// Frontend-only for now (localStorage) — swap for a real backend call later.
 
const KEY = "membership_tier";
 
export function getMembershipTier(): string | null {
  return localStorage.getItem(KEY);
}
 
export function setMembershipTier(tier: string) {
  localStorage.setItem(KEY, tier);
}
