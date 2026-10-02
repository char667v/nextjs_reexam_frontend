import { useQuery } from "@tanstack/react-query";

export type MyInfo = {
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  license_plate: string;
  membership_tier: string;
};

async function fetchMyInfo(): Promise<MyInfo> {
  const token = localStorage.getItem("access_token");
  const res = await fetch("http://localhost:80/api-my-info", {
    headers: { Authorization: `Bearer ${token}` },
  });
  // "Hey backend, who am I? Here's my wristband."
  if (!res.ok) throw new Error("Kunne ikke hente brugeroplysninger");
  const data = await res.json();
  return data.user;
}

export function useMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });
}