"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Coins, ArrowRight, HelpCircle, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockLoans } from "@/data/mock-fase2";
import { KalkulatorCicilan } from "@/components/pinjaman/KalkulatorCicilan";
import { CreditScore } from "@/components/pinjaman/CreditScore";
import { useGateProtection } from "@/lib/gate";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { Loan } from "@/types";

export default function PinjamanPage() {
  useGateProtection();
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_loans");
    if (saved) {
      setLoans(JSON.parse(saved));
    } else {
      localStorage.setItem("umkm_loans", JSON.stringify(mockLoans));
      setLoans(mockLoans);
    }
  }, []);

  const totalOutstanding = loans
    .filter((l) => l.status === "active")
    .reduce((sum, l) => sum + l.totalRepayment, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Pinjaman Mikro
            </h1>
            <p className="text-slate-600 mt-1">
              Akses pinjaman modal bunga rendah terverifikasi komunitas untuk UMKM terdaftar.
            </p>
          </div>
          
          {user?.role === "umkm" && (
            <Link
              href="/pinjaman/ajukan"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5 mr-1" />
              Ajukan Pinjaman
            </Link>
          )}
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Loans & History */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Outstanding balance card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Pinjaman Aktif</p>
                <p className="text-3xl font-black text-slate-800 mt-1">
                  {formatRupiah(totalOutstanding)}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center gap-2">
                <Coins className="h-5 w-5 text-emerald-600" />
                <span className="text-xs text-emerald-800 font-semibold leading-relaxed">
                  Bunga tetap 5% flat disubsidi komunitas desa.
                </span>
              </div>
            </div>

            {/* List of loans */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-slate-800">Daftar Pengajuan Pinjaman</h3>
              </div>
              
              {loans.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p>Belum ada pengajuan pinjaman.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {loans.map((loan) => (
                    <div key={loan.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800 text-lg">
                            {formatRupiah(loan.amount)}
                          </p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            loan.status === "active"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : loan.status === "paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}>
                            {loan.status === "active" ? "Aktif" : loan.status === "paid" ? "Lunas" : "Menunggu Persetujuan"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-1">
                          {loan.purpose}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Diajukan: {formatDate(loan.createdAt)}</span>
                          <span>•</span>
                          <span>Tenor: {loan.durationMonths} Bulan</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Link
                          href={`/pinjaman/${loan.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          Rincian Cicilan
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Simulasi & Credit Score widgets */}
          <div className="space-y-8">
            <CreditScore />
            <KalkulatorCicilan />
          </div>
        </div>
      </div>
    </div>
  );
}
