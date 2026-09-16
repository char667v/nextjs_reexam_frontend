"use client";
import AppHeader from "../../components/layout/AppHeader";
import FormField from "../../components/ui/FormField";
import PillButton from "../../components/ui/PillButton";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        if (data.access_token) localStorage.setItem("access_token", data.access_token);
        if (data.user) localStorage.setItem("authUser", JSON.stringify(data.user));
        router.push("/pages/dashboard");
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 pr-10 pb-28 pl-14 flex flex-col gap-4">
      <AppHeader title="Login" subtitle="Et par oplysninger, så er du klar til vask." onClose={() => router.push("/")} />

      <div className="flex flex-col gap-4">
        <FormField label="Email" value={email} onChange={setEmail} type="email" placeholder="Din email" />
        <FormField label="Adgangskode" value={password} onChange={setPassword} type="password" placeholder="Din adgangskode" />

        <Link href="/pages/forgotPassword" className="text-right text-body-xs text-[#8a8a86] -mt-2 pb-56">
          Glemt adgangskode?
        </Link>

        {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

        <PillButton onClick={handleLogin} disabled={loading}>
          {loading ? "Logger ind…" : "Login"}
        </PillButton>
      </div>
    </div>
  );
}
