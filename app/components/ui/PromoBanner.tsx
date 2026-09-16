import Image from "next/image";

type PromoBannerProps = {
  src: string;
  alt: string;
  caption?: {
    title: string;
    text: string;
  };
};

export default function PromoBanner({ src, alt, caption }: PromoBannerProps) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden">
        <Image src={src} alt={alt} width={600} height={200} className="w-full h-auto" priority />
      </div>

      {caption && (
        <div className="mt-6">
          <h2 className="text-h3 text-brand">{caption.title}</h2>
          <p className="text-body-md text-foreground mt-2">{caption.text}</p>
        </div>
      )}
    </div>
  );
}