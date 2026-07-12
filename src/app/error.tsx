"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-6">
          <AlertTriangle className="h-8 w-8 text-rose-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Terjadi Kesalahan
        </h1>
        
        <p className="text-slate-600 mb-6">
          Maaf, terjadi kesalahan pada aplikasi. Silakan coba lagi atau kembali ke halaman utama.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Coba Lagi
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
