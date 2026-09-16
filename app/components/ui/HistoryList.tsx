import HistoryRow from "./HistoryRow";

type Wash = {
  location: string;
  date: string;
  tier: string;
};

export default function HistoryList({ washes }: { washes: Wash[] }) {
  return (
    <div className="border border-brand rounded-2xl px-4 divide-y divide-[#2a2a2a]">
      {washes.map((wash, i) => (
        <HistoryRow key={i} {...wash} />
      ))}
    </div>
  );
}