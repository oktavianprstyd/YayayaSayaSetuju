"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/context/UserContext";
import { JENIS_USAHA_OPTIONS } from "@/lib/constants";
import { User, Building, MapPin, Briefcase, RefreshCw, AlertCircle } from "lucide-react";

const schema = z.object({
  namaUsaha: z.string().min(2, { message: "Nama usaha minimal 2 karakter." }),
  pemilik: z.string().min(2, { message: "Nama pemilik minimal 2 karakter." }),
  alamat: z.string().min(5, { message: "Alamat minimal 5 karakter." }),
  jenisUsaha: z.string().min(1, { message: "Pilih jenis usaha Anda." }),
  skalaUsaha: z.enum(["mikro", "kecil", "menengah"]),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilPage() {
  const { userData, updateUserData } = useUser();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      namaUsaha: userData.namaUsaha || "",
      pemilik: userData.pemilik || "",
      alamat: userData.alamat || "",
      jenisUsaha: userData.jenisUsaha || "",
      skalaUsaha: userData.skalaUsaha || "mikro",
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(() => {
      const timer = new Promise((resolve) => setTimeout(resolve, 800));
      updateUserData(data);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8" id="main-content">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <User className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          Profil Usaha Anda
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Kelola informasi dasar UMKM Anda di sini. Data ini akan otomatis digunakan pada Pembuat Surat dan Kalkulator Pajak.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <label htmlFor="namaUsaha" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                Nama Usaha <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                {...register("namaUsaha")}
                id="namaUsaha"
                type="text"
                aria-invalid={errors.namaUsaha ? "true" : "false"}
                aria-describedby={errors.namaUsaha ? "namaUsaha-error" : undefined}
                aria-required="true"
                className={`w-full text-sm border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                  errors.namaUsaha ? "border-rose-500 bg-rose-50" : "border-gray-300"
                }`}
                placeholder="Contoh: Toko Makmur Abadi"
              />
              {errors.namaUsaha && (
                <span id="namaUsaha-error" className="text-xs text-rose-600 block" role="alert">
                  {errors.namaUsaha.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="pemilik" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                Nama Pemilik Usaha <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                {...register("pemilik")}
                id="pemilik"
                type="text"
                aria-invalid={errors.pemilik ? "true" : "false"}
                aria-describedby={errors.pemilik ? "pemilik-error" : undefined}
                aria-required="true"
                className={`w-full text-sm border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                  errors.pemilik ? "border-rose-500 bg-rose-50" : "border-gray-300"
                }`}
                placeholder="Contoh: Budi Santoso"
              />
              {errors.pemilik && (
                <span id="pemilik-error" className="text-xs text-rose-600 block" role="alert">
                  {errors.pemilik.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="jenisUsaha" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  Jenis Usaha <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <select
                  {...register("jenisUsaha")}
                  id="jenisUsaha"
                  aria-invalid={errors.jenisUsaha ? "true" : "false"}
                  aria-describedby={errors.jenisUsaha ? "jenisUsaha-error" : undefined}
                  aria-required="true"
                  className={`w-full text-sm border rounded-md p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                    errors.jenisUsaha ? "border-rose-500 bg-rose-50" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Pilih Jenis Usaha --</option>
                  {JENIS_USAHA_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.jenisUsaha && (
                  <span id="jenisUsaha-error" className="text-xs text-rose-600 block" role="alert">
                    {errors.jenisUsaha.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="skalaUsaha" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  Skala Usaha
                </label>
                <select
                  {...register("skalaUsaha")}
                  id="skalaUsaha"
                  className="w-full text-sm border border-gray-300 rounded-md p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150"
                >
                  <option value="mikro">Mikro (Omzet &lt; Rp 300 juta/tahun)</option>
                  <option value="kecil">Kecil (Omzet Rp 300 jt - 2,5 M/tahun)</option>
                  <option value="menengah">Menengah (Omzet &gt; Rp 2,5 M/tahun)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="alamat" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                Alamat Lengkap Usaha <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <textarea
                {...register("alamat")}
                id="alamat"
                aria-invalid={errors.alamat ? "true" : "false"}
                aria-describedby={errors.alamat ? "alamat-error" : undefined}
                aria-required="true"
                className={`w-full text-sm border rounded-md p-2.5 h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                  errors.alamat ? "border-rose-500 bg-rose-50" : "border-gray-300"
                }`}
                placeholder="Contoh: Jl. Diponegoro No. 10, RT 02/RW 03, Kelurahan Menteng, Jakarta Pusat"
              />
              {errors.alamat && (
                <span id="alamat-error" className="text-xs text-rose-600 block" role="alert">
                  {errors.alamat.message}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              Semua perubahan disimpan ke penyimpanan lokal browser (LocalStorage).
            </span>

            <button
              type="submit"
              disabled={isPending || !isDirty}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan Perubahan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
