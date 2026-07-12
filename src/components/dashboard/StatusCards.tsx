"use client";

import { useUser } from "@/context/UserContext";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const STATUS_ITEMS = [
  { id: "nib", name: "NIB", label: "Nomor Induk Berusaha" },
  { id: "npwp", name: "NPWP", label: "NPWP Badan Usaha" },
  { id: "sertifikatHalal", name: "Halal", label: "Sertifikat Halal" },
  { id: "iumk", name: "IUMK", label: "Izin Usaha Mikro Kecil" },
  { id: "tdp", name: "TDP", label: "Tanda Daftar Perusahaan" },
];

export function StatusCards() {
  const { userData } = useUser();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Status Legalitas</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATUS_ITEMS.map((item) => {
          const isComplete = userData.statusLegal[item.id as keyof typeof userData.statusLegal];
          
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border ${
                isComplete
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-gray-300" />
                  )}
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-600">{item.label}</p>
                  </div>
                </div>
                
                {!isComplete && (
                  <Link
                    href={`/panduan/${item.id}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
