"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AppHeader from "@/app/components/layout/AppHeader";
import TierSelector from "@/app/components/ui/TierSelector";
import PromoBanner from "@/app/components/ui/PromoBanner";
import PillButton from "@/app/components/ui/PillButton";
import { getMembershipTier, setMembershipTier } from "@/app/lib/membership";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/app/hooks/useMyInfo";

const tierSlugs = ["guld", "premium", "brilliant"];

export default function SelectSingleWashPage() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const { data: me } = useMyInfo(isFirstTime === false);   // only fetch for logged-in users

  useEffect(() => {
    setIsFirstTime(sessionStorage.getItem("signup_draft") !== null);   // pending signup = new user
  }, []);

  useEffect(() => {
    if (isFirstTime === true) {
      setSelectedTier("");                  // first time: nothing highlighted
      setLoaded(true);
    }
    if (isFirstTime === false && me) {
      setSelectedTier(me.membership_tier);  // logged in: the tier from the database
      setLoaded(true);
    }
  }, [isFirstTime, me]);

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
