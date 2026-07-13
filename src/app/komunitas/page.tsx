"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Users, ArrowRight, HelpCircle, Landmark, ShieldAlert, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockArisanGroups } from "@/data/mock-fase2";
import { GroupSavings } from "@/components/komunitas/GroupSavings";
import { EmergencyFund } from "@/components/komunitas/EmergencyFund";
import { useGateProtection } from "@/lib/gate";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { ArisanGroup } from "@/types";

export default function KomunitasPage() {
  useGateProtection();
  const { user } = useAuth();
  const [groups, setGroups] = useState<ArisanGroup[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("umkm_arisan_groups");
    if (saved) {
      setGroups(JSON.parse(saved));
    } else {
      localStorage.setItem("umkm_arisan_groups", JSON.stringify(mockArisanGroups));
      setGroups(mockArisanGroups);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Arisan Digital & Komunitas
            </h1>
            <p className="text-slate-600 mt-1">
              Bangun ketahanan finansial komunitas melalui arisan digital, tabungan bersama, dan dana darurat.
            </p>
          </div>
          
          {user?.role === "umkm" && (
            <Link
              href="/komunitas/buat"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5 mr-1" />
              Buat Grup Arisan
            </Link>
          )}
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Arisans */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Arisan list */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  Daftar Grup Arisan
                </h3>
              </div>
              
              {groups.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p>Belum ada grup arisan komunitas aktif.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {groups.map((group) => (
                    <div key={group.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800 text-lg">
                            {group.name}
                          </p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            group.status === "active"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          }`}>
                            {group.status === "active" ? "Aktif" : "Selesai"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Iuran: <span className="font-bold text-slate-800">{formatRupiah(group.contributionAmount)}</span> /bulan • Pot arisan: <span className="font-bold text-emerald-600">{formatRupiah(group.targetAmount)}</span>
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Users className="h-3.5 w-3.5 text-slate-400" />
                          <span>{group.members.length} Anggota Terdaftar</span>
                          <span>•</span>
                          <span>Dibuat: {formatDate(group.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Link
                          href={`/komunitas/${group.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          Rincian & Kocok
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabungan Bersama & Dana Darurat */}
          <div className="space-y-8">
            <GroupSavings />
            <EmergencyFund />
          </div>
        </div>
      </div>
    </div>
  );
}
