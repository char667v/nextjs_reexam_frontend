"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PillButton from "./components/ui/PillButton";

export default function Splash() {
  const router = useRouter();

  return (
    <div 
      className="h-screen overflow-hidden bg-black flex flex-col justify-between px-6 py-10 bg-cover bg-center bg-no-repeat pt-20 pr-14 pb-28 pl-14"
      style={{ backgroundImage: "url('/jpg/splash-car.jpg')" }}
    >
      <div className="flex justify-center">
        <Image
          src="/png/login/logo-primary-black-bg.png"
          alt="Wash World"
          width={220}
          height={140}
          priority
        />
      </div>

      <div className="flex flex-col gap-3">
        <PillButton onClick={() => router.push("/pages/login")}>Login</PillButton>
        <PillButton variant="outline" onClick={() => router.push("/pages/onboarding")}>
          Opret bruger
        </PillButton>
      </div>
    </div>
  );
}