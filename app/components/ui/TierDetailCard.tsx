import TierCard from "./TierCard";
import ProcessSteps from "./ProcessSteps";

type TierDetailCardProps = {
  name: string;
  subtitle: string;
  price: string;
  icon: string;
  description: string;
  totalIcons: number;
};

export default function TierDetailCard({ name, subtitle, price, icon, description, totalIcons }: TierDetailCardProps) {
  return (
    <div>
      <TierCard name={name} subtitle={subtitle} price={price} icon={icon} showChevron={false} />

      <p className="text-body-md font-bold text-foreground mt-6 mb-4">{description}</p>

      <ProcessSteps totalIcons={totalIcons} />
    </div>
  );
}