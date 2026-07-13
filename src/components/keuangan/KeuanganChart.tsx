"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { formatRupiah } from "@/lib/utils";
import type { FinancialEntry } from "@/types";

interface KeuanganChartProps {
  entries: FinancialEntry[];
}

export function KeuanganChart({ entries }: KeuanganChartProps) {
  // Aggregate data by date
  const dateMap: Record<string, { date: string; Pemasukan: number; Pengeluaran: number }> = {};

  // Get last 7 days or sort entries by date
  const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sorted.forEach((entry) => {
    const formattedDate = new Date(entry.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });

    if (!dateMap[formattedDate]) {
      dateMap[formattedDate] = {
        date: formattedDate,
        Pemasukan: 0,
        Pengeluaran: 0,
      };
    }

    if (entry.type === "income") {
      dateMap[formattedDate].Pemasukan += entry.amount;
    } else {
      dateMap[formattedDate].Pengeluaran += entry.amount;
    }
  });

  const chartData = Object.values(dateMap).slice(-7); // Show last 7 days of active records

  if (chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center justify-center h-[300px] text-slate-500">
        Tambah transaksi untuk melihat grafik keuangan
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4">Grafik Keuangan Harian</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `Rp ${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [formatRupiah(value as number), ""]}
              contentStyle={{ background: "#FFF", border: "1px solid #E2E8F0", borderRadius: "8px" }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
            <Bar dataKey="Pemasukan" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Pengeluaran" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
