"use client";
import TierCard from "./TierCard";

const tiers = [
  { name: "Guld", subtitle: "God og effektiv", price: "59", icon: "/png/car-icon-guld.png" },
  { name: "Premium", subtitle: "Ekstra grundig", price: "89", icon: "/png/car-icon-premium.png" },
  { name: "Brilliant", subtitle: "Bedste vask året rundt", price: "119", icon: "/png/car-icon-brilliant.png" },
];

const membershipDisclaimer = {
  title: "*Spar penge med medlemsskab",
  text: "Hvis du vasker bil regelmæssigt, er der mange penge at spare med et Wash World-medlemskab. Her får du nemlig ubegrænset bilvask for en lav månedlig pris.",
};

type TierSelectorProps = {
    selected?: string;   // controlled: the parent decides which tier is highlighted
  caption?: {
    title: string;
    text: string;
  };
  showFootnote?: boolean;
  onSelect?: (tier: string) => void;
};

export default function TierSelector({ selected = "", caption, showFootnote = true, onSelect }: TierSelectorProps) {
  function handleSelect(tier: string) {
    onSelect?.(tier);   // the parent decides what happens: highlight, navigate, etc.
  }

  return (
    <div>
      {caption && (
        <div className="mb-6">
          <h2 className="text-h3 text-brand">{caption.title}</h2>
          <p className="text-body-md text-foreground mt-2">{caption.text}</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tiers.map((tier) => (
          <TierCard
            key={tier.name}
            {...tier}
            selected={selected === tier.name}
            onClick={() => handleSelect(tier.name)}
          />
        ))}
      </div>

      {showFootnote && (
        <div className="mt-6">
          <p className="text-body-xs text-foreground">{membershipDisclaimer.title}</p>
          <p className="text-body-xs text-[#8a8a86] mt-1">{membershipDisclaimer.text}</p>
        </div>
      )}
    </div>
  );
}