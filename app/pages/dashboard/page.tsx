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

type MapLocation = {
  id: string;
  name: string;
  address: string;
  hallsCount: number;
};

// Hardcoded for now — Wash World's public locations API no longer returns
// usable data (it redirects to their homepage instead of JSON).
const locations: MapLocation[] = [
  { id: "1", name: "Wash World Nørrebro", address: "Rebslagervej 19, 2400 København NV", hallsCount: 3 },
  { id: "2", name: "Wash World Søborg", address: "Dynamovej 4, 2860 Søborg", hallsCount: 4 },
];

export default function Dashboard() {
  const router = useRouter();
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
      tier: "Guld",
      price: "59",
    });
    router.push("/pages/wash/start");
  }

  const selected = locations.find((l) => l.id === selectedLocationId);
  const filteredLocations = search ? locations.filter((l) => l.name.toLowerCase().includes(search.toLowerCase())) : locations;

  const pinLocation = filteredLocations.find((l) => l.name.toLowerCase().includes("nørrebro")) ?? filteredLocations[0];

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

// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import SearchBar from "../../components/ui/SearchBar";
// import BottomSheet from "../../components/ui/BottomSheet";
// import WashHallCard from "../../components/ui/WashHallCard";
// import BottomNav from "../../components/layout/BottomNav";
// // import { setWashSession } from "../../lib/washSession";
// import { useRouter } from "next/navigation";
// // import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
// import { IoTimeOutline } from "react-icons/io5";
// import { GiVacuumCleaner } from "react-icons/gi";
// import { BiSolidCarWash } from "react-icons/bi";
// import { FaHandsWash } from "react-icons/fa";

// type MapLocation = {
//   id: string;
//   name: string;
//   address: string;
//   position: [number, number];
//   hallsCount?: number;
//   imageUrl?: string;
// };

// export default function Dashboard() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [locations, setLocations] = useState<MapLocation[]>([]);
//   const [selectedLocationId, setSelectedLocationId] = useState<string>();
//   const [sheetOpen, setSheetOpen] = useState(true);

//   // useEffect(() => {
//   //   fetch("/api/washworld-locations")
//   //     .then((res) => res.json())
//   //     .then(setLocations)
//   //     .catch(() => setLocations([]));
//   // },
//   // []);

//   function handleSelectLocation(id: string) {
//     setSelectedLocationId(id);
//     setSheetOpen(s);
//   }

//   function handleStartWash() {
//     if (!selected) return;
//     // setWashSession({
//     //   locationId: selected.id,
//     //   locationName: selected.name,
//     //   locationAddress: selected.address,
//     // });
//     router.push("/pages/wash/select-single-wash");
//   }

//   const selected = locations.find((l) => l.id === selectedLocationId);
//   const filteredLocations = search ? locations.filter((l) => l.name.toLowerCase().includes(search.toLowerCase())) : locations;

//   // Temporary: while the map is a static placeholder image (no real pins),
//   // one fixed spot on it is clickable — tied to a real fetched location.
//   const pinLocation = filteredLocations.find((l) => l.name.toLowerCase().includes("nørrebro")) ?? filteredLocations[0];

//   return (
//     <div className="h-screen overflow-hidden relative">
//       <Image src="/png/home/dashboard/map.png" alt="Kort" width={800} height={1600} priority className="absolute inset-0 w-full h-full object-cover" />

//       {pinLocation && (
//         <button
//           onClick={() => handleSelectLocation(pinLocation.id)}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand border-2 border-white shadow-lg"
//           aria-label={`Vælg ${pinLocation.name}`}
//         />
//       )}

//       <div className="absolute top-6 left-6 right-6">
//         <SearchBar value={search} onChange={setSearch} />
//       </div>

//       {sheetOpen && selected && (
//         <BottomSheet onClose={() => setSheetOpen(false)}>
//           <WashHallCard
//             name={selected.name}
//             address={selected.address}
//             image={selected.imageUrl ?? "/jpg/wash-world-norrebro.jpg"}
//             open={true}
//             waitTime="5 min ventetid"
//             feature={[
//               { icon: <IoTimeOutline />, label: "Åben 7/22" },
//               { icon: <BiSolidCarWash />, label: "3 Vaskehaller" },
//               { icon: <GiVacuumCleaner />, label: "1 Støvsugere" },
//               { icon: <FaHandsWash />, label: "2 Vask selv" },
//             ]}
//             onStart={handleStartWash}
//           />
//         </BottomSheet>
//       )}

//       <BottomNav />
//     </div>
//   );
// }
