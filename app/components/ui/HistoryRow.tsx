type HistoryRowProps = {
  location: string;
  date: string;
  tier: string;
};

export default function HistoryRow({ location, date, tier }: HistoryRowProps) {
  return (
    <div className="flex items-start justify-between py-2.5">
      <div>
        <p className="text-body-sm font-bold text-foreground leading-tight">{location}</p>
        <p className="text-body-sm text-[#8a8a86] leading-tight">{date}</p>
      </div>
      <span className="text-body-sm font-bold text-brand">{tier}</span>
    </div>
  );
}