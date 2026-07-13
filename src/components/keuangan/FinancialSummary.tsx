"use client";

import React from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface FinancialSummaryProps {
  income: number;
  expense: number;
}

export function FinancialSummary({ income, expense }: FinancialSummaryProps) {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Saldo Bersih */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Saldo Bersih</p>
          <p className={`text-xl font-bold ${balance >= 0 ? "text-slate-800" : "text-rose-600"}`}>
            {formatRupiah(balance)}
          </p>
        </div>
      </div>

      {/* Pemasukan */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Pemasukan</p>
          <p className="text-xl font-bold text-blue-700">
            {formatRupiah(income)}
          </p>
        </div>
      </div>

      {/* Pengeluaran */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
          <TrendingDown className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Pengeluaran</p>
          <p className="text-xl font-bold text-rose-700">
            {formatRupiah(expense)}
          </p>
        </div>
      </div>
    </div>
  );
}
