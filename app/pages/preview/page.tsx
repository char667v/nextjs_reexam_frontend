import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import PillButton from "@/app/components/ui/PillButton";
import PromoBanner from "../../components/ui/PromoBanner";
import TierCard from "@/app/components/ui/TierCard";
import TierSelector from "../../components/ui/TierSelector";
import ProfileRow from "../../components/ui/ProfileRow";
import ProfileGroup from "../../components/ui/ProfileGroup";
import HistoryList from "../../components/ui/HistoryList";
import BayStatusCard from "../../components/ui/BayStatusCard";
import TierDetailCard from "../../components/ui/TierDetailCard";
import BottomSheet from "@/app/components/ui/BottomSheet";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";

const fakeWashes = [
  { location: "Nørrebro", date: "I går, kl 18:23", tier: "Brilliant" },
  { location: "Søborg", date: "25 August 2026, kl 18:23", tier: "Premium" },
  { location: "Roskilde", date: "05 August 2026, kl 12:23", tier: "Guld" },
];

export default function Test() {
  return (
    <div className="px-6 pt-6 flex flex-col gap-10">
      <AppHeader title="Login" subtitle="Et par oplysninger, så er du klar til vask." />
      <ProfileGroup>
        <ProfileRow label="Mit medlemskab" value="Guld enkeltvask" labelColor="brand" href="/pages/profile/membership" />
        <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
        <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/edit" />
      </ProfileGroup>
      
      <BottomSheet>
  <p className="text-white">Test indhold</p>
</BottomSheet>

<BayStatusCard image="/png/vaskehal-ledig.png" alt="Vaskehal 2, ledig" />
<BayStatusCard image="/png/vaskehal-optaget.png" alt="Vaskehal 2, optaget" />
      <HistoryList washes={fakeWashes} />

      <ProfileGroup>
        <ProfileRow label="Nummerplade" value="AB 12 345" showChevron={false} />
      </ProfileGroup>

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
      {/* <TierCard name="Guld" subtitle="Enkeltvask" price="49 kr." icon="/png/car-icon-guld.png" selected />
      <TierCard name="Premium" subtitle="Enkeltvask" price="79 kr." icon="/png/car-icon-premium.png" />
      <TierCard name="Brilliant" subtitle="Enkeltvask" price="129 kr." icon="/png/car-icon-brilliant.png" /> */}
      {/* <TierSelector /> */}
      <TierDetailCard
        name="Guld"
        subtitle="God og effektiv"
        price="59"
        icon="/png/car-icon-guld.png"
        description="Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:"
        rounds={1}
      />
      <TierDetailCard
        name="Guld"
        subtitle="God og effektiv"
        price="59"
        icon="/png/car-icon-guld.png"
        description="Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:"
        rounds={2}
      />
      <TierDetailCard
        name="Guld"
        subtitle="God og effektiv"
        price="59"
        icon="/png/car-icon-guld.png"
        description="Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:"
        rounds={3}
      />

      <TierSelector showFootnote />
      <TierSelector
        caption={{
          title: "Din nuværende medlemskab er Guld enkeltvask",
          text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
        }}
      />
      <BottomNav />
    </div>
  );
}
