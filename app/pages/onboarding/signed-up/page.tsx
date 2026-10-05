"use client";
import PillButton from "@/app/components/ui/PillButton";
import { useRouter } from "next/navigation";
import { LuUserRoundCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getMembershipTier } from "@/app/lib/membership";

export default function SignedUp() {
  const router = useRouter();
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    setTier(getMembershipTier());
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center gap-4 pr-14 pl-14">
      <LuUserRoundCheck className="mb-12 w-32 h-32 text-brand" />
      <h1 className="text-h2 text-brand">Velkommen til Wash World!</h1>

<p className="text-body-md text-foreground">Dit medlemskab er {tier}. Bekræft din email, og log derefter ind.</p>
      <div className="mt-6 w-full">
        <PillButton onClick={() => router.push("/pages/login")}>Luk</PillButton>
      </div>
    </div>
  );
}