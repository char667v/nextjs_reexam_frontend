"use client";
import { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import BottomSheet from "../../components/ui/BottomSheet";
import WashHallCard from "../../components/ui/WashHallCard";
import BottomNav from "../../components/layout/BottomNav";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(true);

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Placeholder for the real Leaflet map, added later */}
      <div className="absolute inset-0 bg-[#0a1a0f] flex items-center justify-center">
        <span className="text-body-sm text-[#8a8a86]">Kort kommer her</span>
      </div>

      <div className="absolute top-6 left-6 right-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {sheetOpen && (
        <BottomSheet onClose={() => setSheetOpen(false)}>
          <WashHallCard
            name="Wash World Nørrebro"
            address={"Rebslagervej 19\n2400 København NV"}
            image="/jpg/wash-world-norrebro.jpg"
            open={true}
            waitTime="5 min ventetid"
            amenities={[
              { icon: "🕐", label: "Åben 7/22" },
              { icon: "🚗", label: "3 Vaskehaller" },
              { icon: "🧹", label: "Støvsugere" },
              { icon: "🧴", label: "Vask selv" },
            ]}
            onStart={() => router.push("/pages/wash/start")}
          />
        </BottomSheet>
      )}

      <BottomNav />
    </div>
  );
}