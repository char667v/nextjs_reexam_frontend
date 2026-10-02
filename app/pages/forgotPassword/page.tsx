"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import PillButton from "../../components/ui/PillButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);       // has the email been sent?
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    setError("");

    if (!email.includes("@")) {                  // frontend validation
      setError("Indtast en gyldig email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email }),
      });
      // "Hey backend, send a reset link to this email"
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Noget gik galt");
      } else {
        setSent(true);
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 pr-14 pb-28 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Glemt adgangskode"
        subtitle="Indtast din email, så sender vi et link."
        onClose={() => router.push("/pages/login")}
      />

      {sent ? (
        <p className="text-body-sm text-foreground">
          Hvis emailen findes, har vi sendt et link. Tjek din indbakke.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <FormField label="Email" value={email} onChange={setEmail} type="email" placeholder="Din email" />
          {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}
          <PillButton onClick={handleForgotPassword} disabled={loading}>
            {loading ? "Sender…" : "Send link"}
          </PillButton>
        </div>
      )}
    </div>
  );
}