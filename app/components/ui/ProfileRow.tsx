import Link from "next/link";

type ProfileRowProps = {
  label: string;
  value: string;
  href?: string;
  labelColor?: "brand" | "foreground";
  showChevron?: boolean;
};

export default function ProfileRow({
  label,
  value,
  href,
  labelColor = "foreground",
  showChevron = true,
}: ProfileRowProps) {
  const content = (
    <div className="flex items-start justify-between py-2.5">
      <div>
        <p className={`text-body-sm font-bold leading-tight ${labelColor === "brand" ? "text-brand" : "text-foreground"}`}>
          {label}
        </p>
        <p className="text-body-sm text-[#8a8a86] leading-tight">{value}</p>
      </div>
      {showChevron && <span className="text-brand">›</span>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}