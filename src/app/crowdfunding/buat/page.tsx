"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

const campaignSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  targetAmount: z.number().min(100000, "Target minimal Rp 100.000"),
  category: z.enum(["kuliner", "jasa", "kerajinan", "pertanian", "produksi", "lainnya"], {
    required_error: "Pilih kategori usaha",
  }),
  durationDays: z.number().min(7, "Durasi minimal 7 hari").max(90, "Durasi maksimal 90 hari"),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function BuatCampaignPage() {
  const { user } = useAuth();
  const { userData } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "umkm") {
      router.push("/crowdfunding");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      targetAmount: 5000000,
      category: "kuliner",
      durationDays: 30,
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + data.durationDays);

      const newCampaign = {
        id: `camp-${Date.now()}`,
        title: data.title,
        description: data.description,
        targetAmount: data.targetAmount,
        currentAmount: 0,
        category: data.category,
        creatorId: user.id,
        creatorName: userData.pemilik || user.name,
        status: "active" as const,
        endDate: endDate.toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
        investorCount: 0,
      };

      const saved = localStorage.getItem("umkm_campaigns");
      let camps = [];
      if (saved) {
        camps = JSON.parse(saved);
      }
      camps = [newCampaign, ...camps];
      localStorage.setItem("umkm_campaigns", JSON.stringify(camps));

      router.push("/crowdfunding");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/crowdfunding"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Modal Komunitas
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Ajukan Pendanaan UMKM</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                Judul Campaign <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.title ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Contoh: Pembelian Mesin Roasting Kopi Arabika"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Deskripsi & Rencana Penggunaan Dana <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={5}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.description ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Jelaskan secara detail usaha Anda dan untuk apa dana tersebut digunakan..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-slate-700 mb-1">
                  Target Pendanaan (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="targetAmount"
                  {...register("targetAmount", { valueAsNumber: true })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.targetAmount ? "border-rose-500" : "border-gray-300"
                  }`}
                  placeholder="Target jumlah dana"
                />
                {errors.targetAmount && (
                  <p className="mt-1 text-sm text-rose-600" role="alert">{errors.targetAmount.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="durationDays" className="block text-sm font-medium text-slate-700 mb-1">
                  Durasi Campaign (Hari) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="durationDays"
                  {...register("durationDays", { valueAsNumber: true })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.durationDays ? "border-rose-500" : "border-gray-300"
                  }`}
                  placeholder="Jumlah hari penawaran"
                />
                {errors.durationDays && (
                  <p className="mt-1 text-sm text-rose-600" role="alert">{errors.durationDays.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                Kategori Usaha <span className="text-rose-500">*</span>
              </label>
              <select
                id="category"
                {...register("category")}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.category ? "border-rose-500" : "border-gray-300"
                }`}
              >
                <option value="kuliner">Makanan & Minuman</option>
                <option value="jasa">Jasa & Layanan</option>
                <option value="kerajinan">Kerajinan Tangan</option>
                <option value="pertanian">Pertanian & Perkebunan</option>
                <option value="produksi">Produksi & Manufaktur</option>
                <option value="lainnya">Lainnya</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.category.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Mengajukan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Ajukan Campaign
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
