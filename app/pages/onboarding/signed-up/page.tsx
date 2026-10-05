"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuUserRoundCheck } from "react-icons/lu";
import PillButton from "@/app/components/ui/PillButton";

function SignedUpContent() {
  const router = useRouter();
  const tier = useSearchParams().get("tier");

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center gap-4 pr-14 pl-14">
      <LuUserRoundCheck className="mb-12 w-32 h-32 text-brand" />
      <h1 className="text-h2 text-brand">Velkommen til Wash World!</h1>
      <p className="text-body-md text-foreground">Dit medlemskab er {tier}. Bekræft din email, og log derefter ind.</p>

      <div className="mt-6 w-full">
        <PillButton onClick={() => router.push("/pages/login")}>Gå til login</PillButton>
      </div>
    </div>
  );
}

export default function SignedUp() {
  return (
    <Suspense fallback={null}>
      <SignedUpContent />
    </Suspense>
  );
}