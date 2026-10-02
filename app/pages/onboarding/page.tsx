"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import ProfileGroup from "../../components/ui/ProfileGroup";
import PillButton from "../../components/ui/PillButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // async function handleSignup() {
  //   setError("");
  //   // setLoading(true);

  //   // TEMPORARY: no backend yet, simulating a successful signup.
  //   setTimeout(() => {
  //     setLoading(false);
  //     router.push("/pages/wash/select-single-wash");
  //   }, 500);
  // }

  async function handleSignup() {
    setError("");

    // Frontend validation: the same rules as the backend's validators in x.py
    if (name.trim().length < 2 || name.trim().length > 20) {
      setError("Navn skal være 2–20 tegn.");
      return;
    }
    if (!email.includes("@")) {
      setError("Indtast en gyldig email.");
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
        }),
      });
      // "Hey backend, create a user with these details"
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Kunne ikke oprette bruger");   // e.g. 409 "Email er allerede i brug"
        return;
      }
      router.push("/pages/wash/select-single-wash");   // same next step as before
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
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

        <PillButton onClick={handleSignup} disabled={loading}>
          {loading ? "Opretter…" : "Gem og fortsæt"}
        </PillButton>
      </div>
    </div>
  );
}
