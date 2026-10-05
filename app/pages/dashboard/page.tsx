"use client";
import Image from "next/image";
import { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import BottomSheet from "../../components/ui/BottomSheet";
import WashHallCard from "../../components/ui/WashHallCard";
import BottomNav from "../../components/layout/BottomNav";
import { setWashSession } from "../../lib/washSession";
import { useRouter } from "next/navigation";
import { IoTimeOutline } from "react-icons/io5";
import { GiVacuumCleaner } from "react-icons/gi";
import { BiSolidCarWash } from "react-icons/bi";
import { FaHandsWash } from "react-icons/fa";
import { useMyInfo } from "../../hooks/useMyInfo";
import { useWashHalls } from "../../hooks/useWashHalls";
import { tierDetails } from "../../lib/tiers";

export default function Dashboard() {
  const router = useRouter();
  const { data: me } = useMyInfo();   // the logged-in user, including membership_tier from the database
  const { data: halls = [], isPending, isError } = useWashHalls();   // the wash halls from the database
  const [search, setSearch] = useState("");
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleSelectHall(id: string) {
    setSelectedHallId(id);
    setSheetOpen(true);
  }

  function handleStartWash() {
    if (!selected) return;
    setWashSession({
      locationId: selected.hall_id,
      locationName: selected.name,
      locationAddress: selected.address,
      tier: tierDetails[(me?.membership_tier ?? "Guld").toLowerCase()].name,
      price: tierDetails[(me?.membership_tier ?? "Guld").toLowerCase()].price,
    });
    router.push("/pages/wash/start");
  }

  const selected = halls.find((h) => h.hall_id === selectedHallId);
  const filteredHalls = search ? halls.filter((h) => h.name.toLowerCase().includes(search.toLowerCase())) : halls;

  const pinHall = filteredHalls[0];

  return (
    <div className="h-screen overflow-hidden relative">
      <Image src="/png/home/dashboard/map.png" alt="Kort" width={800} height={1600} priority className="absolute inset-0 w-full h-full object-cover" />

      {pinHall && (
        <button
          onClick={() => handleSelectHall(pinHall.hall_id)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand border-2 border-white shadow-lg"
          aria-label={`Vælg ${pinHall.name}`}
        />
      )}

      <div className="absolute top-20 left-4 right-6 ml-8 mr-8">
        <SearchBar value={search} onChange={setSearch} />

        {/* Loading and error, like on the history page */}
        {isPending && <p className="mt-2 rounded-2xl bg-white px-4 py-3 text-body-sm text-[#8a8a86]">Henter vaskehaller…</p>}
        {isError && <p className="mt-2 rounded-2xl bg-white px-4 py-3 text-body-sm text-[#E24B4A]">Kunne ikke hente vaskehaller.</p>}

        {search && !isPending && !isError && (
          <ul className="mt-2 rounded-2xl bg-white overflow-hidden">
            {filteredHalls.length === 0 && (
              <li className="px-4 py-3 text-body-sm text-[#8a8a86]">Ingen vaskehaller fundet</li>
            )}
            {filteredHalls.map((h) => (
              <li key={h.hall_id}>
                <button
                  onClick={() => {
                    handleSelectHall(h.hall_id);
                    setSearch("");
                  }}
                  className="w-full text-left px-4 py-3 border-b border-[#eee]"
                >
                  <span className="block text-body-sm font-bold text-black">{h.name}</span>
                  <span className="block text-body-xs text-[#8a8a86]">{h.address}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {sheetOpen && selected && (
        <BottomSheet onClose={() => setSheetOpen(false)}>
          <WashHallCard
            name={selected.name}
            address={selected.address}
            image="/jpg/wash-world-soborg.jpg"
            open={true}
            waitTime="5 min ventetid"
            feature={[
              { icon: <IoTimeOutline />, label: "Åben 7/22" },
              { icon: <BiSolidCarWash />, label: "2 Vaskehaller" },
              { icon: <GiVacuumCleaner />, label: "1 Støvsugere" },
              { icon: <FaHandsWash />, label: "2 Vask selv" },
            ]}
            onStart={handleStartWash}
          />
        </BottomSheet>
      )}

      <BottomNav />
    </div>
  );
}