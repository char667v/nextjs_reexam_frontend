import Image from "next/image";
import PillButton from "./PillButton";

type Amenity = {
  icon: string;
  label: string;
};

type WashHallCardProps = {
  name: string;
  address: string;
  image: string;
  open: boolean;
  waitTime: string;
  amenities: Amenity[];
  onStart: () => void;
};

export default function WashHallCard({
  name,
  address,
  image,
  open,
  waitTime,
  amenities,
  onStart,
}: WashHallCardProps) {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0">
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

      <div className="border-t border-white/20 my-4" />

      <div className="grid grid-cols-2 gap-3">
        {amenities.map((a) => (
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