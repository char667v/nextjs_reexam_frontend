import { ReactNode } from "react";

export default function ProfileGroup({ children }: { children: ReactNode }) {
  return (
    <div className="border border-brand rounded-2xl px-4 divide-y divide-[#2a2a2a]">
      {children}
    </div>
  );
}