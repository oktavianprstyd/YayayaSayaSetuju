"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Coins, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatRupiah } from "@/lib/utils";

const investSchema = z.object({
  amount: z.number().min(10000, "Minimal investasi adalah Rp 10.000"),
});

type InvestFormData = z.infer<typeof investSchema>;

interface InvestFormProps {
  campaignId: string;
  campaignTitle: string;
  onSuccess: (amount: number) => void;
}

export function InvestForm({ campaignId, campaignTitle, onSuccess }: InvestFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvestFormData>({
    resolver: zodResolver(investSchema),
    defaultValues: {
      amount: 100000,
    },
  });

  const onSubmit = async (data: InvestFormData) => {
    if (!user) {
      setErrorMsg("Anda harus masuk (sebagai Investor) terlebih dahulu.");
      return;
    }
    if (user.role !== "investor") {
      setErrorMsg("Hanya pengguna dengan peran Investor yang dapat mendukung permodalan.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Mock API latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSuccess(data.amount);
      reset();
    } catch (err) {
      setErrorMsg("Terjadi kesalahan saat memproses investasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
        <Coins className="h-5 w-5 text-emerald-600" />
        Dukung Permodalan
      </h3>

      {errorMsg && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
            Jumlah Investasi (Rp)
          </label>
          <input
            type="number"
            id="amount"
            {...register("amount", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.amount ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Min Rp 10.000"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-rose-600" role="alert">
              {errors.amount.message}
            </p>
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
              Memproses Dukungan...
            </>
          ) : (
            "Kirim Permodalan"
          )}
        </button>
      </div>
    </form>
  );
}
