"use client";

import { Trash2, Calendar, History } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { PajakEntry } from "@/types";

interface RiwayatPajakProps {
  entries: PajakEntry[];
  onDelete: (id: string) => void;
}

export function RiwayatPajak({ entries, onDelete }: RiwayatPajakProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
        <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-slate-600">Belum ada riwayat perhitungan pajak</p>
      </div>
    );
  }

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.tanggalHitung).getTime() - new Date(a.tanggalHitung).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-800">Riwayat Perhitungan</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 font-medium text-slate-700">Tanggal</th>
              <th className="text-left py-2 px-3 font-medium text-slate-700">Periode</th>
              <th className="text-right py-2 px-3 font-medium text-slate-700">Omzet</th>
              <th className="text-right py-2 px-3 font-medium text-slate-700">Pajak</th>
              <th className="text-center py-2 px-3 font-medium text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(entry.tanggalHitung)}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    entry.periode === "bulan" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {entry.periode === "bulan" ? "Bulanan" : "Tahunan"}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-slate-700">
                  {formatRupiah(entry.omzet)}
                </td>
                <td className="py-3 px-3 text-right font-medium text-emerald-700">
                  {formatRupiah(entry.pajakTerutang)}
                </td>
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => {
                      if (confirm("Hapus riwayat ini?")) {
                        onDelete(entry.id);
                      }
                    }}
                    className="text-rose-600 hover:text-rose-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
                    aria-label="Hapus riwayat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
