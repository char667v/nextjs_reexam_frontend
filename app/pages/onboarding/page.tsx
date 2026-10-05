"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import ProfileGroup from "../../components/ui/ProfileGroup";
import PillButton from "../../components/ui/PillButton";
import TierSelector from "../../components/ui/TierSelector";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "tier">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [tier, setTier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: check the details (same rules as the backend's validators in x.py), then show the tier step
  function handleContinue() {
    setError("");
    if (name.trim().length < 2 || name.trim().length > 20) {
      setError("Navn skal være 2–20 tegn.");
      return;
    }
    if (!email.includes("@")) {
      setError("Indtast en gyldig email.");
      return;
    }
    if (phone.trim() && !/^(\+45)?\s?(\d{2}\s?){4}$/.test(phone.trim())) {
      setError("Indtast et gyldigt dansk telefonnummer.");
      return;
    }
    if (password.length < 8 || password.length > 50) {
      setError("Adgangskoden skal være 8–50 tegn.");
      return;
    }
    if (plate.trim().length < 2 || plate.trim().length > 10) {
      setError("Nummerpladen skal være 2–10 tegn.");
      return;
    }
    setStep("tier");
  }

  // Step 2: create the user with all details and the chosen tier in one request
  async function handleSignup() {
    if (!tier) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          user_phone: phone,
          user_password: password,
          license_plate: plate,
          membership_tier: tier,
        }),
      });
      // "Hey backend, create a user with these details and this program"
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Kunne ikke oprette bruger");   // e.g. 409 "Email er allerede i brug"
        return;
      }
      router.push(`/pages/onboarding/signed-up?tier=${tier}`);
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  if (step === "tier") {
    return (
      <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
        <AppHeader title="Vælg medlemskab" onClose={() => setStep("details")} />
        <TierSelector selected={tier} onSelect={setTier} />
        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}
        <PillButton onClick={handleSignup} disabled={!tier || loading}>
          {loading ? "Opretter…" : "Opret medlemskab"}
        </PillButton>
      </div>
    );
  }

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader title="Opret bruger" subtitle="Et par oplysninger, så er du klar til vask." onClose={() => router.push("/")} />

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-body-sm font-bold text-foreground mb-2 -mt-8">Profil</p>
          <ProfileGroup>
            <FormField label="Navn" value={name} onChange={setName} placeholder="Dit navn" bordered={false} />
            <FormField label="Email" value={email} onChange={setEmail} type="email" placeholder="Din email" bordered={false} />
            <FormField label="Telefon" value={phone} onChange={setPhone} type="tel" placeholder="Dit telefonnummer" bordered={false} />
            <FormField label="Adgangskode" value={password} onChange={setPassword} type="password" placeholder="Mindst 8 karakter" bordered={false} />
          </ProfileGroup>
        </div>

        <div>
          <p className="text-body-sm font-bold text-foreground mb-2">Bil</p>
          <FormField label="Nummerplade" value={plate} onChange={setPlate} placeholder="AB 12 345" />
        </div>

        <p className="text-body-xs text-[#8a8a86]">
          Betaling foregår automatisk ved scanning af din nummerplade i vaskehallen.
        </p>

        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

        <PillButton onClick={handleContinue}>Gem og fortsæt</PillButton>
      </div>
    </div>
  );
}