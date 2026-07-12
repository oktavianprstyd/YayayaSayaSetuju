"use client";

import { ArrowRight, FileText } from "lucide-react";
import type { TemplateSurat } from "@/types";

interface TemplateCardProps {
  template: TemplateSurat;
  onSelect: () => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-emerald-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            {template.nama}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {template.deskripsi}
          </p>
        </div>
        
        <ArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
      </div>
    </button>
  );
}
