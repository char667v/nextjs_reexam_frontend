"use client";

import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  details?: { icon: ReactNode; text: string }[];
  showClose?: boolean;
  onClose?: () => void;
};

export default function AppHeader({
  title,
  subtitle,
  details,
  showClose = true,
  onClose,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative pt-2 pb-16">
      {showClose && (
        <button
          onClick={onClose ?? (() => router.back())}
          className="absolute top-0 right-0 text-brand text-lg"
        >
          <FaTimes />
        </button>
      )}

      <h1 className="text-h1 text-foreground mb-1 pr-8">{title}</h1>

      {subtitle && <p className="text-body-sm text-white">{subtitle}</p>}

      {details?.map((line, i) => (
        <div key={i} className="flex items-center gap-2 text-body-sm text-[#8a8a86] mt-1">
          <span className="text-brand">{line.icon}</span>
          <span>{line.text}</span>
        </div>
      ))}
    </div>
  );
}