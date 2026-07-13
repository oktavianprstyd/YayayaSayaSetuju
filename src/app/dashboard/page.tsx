"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { formatRupiah, formatDate } from "@/lib/utils";
import {
  TrendingUp,
  FileCheck,
  Building,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressBar } from "@/components/cek-legalitas/ProgressBar";

export default function DashboardPage() {
  const { userData } = useUser();

  const totalOmzet = userData.riwayatPajak.reduce((acc, curr) => acc + curr.omzet, 0);
  const totalPajak = userData.riwayatPajak.reduce((acc, curr) => acc + curr.pajakTerutang, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8" id="main-content">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Dashboard UMKM
          </h1>
          <p className="text-slate-600">
            {userData.namaUsaha ? `Selamat datang di panel usaha ${userData.namaUsaha}` : "Lengkapi profil usaha Anda untuk melihat rangkuman."}
          </p>
        </div>
        <Link
          href="/profil"
          className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors duration-150 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Kelola Profil Usaha
          <ChevronRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Progress Legalitas"
          value={`${userData.progressLegalitas}%`}
          color="emerald"
        />

        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Total Surat Dibuat"
          value={userData.suratDibuat.length}
          color="blue"
        />

        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Omzet Terakumulasi"
          value={formatRupiah(totalOmzet)}
          color="emerald"
        />

        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Pajak Terutang"
          value={formatRupiah(totalPajak)}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
          role="region"
          aria-label="Detail identitas usaha"
        >
          <h3 className="text-md font-bold text-slate-800 border-b border-gray-100 pb-2 flex items-center space-x-2">
            <Building className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span>Detail Identitas Usaha</span>
          </h3>

          <dl className="space-y-4 text-xs">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <dt className="text-slate-500 font-medium">Nama Usaha</dt>
              <dd className="font-bold text-slate-800">{userData.namaUsaha || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <dt className="text-slate-500 font-medium">Pemilik</dt>
              <dd className="font-bold text-slate-800">{userData.pemilik || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <dt className="text-slate-500 font-medium">Jenis Usaha</dt>
              <dd className="font-bold text-slate-800">{userData.jenisUsaha || "-"}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <dt className="text-slate-500 font-medium">Skala Usaha</dt>
              <dd className="font-bold text-slate-800 capitalize">{userData.skalaUsaha || "-"}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-slate-500 font-medium">Alamat</dt>
              <dd className="text-slate-700 bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed">
                {userData.alamat || "-"}
              </dd>
            </div>
          </dl>

          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <ProgressBar
              percentage={userData.progressLegalitas}
              label="Progress Legalitas"
              size="sm"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Fase 2 Panel */}
          <div
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            role="region"
            aria-label="Fitur permodalan dan keuangan"
          >
            <h3 className="text-md font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4 flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <span>Akses Keuangan & Komunitas (Fase 2)</span>
            </h3>

            {!(userData.statusLegal?.nib && userData.statusLegal?.npwp) ? (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-xs leading-relaxed space-y-2">
                <p className="font-bold flex items-center gap-1">
                  <span>🔒 Fitur Finansial Terkunci</span>
                </p>
                <p>
                  Selesaikan berkas **NIB** dan **NPWP** Anda di checklist legalitas untuk membuka akses ke fitur Modal Komunitas, Pencatatan Keuangan Usaha, Pinjaman Mikro, dan Arisan Digital.
                </p>
                <Link
                  href="/cek-legalitas"
                  className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Lengkapi Sekarang
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs">
                  <p className="font-bold">✓ Fitur Finansial Terbuka!</p>
                  <p className="mt-1">Anda sekarang dapat mengelola keuangan, mengajukan pinjaman, dan berpartisipasi dalam arisan komunitas.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <Link
                    href="/keuangan"
                    className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-xs font-bold text-slate-700"
                  >
                    📊 Catat Keuangan
                  </Link>
                  <Link
                    href="/crowdfunding"
                    className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-xs font-bold text-slate-700"
                  >
                    🤝 Modal Komunitas
                  </Link>
                  <Link
                    href="/pinjaman"
                    className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-xs font-bold text-slate-700"
                  >
                    💰 Pinjaman Mikro
                  </Link>
                  <Link
                    href="/komunitas"
                    className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-xs font-bold text-slate-700"
                  >
                    🎲 Arisan Digital
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            role="region"
            aria-label="Dokumen dan surat terbaru yang dibuat"
          >
            <h3 className="text-md font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <span>Dokumen / Surat Terbaru yang Dibuat</span>
            </h3>

            {userData.suratDibuat.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                Belum ada dokumen yang dihasilkan.
              </p>
            ) : (
              <ul className="space-y-3" role="list" aria-label="Daftar dokumen terbaru">
                {userData.suratDibuat.slice(0, 3).map((surat) => (
                  <li
                    key={surat.id}
                    className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{surat.jenisSurat}</h4>
                      <p className="text-[10px] text-slate-500">
                        Dibuat pada: {formatDate(surat.tanggalDibuat)}
                      </p>
                    </div>
                    <FileCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
