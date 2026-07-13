"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserAuth } from "@/types";

interface AuthContextType {
  user: UserAuth | null;
  login: (role: "umkm" | "investor") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuth | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("umkm_auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: "umkm" | "investor") => {
    const mockUser: UserAuth = {
      id: role === "umkm" ? "usr-umkm-01" : "usr-inv-01",
      email: role === "umkm" ? "pemilik.usaha@email.com" : "investor.lokal@email.com",
      name: role === "umkm" ? "Budi Santoso (UMKM)" : "Hendra Wijaya (Investor)",
      role: role,
    };
    setUser(mockUser);
    localStorage.setItem("umkm_auth_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("umkm_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
