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
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // out commented the lines 22-50 to simulat e a successful signup, since the backend is not ready yet.
  // async function handleSignup() {
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://localhost:80/api-signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         user_name: name,
  //         user_email: email,
  //         user_password: password,
  //         license_plate: plate,
  //         card_number: cardNumber,
  //         card_expiry: expiry,
  //         card_cvc: cvc,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       setError(data.message || "Kunne ikke oprette bruger");
  //     } else {
  //       router.push("/pages/login");
  //     }
  //   } catch {
  //     setError("System under maintenance");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
async function handleSignup() {
  setError("");
  setLoading(true);

  // TEMPORARY: no backend yet, simulating a successful signup.
  setTimeout(() => {
    setLoading(false);
    // router.push("/pages/wash/select-single-wash?context=onboarding");
    router.push("/pages/wash/select-single-wash");
  }, 500);
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
            <FormField label="Adgangskode" value={password} onChange={setPassword} type="password" placeholder="Mindst 8 karakter" bordered={false} />
          </ProfileGroup>
        </div>

        <div>
          <p className="text-body-sm font-bold text-foreground mb-2">Bil</p>
          <FormField label="Nummerplade" value={plate} onChange={setPlate} placeholder="AB 12 345" />
        </div>

        <div>
          <p className="text-body-sm font-bold text-foreground mb-2">Betaling</p>
          <ProfileGroup>
            <FormField label="Kortnummer" value={cardNumber} onChange={setCardNumber} bordered={false} />
            <div className="flex divide-x divide-[#2a2a2a]">
              <div className="flex-1 pr-4">
                <FormField label="MM/ÅR" value={expiry} onChange={setExpiry} bordered={false} />
              </div>
              <div className="flex-1 pl-4">
                <FormField label="CVC" value={cvc} onChange={setCvc} bordered={false} />
              </div>
            </div>
          </ProfileGroup>
        </div>

        <p className="text-body-xs text-[#8a8a86]">Ved at fortsætte accepterer du Wash Worlds betingelser og privatlivspolitik.</p>

        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

        <PillButton onClick={handleSignup} disabled={loading}>
          {loading ? "Opretter…" : "Gem og fortsæt"}
        </PillButton>
      </div>
    </div>
  );
}
