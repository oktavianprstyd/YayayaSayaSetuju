"use client";

import { TrendingUp, Receipt, Wallet } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface HasilKalkulasiProps {
  penghasilanNeto: number;
  pajakTerutang: number;
  periode: string;
}

export function HasilKalkulasi({ penghasilanNeto, pajakTerutang, periode }: HasilKalkulasiProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Hasil Kalkulasi</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600">Penghasilan Neto</p>
            <p className="text-xl font-bold text-blue-800">{formatRupiah(penghasilanNeto)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-600">Tarif Pajak UMKM</p>
            <p className="text-xl font-bold text-amber-800">0,5%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-600">Pajak Terutang ({periode === "bulan" ? "Bulanan" : "Tahunan"})</p>
            <p className="text-2xl font-bold text-emerald-800">{formatRupiah(pajakTerutang)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-slate-600">
          <strong>Catatan:</strong> Pajak UMKM dikenakan tarif 0,5% dari penghasilan bruto (omzet) per tahun 
          untuk usaha dengan omzet di bawah Rp 4,8 miliar per tahun.
        </p>
      </div>
    </div>
  );
}
