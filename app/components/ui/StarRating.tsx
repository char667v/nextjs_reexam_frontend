"use client";

export default function StarRating({ rating, onRate }: { rating: number; onRate: (rating: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onRate(star)} className="text-2xl">
          <span className={star <= rating ? "text-brand" : "text-[#444]"}>★</span>
        </button>
      ))}
    </div>
  );
}