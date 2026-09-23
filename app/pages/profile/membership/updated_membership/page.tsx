"use client";
import { useEffect, useState } from "react";
import PillButton from "../../../../components/ui/PillButton";
import { getMembershipTier } from "../../../../lib/membership";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/AppHeader";
import { MdOutlineCardMembership } from "react-icons/md";

export default function MembershipUpdated() {
  const router = useRouter();
  const [tier, setTier] = useState("");

  useEffect(() => {
    setTier(getMembershipTier() ?? "");
  }, []);

  return (
    //     <div className="w-full h-screen flex flex-col items-center justify-center px-6 text-center gap-4 pr-14 pl-14">
    //      <AppHeader onClose={() => router.push("/pages/dashboard")} />
    //       <h1 className="text-h2 text-brand">Dit medlemskab er nu opdateret til {tier}!</h1>

    //       <div className="mt-6 w-full">
    //         <PillButton onClick={() => router.push("/pages/profile")}>Tilbage til profil</PillButton>
    //       </div>
    //     </div>
    //   );
    // }

    <div className="w-full h-screen flex flex-col items-center justify-center px-6 text-center gap-4 pr-14 pl-14">
      <div className="w-full -mt-40">
        <AppHeader onClose={() => router.push("/pages/dashboard")} />
      </div>

      <MdOutlineCardMembership className="mb-12 w-32 h-32 text-brand" />
      <h1 className="text-h2 text-brand">Dit medlemskab er nu opdateret til {tier}!</h1>
      <div className="mt-6 w-full">
        <PillButton onClick={() => router.push("/pages/profile")}>Tilbage til profil</PillButton>
      </div>
    </div>
  );
}
