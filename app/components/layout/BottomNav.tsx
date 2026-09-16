"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11L12 4l8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
      <Link
        href="/pages/profile"
        className={`w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center ${
          pathname === "/pages/profile" ? "text-brand" : "text-[var(--color-primary)]"
        }`}
      >
        <ProfileIcon />
      </Link>
      <Link
        href="/pages/dashboard"
        className={`w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center ${
          pathname === "/pages/dashboard" ? "text-brand" : "text-[var(--color-primary)]"
        }`}
      >
        <HomeIcon />
      </Link>
    </div>
  );
}