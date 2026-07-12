"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/context/UserContext";
import { formatRupiah, formatDate, calculatePajakUmkm } from "@/lib/utils";
import { PAJAK_UMKM_INFO } from "@/lib/constants";
import { Calculator, Landmark, Info, Trash2, ArrowRight, RefreshCw } from "lucide-react";

const schema = z.object({
  periode: z.string().min(1, { message: "Periode bulan/tahun wajib diisi." }),
  omzet: z.coerce.number().min(0, { message: "Omzet tidak boleh negatif." }),
  biayaOperasional: z.coerce.number().min(0, { message: "Biaya operasional tidak boleh negatif." }),
});

type FormValues = z.infer<typeof schema>;

export default function KalkulatorPajakPage() {
  const { userData, addPajakEntry, deletePajakEntry } = useUser();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      periode: "",
      omzet: 0,
      biayaOperasional: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(() => {
      const timer = new Promise((resolve) => setTimeout(resolve, 600));
      const calcResult = calculatePajakUmkm(data.omzet, data.biayaOperasional);
      addPajakEntry({
        periode: data.periode,
        omzet: data.omzet,
        biayaOperasional: data.biayaOperasional,
        penghasilanNeto: calcResult.penghasilanNeto,
        tarifPajak: calcResult.tarifPajak,
        pajakTerutang: calcResult.pajakTerutang,
      });
      reset();
    });
  };

  const handleDelete = (id: string, periode: string) => {
    if (confirm(`Hapus riwayat pajak periode ${periode}?`)) {
      deletePajakEntry(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="main-content">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          Kalkulator Pajak UMKM
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto">
          Hitung estimasi pajak penghasilan final UMKM Anda dengan cepat berdasarkan peraturan terbaru.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4">
              Hitung Pajak Periode Baru
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="space-y-1">
                <label htmlFor="periode" className="text-xs font-semibold text-slate-700 block">
                  Periode <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <input
                  {...register("periode")}
                  id="periode"
                  type="text"
                  aria-invalid={errors.periode ? "true" : "false"}
                  aria-describedby={errors.periode ? "periode-error" : undefined}
                  className={`w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                    errors.periode ? "border-rose-500 bg-rose-50" : "border-gray-300"
                  }`}
                  placeholder="Contoh: Januari 2026 atau Tahun 2026"
                />
                {errors.periode && (
                  <span id="periode-error" className="text-xs text-rose-600 block" role="alert">
                    {errors.periode.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="omzet" className="text-xs font-semibold text-slate-700 block">
                    Omzet Kotor (Gross Revenue) <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    {...register("omzet")}
                    id="omzet"
                    type="number"
                    aria-invalid={errors.omzet ? "true" : "false"}
                    aria-describedby={errors.omzet ? "omzet-error" : undefined}
                    className={`w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                      errors.omzet ? "border-rose-500 bg-rose-50" : "border-gray-300"
                    }`}
                  />
                  {errors.omzet && (
                    <span id="omzet-error" className="text-xs text-rose-600 block" role="alert">
                      {errors.omzet.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="biayaOperasional" className="text-xs font-semibold text-slate-700 block">
                    Biaya Operasional <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    {...register("biayaOperasional")}
                    id="biayaOperasional"
                    type="number"
                    aria-invalid={errors.biayaOperasional ? "true" : "false"}
                    aria-describedby={errors.biayaOperasional ? "biayaOperasional-error" : undefined}
                    className={`w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                      errors.biayaOperasional ? "border-rose-500 bg-rose-50" : "border-gray-300"
                    }`}
                  />
                  {errors.biayaOperasional && (
                    <span id="biayaOperasional-error" className="text-xs text-rose-600 block" role="alert">
                      {errors.biayaOperasional.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 bg-emerald-600 text-white rounded-md text-sm font-semibold hover:bg-emerald-700 transition-colors duration-150 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Menghitung...</span>
                  </>
                ) : (
                  <>
                    <span>Hitung & Simpan Pajak</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            role="region"
            aria-label="Riwayat perhitungan pajak"
          >
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4">
              Riwayat Perhitungan Pajak
            </h2>

            {userData.riwayatPajak.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">
                Belum ada riwayat perhitungan pajak.
              </p>
            ) : (
              <div className="space-y-4" role="list" aria-label="Daftar riwayat pajak">
                {userData.riwayatPajak.map((pajak) => (
                  <div
                    key={pajak.id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/20 hover:shadow-md transition-shadow duration-150"
                    role="listitem"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-800">{pajak.periode}</span>
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                          Tarif {pajak.tarifPajak}%
                        </span>
                      </div>
                      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-xs text-slate-600">
                        <div>
                          <dt className="sr-only">Omzet</dt>
                          <dd>Omzet: <span className="font-semibold">{formatRupiah(pajak.omzet)}</span></dd>
                        </div>
                        <div>
                          <dt className="sr-only">Biaya Operasional</dt>
                          <dd>Biaya: <span className="font-semibold">{formatRupiah(pajak.biayaOperasional)}</span></dd>
                        </div>
                        <div>
                          <dt className="sr-only">Penghasilan Neto</dt>
                          <dd>Neto: <span className="font-semibold">{formatRupiah(pajak.penghasilanNeto)}</span></dd>
                        </div>
                        <div className="text-emerald-700 font-bold">
                          <dt className="sr-only">Pajak Terutang</dt>
                          <dd>Terutang: {formatRupiah(pajak.pajakTerutang)}</dd>
                        </div>
                      </dl>
                      <div className="text-[10px] text-slate-400">
                        Dihitung pada: {formatDate(pajak.tanggalHitung)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(pajak.id, pajak.periode)}
                      className="inline-flex items-center justify-center p-2 text-rose-600 hover:bg-rose-50 rounded-md transition-colors duration-150 sm:self-center self-start focus:outline-none focus:ring-2 focus:ring-rose-500"
                      aria-label={`Hapus riwayat pajak periode ${pajak.periode}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-4"
            role="region"
            aria-label="Ketentuan pajak PPh Final UMKM"
          >
            <div className="flex items-center space-x-2 text-emerald-800">
              <Landmark className="h-5 w-5" aria-hidden="true" />
              <h3 className="font-bold text-sm">Ketentuan Pajak PPh Final UMKM</h3>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              {PAJAK_UMKM_INFO.deskripsi}
            </p>
            <dl className="border-t border-emerald-200/60 pt-3 space-y-2 text-xs text-emerald-800">
              <div className="flex justify-between">
                <dt>Tarif:</dt>
                <dd className="font-bold">{(PAJAK_UMKM_INFO.tarif * 100).toFixed(1)}%</dd>
              </div>
              <div className="flex justify-between">
                <dt>Batas Bebas Pajak:</dt>
                <dd className="font-bold">{formatRupiah(PAJAK_UMKM_INFO.batasBebasPajak)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Maks. Omzet Tahunan:</dt>
                <dd className="font-bold">{formatRupiah(PAJAK_UMKM_INFO.batasOmzet)}</dd>
              </div>
            </dl>
          </div>

          <div
            className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-3"
            role="region"
            aria-label="Catatan penting tentang perhitungan pajak"
          >
            <div className="flex items-center space-x-2 text-amber-800">
              <Info className="h-5 w-5" aria-hidden="true" />
              <h3 className="font-bold text-sm">Catatan Penting</h3>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Penghasilan bruto (omzet) setahun s.d. Rp 500 juta tidak dikenakan pajak untuk wajib pajak orang pribadi. Perhitungan di atas menggunakan estimasi tarif dasar 0,5%.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
