import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-emerald-600 py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-700 via-emerald-600 to-emerald-600 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 text-center sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight leading-tight">
          Sudah Siap Melegalkan Usaha Anda?
        </h2>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Jangan tunda lagi pertumbuhan bisnis Anda. Dapatkan izin usaha resmi sekarang untuk mengakses pemodalan, kemitraan, dan pasar yang lebih luas.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/cek-legalitas"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-emerald-700 bg-white rounded-md hover:bg-emerald-50 transition-colors shadow-md"
          >
            Cek Status Usaha Anda
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="https://github.com/anomalyco/opencode/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border border-emerald-400 rounded-md hover:bg-emerald-500 transition-colors"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Laporkan Masalah / Feedback
          </a>
        </div>
      </div>
    </section>
  );
}
