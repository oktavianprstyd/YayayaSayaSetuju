"use client";

import { useUser } from "@/context/UserContext";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import Link from "next/link";

const LEGAL_ITEMS = [
  {
    id: "nib",
    name: "NIB (Nomor Induk Berusaha)",
    description: "Nomor identitas pelaku usaha yang terdaftar di OSS",
    link: "/panduan/nib",
  },
  {
    id: "npwp",
    name: "NPWP Badan Usaha",
    description: "Nomor Pokok Wajib Pajak untuk badan usaha",
    link: "/panduan/npwp",
  },
  {
    id: "sertifikatHalal",
    name: "Sertifikat Halal",
    description: "Sertifikasi untuk produk makanan/minuman halal",
    link: "/panduan/sertifikat-halal",
  },
  {
    id: "iumk",
    name: "IUMK (Izin Usaha Mikro Kecil)",
    description: "Izin usaha untuk skala mikro dan kecil",
    link: "/panduan/iumk",
  },
  {
    id: "tdp",
    name: "TDP (Tanda Daftar Perusahaan)",
    description: "Bukti pendaftaran perusahaan di daerah",
    link: "/panduan/tdp",
  },
];

export function ChecklistLegalitas() {
  const { userData, updateStatusLegal } = useUser();

  const handleToggle = (id: string) => {
    const key = id as keyof typeof userData.statusLegal;
    updateStatusLegal({ [key]: !userData.statusLegal[key] });
  };

  const completedCount = Object.values(userData.statusLegal).filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Checklist Legalitas
        </h2>
        <span className="text-sm text-slate-600">
          {completedCount} dari {LEGAL_ITEMS.length} lengkap
        </span>
      </div>

      <div className="space-y-4">
        {LEGAL_ITEMS.map((item) => {
          const isChecked = userData.statusLegal[item.id as keyof typeof userData.statusLegal];
          
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer"
              onClick={() => handleToggle(item.id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle(item.id);
                }
              }}
            >
              <button
                type="button"
                className="flex-shrink-0 mt-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
                aria-label={isChecked ? `Tandai ${item.name} sebagai belum lengkap` : `Tandai ${item.name} sebagai lengkap`}
              >
                {isChecked ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-300" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isChecked ? "text-emerald-700" : "text-slate-800"}`}>
                    {item.name}
                  </span>
                  <Link
                    href={item.link}
                    className="text-emerald-600 hover:text-emerald-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm text-slate-600 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
