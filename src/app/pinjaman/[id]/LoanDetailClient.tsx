"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import { mockLoans } from "@/data/mock-fase2";
import type { Loan } from "@/types";

interface LoanDetailClientProps {
  loanId: string;
}

export default function LoanDetailClient({ loanId }: LoanDetailClientProps) {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_loans");
    let currentLoans: Loan[] = [];
    if (saved) {
      currentLoans = JSON.parse(saved);
    } else {
      currentLoans = mockLoans;
      localStorage.setItem("umkm_loans", JSON.stringify(mockLoans));
    }

    const found = currentLoans.find((l) => l.id === loanId);
    setLoan(found || null);
    setLoading(false);
  }, [loanId]);

  const handlePayInstallment = (index: number) => {
    if (!loan) return;

    const updatedSchedule = loan.repaymentSchedule.map((inst, idx) => {
      if (idx === index) {
        return {
          ...inst,
          status: "paid" as const,
          paidAt: new Date().toISOString(),
        };
      }
      return inst;
    });

    const isAllPaid = updatedSchedule.every((inst) => inst.status === "paid");

    const updatedLoan: Loan = {
      ...loan,
      status: isAllPaid ? "paid" as const : loan.status,
      repaymentSchedule: updatedSchedule,
    };

    // Update in LocalStorage
    const saved = localStorage.getItem("umkm_loans");
    if (saved) {
      const loansList: Loan[] = JSON.parse(saved);
      const updatedList = loansList.map((l) => (l.id === loanId ? updatedLoan : l));
      localStorage.setItem("umkm_loans", JSON.stringify(updatedList));
    }

    setLoan(updatedLoan);
    alert("Pembayaran cicilan berhasil disimulasikan!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-slate-600">Memuat...</p>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Pinjaman tidak ditemukan</h1>
          <Link href="/pinjaman" className="text-emerald-600 hover:underline mt-4 inline-block">
            Kembali ke Pinjaman Mikro
          </Link>
        </div>
      </div>
    );
  }

  const unpaidInstallmentIndex = loan.repaymentSchedule.findIndex((i) => i.status === "unpaid");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/pinjaman"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Pinjaman Mikro
        </Link>

        {/* Loan details card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Pinjaman {formatRupiah(loan.amount)}</h1>
              <p className="text-slate-600 text-sm mt-1">Diajukan pada {formatDate(loan.createdAt)}</p>
            </div>
            <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full ${
              loan.status === "active"
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : loan.status === "paid"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}>
              {loan.status === "active" ? "Aktif" : loan.status === "paid" ? "Lunas" : "Menunggu"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tujuan Pinjaman</p>
              <p className="text-sm text-slate-700 font-medium mt-1">{loan.purpose}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cicilan Bulanan</p>
              <p className="text-sm text-slate-800 font-bold mt-1">{formatRupiah(loan.monthlyPayment)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Pengembalian (Bunga 5%)</p>
              <p className="text-sm text-emerald-700 font-bold mt-1">{formatRupiah(loan.totalRepayment)}</p>
            </div>
          </div>
        </div>

        {/* Repayment schedule */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-slate-800">Jadwal Pembayaran Cicilan</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {loan.repaymentSchedule.map((inst, index) => {
              const isNextToPay = index === unpaidInstallmentIndex;
              
              return (
                <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">{formatRupiah(inst.amount)}</p>
                      <p className="text-xs text-slate-500">Jatuh Tempo: {formatDate(inst.dueDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {inst.status === "paid" ? (
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" />
                        Lunas ({formatDate(inst.paidAt || "")})
                      </span>
                    ) : isNextToPay && loan.status === "active" ? (
                      <button
                        onClick={() => handlePayInstallment(index)}
                        className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        Simulasikan Bayar
                      </button>
                    ) : (
                      <span className="inline-flex items-center text-xs font-semibold text-slate-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-1" />
                        Belum Bayar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
