"use client";

import React, { createContext, useContext, useCallback } from "react";
import { UserData, StatusLegal, PajakEntry, SuratEntry } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId, calculateProgressLegalitas } from "@/lib/utils";

const defaultUserData: UserData = {
  id: "",
  namaUsaha: "",
  pemilik: "",
  alamat: "",
  jenisUsaha: "",
  skalaUsaha: "mikro",
  statusLegal: {
    nib: false,
    npwp: false,
    sertifikatHalal: false,
    iumk: false,
    tdp: false,
  },
  progressLegalitas: 0,
  riwayatPajak: [],
  suratDibuat: [],
  createdAt: "",
  updatedAt: "",
};

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  updateStatusLegal: (status: Partial<StatusLegal>) => void;
  addPajakEntry: (entry: Omit<PajakEntry, "id" | "tanggalHitung">) => void;
  addSuratEntry: (entry: Omit<SuratEntry, "id" | "tanggalDibuat">) => void;
  deletePajakEntry: (id: string) => void;
  isInitialized: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useLocalStorage<UserData>("umkm_data", defaultUserData);

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserData((prev) => {
      const newData = { 
        ...prev, 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      // Recalculate progress if statusLegal changed
      if (data.statusLegal) {
        newData.progressLegalitas = calculateProgressLegalitas(newData.statusLegal);
      }
      return newData;
    });
  }, [setUserData]);

  const updateStatusLegal = useCallback((status: Partial<StatusLegal>) => {
    setUserData((prev) => {
      const newStatus = { ...prev.statusLegal, ...status };
      return {
        ...prev,
        statusLegal: newStatus,
        progressLegalitas: calculateProgressLegalitas(newStatus),
        updatedAt: new Date().toISOString(),
      };
    });
  }, [setUserData]);

  const addPajakEntry = useCallback((entry: Omit<PajakEntry, "id" | "tanggalHitung">) => {
    const newEntry: PajakEntry = {
      ...entry,
      id: generateId(),
      tanggalHitung: new Date().toISOString(),
    };
    setUserData((prev) => ({
      ...prev,
      riwayatPajak: [newEntry, ...prev.riwayatPajak],
      updatedAt: new Date().toISOString(),
    }));
  }, [setUserData]);

  const addSuratEntry = useCallback((entry: Omit<SuratEntry, "id" | "tanggalDibuat">) => {
    const newEntry: SuratEntry = {
      ...entry,
      id: generateId(),
      tanggalDibuat: new Date().toISOString(),
    };
    setUserData((prev) => ({
      ...prev,
      suratDibuat: [newEntry, ...prev.suratDibuat],
      updatedAt: new Date().toISOString(),
    }));
  }, [setUserData]);

  const deletePajakEntry = useCallback((id: string) => {
    setUserData((prev) => ({
      ...prev,
      riwayatPajak: prev.riwayatPajak.filter((p) => p.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, [setUserData]);

  // Initialize user data if empty
  React.useEffect(() => {
    if (!userData.id) {
      setUserData({
        ...defaultUserData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        updateUserData,
        updateStatusLegal,
        addPajakEntry,
        addSuratEntry,
        deletePajakEntry,
        isInitialized: true,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
