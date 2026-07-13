"use client";

import React, { useState, useEffect } from "react";
import { Coins, Plus, Landmark } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";

interface SavingRecord {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export function GroupSavings() {
  const [savings, setSavings] = useState<SavingRecord[]>([]);
  const [amount, setAmount] = useState(50000);
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("umkm_group_savings");
    if (saved) {
      setSavings(JSON.parse(saved));
    } else {
      const initial: SavingRecord[] = [
        { id: "sav-01", name: "Budi Santoso", amount: 150000, date: "2026-07-01" },
        { id: "sav-02", name: "Siti Rahma", amount: 200000, date: "2026-07-02" },
        { id: "sav-03", name: "Ahmad Dahlan", amount: 100000, date: "2026-07-05" },
      ];
      localStorage.setItem("umkm_group_savings", JSON.stringify(initial));
      setSavings(initial);
    }
  }, []);

  const handleAddSavings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || amount <= 0) return;

    const newRecord: SavingRecord = {
      id: `sav-${Date.now()}`,
      name,
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newRecord, ...savings];
    localStorage.setItem("umkm_group_savings", JSON.stringify(updated));
    setSavings(updated);
    setName("");
    setAmount(50000);
    alert("Setoran tabungan berhasil dicatat!");
  };

  const totalSavings = savings.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Landmark className="h-5 w-5 text-emerald-600" />
        <h3 className="font-bold text-slate-800 text-lg">Tabungan Bersama Komunitas</h3>
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Kas Terkumpul</p>
          <p className="text-2xl font-black text-emerald-700 mt-0.5">{formatRupiah(totalSavings)}</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
          Kas Bersama
        </span>
      </div>

      {/* Setor form */}
      <form onSubmit={handleAddSavings} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-2 border-t border-gray-100">
        <div>
          <label htmlFor="saverName" className="block text-xs font-semibold text-slate-600 mb-1">Nama Penyetor</label>
          <input
            type="text"
            id="saverName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama anggota"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          />
        </div>
        <div>
          <label htmlFor="savingAmount" className="block text-xs font-semibold text-slate-600 mb-1">Jumlah (Rp)</label>
          <input
            type="number"
            id="savingAmount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Jumlah setoran"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Setor
        </button>
      </form>

      {/* List */}
      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold text-slate-500">Mutasi Setoran Terakhir</p>
        <div className="divide-y divide-gray-100 max-h-[180px] overflow-y-auto pr-1">
          {savings.map((s) => (
            <div key={s.id} className="py-2 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-slate-700">{s.name}</p>
                <p className="text-slate-400">{formatDate(s.date)}</p>
              </div>
              <span className="font-bold text-emerald-600">+{formatRupiah(s.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
