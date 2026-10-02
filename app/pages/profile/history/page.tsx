"use client";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/layout/AppHeader";
import HistoryList from "../../../components/ui/HistoryList";
import { useWashHistory } from "../../../hooks/useWashHistory";

export default function HistoryPage() {
  const router = useRouter();
  const { data: washes, isPending, isError } = useWashHistory();   // the custom hook

  return (
    <div className="pt-20 pr-14 pb-28 pl-14 flex flex-col gap-4">
      <AppHeader title="Historik" subtitle="Dine tidligere vaske" onClose={() => router.push("/pages/profile")} />

      {/* Loading: the request is still on its way */}
      {isPending && <p className="text-body-sm text-[#8a8a86]">Henter historik…</p>}

      {/* Error: the request failed (no token, expired token, server down) */}
      {isError && <p className="text-body-sm text-[#E24B4A]">Kunne ikke hente din historik. Prøv igen.</p>}

      {/* Empty: the request worked, but there are no washes yet */}
      {washes && washes.length === 0 && (
        <p className="text-body-sm text-[#8a8a86]">Du har ingen vaske endnu.</p>
      )}

      {/* Success: show the list */}
      {washes && washes.length > 0 && <HistoryList washes={washes} />}
    </div>
  );
}