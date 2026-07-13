"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Coins, Target } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { mockCampaigns } from "@/data/mock-fase2";
import { InvestForm } from "@/components/crowdfunding/InvestForm";
import { RiwayatInvestasi } from "@/components/crowdfunding/RiwayatInvestasi";
import type { Campaign, Investment } from "@/types";

interface CampaignDetailClientProps {
  campaignId: string;
}

export default function CampaignDetailClient({ campaignId }: CampaignDetailClientProps) {
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch campaigns
    const savedCamps = localStorage.getItem("umkm_campaigns");
    let currentCamps: Campaign[] = [];
    if (savedCamps) {
      currentCamps = JSON.parse(savedCamps);
    } else {
      currentCamps = mockCampaigns;
      localStorage.setItem("umkm_campaigns", JSON.stringify(mockCampaigns));
    }

    const found = currentCamps.find((c) => c.id === campaignId);
    setCampaign(found || null);

    // 2. Fetch investments
    const savedInvests = localStorage.getItem("umkm_investments");
    if (savedInvests) {
      const allInvests: Investment[] = JSON.parse(savedInvests);
      setInvestments(allInvests.filter((i) => i.campaignId === campaignId));
    }

    setLoading(false);
  }, [campaignId]);

  const handleInvestSuccess = (amount: number) => {
    if (!campaign || !user) return;

    // Update campaign in list
    const savedCamps = localStorage.getItem("umkm_campaigns");
    if (savedCamps) {
      const camps: Campaign[] = JSON.parse(savedCamps);
      const updated = camps.map((c) => {
        if (c.id === campaignId) {
          const newAmt = c.currentAmount + amount;
          return {
            ...c,
            currentAmount: newAmt,
            investorCount: c.investorCount + 1,
            status: newAmt >= c.targetAmount ? ("funded" as const) : c.status,
          };
        }
        return c;
      });
      localStorage.setItem("umkm_campaigns", JSON.stringify(updated));
      
      const newCamp = updated.find((c) => c.id === campaignId);
      if (newCamp) setCampaign(newCamp);
    }

    // Add new investment entry
    const newInvestment: Investment = {
      id: `inv-${Date.now()}`,
      campaignId: campaignId,
      campaignTitle: campaign.title,
      investorId: user.id,
      investorName: user.name,
      amount: amount,
      tanggal: new Date().toISOString(),
    };

    const savedInvests = localStorage.getItem("umkm_investments");
    let allInvests: Investment[] = [];
    if (savedInvests) {
      allInvests = JSON.parse(savedInvests);
    }
    const updatedInvests = [newInvestment, ...allInvests];
    localStorage.setItem("umkm_investments", JSON.stringify(updatedInvests));
    setInvestments(updatedInvests.filter((i) => i.campaignId === campaignId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-slate-600">Memuat...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Campaign tidak ditemukan</h1>
          <Link href="/crowdfunding" className="text-emerald-600 hover:underline mt-4 inline-block">
            Kembali ke Modal Komunitas
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/crowdfunding"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Modal Komunitas
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">{campaign.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                <span className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  Oleh: {campaign.creatorName}
                </span>
                <span className="inline-flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-slate-400" />
                  Berakhir {formatDate(campaign.endDate)}
                </span>
              </div>

              <h2 className="font-bold text-slate-800 mb-2">Deskripsi Rencana Usaha</h2>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{campaign.description}</p>
            </div>

            <RiwayatInvestasi investments={investments} />
          </div>

          {/* Funding Status Widget */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Terkumpul</p>
                  <p className="text-2xl font-extrabold text-emerald-600">{formatRupiah(campaign.currentAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Target</p>
                  <p className="text-lg font-bold text-slate-800">{formatRupiah(campaign.targetAmount)}</p>
                </div>
              </div>

              <div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-right text-xs font-bold text-emerald-700 mt-1">{progress}% terpenuhi</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span>{campaign.investorCount} Investor</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Target className="h-4 w-4 text-slate-400" />
                  <span className="capitalize">{campaign.status === "active" ? "Aktif" : "Selesai"}</span>
                </div>
              </div>
            </div>

            {campaign.status === "active" && (
              <InvestForm
                campaignId={campaign.id}
                campaignTitle={campaign.title}
                onSuccess={handleInvestSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
