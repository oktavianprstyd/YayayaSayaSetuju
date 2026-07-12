"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, ChevronRight } from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUser();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Langsung ke konten utama
      </a>

      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
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
              <div className="hidden md:flex space-x-6 ml-10">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        isActive
                          ? "border-emerald-600 text-emerald-600"
                          : "border-transparent text-slate-600 hover:text-emerald-600 hover:border-gray-300"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
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
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:bg-gray-50 hover:text-emerald-600"
                    }`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 border-t border-gray-200 mt-2 px-3 flex flex-col space-y-2">
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
