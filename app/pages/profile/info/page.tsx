"use client";
import { useEffect, useState } from "react";
import AppHeader from "../../../components/layout/AppHeader";
import FormField from "../../../components/ui/FormField";
import ProfileGroup from "../../../components/ui/ProfileGroup";
import PillButton from "../../../components/ui/PillButton";
import { getUserProfile, setUserProfile } from "../../../lib/profile";
import { useRouter } from "next/navigation";

const plateFormat = /^[A-Z]{2} \d{2} \d{3}$/;
const phoneFormat = /^\+45 \d{2} \d{2} \d{2} \d{2}$/;

export default function ProfileInfo() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const profile = getUserProfile();
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setPlate(profile.plate);
  }, []);

  function handleSave() {
    setError("");
 
    if (!name.trim()) {
      setError("Navn skal udfyldes.");
      return;
    }
    if (!email.trim()) {
      setError("Email skal udfyldes.");
      return;
    }
    if (!email.includes("@")) {
      setError("Indtast en gyldig email.");
      return;
    }
    if (!phone.trim()) {
      setError("Telefon skal udfyldes.");
      return;
    }
    if (!phoneFormat.test(phone)) {
      setError("Telefon skal have formatet +45 12 34 56 78.");
      return;
    }
    if (!plate.trim()) {
      setError("Nummerplade skal udfyldes.");
      return;
    }
    if (!plateFormat.test(plate)) {
      setError("Nummerplade skal have formatet AB 12 345.");
      return;
    }
 
    setUserProfile({ name, email, phone, plate });
    router.push("/pages/profile");
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader title="Mine oplysninger" onClose={() => router.push("/pages/profile")} />

      <ProfileGroup>
        <FormField label="Navn" value={name} onChange={setName} bordered={false} />
        <FormField label="Email" value={email} onChange={setEmail} type="email" bordered={false} />
        <FormField label="Telefon" value={phone} onChange={setPhone} type="tel" bordered={false} />
        <FormField label="Nummerplade" value={plate} onChange={setPlate} bordered={false} />
      </ProfileGroup>

      {error && <p className="text-body-sm text-danger mt-3">{error}</p>}

      <div className="mt-6">
        <PillButton onClick={handleSave}>Gem ændringer</PillButton>
      </div>
    </div>
  );
}
