"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineCardMembership } from "react-icons/md";
import AppHeader from "@/app/components/layout/AppHeader";
import PillButton from "@/app/components/ui/PillButton";

function MembershipUpdatedContent() {
  const router = useRouter();
  const tier = useSearchParams().get("tier");

  return (
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

export default function MembershipUpdated() {
  return (
    <Suspense fallback={null}>
      <MembershipUpdatedContent />
    </Suspense>
  );
}