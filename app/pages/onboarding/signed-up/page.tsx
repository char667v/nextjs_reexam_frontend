"use client";
import PillButton from "@/app/components/ui/PillButton";
import { useRouter } from "next/navigation";
import { LuUserRoundCheck } from "react-icons/lu";

export default function SignedUp() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center gap-4 pr-14 pl-14">
      <LuUserRoundCheck className="mb-4 w-16 h-16 text-brand" />
      <h1 className="text-h2 text-brand">Du er nu oprettet!</h1>

      <p className="text-body-md text-foreground">Din konto er klar, og du kan nu finde din nærmeste Wash World.</p>

      <div className="mt-6 w-full">
        <PillButton onClick={() => router.push("/pages/dashboard")}>Gå til forside</PillButton>
      </div>
    </div>
  );
}
