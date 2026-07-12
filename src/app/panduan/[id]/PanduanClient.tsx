"use client";

import { ArrowLeft, Clock, Coins, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
import { StepTimeline } from "@/components/panduan/StepTimeline";
import { DocumentChecklist } from "@/components/panduan/DocumentChecklist";
import * as Icons from "lucide-react";
import type { PanduanItem } from "@/types";

interface PanduanClientProps {
  panduan: PanduanItem;
}

export default function PanduanClient({ panduan }: PanduanClientProps) {
  const IconComponent = Icons[panduan.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.FileText;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/panduan"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Panduan
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center">
              <IconComponent className="h-7 w-7 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">{panduan.judul}</h1>
              <p className="text-slate-600 mt-1">{panduan.deskripsi}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="inline-flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {panduan.estimasiWaktu}
                </span>
                <span className="inline-flex items-center text-sm text-slate-600">
                  <Coins className="h-4 w-4 mr-1" />
                  {panduan.biaya}
                </span>
              </div>

              {panduan.linkResmi && (
                <a
                  href={panduan.linkResmi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Kunjungi Situs Resmi
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StepTimeline steps={panduan.steps} />
          </div>
          <div>
            <DocumentChecklist documents={panduan.dokumenDiperlukan} />
          </div>
        </div>

        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-emerald-800">
              <strong>Tips:</strong> Simpan semua dokumen dalam bentuk digital untuk kemudahan akses di masa depan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
