import { useMutation, useQueryClient } from "@tanstack/react-query";

async function rateWash({ washId, rating }: { washId: string; rating: number }) {
  const token = localStorage.getItem("access_token");
  const res = await fetch("http://localhost:80/api-rate-wash", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ wash_id: washId, rating }),
  });
  // "Hey backend, save this rating for this wash. Here's my wristband."
  if (!res.ok) throw new Error("Kunne ikke gemme bedømmelse");   // triggers the rollback
}

export function useRateWash() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rateWash,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["washHistory"] }),
    // after saving: tell TanStack the history is outdated, so it fetches the new rating next time
  });
}