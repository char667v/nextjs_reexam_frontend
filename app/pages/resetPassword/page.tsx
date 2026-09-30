"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import PillButton from "../../components/ui/PillButton";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    setError("");

    if (!token) {
      setError("Linket er ugyldigt eller udløbet.");
      return;
    }
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
      const res = await fetch("http://localhost:80/api-reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_user_password: newPassword }),
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
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Opret ny adgangskode"
        subtitle="Din nye adgangskode skal være forskellig fra din tidligere adgangskode"
        onClose={() => router.push("/")}
      />

      <div className="flex flex-col gap-4">
        <FormField label="Adgangskode" value={newPassword} onChange={setNewPassword} type="password" placeholder="********" />
        <p className="text-left text-body-xs text-muted -mt-3 pb-5">
          Skal indeholde mindst 8 karakter.
        </p>

        <FormField label="Bekræft adgangskode" value={confirmPassword} onChange={setConfirmPassword} type="password" placeholder="********" />
        <p className="text-left text-body-xs text-muted -mt-2 pb-5">
          Begge adgangskoder skal være ens.
        </p>

        {error && <p className="text-body-sm text-danger">{error}</p>}

        <PillButton onClick={handleResetPassword} disabled={loading}>
          {loading ? "Opretter ny adgangskode…" : "Opret ny adgangskode"}
        </PillButton>
      </div>
    </div>
  );
}