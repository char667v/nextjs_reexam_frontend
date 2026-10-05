"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import AppHeader from "@/app/components/layout/AppHeader";
import TierDetailCard from "../../../../components/ui/TierDetailCard";
import PillButton from "../../../../components/ui/PillButton";
import { tierDetails } from "@/app/lib/tiers";


export default function TierDetailPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const tier = tierDetails[params.tier as string];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!tier) return null;

  async function handleConfirm() {
    setError("");
    setLoading(true);
    try {
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
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });   // every page showing the tier fetches the new one
      router.push(`/pages/profile/membership/updated_membership?tier=${tier.name}`);
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
          {loading ? "Gemmer…" : `Vælg ${tier.name.toLowerCase()} vask`}
        </PillButton>
      </div>

      <p className="text-body-xs text-[#8a8a86] mt-4">
        Har din bil brug for lidt ekstra opmærksomhed, tilbyder vi desuden en række effektive tilvalg som insekt- og skumforvask, ekstra højtryksvask og ekstra tørring.
      </p>
    </div>
  );
}