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
import { tierDetails } from "../../lib/tiers";

type MapLocation = {
  id: string;
  name: string;
  address: string;
  hallsCount: number;
};

// Hardcoded for now: the same IDs as the wash_halls table in the database.
// Live version: fetch them from GET /api-wash-halls instead.
const locations: MapLocation[] = [
  { id: "11111111111111111111111111111111", name: "Wash World Herlev", address: "Nørrelundvej 2, 2730 Herlev", hallsCount: 3 },
  { id: "22222222222222222222222222222222", name: "Wash World Søborg", address: "Dynamovej 4, 2860 Søborg", hallsCount: 4 },
  { id: "33333333333333333333333333333333", name: "Wash World Ballerup", address: "Industriparken 6, 2750 Ballerup", hallsCount: 2 },
  { id: "44444444444444444444444444444444", name: "Wash World Taastrup", address: "Roskildevej 376, 2630 Taastrup", hallsCount: 2 },
  { id: "55555555555555555555555555555555", name: "Wash World Ishøj", address: "Vejleåvej 19, 2635 Ishøj", hallsCount: 2 },
  { id: "66666666666666666666666666666666", name: "Wash World Brøndby Strand", address: "Gammel Køge Landevej 690, 2660 Brøndby Strand", hallsCount: 2 },
];

export default function Dashboard() {
  const router = useRouter();
  const { data: me } = useMyInfo();   // the logged-in user, including membership_tier from the database
  const [search, setSearch] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0].id);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleSelectLocation(id: string) {
    setSelectedLocationId(id);
    setSheetOpen(true);
  }

  function handleStartWash() {
    if (!selected) return;
    setWashSession({
      locationId: selected.id,
      locationName: selected.name,
      locationAddress: selected.address,
      tier: tierDetails[(me?.membership_tier ?? "Guld").toLowerCase()].name,
      price: tierDetails[(me?.membership_tier ?? "Guld").toLowerCase()].price,
    });
    router.push("/pages/wash/start");
  }

  const selected = locations.find((l) => l.id === selectedLocationId);
  const filteredLocations = search ? locations.filter((l) => l.name.toLowerCase().includes(search.toLowerCase())) : locations;

  const pinLocation = filteredLocations[0];

  return (
    <div className="h-screen overflow-hidden relative">
      <Image src="/png/home/dashboard/map.png" alt="Kort" width={800} height={1600} priority className="absolute inset-0 w-full h-full object-cover" />

      {pinLocation && (
        <button
          onClick={() => handleSelectLocation(pinLocation.id)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand border-2 border-white shadow-lg"
          aria-label={`Vælg ${pinLocation.name}`}
        />
      )}

      <div className="absolute top-20 left-4 right-6 ml-8 mr-8">
        <SearchBar value={search} onChange={setSearch} />

  {search && (
    <ul className="mt-2 rounded-2xl bg-white overflow-hidden">
      {filteredLocations.length === 0 && (
        <li className="px-4 py-3 text-body-sm text-[#8a8a86]">Ingen vaskehaller fundet</li>
      )}
      {filteredLocations.map((l) => (
        <li key={l.id}>
          <button
            onClick={() => {
              handleSelectLocation(l.id);
              setSearch("");
            }}
            className="w-full text-left px-4 py-3 border-b border-[#eee]"
          >
            <span className="block text-body-sm font-bold text-black">{l.name}</span>
            <span className="block text-body-xs text-[#8a8a86]">{l.address}</span>
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
              { icon: <BiSolidCarWash />, label: `${selected.hallsCount} Vaskehaller` },
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