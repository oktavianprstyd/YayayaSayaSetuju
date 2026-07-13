"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Shield, ChevronRight, Lock, Key, LogOut } from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUser();
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const hasNIB = userData.statusLegal?.nib || false;
  const hasNPWP = userData.statusLegal?.npwp || false;
  const isPhase1Complete = hasNIB && hasNPWP;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPhase2?: boolean) => {
    if (isPhase2 && !isPhase1Complete) {
      e.preventDefault();
      alert("Fitur Terkunci! Lengkapi NIB dan NPWP terlebih dahulu untuk membuka fitur Fase 2.");
      router.push("/cek-legalitas");
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Langsung ke konten utama
      </a>

      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md"
              >
                <Shield className="h-6 w-6 text-emerald-600 animate-pulse" aria-hidden="true" />
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                  {APP_NAME}
                </span>
              </Link>
              <div className="hidden lg:flex space-x-4 ml-8">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  // @ts-ignore
                  const isF2 = link.phase === 2;
                  const isLocked = isF2 && !isPhase1Complete;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href, isF2)}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        isActive
                          ? "border-emerald-600 text-emerald-600"
                          : "border-transparent text-slate-600 hover:text-emerald-600 hover:border-gray-300"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="flex items-center gap-1">
                        {link.label}
                        {isLocked && <Lock className="h-3 w-3 text-slate-400" />}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Role switcher for testing */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
                {!user ? (
                  <>
                    <button
                      onClick={() => login("umkm")}
                      className="text-xs font-semibold px-2 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                    >
                      Masuk (UMKM)
                    </button>
                    <button
                      onClick={() => login("investor")}
                      className="text-xs font-semibold px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Masuk (Investor)
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-slate-700">
                      {user.role === "umkm" ? "🏪 UMKM" : "💼 Investor"}
                    </span>
                    <button
                      onClick={logout}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      title="Keluar"
                    >
                      <LogOut className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/profil"
                className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md"
              >
                {userData?.pemilik ? `Halo, ${userData.pemilik}` : "Lengkapi Profil"}
              </Link>
              <Link
                href="/cek-legalitas"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
              >
                Cek Legalitas
                <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-150"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              >
                {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-200" id="mobile-menu" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                // @ts-ignore
                const isF2 = link.phase === 2;
                const isLocked = isF2 && !isPhase1Complete;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, isF2)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:bg-gray-50 hover:text-emerald-600"
                    }`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      {isLocked && <Lock className="h-4 w-4 text-slate-400" />}
                    </span>
                  </Link>
                );
              })}
              
              <div className="pt-4 pb-2 border-t border-gray-200 mt-2 px-3 flex flex-col space-y-2">
                {/* Role Switcher in Mobile Menu */}
                <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50 mb-2">
                  {!user ? (
                    <>
                      <button
                        onClick={() => { login("umkm"); setIsOpen(false); }}
                        className="text-xs font-semibold w-full py-1.5 bg-emerald-600 text-white rounded text-center"
                      >
                        Masuk (UMKM)
                      </button>
                      <button
                        onClick={() => { login("investor"); setIsOpen(false); }}
                        className="text-xs font-semibold w-full py-1.5 bg-blue-600 text-white rounded text-center"
                      >
                        Masuk (Investor)
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-semibold text-slate-700">
                        {user.role === "umkm" ? "🏪 Mode: UMKM" : "💼 Mode: Investor"}
                      </span>
                      <button
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="text-rose-600 font-bold"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <Link
                  href="/profil"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md"
                  role="menuitem"
                >
                  {userData?.pemilik ? `Halo, ${userData.pemilik}` : "Lengkapi Profil"}
                </Link>
                <Link
                  href="/cek-legalitas"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
                  role="menuitem"
                >
                  Cek Legalitas
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
