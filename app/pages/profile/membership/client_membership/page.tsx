"use client";
import { useEffect, useState } from "react";
import AppHeader from "@/app/components/layout/AppHeader";
import PromoBanner from "@/app/components/ui/PromoBanner";
import TierSelector from "@/app/components/ui/TierSelector";
import { getMembershipTier } from "@/app/lib/membership";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/app/hooks/useMyInfo";

export default function ClientMembershipPage() {
  const router = useRouter();
  const [tier, setTier] = useState("");
  const { data: me } = useMyInfo();

  useEffect(() => {
    if (me) setTier(me.membership_tier); // the tier from the database
  }, [me]);

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader onClose={() => router.push("/pages/profile")} />
      <PromoBanner
        src="/jpg/enkeltvask-banner.jpg"
        alt="Enkeltvask - betal kun for den vask, du bruger"
        caption={{
          title: `Din nuværende medlemskab er ${tier} enkeltvask`,
          text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
        }}
      />

      <div className="mt-6">
        <TierSelector initialSelected={tier} />
      </div>
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
//       <AppHeader onClose={() => router.push("/pages/dashboard")} />

//       <PromoBanner
//         src="/jpg/enkeltvask-banner.jpg"
//         alt="Enkeltvask - betal kun for den vask, du bruger"
//         caption={{
//           title: "Din nuværende medlemskab er Guld enkeltvask",
//           text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
//         }}
//       />

//       <div className="mt-6">
//         <TierSelector onSelect={setSelectedTier} />
//       </div>

//       {/* <div className="mt-6">
//         <PillButton onClick={handleContinue}>Gem ændringer</PillButton>
//       </div> */}
//     </div>
//   );
// }
