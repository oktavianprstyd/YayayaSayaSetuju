"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Download, FileText } from "lucide-react";

interface DocumentChecklistProps {
  documents: string[];
  title?: string;
}

export function DocumentChecklist({ documents, title = "Dokumen yang Diperlukan" }: DocumentChecklistProps) {
  const [checkedDocs, setCheckedDocs] = useState<Set<number>>(new Set());

  const toggleDoc = (index: number) => {
    const newChecked = new Set(checkedDocs);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedDocs(newChecked);
  };

  const progress = documents.length > 0 ? (checkedDocs.size / documents.length) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="text-sm text-slate-600">
          {checkedDocs.size}/{documents.length} siap
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-2">
        {documents.map((doc, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => toggleDoc(index)}
            role="checkbox"
            aria-checked={checkedDocs.has(index)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDoc(index);
              }
            }}
          >
            <button
              type="button"
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
            >
              {checkedDocs.has(index) ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
            </button>
            <span className={`text-sm ${checkedDocs.has(index) ? "text-emerald-700 line-through" : "text-slate-700"}`}>
              {doc}
            </span>
          </li>
        ))}
      </ul>

      {checkedDocs.size === documents.length && documents.length > 0 && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700 font-medium">
            ✓ Semua dokumen sudah siap!
          </p>
        </div>
      )}
    </div>
  );
}
