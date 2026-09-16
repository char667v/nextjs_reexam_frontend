"use client";
import AppHeader from "../../../components/layout/AppHeader";
import BayStatusCard from "../../../components/ui/BayStatusCard";
import PillButton from "../../../components/ui/PillButton";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function WashStart() {
  const router = useRouter();

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader
        title="Start vask"
        showClose={false}
        details={[
          { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
          { icon: <FaTint />, text: "Program: Guld" },
        ]}
      />

      <div className="my-6 flex justify-center">
        <BayStatusCard image="/png/vaskehal-ledig.png" alt="Vaskehal 2, ledig" />
      </div>

      <p className="text-h5 text-brand font-bold mb-3">Bliv i bilen og nyd pausen</p>
      <p className="text-body-sm text-foreground mb-2">
        Tryk på start for at begynde din bilvask med Guld programmet til 59kr.
      </p>
      <p className="text-body-sm text-[#8a8a86] mb-8">
        Beløbet bliver trykket automatisk via kortbetaling.
      </p>

      <div className="flex flex-col gap-3">
        <PillButton onClick={() => router.push("/pages/wash/progress")}>Ja, start vask</PillButton>
        <PillButton variant="outline" onClick={() => router.push("/pages/dashboard")}>Fortryd</PillButton>
      </div>
    </div>
  );
}