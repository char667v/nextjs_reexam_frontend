"use client";
import { useEffect, useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import ProfileGroup from "../../components/ui/ProfileGroup";
import ProfileRow from "../../components/ui/ProfileRow";
import PillButton from "../../components/ui/PillButton";
import { getMembershipTier } from "../../lib/membership";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [tier, setTier] = useState("Guld");

  useEffect(() => {
    setTier(getMembershipTier() ?? "Guld");
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("authUser");
    router.push("/");
  }

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Hans Hansen"
        subtitle="AB 12 345"
        onClose={() => router.push("/pages/dashboard")}
      />

      <ProfileGroup>
        <ProfileRow label="Mit medlemskab" value="Guld enkeltvask" labelColor="brand" href="/pages/profile/membership" />
        <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
        <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/edit" />
      </ProfileGroup>

      <div className="mt-8">
        <PillButton onClick={handleLogout}>Log ud</PillButton>
      </div>
    </div>
  );
}