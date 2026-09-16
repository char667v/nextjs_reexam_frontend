import { ReactNode } from "react";

export default function BottomSheet({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl px-6 pt-3 pb-8 animate-slide-up">
      <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-6" />
      {children}
    </div>
  );
}