import HistoryRow from "./HistoryRow";
import type { Wash } from "../../hooks/useWashHistory"; // one shared type, defined in the hook

export default function HistoryList({ washes }: { washes: Wash[] }) {
  return (
    <div className="border border-brand rounded-2xl px-4 divide-y divide-[#2a2a2a]">
      {washes.map((wash) => (
        <HistoryRow
          key={wash.wash_id} // the real ID, instead of the list position
          hall_name={wash.hall_name}
          washed_at={wash.washed_at}
          tier={wash.tier}
        />
      ))}
    </div>
  );
}
