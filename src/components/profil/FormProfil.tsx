"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, RefreshCw } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { JENIS_USAHA_OPTIONS, SKALA_USAHA_OPTIONS } from "@/lib/constants";

const profilSchema = z.object({
  namaUsaha: z.string().min(1, "Nama usaha wajib diisi"),
  pemilik: z.string().min(1, "Nama pemilik wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  jenisUsaha: z.string().min(1, "Pilih jenis usaha"),
  skalaUsaha: z.enum(["mikro", "kecil", "menengah"], { required_error: "Pilih skala usaha" }),
});

type ProfilFormData = z.infer<typeof profilSchema>;

export function FormProfil() {
  const { userData, updateUserData } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilFormData>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      namaUsaha: userData.namaUsaha || "",
      pemilik: userData.pemilik || "",
      alamat: userData.alamat || "",
      jenisUsaha: userData.jenisUsaha || "",
      skalaUsaha: userData.skalaUsaha || "mikro",
    },
  });

  const onSubmit = async (data: ProfilFormData) => {
    setIsSubmitting(true);
    try {
      updateUserData(data);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">Profil Usaha</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="namaUsaha" className="block text-sm font-medium text-slate-700 mb-1">
            Nama Usaha <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="namaUsaha"
            {...register("namaUsaha")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.namaUsaha ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: Warung Makan Sederhana"
          />
          {errors.namaUsaha && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.namaUsaha.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pemilik" className="block text-sm font-medium text-slate-700 mb-1">
            Nama Pemilik <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="pemilik"
            {...register("pemilik")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.pemilik ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: Budi Santoso"
          />
          {errors.pemilik && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.pemilik.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="alamat" className="block text-sm font-medium text-slate-700 mb-1">
            Alamat Usaha <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="alamat"
            {...register("alamat")}
            rows={3}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.alamat ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Alamat lengkap usaha"
          />
          {errors.alamat && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.alamat.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="jenisUsaha" className="block text-sm font-medium text-slate-700 mb-1">
            Jenis Usaha <span className="text-rose-500">*</span>
          </label>
          <select
            id="jenisUsaha"
            {...register("jenisUsaha")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.jenisUsaha ? "border-rose-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih jenis usaha</option>
            {JENIS_USAHA_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.jenisUsaha && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.jenisUsaha.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="skalaUsaha" className="block text-sm font-medium text-slate-700 mb-1">
            Skala Usaha <span className="text-rose-500">*</span>
          </label>
          <select
            id="skalaUsaha"
            {...register("skalaUsaha")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.skalaUsaha ? "border-rose-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih skala usaha</option>
            {SKALA_USAHA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.skalaUsaha && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.skalaUsaha.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Simpan Profil
            </>
          )}
        </button>

        {isSaved && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-700">✓ Profil berhasil disimpan!</p>
          </div>
        )}
      </div>
    </form>
  );
}
