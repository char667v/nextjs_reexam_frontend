import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import PillButton from "@/app/components/ui/PillButton";
import PromoBanner from "../../components/ui/PromoBanner";
import TierCard from "@/app/components/ui/TierCard";
import TierSelector from "../../components/ui/TierSelector";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";


export default function Test() {
  return (
    <div className="px-6 pt-6 flex flex-col gap-10">
      <AppHeader title="Login" subtitle="Et par oplysninger, så er du klar til vask." />

      <AppHeader
        title="Start vask"
        showClose={false} /*Write this if the  x close button should not be shown*/
        details={[
          { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
          { icon: <FaTint />, text: "Program: Guld" },
        ]}
      />
      <PromoBanner src="/jpg/enkeltvask-banner.jpg" alt="Enkeltvask - betal kun for den vask du bruger" />
      <PromoBanner
        src="/jpg/vask-bil-perfekt.jpg"
        alt="Sådan vasker du din bil perfekt"
        caption={{
          title: "Din nuværende medlemskab er Guld enkeltvask",
          text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
        }}
      />
      <PillButton variant="primary">Start vask</PillButton>
      <PillButton variant="outline">Start vask</PillButton>
      <PillButton variant="danger">NØDSTOP</PillButton>

      <TierCard name="Guld" subtitle="Enkeltvask" price="49 kr." icon="/png/car-icon-guld.png" selected />
      <TierCard name="Premium" subtitle="Enkeltvask" price="79 kr." icon="/png/car-icon-premium.png" />
      <TierCard name="Brilliant" subtitle="Enkeltvask" price="129 kr." icon="/png/car-icon-brilliant.png" />
      <TierSelector />
      <BottomNav />
    </div>
  );
}
