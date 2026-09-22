import Image from "next/image";
import { ReactNode } from "react";
import PillButton from "./PillButton";

type Features = {
  label: string;
  icon: ReactNode;
};

type WashHallCardProps = {
  name: string;
  address: string;
  image: string;
  open: boolean;
  waitTime: string;
  feature: Features[]; // 
  onStart: () => void; // always a function, but can be a no-op if the card is disabled (e.g. if the hall is closed)
};

export default function WashHallCard({
  name,
  address,
  image,
  open,
  waitTime,
  feature,
  onStart,
}: WashHallCardProps) {
  return (
    <div>
      <div className="flex gap-8">
        <div className="w-32 h-24 rounded-md overflow-hidden shrink-0 ml-6">
          <Image src={image} alt={name} width={128} height={96} className="w-full h-full object-cover" />
        </div>

        <div>
          <h2 className="text-h5 text-foreground">{name}</h2>
          <p className="text-body-sm text-foreground mt-1 whitespace-pre-line">{address}</p>

          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-body-sm text-brand">
              <span className="w-2 h-2 rounded-full bg-brand" /> {open ? "Åben" : "Lukket"}
            </span>
            <span className="text-body-sm text-foreground">{waitTime}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/60 my-4" />

      <div className="grid grid-cols-2 gap-3 ml-10">
        {feature.map((a) => (
          <span key={a.label} className="flex items-center gap-2 text-body-sm text-foreground">
            {a.icon} {a.label}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <PillButton onClick={onStart}>Start vask</PillButton>
      </div>
    </div>
  );
}