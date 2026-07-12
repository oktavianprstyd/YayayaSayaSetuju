"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, RefreshCw, Eye } from "lucide-react";
import type { TemplateSurat } from "@/types";

interface SuratFormProps {
  template: TemplateSurat;
  onPreview: (data: Record<string, string>) => void;
}

export function SuratForm({ template, onPreview }: SuratFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schemaFields: Record<string, z.ZodTypeAny> = {};
  template.fields.forEach((field) => {
    if (field.required) {
      schemaFields[field.key] = z.string().min(1, `${field.label} wajib diisi`);
    } else {
      schemaFields[field.key] = z.string().optional();
    }
  });

  const schema = z.object(schemaFields);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      onPreview(data as Record<string, string>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-slate-800">Isi Data Surat</h2>
      </div>

      <div className="space-y-4">
        {template.fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key} className="block text-sm font-medium text-slate-700 mb-1">
              {field.label} {field.required && <span className="text-rose-500">*</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                id={field.key}
                {...register(field.key)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors[field.key] ? "border-rose-500" : "border-gray-300"
                }`}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                id={field.key}
                {...register(field.key)}
                placeholder={field.placeholder}
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors[field.key] ? "border-rose-500" : "border-gray-300"
                }`}
              />
            )}

            {field.type === "date" && (
              <input
                type="date"
                id={field.key}
                {...register(field.key)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors[field.key] ? "border-rose-500" : "border-gray-300"
                }`}
              />
            )}

            {field.type === "select" && field.options && (
              <select
                id={field.key}
                {...register(field.key)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors[field.key] ? "border-rose-500" : "border-gray-300"
                }`}
              >
                <option value="">Pilih {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {errors[field.key] && (
              <p className="mt-1 text-sm text-rose-600" role="alert">
                {errors[field.key]?.message as string}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Lihat Preview
            </>
          )}
        </button>
      </div>
    </form>
  );
}
