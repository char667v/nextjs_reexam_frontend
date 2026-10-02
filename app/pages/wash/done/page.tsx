"use client";
import AppHeader from "../../../components/layout/AppHeader";
import PillButton from "../../../components/ui/PillButton";
import StarRating from "../../../components/ui/StarRating";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getWashSession, type WashSession } from "../../../lib/washSession";
import { useRateWash } from "../../../hooks/useRateWash";

export default function WashDone() {
  const router = useRouter();
  const [session, setSession] = useState<WashSession | null>(null);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const rateWash = useRateWash();

  useEffect(() => {
    setSession(getWashSession()); // which wash was just finished
  }, []);

  function handleRate(newRating: number) {
    if (!session?.washId) return;
    const previousRating = rating; // remember the old value, in case we need to roll back

    setRating(newRating); // 1. OPTIMISTIC: show the new stars immediately
    setError("");

    rateWash.mutate(
      // 2. send it to the backend
      { washId: session.washId, rating: newRating },
      {
        onError: () => {
          // 3. ROLLBACK if the backend says no
          setRating(previousRating);
          setError("Kunne ikke gemme din bedømmelse. Prøv igen.");
        },
      },
    );
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader title="Din vask er færdig!" details={[]} onClose={() => router.push("/pages/dashboard")} />
      <p className="text-body-sm text-foreground -mt-4 mb-8">
        {session?.locationName} · Program: {session?.tier}
      </p>

      <div className="h-40 bg-[#111] rounded-2xl flex items-center justify-center mb-8">
        <span className="text-body-sm text-[#8a8a86]">billed af ren bil</span>
      </div>

      <p className="text-h5 text-brand font-bold text-center mb-8">Tak fordi du vasker med washworld</p>

      <p className="text-body-sm text-foreground text-center mb-3">Hvordan var din oplevelse?</p>
      <div className="flex justify-center mb-2">
        <StarRating rating={rating} onRate={handleRate} />
      </div>
      {error && <p className="text-body-sm text-[#E24B4A] text-center mb-8">{error}</p>}

      <div className="flex flex-col gap-3 mt-8">
        <PillButton onClick={() => router.push("/pages/dashboard")}>Send feedback</PillButton>
        <PillButton variant="outline" onClick={() => router.push("/pages/dashboard")}>
          Tilbage til forside
        </PillButton>
      </div>
    </div>
  );
}
