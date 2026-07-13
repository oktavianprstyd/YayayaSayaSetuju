"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import { mockArisanGroups } from "@/data/mock-fase2";
import type { ArisanGroup } from "@/types";

interface ArisanDetailClientProps {
  groupId: string;
}

export default function ArisanDetailClient({ groupId }: ArisanDetailClientProps) {
  const [group, setGroup] = useState<ArisanGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [drawnWinner, setDrawnWinner] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_arisan_groups");
    let currentGroups: ArisanGroup[] = [];
    if (saved) {
      currentGroups = JSON.parse(saved);
    } else {
      currentGroups = mockArisanGroups;
      localStorage.setItem("umkm_arisan_groups", JSON.stringify(mockArisanGroups));
    }

    const found = currentGroups.find((g) => g.id === groupId);
    setGroup(found || null);
    setLoading(false);
  }, [groupId]);

  const handleKocok = () => {
    if (!group || drawing) return;

    // Filter members who haven't won yet
    const eligibleMembers = group.winnerSchedule
      .filter((s) => !s.won)
      .map((s) => s.memberName);

    if (eligibleMembers.length === 0) {
      alert("Semua anggota di arisan ini sudah mendapatkan giliran menang!");
      return;
    }

    setDrawing(true);
    setDrawnWinner(null);

    // Simulate lottery rotation latency
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      const winner = eligibleMembers[randomIndex];

      setDrawnWinner(winner);
      setDrawing(false);

      // Find the first month that has won=false and set this winner
      let winnerSet = false;
      const updatedSchedule = group.winnerSchedule.map((s) => {
        if (!s.won && !winnerSet) {
          winnerSet = true;
          return {
            ...s,
            memberName: winner,
            won: true,
          };
        }
        return s;
      });

      const isAllCompleted = updatedSchedule.every((s) => s.won);

      const updatedGroup: ArisanGroup = {
        ...group,
        status: isAllCompleted ? ("completed" as const) : group.status,
        winnerSchedule: updatedSchedule,
      };

      // Save to LocalStorage
      const saved = localStorage.getItem("umkm_arisan_groups");
      if (saved) {
        const groupsList: ArisanGroup[] = JSON.parse(saved);
        const updatedList = groupsList.map((g) => (g.id === groupId ? updatedGroup : g));
        localStorage.setItem("umkm_arisan_groups", JSON.stringify(updatedList));
      }

      setGroup(updatedGroup);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-slate-600">Memuat...</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Grup Arisan tidak ditemukan</h1>
          <Link href="/komunitas" className="text-emerald-600 hover:underline mt-4 inline-block">
            Kembali ke Arisan Digital
          </Link>
        </div>
      </div>
    );
  }

  const wonMembersCount = group.winnerSchedule.filter((s) => s.won).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/komunitas"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Arisan Digital
        </Link>

        {/* Group Info Summary */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{group.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {group.members.length} Anggota
              </span>
              <span>•</span>
              <span>Dibuat: {formatDate(group.createdAt)}</span>
            </div>
            <p className="text-sm text-slate-600">
              Iuran Bulanan: <span className="font-bold text-slate-800">{formatRupiah(group.contributionAmount)}</span> • Pot Pemenang: <span className="font-bold text-emerald-600">{formatRupiah(group.targetAmount)}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start md:items-end">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              group.status === "active" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}>
              Status: {group.status === "active" ? "Aktif" : "Selesai"}
            </span>
            <p className="text-xs text-slate-500">{wonMembersCount} dari {group.members.length} pemenang terpilih</p>
          </div>
        </div>

        {/* Kocok Widget & Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Winner schedule list */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Giliran Pemenang Arisan</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {group.winnerSchedule.map((sched, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                      Bulan {sched.month}
                    </span>
                    <span className="font-medium text-slate-800">{sched.memberName || "Belum diundi"}</span>
                  </div>
                  {sched.won ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      Pemenang
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-slate-500">
                      Antre Undian
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kocok Lottery Form */}
          {group.status === "active" && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between space-y-6 h-fit">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
                  Kocok Arisan Bulan Ini
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Putar roda keberuntungan untuk menentukan pemenang giliran arisan bulan ini secara acak dari anggota yang belum beruntung.
                </p>
              </div>

              {drawnWinner && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-1">
                  <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">Selamat Kepada!</p>
                  <p className="text-xl font-black text-emerald-800">{drawnWinner}</p>
                </div>
              )}

              <button
                onClick={handleKocok}
                disabled={drawing}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-sm"
              >
                {drawing ? (
                  <>
                    <HelpCircle className="h-4 w-4 mr-2 animate-spin" />
                    Mengocok Roda...
                  </>
                ) : (
                  "Mulai Undian / Kocok"
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
