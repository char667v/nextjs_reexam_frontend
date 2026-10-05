"use client";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import PromoBanner from "../../../../components/ui/PromoBanner";
import AppHeader from "@/app/components/layout/AppHeader";
import TierDetailCard from "../../../../components/ui/TierDetailCard";
import PillButton from "../../../../components/ui/PillButton";
import { getMembershipTier, setMembershipTier } from "../../../../lib/membership";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFirstTime(sessionStorage.getItem("signup_draft") !== null);   // a pending signup form = new user
  }, []);

  if (!tier) return null;

  async function handleConfirm() {
    setError("");
    setLoading(true);
    try {
      if (isFirstTime) {
        // NEW USER: send the signup now, with the chosen tier
        const draft = JSON.parse(sessionStorage.getItem("signup_draft") ?? "{}");
        const res = await fetch("http://localhost:80/api-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...draft, membership_tier: tier.name }),
        });
        // "Hey backend, create a user with these details and this program"
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Kunne ikke oprette bruger");
          return;
        }
        sessionStorage.removeItem("signup_draft");
        setMembershipTier(tier.name);
        router.push("/pages/onboarding/signed-up");
      } else {
        // RETURNING USER: change the program with the JWT
        const token = localStorage.getItem("access_token");
        const res = await fetch("http://localhost:80/api-update-my-info", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ membership_tier: tier.name }),
        });
        // "Hey backend, change my program. Here's my wristband."
        if (res.status === 401 || res.status === 422) {
          router.push("/pages/login");
          return;
        }
        if (!res.ok) {
          setError("Kunne ikke opdatere medlemskab");
          return;
        }
        queryClient.invalidateQueries({ queryKey: ["myInfo"] });
        setMembershipTier(tier.name);
        router.push("/pages/profile/membership/updated_membership");
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader onClose={() => router.back()} />

      <TierDetailCard {...tier} />

      <div className="mt-6">
        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}
        <PillButton onClick={handleConfirm} disabled={loading}>
          {loading ? "Vent…" : isFirstTime ? "Opret medlemskab" : `Vælg ${tier.name.toLowerCase()} vask`}
        </PillButton>
      </div>

      <p className="text-body-xs text-[#8a8a86] mt-4">
        Har din bil brug for lidt ekstra opmærksomhed, tilbyder vi desuden en række effektive tilvalg som insekt- og skumforvask, ekstra højtryksvask og ekstra tørring.
      </p>
    </div>
  );
}