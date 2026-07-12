"use client";

import { useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { SuratForm } from "@/components/surat/SuratForm";
import { replaceTemplate } from "@/lib/utils";
import type { TemplateSurat } from "@/types";

interface TemplateSuratClientProps {
  template: TemplateSurat;
}

function InlinePreview({ content }: { content: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-700 min-h-[400px]">
      {content}
    </div>
  );
}

export default function TemplateSuratClient({ template }: TemplateSuratClientProps) {
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const handlePreview = (data: Record<string, string>) => {
    const content = replaceTemplate(template.content, data);
    setPreviewContent(content);
  };

  const handleDownload = () => {
    if (!previewContent) return;
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(previewContent, 180);
      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.text(lines, 15, 20);
      doc.save(`${template.nama.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    });
  };

  const handlePrint = () => {
    if (!previewContent) return;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<pre style="font-family: monospace; white-space: pre-wrap;">${previewContent}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/template-surat"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Template
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">{template.nama}</h1>
          <p className="text-slate-600 mt-1">{template.deskripsi}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SuratForm template={template} onPreview={handlePreview} />

          {previewContent && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Preview Surat</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Printer className="h-4 w-4 mr-1" />
                    Cetak
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Unduh PDF
                  </button>
                </div>
              </div>
              <InlinePreview content={previewContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
