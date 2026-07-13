"use client";

import React from "react";
import { Award, ShieldCheck, Heart } from "lucide-react";
import { useUser } from "@/context/UserContext";

export function CreditScore() {
  const { userData } = useUser();

  // Score Calculation
  const legalCount = Object.values(userData.statusLegal).filter(Boolean).length;
  const isProfileComplete = userData.namaUsaha && userData.pemilik && userData.alamat;

  // Max score: 100
  // Legalities: 50 points (10 pts per document)
  // Profile Completeness: 20 points
  // Local Financial Records: 30 points (based on transaction entries count, cap at 5 entries)
  const financialCount = userData.riwayatPajak?.length || 0;
  const financialPoints = Math.min(30, financialCount * 6);

  const legalPoints = legalCount * 10;
  const profilePoints = isProfileComplete ? 20 : 0;

  const totalScore = legalPoints + profilePoints + financialPoints;

  let grade = "C";
  let color = "text-rose-500 border-rose-200 bg-rose-50";
  let desc = "Skor kredit rendah. Lengkapi berkas legalitas dan catat riwayat keuangan untuk meningkatkan batas pinjaman.";

  if (totalScore >= 80) {
    grade = "A (Sangat Baik)";
    color = "text-emerald-700 border-emerald-200 bg-emerald-50";
    desc = "Skor kredit prima! Anda memenuhi syarat untuk limit pinjaman mikro maksimal hingga Rp 20.000.000.";
  } else if (totalScore >= 50) {
    grade = "B (Cukup)";
    color = "text-blue-700 border-blue-200 bg-blue-50";
    desc = "Skor kredit cukup baik. Anda bisa mengajukan pinjaman dengan limit moderat hingga Rp 10.000.000.";
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
        <Award className="h-5 w-5 text-emerald-600" />
        Kredit Skor UMKM
      </h3>

      <div className={`p-4 rounded-lg border ${color} flex items-start gap-3`}>
        <ShieldCheck className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold">Skor Kelayakan</p>
          <p className="text-2xl font-black mb-1">{totalScore} / 100</p>
          <p className="text-sm font-bold mb-2">Grade: {grade}</p>
          <p className="text-xs leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Kelengkapan Dokumen (50%)</span>
          <span className="font-bold">{legalPoints} / 50</span>
        </div>
        <div className="flex justify-between">
          <span>Profil Usaha Lengkap (20%)</span>
          <span className="font-bold">{profilePoints} / 20</span>
        </div>
        <div className="flex justify-between">
          <span>Riwayat Keuangan Aktif (30%)</span>
          <span className="font-bold">{financialPoints} / 30</span>
        </div>
      </div>
    </div>
  );
}
