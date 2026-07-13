"use client";

import React from "react";
import Link from "next/link";
import { Users, Calendar, Tag, ArrowRight } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { Campaign } from "@/types";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  const categoryLabels: Record<string, string> = {
    kuliner: "Makanan & Minuman",
    jasa: "Jasa & Layanan",
    kerajinan: "Kerajinan Tangan",
    pertanian: "Pertanian & Perkebunan",
    produksi: "Produksi & Manufaktur",
    lainnya: "Lainnya",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex flex-col h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            <Tag className="h-3 w-3" />
            {categoryLabels[campaign.category] || campaign.category}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            campaign.status === "active"
              ? "bg-blue-50 text-blue-700"
              : "bg-emerald-100 text-emerald-800"
          }`}>
            {campaign.status === "active" ? "Aktif" : "Selesai"}
          </span>
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">
          {campaign.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
          {campaign.description}
        </p>

        <div className="space-y-3 mt-auto">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
              <span>Terkumpul: {formatRupiah(campaign.currentAmount)}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-xs text-slate-400 mt-0.5">
              Target: {formatRupiah(campaign.targetAmount)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>{campaign.investorCount} Investor</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{formatDate(campaign.endDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
        <Link
          href={`/crowdfunding/${campaign.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Lihat Detail & Dukung
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
