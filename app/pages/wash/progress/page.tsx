"use client";
import { useEffect, useState } from "react";
import AppHeader from "../../../components/layout/AppHeader";
import BayStatusCard from "../../../components/ui/BayStatusCard";
import PillButton from "../../../components/ui/PillButton";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { useRouter } from "next/navigation";

const WASH_DURATION_SECONDS = 103; // 01:43

export default function WashProgress() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(WASH_DURATION_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/pages/wash/done");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Din vask er igang"
        showClose={false}
        details={[
          { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
          { icon: <FaTint />, text: "Program: Guld" },
        ]}
      />

      <div className="my-6">
        <BayStatusCard image="/png/vaskehal-optaget.png" alt="Vaskebås 2, optaget" />
      </div>

      <p className="text-h2 text-foreground text-center mt-6">{formatted}</p>
      <p className="text-body-sm text-foreground text-center mb-8">Tid tilbage</p>

      <PillButton variant="danger" onClick={() => router.push("/pages/dashboard")}>
        Nødstop
      </PillButton>
    </div>
  );
}