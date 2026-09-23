import { FaDroplet } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import HojtrykIcon from "./icons/HojtrykIcon";
import BorsterIcon from "./icons/BorsterIcon";

const stepCycle = [
  { icon: FaDroplet, label: "Forvask" },
  { icon: HojtrykIcon, label: "Højtryk" },
  { icon: BorsterIcon, label: "Børster" },
  { icon: HiSparkles, label: "Skyl & voks" },
];

export default function ProcessSteps({ totalIcons }: { totalIcons: number }) {
  const steps = Array.from({ length: totalIcons }, (_, i) => stepCycle[i % 4]);
  const rows: (typeof stepCycle)[] = [];
  for (let i = 0; i < steps.length; i += 4) rows.push(steps.slice(i, i + 4));

  return (
    <div className="bg-[#111] rounded-xl p-4 flex flex-col gap-6">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`flex-1 flex flex-col items-center gap-1 text-foreground ${
                  i > 0 ? "border-l border-white/15" : ""
                }`}
              >
                <Icon size={22} />
                <span className="text-body-xs text-[#8a8a86] text-center">{step.label}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}