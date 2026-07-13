"use client";

import React, { useState, useEffect } from "react";
import { Coins, Plus, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import type { FinancialEntry } from "@/types";

interface Budget {
  category: string;
  limit: number;
}

interface BudgetPlannerProps {
  entries: FinancialEntry[];
}

const DEFAULT_CATEGORIES = [
  "Bahan Baku",
  "Peralatan",
  "Operasional",
  "Sewa Tempat",
  "Pemasaran",
  "Gaji Karyawan",
  "Lainnya",
];

export function BudgetPlanner({ entries }: BudgetPlannerProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_budgets");
    if (saved) {
      setBudgets(JSON.parse(saved));
    } else {
      const initial: Budget[] = [
        { category: "Bahan Baku", limit: 5000000 },
        { category: "Operasional", limit: 2000000 },
      ];
      localStorage.setItem("umkm_budgets", JSON.stringify(initial));
      setBudgets(initial);
    }
  }, []);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (limit <= 0) return;

    // Check if category already has budget
    const exists = budgets.find((b) => b.category === selectedCategory);
    let updated: Budget[];

    if (exists) {
      updated = budgets.map((b) =>
        b.category === selectedCategory ? { ...b, limit } : b
      );
    } else {
      updated = [...budgets, { category: selectedCategory, limit }];
    }

    localStorage.setItem("umkm_budgets", JSON.stringify(updated));
    setBudgets(updated);
    setLimit(0);
  };

  const handleDeleteBudget = (category: string) => {
    const updated = budgets.filter((b) => b.category !== category);
    localStorage.setItem("umkm_budgets", JSON.stringify(updated));
    setBudgets(updated);
  };

  // Get total expense by category
  const expenseByCategory: Record<string, number> = {};
  entries
    .filter((e) => e.type === "expense")
    .forEach((e) => {
      expenseByCategory[e.category] = (expenseByCategory[e.category] || 0) + e.amount;
    });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-6">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Anggaran Bulanan Usaha</h3>
        <p className="text-slate-500 text-sm">Rencanakan limit pengeluaran bulanan kategori usaha Anda.</p>
      </div>

      {/* Form add budget */}
      <form onSubmit={handleAddBudget} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label htmlFor="budgetCategory" className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
          <select
            id="budgetCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          >
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="budgetLimit" className="block text-xs font-semibold text-slate-600 mb-1">Batas Anggaran (Rp)</label>
          <input
            type="number"
            id="budgetLimit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            placeholder="Limit budget"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Pasang
        </button>
      </form>

      {/* Budget list */}
      <div className="space-y-4 pt-2">
        {budgets.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">Belum ada anggaran yang diatur.</p>
        ) : (
          budgets.map((b) => {
            const spent = expenseByCategory[b.category] || 0;
            const progress = Math.min(100, Math.round((spent / b.limit) * 100));
            const isOverBudget = spent > b.limit;

            return (
              <div key={b.category} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">{b.category}</span>
                    <button
                      onClick={() => handleDeleteBudget(b.category)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus budget"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className={`font-bold ${isOverBudget ? "text-rose-600" : "text-slate-600"}`}>
                    {formatRupiah(spent)} / {formatRupiah(b.limit)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverBudget ? "bg-rose-600" : "bg-emerald-600"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {isOverBudget && (
                  <p className="text-xs text-rose-600 font-semibold">⚠️ Pengeluaran melebihi limit anggaran!</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
