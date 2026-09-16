import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";

export default function Test() {
  return (
    <div className="px-6 pt-6 flex flex-col gap-10">
      <AppHeader
        title="Login"
        subtitle="Et par oplysninger, så er du klar til vask."
      />

      <AppHeader
        title="Start vask"
        showClose={false} /*Write this if the  x close button should not be shown*/
        details={[
          { icon: <FaMapMarkerAlt />, text: "Wash World Søborg - Vaskehal 2" },
          { icon: <FaTint />, text: "Program: Guld" },
        ]}
      />

      <BottomNav />
    </div>
  );
}