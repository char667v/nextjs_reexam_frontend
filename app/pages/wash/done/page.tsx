"use client";
import AppHeader from "../../../components/layout/AppHeader";
import PillButton from "../../../components/ui/PillButton";
import StarRating from "../../../components/ui/StarRating";
import { useRouter } from "next/navigation";

export default function WashDone() {
  const router = useRouter();

  function handleFeedback(rating: number) {
    console.log("Rating submitted:", rating);
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Din vask er færdig!"
        details={[]}
        onClose={() => router.push("/pages/dashboard")}
      />
      <p className="text-body-sm text-foreground -mt-4 mb-8">Wash World Søborg - Vaskehal 2 · Program: Guld</p>

      <div className="h-40 bg-[#111] rounded-2xl flex items-center justify-center mb-8">
        <span className="text-body-sm text-[#8a8a86]">billed af ren bil</span>
      </div>

      <p className="text-h5 text-brand font-bold text-center mb-8">
        Tak fordi du vasker med washworld
      </p>

      <p className="text-body-sm text-foreground text-center mb-3">Hvordan var din oplevelse?</p>
      <div className="flex justify-center mb-10">
        <StarRating onRate={handleFeedback} />
      </div>

      <div className="flex flex-col gap-3">
        <PillButton onClick={() => router.push("/pages/dashboard")}>Send feedback</PillButton>
        <PillButton variant="outline" onClick={() => router.push("/pages/dashboard")}>
          Tilbage til forside
        </PillButton>
      </div>
    </div>
  );
}