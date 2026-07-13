"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, RefreshCw } from "lucide-react";
import type { FinancialEntry } from "@/types";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"], { required_error: "Pilih tipe transaksi" }),
  amount: z.number().min(1, "Jumlah harus lebih besar dari 0"),
  category: z.string().min(1, "Pilih atau tulis kategori"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  date: z.string().min(1, "Pilih tanggal"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: Omit<FinancialEntry, "id">) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      amount: 0,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  const categories = selectedType === "income" 
    ? ["Penjualan Produk", "Jasa Pendukung", "Permodalan", "Lainnya"]
    : ["Bahan Baku", "Peralatan", "Operasional", "Sewa Tempat", "Pemasaran", "Gaji Karyawan", "Lainnya"];

  const handleFormSubmit = (data: TransactionFormData) => {
    onSubmit({
      type: data.type,
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date,
    });
    reset({
      type: data.type,
      amount: 0,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
        <PlusCircle className="h-5 w-5 text-emerald-600" />
        Tambah Transaksi Baru
      </h3>

      <div className="space-y-4">
        {/* Tipe Transaksi */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tipe Transaksi
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center justify-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500">
              <input
                type="radio"
                value="income"
                {...register("type")}
                className="sr-only"
              />
              <span className={`text-sm font-semibold ${selectedType === "income" ? "text-emerald-600" : "text-slate-500"}`}>
                📈 Pemasukan
              </span>
            </label>
            <label className="flex items-center justify-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500">
              <input
                type="radio"
                value="expense"
                {...register("type")}
                className="sr-only"
              />
              <span className={`text-sm font-semibold ${selectedType === "expense" ? "text-rose-600" : "text-slate-500"}`}>
                📉 Pengeluaran
              </span>
            </label>
          </div>
        </div>

        {/* Jumlah */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
            Jumlah Uang (Rp)
          </label>
          <input
            type="number"
            id="amount"
            {...register("amount", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.amount ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: 100000"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.amount.message}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            {...register("category")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.category ? "border-rose-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.category.message}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
            Keterangan / Deskripsi
          </label>
          <input
            type="text"
            id="description"
            {...register("description")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.description ? "border-rose-500" : "border-gray-300"
            }`}
            placeholder="Contoh: Beli kemasan gelas plastik"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.description.message}</p>
          )}
        </div>

        {/* Tanggal */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
            Tanggal
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.date ? "border-rose-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-rose-600" role="alert">{errors.date.message}</p>
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
              Menambahkan...
            </>
          ) : (
            "Tambah Transaksi"
          )}
        </button>
      </div>
    </form>
  );
}
