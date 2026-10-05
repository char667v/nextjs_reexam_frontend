import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type MyInfo = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string | null;
  license_plate: string;
  membership_tier: string;
};

// Exported so the profile button can use the exact same function (version 2)
export async function fetchMyInfo(): Promise<MyInfo> {
  const token = localStorage.getItem("access_token");
  const res = await fetch("http://localhost:80/api-my-info", {
    headers: { Authorization: `Bearer ${token}` },
  });
  // "Hey backend, who am I? Here's my wristband."

  // 401 = token expired or missing, 422 = token malformed (e.g. "Bearer null")
  if (res.status === 401 || res.status === 422) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Kunne ikke hente brugeroplysninger");
  const data = await res.json();
  return data.user;
}

export function useMyInfo(enabled: boolean = true) {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["myInfo"], // same key as the button, so the page reads the button's cached answer
    queryFn: fetchMyInfo,
    staleTime: 60 * 1000, // treat the cached user data as fresh for 60 seconds
    retry: false,
    enabled,                   // false = don't fetch (for new users who aren't logged in)
  });
  // Safety net: if someone opens the page directly without a valid token, send them to login
  useEffect(() => {
    if (query.error?.message === "Unauthorized") router.push("/pages/login");
  }, [query.error, router]);

  return query;
}
