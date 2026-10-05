"use client";
import { useEffect, useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import ProfileGroup from "../../components/ui/ProfileGroup";
import ProfileRow from "../../components/ui/ProfileRow";
import PillButton from "../../components/ui/PillButton";
import BottomSheet from "../../components/ui/BottomSheet";
import { getMembershipTier } from "../../lib/membership";
import { useMyInfo } from "../../hooks/useMyInfo";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Profile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me, isError } = useMyInfo();   // the logged-in user, from the backend
  const [tier, setTier] = useState("Guld");
  const [confirmOpen, setConfirmOpen] = useState(false);   // is the warning sheet open?
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (me) setTier(me.membership_tier);   // the tier from the database
  }, [me]);
  
  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("authUser");
    queryClient.clear();   // forget the cached data of the user who logged out
    router.push("/");
  }

  async function handleDeleteAccount() {
    setDeleteError("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://localhost:80/api-delete-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      // "Hey backend, delete my account. Here's my wristband."
      if (!res.ok) {
        setDeleteError("Kunne ikke slette kontoen. Prøv igen.");
        return;
      }
      handleLogout();   // the account is gone: clear the token and cache, go to the start page
    } catch {
      setDeleteError("System under maintenance");
    }
  }

  return (
    <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
      <AppHeader
        title={isError ? "Kunne ikke hente profil" : (me?.user_name ?? "Henter…")}
        subtitle={me?.license_plate ?? ""}
        onClose={() => router.push("/pages/dashboard")}
      />

      <ProfileGroup>
        <ProfileRow label="Mit medlemskab" value={`${tier} enkeltvask`} labelColor="brand" href="/pages/profile/membership/client_membership" />
        <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
        <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/info" />
      </ProfileGroup>

      <div className="mt-8 flex flex-col gap-3">
        <PillButton onClick={handleLogout}>Log ud</PillButton>
        <PillButton variant="danger-outline" onClick={() => setConfirmOpen(true)}>
          Slet konto
        </PillButton>
      </div>

      {confirmOpen && (
        <BottomSheet onClose={() => setConfirmOpen(false)}>
          <div className="flex flex-col gap-4 p-6">
            <p className="text-h5 text-foreground font-bold">Slet konto?</p>
            <p className="text-body-sm text-[#8a8a86]">
              Er du sikker på, at du vil slette din konto? Din vaskehistorik slettes også, og det kan ikke fortrydes.
            </p>
            {deleteError && <p className="text-body-sm text-[#E24B4A]">{deleteError}</p>}
            <PillButton variant="danger" onClick={handleDeleteAccount}>Ja, slet min konto</PillButton>
            <PillButton variant="outline" onClick={() => setConfirmOpen(false)}>Fortryd</PillButton>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import AppHeader from "../../components/layout/AppHeader";
// import ProfileGroup from "../../components/ui/ProfileGroup";
// import ProfileRow from "../../components/ui/ProfileRow";
// import PillButton from "../../components/ui/PillButton";
// import { getMembershipTier } from "../../lib/membership";
// import { useMyInfo } from "../../hooks/useMyInfo";
// import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";

// export default function Profile() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const { data: me, isError } = useMyInfo(); // the logged-in user, from the backend
//   const [tier, setTier] = useState("Guld");

//   useEffect(() => {
//     setTier(getMembershipTier() ?? "Guld"); // TEMPORARY: the tier choice isn't synced to the account yet
//   }, []);

//   function handleLogout() {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("authUser");
//     queryClient.clear(); // forget the cached data of the user who logged out
//     router.push("/");
//   }
//   async function handleDeleteAccount() {
//     if (!window.confirm("Er du sikker på, at du vil slette din konto? Det kan ikke fortrydes.")) return;
//     // a browser pop-up asking the user to confirm; Cancel stops here

//     try {
//       const token = localStorage.getItem("access_token");
//       const res = await fetch("http://localhost:80/api-delete-account", {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // "Hey backend, delete my account. Here's my wristband."
//       if (!res.ok) {
//         alert("Kunne ikke slette kontoen. Prøv igen.");
//         return;
//       }
//       handleLogout(); // the account is gone, so clear the token and cache, and go to the start page
//     } catch {
//       alert("System under maintenance");
//     }
//   }

//   return (
//     <div className="pt-20 pr-10 pl-14 flex flex-col gap-4">
//       <AppHeader title={isError ? "Kunne ikke hente profil" : (me?.name ?? "Henter…")} subtitle={me?.license_plate ?? ""} onClose={() => router.push("/pages/dashboard")} />

//       <ProfileGroup>
//         <ProfileRow label="Mit medlemskab" value={`${tier} enkeltvask`} labelColor="brand" href="/pages/profile/membership/client_membership" />
//         <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
//         <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/info" />
//       </ProfileGroup>


//             <div className="mt-8 flex flex-col gap-3">
//         <PillButton onClick={handleLogout}>Log ud</PillButton>
//         <PillButton variant="danger-outline" onClick={handleDeleteAccount}>
//           Slet konto
//         </PillButton>
//       </div>
//     </div>
//   );
// }

// //resent
// // "use client";
// // import { useEffect, useState } from "react";
// // import AppHeader from "../../components/layout/AppHeader";
// // import ProfileGroup from "../../components/ui/ProfileGroup";
// // import ProfileRow from "../../components/ui/ProfileRow";
// // import PillButton from "../../components/ui/PillButton";
// // import { getMembershipTier } from "../../lib/membership";
// // import { useRouter } from "next/navigation";

// // export default function Profile() {
// //   const router = useRouter();
// //   const [tier, setTier] = useState("Guld");

// //   useEffect(() => {
// //     setTier(getMembershipTier() ?? "Guld");
// //   }, []);

// //   function handleLogout() {
// //     localStorage.removeItem("access_token");
// //     localStorage.removeItem("authUser");
// //     router.push("/");
// //   }

// //   return (
// //     <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
// //       <AppHeader
// //         title="Hans Hansen"
// //         subtitle="AB 12 345"
// //         onClose={() => router.push("/pages/dashboard")}
// //       />

// //       <ProfileGroup>
// //         <ProfileRow label="Mit medlemskab" value={`${tier} enkeltvask`} labelColor="brand" href="/pages/profile/membership/client_membership" />
// //         <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
// //         <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/info" />
// //       </ProfileGroup>

// //       <div className="mt-8">
// //         <PillButton onClick={handleLogout}>Log ud</PillButton>
// //       </div>
// //     </div>
// //   );
// // }

// // old
// // "use client";
// // import { useEffect, useState } from "react";
// // import AppHeader from "../../components/layout/AppHeader";
// // import ProfileGroup from "../../components/ui/ProfileGroup";
// // import ProfileRow from "../../components/ui/ProfileRow";
// // import PillButton from "../../components/ui/PillButton";
// // import { getMembershipTier } from "../../lib/membership";
// // import { useRouter } from "next/navigation";

// // export default function Profile() {
// //   const router = useRouter();
// //   const [tier, setTier] = useState("Guld");

// //   useEffect(() => {
// //     setTier(getMembershipTier() ?? "Guld");
// //   }, []);

// //   function handleLogout() {
// //     localStorage.removeItem("access_token");
// //     localStorage.removeItem("authUser");
// //     router.push("/");
// //   }

// //   return (
// //     <div className="pt-20 pr-14 pl-14 flex flex-col gap-4">
// //       <AppHeader
// //         title="Hans Hansen"
// //         subtitle="AB 12 345"
// //         onClose={() => router.push("/pages/dashboard")}
// //       />

// //       <ProfileGroup>
// //         <ProfileRow label="Mit medlemskab" value={`${tier} enkeltvask`} labelColor="brand" href="/pages/profile/membership/client_membership" />
// //         <ProfileRow label="Seneste vaskehistorik" value="Se dine seneste vaske" labelColor="brand" href="/pages/profile/history" />
// //         <ProfileRow label="Mine oplysninger" value="Opdater dine oplysninger" labelColor="brand" href="/pages/profile/info" />
// //       </ProfileGroup>

// //       <div className="mt-8">
// //         <PillButton onClick={handleLogout}>Log ud</PillButton>
// //       </div>
// //     </div>
// //   );
// // }
