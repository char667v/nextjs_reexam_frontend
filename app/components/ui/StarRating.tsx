"use client";

import { useState } from "react";

export default function StarRating({ onRate }: { onRate?: (rating: number) => void }) {
  const [rating, setRating] = useState(0);

  function handleClick(value: number) {
    setRating(value);
    onRate?.(value);
  }

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => handleClick(star)} className="text-2xl">
          <span className={star <= rating ? "text-brand" : "text-[#444]"}>★</span>
        </button>
      ))}
    </div>
  );
}