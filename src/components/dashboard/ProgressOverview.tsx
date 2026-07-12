"use client";

import { useUser } from "@/context/UserContext";
import { ProgressBar } from "@/components/cek-legalitas/ProgressBar";

export function ProgressOverview() {
  const { userData } = useUser();

  const completedCount = Object.values(userData.statusLegal).filter(Boolean).length;
  const totalItems = 5;
  const percentage = (completedCount / totalItems) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Progress Legalitas</h3>
      
      <div className="flex items-center gap-6">
        <ProgressBar percentage={percentage} size="lg" />
        
        <div>
          <p className="text-3xl font-bold text-slate-800">{completedCount}/{totalItems}</p>
          <p className="text-sm text-slate-600">dokumen lengkap</p>
        </div>
      </div>

      {percentage === 100 ? (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700 font-medium">
            🎉 Selamat! Semua legalitas sudah lengkap!
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          Lengkapi {totalItems - completedCount} dokumen lagi untuk legalitas penuh.
        </p>
      )}
    </div>
  );
}
