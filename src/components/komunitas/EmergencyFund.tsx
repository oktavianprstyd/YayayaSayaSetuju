"use client";

import React, { useState, useEffect } from "react";
import { Heart, ShieldAlert, Plus, Check } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";

interface ClaimRecord {
  id: string;
  name: string;
  amount: number;
  reason: string;
  status: "pending" | "approved";
  date: string;
}

export function EmergencyFund() {
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(500000);
  const [name, setName] = useState("");

  const fundPool = 15000000; // Fixed mock pool for emergency

  useEffect(() => {
    const saved = localStorage.getItem("umkm_emergency_claims");
    if (saved) {
      setClaims(JSON.parse(saved));
    } else {
      const initial: ClaimRecord[] = [
        {
          id: "cl-01",
          name: "Siti Rahma",
          amount: 1500000,
          reason: "Kios kebanjiran, perlu perbaikan atap darurat",
          status: "approved",
          date: "2026-06-20",
        },
      ];
      localStorage.setItem("umkm_emergency_claims", JSON.stringify(initial));
      setClaims(initial);
    }
  }, []);

  const handleRequestAid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reason || amount <= 0) return;

    const newClaim: ClaimRecord = {
      id: `cl-${Date.now()}`,
      name,
      amount,
      reason,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newClaim, ...claims];
    localStorage.setItem("umkm_emergency_claims", JSON.stringify(updated));
    setClaims(updated);
    setName("");
    setReason("");
    setAmount(500000);
    alert("Pengajuan dana darurat berhasil dikirim! Menunggu persetujuan komunitas.");
  };

  const handleApprove = (id: string) => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c));
    localStorage.setItem("umkm_emergency_claims", JSON.stringify(updated));
    setClaims(updated);
  };

  const totalDisbursed = claims
    .filter((c) => c.status === "approved")
    .reduce((sum, c) => sum + c.amount, 0);

  const remainingPool = fundPool - totalDisbursed;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-rose-500 fill-rose-500 animate-pulse" />
        <h3 className="font-bold text-slate-800 text-lg">Dana Darurat Komunitas</h3>
      </div>

      <div className="bg-rose-50 rounded-lg p-4 border border-rose-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-rose-500 uppercase tracking-wider font-semibold font-mono">Dana Tersedia</p>
          <p className="text-2xl font-black text-rose-700 mt-0.5">{formatRupiah(remainingPool)}</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-rose-100 text-rose-800 flex items-center gap-1">
          <ShieldAlert className="h-3.5 w-3.5" />
          Siaga Kebencanaan
        </span>
      </div>

      {/* Form request */}
      <form onSubmit={handleRequestAid} className="space-y-3 pt-2 border-t border-gray-100">
        <p className="text-xs font-semibold text-slate-500">Ajukan Bantuan Darurat</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Nama Pemohon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-xs bg-white w-full"
          />
          <input
            type="number"
            placeholder="Jumlah (Rp)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-xs bg-white w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Alasan darurat (kebakaran, banjir, kecelakaan kerja)..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-xs bg-white w-full"
        />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-md hover:bg-rose-700 transition-colors shadow-sm"
        >
          Ajukan Dana Darurat
        </button>
      </form>

      {/* Claims List */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <p className="text-xs font-semibold text-slate-500 font-mono">Daftar Klaim Bantuan</p>
        <div className="divide-y divide-gray-100 max-h-[180px] overflow-y-auto pr-1">
          {claims.map((c) => (
            <div key={c.id} className="py-2.5 flex justify-between items-start text-xs gap-3">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-700">{c.name}</p>
                <p className="text-slate-600 italic">"{c.reason}"</p>
                <p className="text-slate-400">{formatDate(c.date)}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="font-bold text-rose-600">{formatRupiah(c.amount)}</span>
                {c.status === "approved" ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    Disetujui
                  </span>
                ) : (
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center gap-0.5"
                  >
                    <Check className="h-3 w-3" /> Setujui
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
