"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export function useGateProtection() {
  const { userData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const hasNIB = userData.statusLegal?.nib || false;
    const hasNPWP = userData.statusLegal?.npwp || false;
    const isPhase1Complete = hasNIB && hasNPWP;

    if (!isPhase1Complete) {
      alert("Akses Ditolak! Anda harus menyelesaikan berkas legalitas NIB dan NPWP di Fase 1 terlebih dahulu.");
      router.push("/cek-legalitas");
    }
  }, [userData, router]);
}
