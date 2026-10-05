"use client";
import { useEffect, useState } from "react";
import AppHeader from "../../../components/layout/AppHeader";
import FormField from "../../../components/ui/FormField";
import ProfileGroup from "../../../components/ui/ProfileGroup";
import PillButton from "../../../components/ui/PillButton";
import { useMyInfo } from "../../../hooks/useMyInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/lib/api";
import { validateName, validatePhone, validatePlate } from "@/app/lib/validation";

export default function ProfileInfo() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me, isPending, isError } = useMyInfo(); // the logged-in user, from the backend

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (me) {
      // when the data arrives, fill the form with it
      setName(me.user_name);
      setPhone(me.user_phone ?? "");
      setPlate(me.license_plate ?? "");
    }
  }, [me]);

  async function handleSave() {
    setError("");
    const message = validateName(name) || validatePhone(phone) || validatePlate(plate);
    if (message) {
      setError(message);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${BASE_URL}/api-update-my-info`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_name: name,
          license_plate: plate,
          ...(phone.trim() ? { user_phone: phone } : {}), // phone is optional: only send it if it's filled in
        }),
      });
      // "Hey backend, update my details. Here's my wristband."
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Kunne ikke gemme oplysninger");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["myInfo"] }); // the profile page fetches the new values
      router.push("/pages/profile");
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader title="Mine oplysninger" onClose={() => router.push("/pages/profile")} />

      {isPending && <p className="text-body-sm text-[#8a8a86]">Henter oplysninger…</p>}
      {isError && <p className="text-body-sm text-danger">Kunne ikke hente dine oplysninger.</p>}

      {me && (
        <>
          <ProfileGroup>
            <FormField label="Navn" value={name} onChange={setName} bordered={false} />
            <FormField label="Email" value={me.user_email} type="email" bordered={false} readOnly />
            <FormField label="Telefon" value={phone} onChange={setPhone} type="tel" bordered={false} />
            <FormField label="Nummerplade" value={plate} onChange={setPlate} bordered={false} />
          </ProfileGroup>
          
          {error && <p className="text-body-sm text-danger mt-3">{error}</p>}

          <div className="mt-6">
            <PillButton onClick={handleSave} disabled={loading}>
              {loading ? "Gemmer…" : "Gem ændringer"}
            </PillButton>
          </div>
        </>
      )}
    </div>
  );
}
