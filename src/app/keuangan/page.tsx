"use client";

import React, { useState, useEffect } from "react";
import { Coins, HelpCircle } from "lucide-react";
import { mockFinancialEntries } from "@/data/mock-fase2";
import { FinancialSummary } from "@/components/keuangan/FinancialSummary";
import { TransactionForm } from "@/components/keuangan/TransactionForm";
import { TransactionTable } from "@/components/keuangan/TransactionTable";
import { KeuanganChart } from "@/components/keuangan/KeuanganChart";
import { BudgetPlanner } from "@/components/keuangan/BudgetPlanner";
import { useGateProtection } from "@/lib/gate";
import type { FinancialEntry } from "@/types";

export default function KeuanganPage() {
  useGateProtection();
  const [entries, setEntries] = useState<FinancialEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_financial_entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      localStorage.setItem("umkm_financial_entries", JSON.stringify(mockFinancialEntries));
      setEntries(mockFinancialEntries);
    }
  }, []);

  const handleAddTransaction = (newEntry: Omit<FinancialEntry, "id">) => {
    const entry: FinancialEntry = {
      ...newEntry,
      id: `fin-${Date.now()}`,
    };

    const updated = [entry, ...entries];
    localStorage.setItem("umkm_financial_entries", JSON.stringify(updated));
    setEntries(updated);
  };

  const handleDeleteTransaction = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    localStorage.setItem("umkm_financial_entries", JSON.stringify(updated));
    setEntries(updated);
  };

  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Keuangan Usaha
          </h1>
          <p className="text-slate-600 mt-1">
            Pantau arus kas masuk/keluar, atur anggaran, dan buat laporan keuangan sederhana.
          </p>
        </div>

        {/* Summary Widgets */}
        <FinancialSummary income={totalIncome} expense={totalExpense} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Workspace (Chart and Table) */}
          <div className="lg:col-span-2 space-y-8">
            <KeuanganChart entries={entries} />
            <TransactionTable entries={entries} onDelete={handleDeleteTransaction} />
          </div>

          {/* Sidebar Forms (Transaction Form and Budget Planner) */}
          <div className="space-y-8">
            <TransactionForm onSubmit={handleAddTransaction} />
            <BudgetPlanner entries={entries} />
          </div>
        </div>
      </div>
    </div>
  );
}
