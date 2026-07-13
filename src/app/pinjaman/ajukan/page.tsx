"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const loanSchema = z.object({
  amount: z.number().min(1000000, "Minimal pinjaman adalah Rp 1.000.000").max(20000000, "Maksimal pinjaman adalah Rp 20.000.000"),
  durationMonths: z.number().min(3, "Tenor minimal 3 bulan").max(12, "Tenor maksimal 12 bulan"),
  purpose: z.string().min(15, "Tulis tujuan penggunaan dana minimal 15 karakter"),
});

type LoanFormData = z.infer<typeof loanSchema>;

export default function AjukanPinjamanPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "umkm") {
      router.push("/pinjaman");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      amount: 5000000,
      durationMonths: 6,
      purpose: "",
    },
  });

  const onSubmit = async (data: LoanFormData) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const interestRate = 0.05;
      const totalRepayment = data.amount * (1 + interestRate);
      const monthlyPayment = Math.round(totalRepayment / data.durationMonths);

      const repaymentSchedule = Array.from({ length: data.durationMonths }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() + i + 1);
        return {
          dueDate: date.toISOString().split("T")[0],
          amount: monthlyPayment,
          status: "unpaid" as const,
        };
      });

      const newLoan = {
        id: `loan-${Date.now()}`,
        amount: data.amount,
        interestRate,
        durationMonths: data.durationMonths,
        monthlyPayment,
        totalRepayment,
        purpose: data.purpose,
        status: "active" as const, // Approved automatically in mock
        createdAt: new Date().toISOString().split("T")[0],
        repaymentSchedule,
      };

      const saved = localStorage.getItem("umkm_loans");
      let currentLoans = [];
      if (saved) {
        currentLoans = JSON.parse(saved);
      }
      currentLoans = [newLoan, ...currentLoans];
      localStorage.setItem("umkm_loans", JSON.stringify(currentLoans));

      router.push("/pinjaman");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/pinjaman"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Pinjaman Mikro
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Ajukan Pinjaman Mikro</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                Jumlah Pinjaman (Rp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                {...register("amount", { valueAsNumber: true })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.amount ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Simulasi Rp 1.000.000 - Rp 20.000.000"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="durationMonths" className="block text-sm font-medium text-slate-700 mb-1">
                Tenor Pengembalian (Bulan) <span className="text-rose-500">*</span>
              </label>
              <select
                id="durationMonths"
                {...register("durationMonths", { valueAsNumber: true })}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.durationMonths ? "border-rose-500" : "border-gray-300"
                }`}
              >
                <option value={3}>3 Bulan</option>
                <option value={6}>6 Bulan</option>
                <option value={9}>9 Bulan</option>
                <option value={12}>12 Bulan</option>
              </select>
              {errors.durationMonths && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.durationMonths.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 mb-1">
                Tujuan Penggunaan Dana <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="purpose"
                {...register("purpose")}
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.purpose ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Terangkan secara rinci untuk keperluan operasional/bahan baku apa dana ini akan dialokasikan..."
              />
              {errors.purpose && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.purpose.message}</p>
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
                  Mengajukan Pinjaman...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Ajukan Pinjaman
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
