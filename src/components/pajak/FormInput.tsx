"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, RefreshCw } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import type { PajakEntry } from "@/types";

const pajakSchema = z.object({
  omzet: z.number().min(0, "Omzet tidak boleh negatif"),
  biayaOperasional: z.number().min(0, "Biaya tidak boleh negatif"),
  periode: z.enum(["bulan", "tahun"], { required_error: "Pilih periode" }),
});

type PajakFormData = z.infer<typeof pajakSchema>;

interface FormInputProps {
  onSubmit: (data: PajakEntry) => void;
  isSubmitting?: boolean;
}

export function FormInput({ onSubmit, isSubmitting = false }: FormInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PajakFormData>({
    resolver: zodResolver(pajakSchema),
    defaultValues: {
      omzet: 0,
      biayaOperasional: 0,
      periode: "bulan",
    },
  });

  const onFormSubmit = (data: PajakFormData) => {
    const penghasilanNeto = data.omzet - data.biayaOperasional;
    const tarifPajak = 0.005;
    const pajakTerutang = penghasilanNeto * tarifPajak;

    const entry: PajakEntry = {
      id: Date.now().toString(),
      periode: data.periode,
      omzet: data.omzet,
      biayaOperasional: data.biayaOperasional,
      penghasilanNeto,
      tarifPajak,
      pajakTerutang,
      tanggalHitung: new Date().toISOString(),
    };

    onSubmit(entry);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-slate-800">Kalkulator Pajak UMKM</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="omzet" className="block text-sm font-medium text-slate-700 mb-1">
            Omzet / Pendapatan (Rp)
          </label>
          <input
            type="number"
            id="omzet"
            {...register("omzet", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.omzet ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: 50000000"
          />
          {errors.omzet && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.omzet.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="biayaOperasional" className="block text-sm font-medium text-slate-700 mb-1">
            Biaya Operasional (Rp)
          </label>
          <input
            type="number"
            id="biayaOperasional"
            {...register("biayaOperasional", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.biayaOperasional ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: 30000000"
          />
          {errors.biayaOperasional && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.biayaOperasional.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="periode" className="block text-sm font-medium text-slate-700 mb-1">
            Periode
          </label>
          <select
            id="periode"
            {...register("periode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="bulan">Per Bulan</option>
            <option value="tahun">Per Tahun</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Menghitung...
            </>
          ) : (
            <>
              <Calculator className="h-4 w-4 mr-2" />
              Hitung Pajak
            </>
          )}
        </button>
      </div>
    </form>
  );
}
