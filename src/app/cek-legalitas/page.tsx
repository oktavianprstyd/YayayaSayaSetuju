"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/context/UserContext";
import { JENIS_USAHA_OPTIONS, LEGAL_STATUS_LABELS } from "@/lib/constants";
import { ShieldCheck, CheckSquare, Square, RefreshCw } from "lucide-react";
import { ProgressBar } from "@/components/cek-legalitas/ProgressBar";

const schema = z.object({
  namaUsaha: z.string().min(2, { message: "Nama usaha minimal 2 karakter." }),
  pemilik: z.string().min(2, { message: "Nama pemilik minimal 2 karakter." }),
  alamat: z.string().min(5, { message: "Alamat minimal 5 karakter." }),
  jenisUsaha: z.string().min(1, { message: "Pilih jenis usaha Anda." }),
  skalaUsaha: z.enum(["mikro", "kecil", "menengah"]),
});

type FormValues = z.infer<typeof schema>;

export default function CekLegalitasPage() {
  const { userData, updateUserData, updateStatusLegal } = useUser();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const toggleStatus = (key: string, currentValue: boolean) => {
    updateStatusLegal({ [key]: !currentValue });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="main-content">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Cek Legalitas Usaha Anda
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto">
          Lengkapi data profil usaha Anda untuk mengetahui dokumen perizinan apa saja yang wajib Anda miliki.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
          aria-label="Form profil usaha"
          noValidate
        >
          <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-2">
            Form Profil Usaha
          </h2>

          <div className="space-y-1">
            <label htmlFor="namaUsaha" className="text-xs font-semibold text-slate-700 block">
              Nama Usaha <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              {...register("namaUsaha")}
              id="namaUsaha"
              type="text"
              aria-invalid={errors.namaUsaha ? "true" : "false"}
              aria-describedby={errors.namaUsaha ? "namaUsaha-error" : undefined}
              className={`w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                errors.namaUsaha ? "border-rose-500 bg-rose-50" : "border-gray-300"
              }`}
              placeholder="Contoh: Toko Barokah Jaya"
            />
            {errors.namaUsaha && (
              <span id="namaUsaha-error" className="text-xs text-rose-600 block" role="alert">
                {errors.namaUsaha.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="pemilik" className="text-xs font-semibold text-slate-700 block">
              Nama Pemilik <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              {...register("pemilik")}
              id="pemilik"
              type="text"
              aria-invalid={errors.pemilik ? "true" : "false"}
              aria-describedby={errors.pemilik ? "pemilik-error" : undefined}
              className={`w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
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

          <div className="space-y-1">
            <label htmlFor="jenisUsaha" className="text-xs font-semibold text-slate-700 block">
              Jenis Usaha <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <select
              {...register("jenisUsaha")}
              id="jenisUsaha"
              aria-invalid={errors.jenisUsaha ? "true" : "false"}
              aria-describedby={errors.jenisUsaha ? "jenisUsaha-error" : undefined}
              className={`w-full text-sm border rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
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
            <label htmlFor="skalaUsaha" className="text-xs font-semibold text-slate-700 block">
              Skala Usaha
            </label>
            <select
              {...register("skalaUsaha")}
              id="skalaUsaha"
              className="w-full text-sm border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              <option value="mikro">Mikro (Omzet &lt; Rp 300 juta/tahun)</option>
              <option value="kecil">Kecil (Omzet Rp 300 juta - 2,5 M/tahun)</option>
              <option value="menengah">Menengah (Omzet &gt; Rp 2,5 M/tahun)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="alamat" className="text-xs font-semibold text-slate-700 block">
              Alamat Lengkap <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <textarea
              {...register("alamat")}
              id="alamat"
              aria-invalid={errors.alamat ? "true" : "false"}
              aria-describedby={errors.alamat ? "alamat-error" : undefined}
              className={`w-full text-sm border rounded-md p-2 h-20 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-150 ${
                errors.alamat ? "border-rose-500 bg-rose-50" : "border-gray-300"
              }`}
              placeholder="Contoh: Jl. Sudirman No. 23, RT 01/RW 04"
            />
            {errors.alamat && (
              <span id="alamat-error" className="text-xs text-rose-600 block" role="alert">
                {errors.alamat.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-emerald-600 text-white rounded-md text-sm font-semibold hover:bg-emerald-700 transition-colors duration-150 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Profil & Perbarui</span>
            )}
          </button>
        </form>

        <div className="space-y-6">
          <div
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
            role="region"
            aria-label="Status kelengkapan legalitas"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h2 className="text-lg font-bold text-slate-800">Status Kelengkapan</h2>
              <span className="text-sm font-bold text-emerald-600" aria-live="polite">
                {userData.progressLegalitas}% Lengkap
              </span>
            </div>

            <div className="flex justify-center py-4">
              <ProgressBar
                percentage={userData.progressLegalitas}
                label="Progress Legalitas"
                size="md"
              />
            </div>

            <div className="space-y-3 pt-2" role="group" aria-label="Daftar status dokumen legalitas">
              {Object.entries(LEGAL_STATUS_LABELS).map(([key, labelData]) => {
                const isChecked = !!userData.statusLegal[key as keyof typeof userData.statusLegal];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleStatus(key, isChecked)}
                    aria-pressed={isChecked}
                    aria-label={`${labelData.label}: ${isChecked ? "Sudah ada" : "Belum ada"}. Klik untuk ${isChecked ? "menandai belum ada" : "menandai sudah ada"}.`}
                    className="w-full flex items-start text-left p-3 border border-gray-100 hover:border-emerald-200 rounded-lg hover:bg-emerald-50/10 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <div className="mr-3 mt-0.5 text-emerald-600 flex-shrink-0" aria-hidden="true">
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 fill-emerald-100" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{labelData.label}</h4>
                      <p className="text-xs text-slate-500">{labelData.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 space-y-3"
            role="region"
            aria-label="Rekomendasi langkah selanjutnya"
          >
            <div className="flex items-center space-x-2 text-emerald-800">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <h3 className="font-bold text-sm">Langkah Selanjutnya</h3>
            </div>
            <ul className="text-xs text-emerald-700 space-y-2 list-disc pl-4" role="list">
              {!userData.statusLegal.nib && (
                <li>
                  Anda belum memiliki <strong>NIB</strong>. Daftar gratis via portal OSS.go.id.
                </li>
              )}
              {!userData.statusLegal.npwp && (
                <li>
                  Gunakan <strong>NPWP Badan</strong> untuk mempermudah transaksi dagang berskala besar.
                </li>
              )}
              {!userData.statusLegal.sertifikatHalal &&
                (userData.jenisUsaha?.toLowerCase().includes("makanan") ||
                  userData.jenisUsaha?.toLowerCase().includes("minuman")) && (
                  <li>
                    Karena bergerak di bidang kuliner, Anda disarankan mendaftar{" "}
                    <strong>Sertifikat Halal</strong>.
                  </li>
                )}
              {userData.progressLegalitas === 100 && (
                <li>Hebat! Usaha Anda sudah 100% legal dan siap naik kelas.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
