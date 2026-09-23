// Persists the user's profile info (name, email, phone, license plate).
// Frontend-only for now (localStorage) — swap for a real backend call later.

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  plate: string;
};

const KEY = "user_profile";

const defaultProfile: UserProfile = {
  name: "Hans Hansen",
  email: "hans@gmail.com",
  phone: "+45 12 34 56 78",
  plate: "AB 12 345",
};

export function getUserProfile(): UserProfile {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : defaultProfile;
}

export function setUserProfile(profile: UserProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}