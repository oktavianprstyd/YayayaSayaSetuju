"use client";

import Link from "next/link";
import { ArrowRight, Clock, Coins, FileText } from "lucide-react";
import type { PanduanItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck: FileText,
  Receipt: FileText,
  Store: FileText,
  ShieldCheck: FileText,
  Building2: FileText,
};

interface PanduanCardProps {
  item: PanduanItem;
}

export function PanduanCard({ item }: PanduanCardProps) {
  const IconComponent = iconMap[item.icon] || FileText;

  return (
    <Link
      href={`/panduan/${item.id}`}
      className="block bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
          <IconComponent className="h-6 w-6 text-emerald-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            {item.judul}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {item.deskripsi}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="inline-flex items-center text-xs text-slate-600">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {item.estimasiWaktu}
            </span>
            <span className="inline-flex items-center text-xs text-slate-600">
              <Coins className="h-3.5 w-3.5 mr-1" />
              {item.biaya}
            </span>
          </div>
        </div>
        
        <ArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
}
