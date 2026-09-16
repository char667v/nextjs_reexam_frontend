import TierCard from "./TierCard";
import ProcessSteps from "./ProcessSteps";

type TierDetailCardProps = {
  name: string;
  subtitle: string;
  price: string;
  icon: string;
  description: string;
  rounds: number;
};

export default function TierDetailCard({ name, subtitle, price, icon, description, rounds }: TierDetailCardProps) {
  return (
    <div>
      <TierCard name={name} subtitle={subtitle} price={price} icon={icon} showChevron={false} />

      <p className="text-body-md font-bold text-foreground mt-6">{description}</p>

      <ProcessSteps rounds={rounds} />
    </div>
  );
}


// import Image from "next/image";
// import ProcessSteps from "./ProcessSteps";

// type TierDetailCardProps = {
//   name: string;
//   price: string;
//   icon: string;
//   description: string;
//   rounds: number;
// };

// export default function TierDetailCard({ name, price, icon, description, rounds }: TierDetailCardProps) {
//   return (
//     <div className="border border-brand rounded-2xl p-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
//             <Image src={icon} alt="" width={28} height={28} />
//           </div>
//           <span className="text-body-md font-bold text-foreground">{name}</span>
//         </div>
//         <span className="text-h5 font-bold text-foreground">{price} kr.</span>
//       </div>

//       <p className="text-body-sm text-foreground mt-3">{description}</p>

//       <ProcessSteps rounds={rounds} />
//     </div>
//   );
// }