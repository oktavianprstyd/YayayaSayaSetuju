"use client";

import React from "react";
import { Coins, Calendar, ArrowUpRight } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { Investment } from "@/types";

interface RiwayatInvestasiProps {
  investments: Investment[];
}

export function RiwayatInvestasi({ investments }: RiwayatInvestasiProps) {
  if (investments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-slate-500">
        <Coins className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p>Belum ada riwayat permodalan yang diberikan.</p>
      </div>
    );
  }

  const sortedInvestments = [...investments].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <Coins className="h-5 w-5 text-emerald-600" />
        <h3 className="font-bold text-slate-800">Riwayat Dukungan Permodalan</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {sortedInvestments.map((invest) => (
          <div key={invest.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="space-y-1">
              <p className="font-medium text-slate-800 flex items-center gap-1.5">
                {invest.campaignTitle}
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(invest.tanggal)}</span>
                <span>•</span>
                <span>Oleh: {invest.investorName}</span>
              </div>
            </div>
            
            <p className="font-bold text-emerald-600">
              +{formatRupiah(invest.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
