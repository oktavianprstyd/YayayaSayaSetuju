"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold text-emerald-600">404</span>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-slate-600 mb-6">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Ke Beranda
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Butuh bantuan?</strong> Cek fitur-fitur kami:
          </p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            <Link href="/cek-legalitas" className="text-xs text-emerald-600 hover:underline">
              Cek Legalitas
            </Link>
            <span className="text-emerald-400">•</span>
            <Link href="/panduan" className="text-xs text-emerald-600 hover:underline">
              Panduan
            </Link>
            <span className="text-emerald-400">•</span>
            <Link href="/kalkulator-pajak" className="text-xs text-emerald-600 hover:underline">
              Kalkulator Pajak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
