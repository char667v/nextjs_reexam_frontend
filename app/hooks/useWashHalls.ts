import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/app/lib/api";

// The shape of one wash hall, exactly as the backend sends it
export type WashHall = {
  hall_id: string;
  name: string;
  address: string;
};

async function fetchWashHalls(): Promise<WashHall[]> {
  const res = await fetch(`${BASE_URL}/api-wash-halls`);
  // "Hey backend, give me all the wash halls"
  if (!res.ok) throw new Error("Kunne ikke hente vaskehaller");
  const data = await res.json();
  return data.wash_halls;
}

export function useWashHalls() {
  return useQuery({
    queryKey: ["washHalls"],
    queryFn: fetchWashHalls,
  });
}
