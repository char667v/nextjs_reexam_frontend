import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/app/lib/api";

// The shape of one wash, exactly as the backend sends it
export type Wash = {
  wash_id: string;
  hall_name: string;
  tier: string;
  washed_at: string;
  rating: number | null;
};

// The fetch: gets the washes from the backend, with the token
async function fetchWashHistory(): Promise<Wash[]> {
  const token = localStorage.getItem("access_token"); // the token saved at login
  const res = await fetch(`${BASE_URL}/api-my-wash-history`, {
    headers: { Authorization: `Bearer ${token}` }, // JWT in the Authorization header
  });
  // "Hey backend, give me my wash history. Here's my wristband."

  if (!res.ok) throw new Error("Kunne ikke hente vaskehistorik"); // tells TanStack: show the error state
  const data = await res.json();
  return data.washes;
}

// The custom hook: wraps the fetch in TanStack Query
export function useWashHistory() {
  return useQuery({
    queryKey: ["washHistory"], // the name TanStack stores this data under
    queryFn: fetchWashHistory, // how to get the data
  });
}
