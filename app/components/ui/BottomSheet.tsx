"use client";

import { ReactNode, useState } from "react";

type BottomSheetProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function BottomSheet({ children, onClose }: BottomSheetProps) {
  const [startY, setStartY] = useState<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    setStartY(e.touches[0].clientY);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (startY === null) return;
    const deltaY = e.changedTouches[0].clientY - startY;
    if (deltaY > 80) onClose();
    setStartY(null);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl px-6 pt-3 pb-8 slide-up">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-6"
      />
      {children}

      <style jsx>{`
        .slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// import { ReactNode } from "react";

// export default function BottomSheet({ children }: { children: ReactNode }) {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl px-6 pt-3 pb-8 animate-slide-up">
//       <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-6" />
//       {children}
//     </div>
//   );
// }