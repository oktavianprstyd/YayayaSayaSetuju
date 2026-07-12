import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-gray-50 to-gray-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Fase 1: Uji Coba Legalitas UMKM</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-none">
              Urus Legalitas & Pajak <br />
              <span className="text-emerald-600 block mt-2">UMKM Jadi Mudah.</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl">
              Bantu UMKM pemula memahami perizinan, mengurus NIB, NPWP, menghitung pajak tahunan, dan men-generate surat resmi secara mandiri dan gratis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cek-legalitas"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-sm"
              >
                Mulai Cek Legalitas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/panduan"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Pelajari Panduan
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">100% Gratis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">Mobile Responsive</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-100 opacity-30 blur-2xl pointer-events-none" />
            <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800">Status Legalitas Usaha</h3>
                  <p className="text-xs text-gray-500">Monitoring Kelengkapan Berkas</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  Perlu Dilengkapi
                </span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "NIB (Nomor Induk Berusaha)", status: true },
                  { name: "NPWP Badan Usaha", status: false },
                  { name: "Sertifikat Halal", status: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{item.name}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.status
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {item.status ? "Aktif" : "Belum Ada"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Progress Legalitas</span>
                  <span>33%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
