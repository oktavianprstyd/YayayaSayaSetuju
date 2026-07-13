"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export function KalkulatorCicilan() {
  const [amount, setAmount] = useState(5000000);
  const [months, setMonths] = useState(6);

  const interestRate = 0.05; // 5% total interest
  const totalRepayment = amount * (1 + interestRate);
  const monthlyPayment = Math.round(totalRepayment / months);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
        <Calculator className="h-5 w-5 text-emerald-600" />
        Kalkulator Simulasi Pinjaman
      </h3>

      <div className="space-y-4">
        {/* Jumlah pinjaman */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <label htmlFor="loanAmountRange">Jumlah Pinjaman</label>
            <span className="font-bold text-emerald-600">{formatRupiah(amount)}</span>
          </div>
          <input
            type="range"
            id="loanAmountRange"
            min={1000000}
            max={20000000}
            step={500000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Rp 1.000.000</span>
            <span>Rp 20.000.000</span>
          </div>
        </div>

        {/* Tenor / Durasi */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <label htmlFor="loanMonthsRange">Tenor Pengembalian</label>
            <span className="font-bold text-emerald-600">{months} Bulan</span>
          </div>
          <input
            type="range"
            id="loanMonthsRange"
            min={3}
            max={12}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3 Bulan</span>
            <span>12 Bulan</span>
          </div>
        </div>

        {/* Hasil Simulasi */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Bunga Ringan (Bunga Tetap)</span>
            <span className="font-bold">5% (Flat)</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Total Pengembalian</span>
            <span className="font-bold">{formatRupiah(totalRepayment)}</span>
          </div>
          <div className="border-t border-emerald-200 pt-2 flex justify-between items-center">
            <span className="text-sm font-bold text-emerald-800">Cicilan Per Bulan</span>
            <span className="text-xl font-extrabold text-emerald-700">{formatRupiah(monthlyPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
