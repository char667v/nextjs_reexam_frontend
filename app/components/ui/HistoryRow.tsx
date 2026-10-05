type HistoryRowProps = {
  hall_name: string;
  washed_at: string;
  tier: string;
};

export default function HistoryRow({ hall_name, washed_at, tier }: HistoryRowProps) {
  return (
    <div className="flex items-start justify-between py-2.5">
      <div>
        <p className="text-body-sm font-bold text-foreground leading-tight">{hall_name}</p>
        <p className="text-body-sm text-[#8a8a86] leading-tight">
          {new Date(washed_at).toLocaleDateString("da-DK")} kl.{" "}
          {new Date(washed_at).toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      <span className="text-body-sm font-bold text-brand">{tier}</span>
    </div>
  );
}