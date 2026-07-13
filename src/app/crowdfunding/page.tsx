"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockCampaigns } from "@/data/mock-fase2";
import { CampaignCard } from "@/components/crowdfunding/CampaignCard";
import { useGateProtection } from "@/lib/gate";
import type { Campaign } from "@/types";

export default function CrowdfundingPage() {
  useGateProtection();
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("umkm_campaigns");
    if (saved) {
      setCampaigns(JSON.parse(saved));
    } else {
      localStorage.setItem("umkm_campaigns", JSON.stringify(mockCampaigns));
      setCampaigns(mockCampaigns);
    }
  }, []);

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch = camp.title.toLowerCase().includes(search.toLowerCase()) ||
      camp.description.toLowerCase().includes(search.toLowerCase()) ||
      camp.creatorName.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || camp.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Modal Komunitas
            </h1>
            <p className="text-slate-600 mt-1">
              Dukung permodalan usaha lokal atau ajukan permodalan dari komunitas.
            </p>
          </div>
          
          {user?.role === "umkm" && (
            <Link
              href="/crowdfunding/buat"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5 mr-1" />
              Buat Campaign Baru
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Cari usaha atau pemilik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Filter className="h-5 w-5" />
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none"
            >
              <option value="all">Semua Kategori</option>
              <option value="kuliner">Makanan & Minuman</option>
              <option value="jasa">Jasa & Layanan</option>
              <option value="kerajinan">Kerajinan Tangan</option>
              <option value="pertanian">Pertanian & Perkebunan</option>
              <option value="produksi">Produksi & Manufaktur</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-slate-500">
            <Coins className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-800 mb-1">Tidak Ada Campaign</h3>
            <p>Cobalah mengganti kata kunci pencarian atau filter kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
