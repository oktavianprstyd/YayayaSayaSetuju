"use client";

import React, { useState, useTransition } from "react";
import { templateSuratData } from "@/data/template-surat";
import { TemplateSurat } from "@/types";
import { useUser } from "@/context/UserContext";
import { replaceTemplate } from "@/lib/utils";
import { jsPDF } from "jspdf";
import { FileText, Download, Sparkles, RefreshCw } from "lucide-react";
import * as Icons from "lucide-react";
import { PdfPreview } from "@/components/template-surat/PdfPreview";

export default function TemplateSuratPage() {
  const { addSuratEntry } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateSurat | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [previewContent, setPreviewContent] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSelectTemplate = (template: TemplateSurat) => {
    setSelectedTemplate(template);
    const initialForm: Record<string, string> = {};
    template.fields.forEach((field) => {
      initialForm[field.key] = "";
    });
    setFormData(initialForm);
    setPreviewContent(template.content);
  };

  const handleInputChange = (key: string, value: string) => {
    const updatedForm = { ...formData, [key]: value };
    setFormData(updatedForm);
    if (selectedTemplate) {
      setPreviewContent(replaceTemplate(selectedTemplate.content, updatedForm));
    }
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleEdit = () => {
    setIsPreviewOpen(false);
  };

  const generatePDF = () => {
    if (!selectedTemplate) return;

    startTransition(() => {
      const timer = new Promise((resolve) => setTimeout(resolve, 800));

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const splitText = doc.splitTextToSize(previewContent, 170);
      let yOffset = 20;

      splitText.forEach((line: string) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        doc.text(line, 20, yOffset);
        yOffset += 7;
      });

      doc.save(`${selectedTemplate.id}-${new Date().getTime()}.pdf`);

      addSuratEntry({
        jenisSurat: selectedTemplate.nama,
        dataSurat: formData,
      });

      setIsPreviewOpen(false);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="main-content">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          Pembuat Surat Legalitas
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto">
          Pilih template surat resmi, isi datanya, dan unduh sebagai file PDF siap pakai secara gratis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Pilih Template Surat
          </h2>
          <div className="space-y-3" role="radiogroup" aria-label="Pilihan template surat">
            {templateSuratData.map((tpl) => {
              const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[tpl.icon] || FileText;
              const isSelected = selectedTemplate?.id === tpl.id;

              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start space-x-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/20 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${tpl.nama}. ${tpl.deskripsi}${isSelected ? " (dipilih)" : ""}`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}
                    aria-hidden="true"
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-800">{tpl.nama}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tpl.deskripsi}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedTemplate ? (
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-md font-bold text-slate-800 border-b border-gray-100 pb-2">
                Isi Data Surat
              </h3>
              <form className="space-y-3.5" aria-label={`Form untuk ${selectedTemplate.nama}`}>
                {selectedTemplate.fields.map((field) => {
                  const fieldId = `field-${field.key}`;
                  return (
                    <div key={field.key} className="space-y-1">
                      <label htmlFor={fieldId} className="text-xs font-semibold text-slate-700">
                        {field.label} {field.required && <span className="text-rose-500" aria-hidden="true">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={fieldId}
                          value={formData[field.key] || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full text-sm border border-gray-300 rounded-md p-2 h-16 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150"
                          aria-required={field.required}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={fieldId}
                          value={formData[field.key] || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150"
                          aria-required={field.required}
                        >
                          <option value="">-- Pilih opsi --</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={fieldId}
                          type={field.type}
                          value={formData[field.key] || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150"
                          aria-required={field.required}
                        />
                      )}
                    </div>
                  );
                })}
              </form>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="text-md font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4">
                  Pratinjau Surat
                </h3>
                <div
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-[10px] whitespace-pre-wrap leading-relaxed text-slate-700 h-[280px] overflow-y-auto"
                  aria-busy={isPending}
                  aria-label="Pratinjau isi surat"
                >
                  {previewContent}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleOpenPreview}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-colors duration-150 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>Lihat Pratinjau Penuh</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="lg:col-span-2 border border-dashed border-gray-300 rounded-2xl p-12 text-center text-slate-500 space-y-3"
            role="region"
            aria-label="Belum ada template dipilih"
          >
            <Sparkles className="h-10 w-10 mx-auto text-emerald-500/60" aria-hidden="true" />
            <h3 className="font-bold text-slate-800">Mulai Pembuatan Surat</h3>
            <p className="text-sm max-w-sm mx-auto">
              Silakan pilih salah satu template surat di panel sebelah kiri untuk mulai mengisi data.
            </p>
          </div>
        )}
      </div>

      {selectedTemplate && (
        <PdfPreview
          isOpen={isPreviewOpen}
          content={previewContent}
          fileName={`${selectedTemplate.id}-${new Date().getTime()}.pdf`}
          onClose={handleClosePreview}
          onEdit={handleEdit}
          onDownload={generatePDF}
        />
      )}
    </div>
  );
}
