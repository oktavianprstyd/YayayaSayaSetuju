"use client";

import React, { useEffect, useRef } from "react";
import { X, Download, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PdfPreviewProps {
  isOpen: boolean;
  content: string;
  fileName: string;
  onClose: () => void;
  onEdit: () => void;
  onDownload: () => void;
  className?: string;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({
  isOpen,
  content,
  fileName,
  onClose,
  onEdit,
  onDownload,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-preview-title"
        aria-describedby="pdf-preview-description"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 id="pdf-preview-title" className="text-lg font-bold text-slate-800">
              Pratinjau Surat
            </h2>
            <p id="pdf-preview-description" className="text-xs text-slate-500 mt-1">
              Periksa isi surat sebelum mengunduh PDF
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Tutup pratinjau"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-700 min-h-[400px]">
            {content}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <Edit3 className="h-4 w-4 mr-2" aria-hidden="true" />
            Edit
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Unduh PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
