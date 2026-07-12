import React from "react";
import Link from "next/link";
import { fiturData } from "@/data/fitur";
import * as Icons from "lucide-react";

export function FiturGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl tracking-tight">
            Layanan Utama Kami
          </h2>
          <p className="text-lg text-slate-600">
            Akses alat bantu legalitas dan perpajakan gratis yang dirancang khusus untuk mempermudah operasional usaha Anda.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fiturData.map((fitur) => {
            // @ts-ignore
            const Icon = Icons[fitur.icon] || Icons.HelpCircle;
            return (
              <Link
                key={fitur.id}
                href={fitur.href}
                className="group flex flex-col justify-between p-6 bg-gray-50 border border-gray-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-lg ${fitur.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {fitur.judul}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {fitur.deskripsi}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  Coba Sekarang
                  <Icons.ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
