"use client";

import React, { useState } from "react";
import { panduanData } from "@/data/panduan";
import { ChevronDown, ChevronUp, BookOpen, Clock, Tag, ExternalLink } from "lucide-react";
import * as Icons from "lucide-react";
import { StepTimeline } from "@/components/panduan/StepTimeline";

export default function PanduanPage() {
  const [openId, setOpenId] = useState<string | null>("nib");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8" id="main-content">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          Panduan Perizinan Usaha
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto">
          Dapatkan langkah-langkah praktis dan terperinci untuk mengurus perizinan serta legalitas UMKM Anda.
        </p>
      </div>

      <div className="space-y-4" role="list" aria-label="Daftar panduan perizinan">
        {panduanData.map((panduan) => {
          const isOpen = openId === panduan.id;
          const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[panduan.icon] || Icons.FileText;
          const accordionId = `accordion-${panduan.id}`;
          const panelId = `panel-${panduan.id}`;

          return (
            <div
              key={panduan.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-150"
              role="listitem"
            >
              <button
                onClick={() => toggleAccordion(panduan.id)}
                onKeyDown={(e) => handleKeyDown(e, panduan.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={accordionId}
                aria-label={`${panduan.judul}. ${isOpen ? "Klik untuk tutup" : "Klik untuk buka"}.`}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg" aria-hidden="true">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{panduan.judul}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{panduan.deskripsi}</p>
                  </div>
                </div>
                <div className="text-slate-400" aria-hidden="true">
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {isOpen && (
                <div
                  className="border-t border-gray-100 p-6 space-y-6 bg-gray-50/20"
                  id={panelId}
                  role="region"
                  aria-labelledby={accordionId}
                >
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                    <div className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                      <Clock className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>{panduan.estimasiWaktu}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                      <Tag className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>Biaya: {panduan.biaya}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">Langkah-langkah:</h4>
                    <StepTimeline steps={panduan.steps} currentStep={undefined} onStepChange={undefined} />
                  </div>

                  {panduan.dokumenDiperlukan && panduan.dokumenDiperlukan.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-800">Dokumen yang Diperlukan:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
                        {panduan.dokumenDiperlukan.map((doc, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-slate-600 bg-white border border-gray-150 rounded p-2"
                          >
                            <Icons.CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {panduan.linkResmi && (
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <a
                        href={panduan.linkResmi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white border border-emerald-200 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        aria-label={`Kunjungi portal resmi untuk ${panduan.judul} (buka di tab baru)`}
                      >
                        Kunjungi Portal Resmi
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
