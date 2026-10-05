"use client";

import Image from "next/image";

type TierCardProps = {
  name: string;
  subtitle: string;
  price: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  showChevron?: boolean;
};

export default function TierCard({
  name,
  subtitle,
  price,
  icon,
  selected = false,
  onClick,
  showChevron = true,
}: TierCardProps) {

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left border border-brand ${
        selected ? "bg-brand" : "bg-white"
      }`}
    >
      <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center shrink-0">
        <Image src={icon} alt="" width={44} height={44} />
      </div>

      <div className="flex-1">
        <p className="text-body-md text-black">
          <span className="font-bold">{name}</span> <span className="text-[#555]">- {subtitle}</span>
        </p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-h2 font-bold text-black">
            {price} <span className="text-body-sm font-normal">kr./vask</span>
          </span>
          {!selected && showChevron && <span className="text-black">›</span>}
        </div>
      </div>
    </button>
  );
}