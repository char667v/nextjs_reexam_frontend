"use client";
import AppHeader from "../../../components/layout/AppHeader";
import BayStatusCard from "../../../components/ui/BayStatusCard";
import PillButton from "../../../components/ui/PillButton";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getWashSession, updateWashSession, type WashSession } from "../../../lib/washSession";

export default function WashStart() {
  const router = useRouter();
  const [session, setSession] = useState<WashSession | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSession(getWashSession());   // sessionStorage only exists in the browser, so read it after the page loads
  }, []);

  async function handleStartWash() {
    if (!session) return;
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://localhost:80/api-start-wash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hall_id: session.locationId, tier: session.tier }),
      });
      // "Hey backend, start a wash at this hall with this program. Here's my wristband."
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Kunne ikke starte vask");
        return;
      }
      updateWashSession({ washId: data.wash_id });   // remember which wash was started
      router.push("/pages/wash/progress");
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  if (!session) return null;   // nothing chosen yet (or still reading the session)

  return (
    <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Start vask"
        showClose={false}
        details={[
          { icon: <FaMapMarkerAlt />, text: session.locationName },
          { icon: <FaTint />, text: `Program: ${session.tier}` },
        ]}
      />

      <div className="my-6 flex justify-center">
        <BayStatusCard image="/png/vaskehal-ledig.png" alt="Vaskehal ledig" />
      </div>

      <p className="text-h5 text-brand font-bold mb-3">Bliv i bilen og nyd pausen</p>
      <p className="text-body-sm text-foreground mb-2">
        Tryk på start for at begynde din bilvask med {session.tier} programmet til {session.price}kr.
      </p>
      <p className="text-body-sm text-[#8a8a86] mb-8">
        Beløbet bliver trukket automatisk via kortbetaling.
      </p>

      {error && <p className="text-body-sm text-[#E24B4A]">{error}</p>}

      <div className="flex flex-col gap-3">
        <PillButton onClick={handleStartWash} disabled={loading}>
          {loading ? "Starter vask…" : "Ja, start vask"}
        </PillButton>
        <PillButton variant="danger-outline" onClick={() => router.push("/pages/dashboard")}>Fortryd</PillButton>
      </div>
    </div>
  );
}

// "use client";
// import AppHeader from "../../../components/layout/AppHeader";
// import BayStatusCard from "../../../components/ui/BayStatusCard";
// import PillButton from "../../../components/ui/PillButton";
// import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function WashStart() {
//   const router = useRouter();

//   return (
//     <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
//       <AppHeader
//         title="Start vask"
//         showClose={false}
//         details={[
//           { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
//           { icon: <FaTint />, text: "Program: Guld" },
//         ]}
//       />

//       <div className="my-6 flex justify-center">
//         <BayStatusCard image="/png/vaskehal-ledig.png" alt="Vaskehal 2, ledig" />
//       </div>

//       <p className="text-h5 text-brand font-bold mb-3">Bliv i bilen og nyd pausen</p>
//       <p className="text-body-sm text-foreground mb-2">
//         Tryk på start for at begynde din bilvask med Guld programmet til 59kr.
//       </p>
//       <p className="text-body-sm text-[#8a8a86] mb-8">
//         Beløbet bliver trykket automatisk via kortbetaling.
//       </p>

//       <div className="flex flex-col gap-3">
//         <PillButton onClick={() => router.push("/pages/wash/progress")}>Ja, start vask</PillButton>
//         <PillButton variant="danger-outline" onClick={() => router.push("/pages/dashboard")}>Fortryd</PillButton>
//       </div>
//     </div>
//   );
// }