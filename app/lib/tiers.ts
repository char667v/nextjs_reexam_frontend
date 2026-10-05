// One shared description of the three wash programs.
// Used by the [tier] page (changing membership) and by onboarding (first signup).
export type TierInfo = {
  name: string;
  subtitle: string;
  price: string;
  icon: string;
  description: string;
  totalIcons: number;
};

export const tierDetails: Record<string, TierInfo> = {
  guld: {
    name: "Guld",
    subtitle: "God og effektiv",
    price: "59",
    icon: "/png/car-icon-guld.png",
    description: "Vores gode og effektive Guld vaskeprogram giver din bil en kærlig hånd med følgende proces:",
    totalIcons: 8,
  },
  premium: {
    name: "Premium",
    subtitle: "Ekstra grundig",
    price: "89",
    icon: "/png/car-icon-premium.png",
    description: "Vores ekstra grundige Premium vaskeprogram giver din bil kvalitets vask med følgende proces:",
    totalIcons: 9,
  },
  brilliant: {
    name: "Brilliant",
    subtitle: "Bedste vask året rundt",
    price: "119",
    icon: "/png/car-icon-brilliant.png",
    description: "Vores bedste Brilliant vaskeprogram giver vi din bil ren luksus med følgende proces:",
    totalIcons: 12,
  },
};