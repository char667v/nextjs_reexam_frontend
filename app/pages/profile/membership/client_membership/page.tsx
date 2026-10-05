"use client";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/AppHeader";
import PromoBanner from "@/app/components/ui/PromoBanner";
import TierSelector from "@/app/components/ui/TierSelector";
import { useMyInfo } from "@/app/hooks/useMyInfo";

export default function ClientMembershipPage() {
  const router = useRouter();
  const { data: me } = useMyInfo();
  const tier = me?.membership_tier ?? "";   // derived straight from the database data: no extra state

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader onClose={() => router.push("/pages/profile")} />
      {me && (
        <PromoBanner
          src="/jpg/enkeltvask-banner.jpg"
          alt="Enkeltvask - betal kun for den vask, du bruger"
          caption={{
            title: `Din nuværende medlemskab er ${tier} enkeltvask`,
            text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
          }}
        />
      )}

      <div className="mt-6">
        <TierSelector selected={tier} onSelect={(t) => router.push(`/pages/wash/select-single-wash/${t.toLowerCase()}`)} />
      </div>
    </div>
  );
}