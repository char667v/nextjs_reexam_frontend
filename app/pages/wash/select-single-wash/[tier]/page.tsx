"use client";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import PromoBanner from "../../../../components/ui/PromoBanner";
import AppHeader from "@/app/components/layout/AppHeader";
import TierDetailCard from "../../../../components/ui/TierDetailCard";
import PillButton from "../../../../components/ui/PillButton";
import { getMembershipTier, setMembershipTier } from "../../../../lib/membership";

const tierDetails: Record<string, { name: string; subtitle: string; price: string; icon: string; description: string; totalIcons: number }> = {
  guld: {
    name: "Guld",
    subtitle: "God og effektiv",
    price: "59",
    icon: "/png/car-icon-guld.png",
    description: "Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:",
    totalIcons: 8,
  },
  premium: {
    name: "Premium",
    subtitle: "Ekstra grundig",
    price: "89",
    icon: "/png/car-icon-premium.png",
    description: "Vores ekstra grundige Premium vaskeprogram giver din bil kvalitets vask med følgende proces:",
    totalIcons: 9,
  },
  brilliant: {
    name: "Brilliant",
    subtitle: "Bedste vask året rundt",
    price: "119",
    icon: "/png/car-icon-brilliant.png",
    description: "Vores bedste Brilliant vaskeprogram giver vi din bil ren luksus med følgende proces:",
    totalIcons: 12,
  },
};

export default function TierDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tier = tierDetails[params.tier as string];

  if (!tier) return null;

  function handleConfirm() {
    const isFirstTime = getMembershipTier() === null;
    setMembershipTier(tier.name);
    router.push(isFirstTime ? "/pages/onboarding/signed-up" : "/pages/profile/membership/updated_membership");
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader onClose={() => router.back()} />

      <TierDetailCard {...tier} />

      <div className="mt-6">
        <PillButton onClick={handleConfirm}>Vælg {tier.name.toLowerCase()} vask</PillButton>
      </div>

      <p className="text-body-xs text-[#8a8a86] mt-4">
        Har din bil brug for lidt ekstra opmærksomhed, tilbyder vi desuden en række effektive tilvalg som insekt- og skumforvask, ekstra højtryksvask og ekstra tørring.
      </p>
    </div>
  );
}

// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import AppHeader from "../../../../components/layout/AppHeader";
// import PromoBanner from "../../../../components/ui/PromoBanner";
// import TierDetailCard from "../../../../components/ui/TierDetailCard";
// import PillButton from "../../../../components/ui/PillButton";
// import { getMembershipTier, setMembershipTier } from "../../../../lib/membership";

// const tierDetails: Record<string, { name: string; subtitle: string; price: string; icon: string; description: string; totalIcons: number }> = {
//   guld: {
//     name: "Guld",
//     subtitle: "God og effektiv",
//     price: "59",
//     icon: "/png/car-icon-guld.png",
//     description: "Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:",
//     totalIcons: 8,
//   },
//   premium: {
//     name: "Premium",
//     subtitle: "Ekstra grundig",
//     price: "89",
//     icon: "/png/car-icon-premium.png",
//     description: "Vores ekstra grundige Premium vaskeprogram giver din bil kvalitets vask med følgende proces:",
//     totalIcons: 9,
//   },
//   brilliant: {
//     name: "Brilliant",
//     subtitle: "Bedste vask året rundt",
//     price: "119",
//     icon: "/png/car-icon-brilliant.png",
//     description: "Vores bedste Brilliant vaskeprogram giver vi din bil ren luksus med følgende proces:",
//     totalIcons: 12,
//   },
// };

// export default function TierDetailPage() {
//   const router = useRouter();
//   const params = useParams();
//   const tier = tierDetails[params.tier as string];

//   if (!tier) return null;

//   function handleConfirm() {
//     const isFirstTime = getMembershipTier() === null;
//     setMembershipTier(tier.name);
//     router.push(isFirstTime ? "/pages/onboarding/signed-up" : "/pages/profile");
//   }

//   return (
//     <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
//       <AppHeader onClose={() => router.back()} />

//       <PromoBanner src="/jpg/vask-bil-perfekt.jpg" alt="Sådan vasker vi din bil perfekt" />

//       {/* <button onClick={() => router.back()} className="text-foreground text-lg my-3">
//         <IoArrowBack />
//       </button> */}

//       <TierDetailCard {...tier} />

//       <div className="mt-6">
//         <PillButton onClick={handleConfirm}>Vælg {tier.name.toLowerCase()} vask</PillButton>
//       </div>

//       <p className="text-body-xs text-[#8a8a86] mt-4">
//         Har din bil brug for lidt ekstra opmærksomhed, tilbyder vi desuden en række effektive tilvalg som insekt- og skumforvask, ekstra højtryksvask og ekstra tørring.
//       </p>
//     </div>
//   );
// }
