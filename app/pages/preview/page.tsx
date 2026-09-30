"use client";

import { useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import PillButton from "@/app/components/ui/PillButton";
import PromoBanner from "../../components/ui/PromoBanner";
import TierSelector from "../../components/ui/TierSelector";
import ProfileRow from "../../components/ui/ProfileRow";
import ProfileGroup from "../../components/ui/ProfileGroup";
import HistoryList from "../../components/ui/HistoryList";
import BayStatusCard from "../../components/ui/BayStatusCard";
import TierDetailCard from "../../components/ui/TierDetailCard";
import BottomSheet from "@/app/components/ui/BottomSheet";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { BiSolidCarWash } from "react-icons/bi";
import { FaHandsWash } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

import FormField from "@/app/components/ui/FormField";
import HistoryRow from "@/app/components/ui/HistoryRow";
import ProcessSteps from "@/app/components/ui/ProcessSteps";
import SearchBar from "@/app/components/ui/SearchBar";
import StarRating from "@/app/components/ui/StarRating";
import SwitchMembershipWarning from "../../components/ui/SwitchMembershipWarning";
import TierCard from "@/app/components/ui/TierCard";
import WashHallCard from "../../components/ui/WashHallCard";

const fakeWashes = [
  { location: "Nørrebro", date: "I går, kl 18:23", tier: "Brilliant" },
  { location: "Søborg", date: "25 August 2026, kl 18:23", tier: "Premium" },
  { location: "Roskilde", date: "05 August 2026, kl 12:23", tier: "Guld" },
];

export default function Test() {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="px-6 pt-6 flex flex-col gap-10">
      <AppHeader title="Login" subtitle="Et par oplysninger, så er du klar til vask." />
      <hr className="border-t-2 border-orange-500" />
      {/* border-t-2 = a line on the top edge, 2px thick 
      // border-orange-500 = orange from Tailwind's color palette*/}
      <AppHeader
        title="Skift adgangskode"
        subtitle="Din nye adgangskode må ikke være den samme som tidligere."
        showClose={false} //true hvis synlig x
      />
      <hr className="border-t-2 border-orange-500" />
      <AppHeader
        title="Start vask"
        showClose={false} //true hvis synlig x
        details={[
          { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
          { icon: <FaTint />, text: "Program: Guld" },
        ]}
      />
      <hr className="border-t-2 border-orange-500" />
      <FormField label="Email" value={email} onChange={setEmail} type="email" placeholder="din@email.dk" />
      <hr className="border-t-2 border-orange-500" />
      <HistoryRow location="Nørrebro" date="I går, kl 18:23" tier="Brilliant" />
      <hr className="border-t-2 border-orange-500" />
      <ProcessSteps totalIcons={12} />
      <hr className="border-t-2 border-orange-500" />
      <SearchBar value={search} onChange={setSearch} />
      <hr className="border-t-2 border-orange-500" />
      <StarRating />
      <hr className="border-t-2 border-orange-500" />
      {/* <SwitchMembershipWarning /> */}
      <hr className="border-t-2 border-orange-500" />
      <WashHallCard
        name="Wash World Nørrebro"
        address={"Rebslagervej 19\n2400 København NV"}
        image="/jpg/wash-world-soborg.jpg"
        open={true}
        waitTime="5 min ventetid"
        feature={[
          { icon: <IoTimeOutline />, label: "Åben 7/22" },
          { icon: <BiSolidCarWash />, label: "3 Vaskehaller" },
          { icon: <GiVacuumCleaner />, label: "Støvsugere" },
          { icon: <FaHandsWash />, label: "Vask selv" },
        ]}
        onStart={() => console.log("start vask clicked")}
      />
      <hr className="border-t-2 border-orange-500" />
      <ProfileGroup>
        <ProfileRow label="Mit medlemskab" value="Guld enkeltvask" labelColor="brand" href="/pages/profile/membership" />
        <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
        <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/edit" />
      </ProfileGroup>
      <hr className="border-t-2 border-orange-500" />
      <ProfileGroup>
        <ProfileRow label="Nummerplade" value="AB 12 345" showChevron={false} />
      </ProfileGroup>
      <hr className="border-t-2 border-orange-500" />
      <BayStatusCard image="/png/vaskehal-ledig.png" alt="Vaskebås 2, ledig" />
      <hr className="border-t-2 border-orange-500" />
      <BayStatusCard image="/png/vaskehal-optaget.png" alt="Vaskebås 2, optaget" />
      <hr className="border-t-2 border-orange-500" />
      <HistoryList washes={fakeWashes} />
      <hr className="border-t-2 border-orange-500" />
      {/* {sheetOpen && (
        <BottomSheet onClose={() => setSheetOpen(false)}>
          <WashHallCard
            name="Wash World Nørrebro"
            address={"Rebslagervej 19\n2400 København NV"}
            image="/jpg/wash-world-soborg.jpg"
            open={true}
            waitTime="5 min ventetid"
            feature={[
              { icon: <IoTimeOutline />, label: "Åben 7/22" },
              { icon: <BiSolidCarWash />, label: "3 Vaskehaller" },
              { icon: <GiVacuumCleaner />, label: "Støvsugere" },
              { icon: <FaHandsWash />, label: "Vask selv" },
            ]}
            onStart={() => console.log("start vask clicked")}
          />
        </BottomSheet>
      )} */}
      <hr className="border-t-2 border-orange-500" />
      <PromoBanner src="/jpg/enkeltvask-banner.jpg" alt="Enkeltvask - betal kun for den vask du bruger" />
      <hr className="border-t-2 border-orange-500" />
      <PromoBanner
        src="/jpg/vask-bil-perfekt.jpg"
        alt="Sådan vasker du din bil perfekt"
        caption={{
          title: "Din nuværende medlemskab er Guld enkeltvask",
          text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
        }}
      />
      <hr className="border-t-2 border-orange-500" />
      <PillButton variant="primary">Start vask</PillButton>
      <hr className="border-t-2 border-orange-500" />
      <PillButton variant="outline">Start vask</PillButton>
      <hr className="border-t-2 border-orange-500" />
      <PillButton variant="danger">NØDSTOP</PillButton>
      <hr className="border-t-2 border-orange-500" />
      <TierCard name="Guld" subtitle="God og effektiv" price="59" icon="/png/car-icon-guld.png" />
      <hr className="border-t-2 border-orange-500" />
      <TierDetailCard
        name="Guld"
        subtitle="God og effektiv"
        price="59"
        icon="/png/car-icon-guld.png"
        description="Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:"
        totalIcons={8}
        //rounds={2}
      />
      <hr className="border-t-2 border-orange-500" />
      <TierDetailCard
        name="Premium"
        subtitle="Ekstra grundig"
        price="89"
        icon="/png/car-icon-premium.png"
        description="Vores ekstra grundige Premium vaskeprogram giver din bil kvalitets vask med følgende proces:"
        totalIcons={9}
        //rounds={2}
      />
      <hr className="border-t-2 border-orange-500" />
      <TierDetailCard
        name="Brilliant"
        subtitle="Bedste vask året rundt"
        price="119"
        icon="/png/car-icon-brilliant.png"
        description="Vores bedste Brilliant vaskeprogram giver vi din bil ren luksus med følgende proces:"
        totalIcons={12} 
        //rounds={3}
      />
      <hr className="border-t-2 border-orange-500" />
      <TierSelector showFootnote />
      <hr className="border-t-2 border-orange-500" />
      <TierSelector
        caption={{
          title: "Din nuværende medlemskab er Guld enkeltvask",
          text: "Vælg mellem Premium eller Brilliant for at ændre dit medlemskab for en endnu bedre oplevelse med WashWorld",
        }}
      />
      <hr className="border-t-2 border-orange-500" />
      <BottomNav />
      <hr className="border-t-2 border-orange-500" />
    </div>
  );
}
