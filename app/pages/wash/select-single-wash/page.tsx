"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AppHeader from "@/app/components/layout/AppHeader";
import TierSelector from "@/app/components/ui/TierSelector";
import PromoBanner from "@/app/components/ui/PromoBanner";
import PillButton from "@/app/components/ui/PillButton";
import { getMembershipTier, setMembershipTier } from "@/app/lib/membership";
import { useRouter } from "next/navigation";

const tierSlugs = ["guld", "premium", "brilliant"];

export default function SelectSingleWashPage() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelectedTier(getMembershipTier() ?? "");
    setLoaded(true);
  }, []);

  function handleContinue() {
    if (!selectedTier) return;
    setMembershipTier(selectedTier);
    router.push("/pages/profile");
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader title="Vælg medlemskab" />

      <p className="text-body-md text-foreground">Du kan vælge mellem vores tre grundige vaskeprogrammer: Guld, Premium og Brilliant. Læs mere ved at klikke på en af dem.</p>

      <div className="mt-6">{loaded && <TierSelector initialSelected={selectedTier} onSelect={setSelectedTier} />}</div>

      {/* <div className="flex gap-4 mt-3 justify-center">
        {tierSlugs.map((slug) => (
          <Link key={slug} href={`/pages/wash/select-single-wash/${slug}`} className="text-body-xs text-muted underline">
            Læs mere om {slug}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <PillButton onClick={handleContinue} disabled={!selectedTier}>
          Gem og fortsæt
        </PillButton>
      </div> */}
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import AppHeader from "@/app/components/layout/AppHeader";
// import PromoBanner from "@/app/components/ui/PromoBanner";
// import TierSelector from "@/app/components/ui/TierSelector";
// import PillButton from "@/app/components/ui/PillButton";
// import { useRouter } from "next/navigation";

// export default function SelectSingleWashPage() {
//   const router = useRouter();
//   const [selectedTier, setSelectedTier] = useState("Guld");

//   function handleContinue() {
//     router.push(`/pages/wash/start?tier=${selectedTier}`);
//   }

//   return (
//     <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
//       <AppHeader title="Vælg enkeltvask" />

//       <PromoBanner
//         src="/jpg/enkeltvask-banner.jpg"
//         alt="Enkeltvask - betal kun for den vask, du bruger"
//         caption={{
//           title: "Vælg din foretrukne enkeltvask",
//           text: "Du kan vælge mellem vores tre grundige vaskeprogrammer: Guld, Premium og Brilliant og",
//         }}
//       />

//       <div className="mt-6">
//         <TierSelector onSelect={setSelectedTier} />
//       </div>

//       <div className="mt-6">
//         <PillButton onClick={handleContinue}>Gem og fortsæt</PillButton>
//       </div>
//     </div>
//   );
// }
