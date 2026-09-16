"use client";
import { useState } from "react";
import TierCard from "./TierCard";

const tiers = [
  { name: "Guld", subtitle: "God og effektiv", price: "59", icon: "/png/car-icon-guld.png" },
  { name: "Premium", subtitle: "Ekstra grundig", price: "89", icon: "/png/car-icon-premium.png" },
  { name: "Brilliant", subtitle: "Bedste vask året rundt", price: "119", icon: "/png/car-icon-brilliant.png" },
];

export default function TierSelector() {
  const [selected, setSelected] = useState("Guld");

  return (
    <div className="flex flex-col gap-3">
      {tiers.map((tier) => (
        <TierCard key={tier.name} {...tier} selected={selected === tier.name} onClick={() => setSelected(tier.name)} />
      ))}
    </div>
  );
}