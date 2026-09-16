import Image from "next/image";

type BayStatusCardProps = {
  image: string;
  alt: string;
};

export default function BayStatusCard({ image, alt }: BayStatusCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden w-fit">
      <Image src={image} alt={alt} width={320} height={280} />
    </div>
  );
}