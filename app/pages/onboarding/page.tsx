"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import ProfileGroup from "../../components/ui/ProfileGroup";
import PillButton from "../../components/ui/PillButton";
import PromoBanner from "../../components/ui/PromoBanner";
import TierSelector from "../../components/ui/TierSelector";
import TierDetailCard from "../../components/ui/TierDetailCard";
import { tierDetails } from "../../lib/tiers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/lib/api";
import { validateName, validateEmail, validatePhone, validatePassword, validatePlate } from "../../lib/validation";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "tiers" | "tierDetail">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [tier, setTier] = useState("Guld"); // Guld is highlighted by default
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: check the details (same rules as the backend's validators in x.py), then show the programs
    // Step 1: check the details with the shared rules, then show the programs
  function handleContinue() {
    const message =
      validateName(name) || validateEmail(email) || validatePhone(phone) || validatePassword(password) || validatePlate(plate);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep("tiers");
  }
  // function handleContinue() {
  //   setError("");
  //   if (name.trim().length < 2 || name.trim().length > 20) {
  //     setError("Navn skal være 2–20 tegn.");
  //     return;
  //   }
  //   if (!email.includes("@")) {
  //     setError("Indtast en gyldig email.");
  //     return;
  //   }
  //   if (phone.trim() && !/^(\+45)?\s?(\d{2}\s?){4}$/.test(phone.trim())) {
  //     setError("Indtast et gyldigt dansk telefonnummer.");
  //     return;
  //   }
  //   if (password.length < 8 || password.length > 50) {
  //     setError("Adgangskoden skal være 8–50 tegn.");
  //     return;
  //   }
  //   if (plate.trim().length < 2 || plate.trim().length > 10) {
  //     setError("Nummerpladen skal være 2–10 tegn.");
  //     return;
  //   }
  //   setStep("tiers");
  // }

  // Step 2: choosing a program shows its details
  function handleSelectTier(selected: string) {
    setTier(selected);
    setStep("tierDetail");
  }

  // Step 3: create the user with all details and the chosen program in one request
  async function handleSignup() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api-signup`, {
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
        setError(data.message || "Kunne ikke oprette bruger"); // e.g. 409 "Email er allerede i brug"
        return;
      }
      router.push(`/pages/onboarding/signed-up?tier=${tier}`);
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  if (step === "tiers") {
    return (
      <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
        <AppHeader onClose={() => setStep("details")} />
        <PromoBanner
          src="/jpg/enkeltvask-banner.jpg"
          alt="Enkeltvask - betal kun for den vask, du bruger"
          caption={{
            title: "Vælg din foretrukne enkeltvask",
            text: "Du kan vælge mellem vores tre grundige vaskeprogrammer: Guld, Premium og Brilliant",
          }}
        />
        <div className="mt-6">
          <TierSelector selected={tier} onSelect={handleSelectTier} />
        </div>
      </div>
    );
  }

  if (step === "tierDetail") {
    return (
      <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
        <AppHeader onClose={() => setStep("tiers")} />
        <TierDetailCard {...tierDetails[tier.toLowerCase()]} />
        <div className="mt-6">
          {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}
          <PillButton onClick={handleSignup} disabled={loading}>
            {loading ? "Opretter…" : "Opret medlemskab"}
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader title="Opret bruger" subtitle="Et par oplysninger, så er du klar til vask." onClose={() => router.push("/")} />

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-body-sm font-bold text-foreground mb-2">Profil</p>
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

        <p className="text-body-xs text-[#8a8a86]">Betaling foregår automatisk ved scanning af din nummerplade i vaskehallen.</p>

        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

        <PillButton onClick={handleContinue}>Gem og fortsæt</PillButton>
      </div>
    </div>
  );
}
