"use client";
import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import BottomSheet from "../../components/ui/BottomSheet";
import WashHallCard from "../../components/ui/WashHallCard";
import BottomNav from "../../components/layout/BottomNav";
// import LiveWashMap from "../../components/LiveWashMap";
// import { setWashSession } from "../../lib/washSession";
import { useRouter } from "next/navigation";

type MapLocation = {
  id: string;
  name: string;
  address: string;
  position: [number, number];
};

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [locateRequestCount, setLocateRequestCount] = useState(0);

  useEffect(() => {
    fetch("/api/location-queues/washworld-locations")
      .then((res) => res.json())
      .then(setLocations)
      .catch(() => setLocations([]));
  }, []);

  function handleSelectLocation(id: string) {
    setSelectedLocationId(id);
    setSheetOpen(true);
  }

  // function handleStartWash() {
  //   if (!selected) return;
  //   setWashSession({
  //     locationId: selected.id,
  //     locationName: selected.name,
  //     locationAddress: selected.address,
  //   });
  //   router.push("/pages/wash/select-single-wash");
  // }

  const selected = locations.find((l) => l.id === selectedLocationId);
  const filteredLocations = search
    ? locations.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    : locations;

  return (
    <div className="h-screen overflow-hidden relative">
      {/* <LiveWashMap
        locations={filteredLocations}
        selectedLocationId={selectedLocationId}
        onSelectLocation={handleSelectLocation}
        locateRequestCount={locateRequestCount}
      /> */}

      <div className="absolute top-6 left-6 right-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <button
        onClick={() => setLocateRequestCount((c) => c + 1)}
        className="absolute bottom-28 right-6 bg-black border border-brand rounded-full w-12 h-12 flex items-center justify-center text-brand"
      >
        📍
      </button>

      {sheetOpen && selected && (
        <BottomSheet onClose={() => setSheetOpen(false)}>
          <WashHallCard
            name={selected.name}
            address={selected.address}
            image="/jpg/wash-world-norrebro.jpg"
            open={true}
            waitTime="5 min ventetid"
            amenities={[
              { icon: "🕐", label: "Åben 7/22" },
              { icon: "🚗", label: "3 Vaskehaller" },
              { icon: "🧹", label: "Støvsugere" },
              { icon: "🧴", label: "Vask selv" },
            ]}
            onStart={handleStartWash}
          />
        </BottomSheet>
      )}

      <BottomNav />
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import SearchBar from "../../components/ui/SearchBar";
// import BottomSheet from "../../components/ui/BottomSheet";
// import WashHallCard from "../../components/ui/WashHallCard";
// import BottomNav from "../../components/layout/BottomNav";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [sheetOpen, setSheetOpen] = useState(true);

//   return (
//     <div className="h-screen overflow-hidden relative">
//       {/* Placeholder for the real Leaflet map, added later */}
//       <div className="absolute inset-0 bg-[#0a1a0f] flex items-center justify-center">
//         <span className="text-body-sm text-[#8a8a86]">Kort kommer her</span>
//       </div>

//       <div className="absolute top-6 left-6 right-6">
//         <SearchBar value={search} onChange={setSearch} />
//       </div>

//       {sheetOpen && (
//         <BottomSheet onClose={() => setSheetOpen(false)}>
//           <WashHallCard
//             name="Wash World Nørrebro"
//             address={"Rebslagervej 19\n2400 København NV"}
//             image="/jpg/wash-world-norrebro.jpg"
//             open={true}
//             waitTime="5 min ventetid"
//             amenities={[
//               { icon: "🕐", label: "Åben 7/22" },
//               { icon: "🚗", label: "3 Vaskehaller" },
//               { icon: "🧹", label: "Støvsugere" },
//               { icon: "🧴", label: "Vask selv" },
//             ]}
//             onStart={() => router.push("/pages/wash/start")}
//           />
//         </BottomSheet>
//       )}

//       <BottomNav />
//     </div>
//   );
// }