"use client";

import React from "react";
import { Trash2, Calendar, Tag } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { FinancialEntry } from "@/types";

interface TransactionTableProps {
  entries: FinancialEntry[];
  onDelete: (id: string) => void;
}

export function TransactionTable({ entries, onDelete }: TransactionTableProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-slate-500">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p>Belum ada catatan transaksi masuk/keluar.</p>
      </div>
    );
  }

  const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-slate-800">Daftar Transaksi</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-slate-600 bg-gray-50/50">
              <th className="py-3 px-4 font-semibold">Tanggal</th>
              <th className="py-3 px-4 font-semibold">Keterangan</th>
              <th className="py-3 px-4 font-semibold">Kategori</th>
              <th className="py-3 px-4 font-semibold text-right">Jumlah</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">
                  {item.description}
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.category}</span>
                  </div>
                </td>
                <td className={`py-3.5 px-4 text-right font-bold ${
                  item.type === "income" ? "text-blue-600" : "text-rose-600"
                }`}>
                  {item.type === "income" ? "+" : "-"}{formatRupiah(item.amount)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => {
                      if (confirm("Hapus catatan transaksi ini?")) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                    aria-label="Hapus transaksi"
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
