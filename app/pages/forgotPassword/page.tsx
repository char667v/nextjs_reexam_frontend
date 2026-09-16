"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import PillButton from "../../components/ui/PillButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    setError("");

    if (newPassword.length < 8) {
      setError("Adgangskoden skal indeholde mindst 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Adgangskoderne skal være ens.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_user_password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Kunne ikke nulstille adgangskode");
      } else {
        router.push("/pages/login");
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Opret ny adgangskode"
        subtitle="Din nye adgangskode skal være forskellig fra dit tidligere adgangskode"
        onClose={() => router.push("/")}
      />

      <div className="flex flex-col gap-2 -mt-12">
        <FormField label="Adgangskode" value={newPassword} onChange={setNewPassword} type="password" placeholder="********" />
        <p className="text-left text-body-xs text-[#8a8a86] pb-5">
          Skal indeholde mindst 8 karakter.
        </p>

        <FormField label="Bekræft adgangskode" value={confirmPassword} onChange={setConfirmPassword} type="password" placeholder="********" />
        <p className="text-left text-body-xs text-[#8a8a86] pb-48">
          Begge adgangskoder skal være ens.
        </p>

        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

        <PillButton onClick={handleForgotPassword} disabled={loading}>
          {loading ? "Opretter ny adgangskode…" : "Opret ny adgangskode"}
        </PillButton>
      </div>
    </div>
  );
}