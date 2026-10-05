"use client";

import { ReactNode, useState } from "react";

type BottomSheetProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function BottomSheet({ children, onClose }: BottomSheetProps) {
  const [startY, setStartY] = useState<number | null>(null);

  // Pointer events work for both mouse and touch
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);   // keep listening even if the pointer leaves the handle
    setStartY(e.clientY);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (startY === null) return;
    const deltaY = e.clientY - startY;   // how far down the user dragged
    if (deltaY > 80) onClose();
    setStartY(null);
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop: clicking outside the sheet closes it */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute bottom-0 left-0 right-0 bg-black rounded-t-3xl px-6 pb-8 slide-up">
        {/* Grab area: larger than the visible handle, so it's easy to catch */}
        <div onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} className="pt-3 pb-6 cursor-grab touch-none">
          <div className="w-10 h-1 bg-white/30 rounded-full mx-auto" />
        </div>
        {children}
      </div>

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


// "use client";

// import { ReactNode, useState } from "react";

// type BottomSheetProps = {
//   children: ReactNode;
//   onClose: () => void;
// };

// export default function BottomSheet({ children, onClose }: BottomSheetProps) {
//   const [startY, setStartY] = useState<number | null>(null);

//   function handleTouchStart(e: React.TouchEvent) {
//     setStartY(e.touches[0].clientY);
//   }

//   function handleTouchEnd(e: React.TouchEvent) {
//     if (startY === null) return;
//     const deltaY = e.changedTouches[0].clientY - startY;
//     if (deltaY > 80) onClose();
//     setStartY(null);
//   }

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 bg-black rounded-t-3xl px-6 pt-3 pb-8 slide-up">
//       <div
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-6"
//       />
//       {children}

//       <style jsx>{`
//         .slide-up {
//           animation: slideUp 0.3s ease-out;
//         }
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//           }
//           to {
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }