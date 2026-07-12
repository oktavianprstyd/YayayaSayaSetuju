"use client";

import { useUser } from "@/context/UserContext";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

const RECOMMENDATIONS = [
  {
    id: "nib",
    title: "Daftar NIB di OSS",
    description: "NIB adalah persyaratan dasar untuk semua usaha. Daftar online di OSS RBA.",
    link: "/panduan/nib",
    priority: 1,
  },
  {
    id: "npwp",
    title: "Ajukan NPWP Badan Usaha",
    description: "Wajib untuk pelaporan pajak dan transaksi bisnis.",
    link: "/panduan/npwp",
    priority: 2,
  },
  {
    id: "sertifikatHalal",
    title: "Sertifikat Halal (untuk kuliner)",
    description: "Wajib untuk usaha makanan/minumen. Gratis untuk UMKM.",
    link: "/panduan/sertifikat-halal",
    priority: 3,
  },
  {
    id: "iumk",
    title: "Izin Usaha Mikro Kecil",
    description: "Izin usaha tingkat kelurahan/kecamatan. Proses cepat.",
    link: "/panduan/iumk",
    priority: 4,
  },
  {
    id: "tdp",
    title: "Daftar TDP",
    description: "Untuk usaha yang sudah berkembang. Opsional untuk usaha mikro.",
    link: "/panduan/tdp",
    priority: 5,
  },
];

export function RekomendasiSection() {
  const { userData } = useUser();

  const missingItems = RECOMMENDATIONS.filter(
    (item) => !userData.statusLegal[item.id as keyof typeof userData.statusLegal]
  ).sort((a, b) => a.priority - b.priority);

  const completedItems = RECOMMENDATIONS.filter(
    (item) => userData.statusLegal[item.id as keyof typeof userData.statusLegal]
  );

  if (missingItems.length === 0) {
    return (
      <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
          <h2 className="text-lg font-semibold text-emerald-800">
            Selamat! Legalitas Lengkap
          </h2>
        </div>
        <p className="text-emerald-700 mb-4">
          Semua dokumen legalitas usaha Anda sudah lengkap. Pastikan untuk memperbarui dokumen yang sudah kadaluarsa.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-emerald-700 font-medium hover:text-emerald-800"
        >
          Lihat Dashboard
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="h-6 w-6 text-amber-500" />
        <h2 className="text-lg font-semibold text-slate-800">
          Langkah Selanjutnya
        </h2>
      </div>

      <div className="space-y-4">
        {missingItems.slice(0, 3).map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              <Link
                href={item.link}
                className="inline-flex items-center mt-2 text-sm text-emerald-600 font-medium hover:text-emerald-700"
              >
                Lihat Panduan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {missingItems.length > 3 && (
        <p className="text-sm text-slate-600 mt-4">
          +{missingItems.length - 3} dokumen lagi perlu dilengkapi
        </p>
      )}

      {completedItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-slate-600 mb-2">Sudah lengkap:</p>
          <div className="flex flex-wrap gap-2">
            {completedItems.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {item.id.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
