"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, RefreshCw, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const arisanSchema = z.object({
  name: z.string().min(5, "Nama grup arisan minimal 5 karakter"),
  contributionAmount: z.number().min(10000, "Iuran minimal Rp 10.000"),
});

type ArisanFormData = z.infer<typeof arisanSchema>;

export default function BuatArisanPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [membersList, setMembersList] = useState<string[]>([]);

  useEffect(() => {
    if (!user || user.role !== "umkm") {
      router.push("/komunitas");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArisanFormData>({
    resolver: zodResolver(arisanSchema),
    defaultValues: {
      name: "",
      contributionAmount: 500000,
    },
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    if (membersList.includes(newMemberName.trim())) return;
    setMembersList([...membersList, newMemberName.trim()]);
    setNewMemberName("");
  };

  const handleRemoveMember = (name: string) => {
    setMembersList(membersList.filter((m) => m !== name));
  };

  const onSubmit = async (data: ArisanFormData) => {
    if (membersList.length < 3) {
      alert("Anggota arisan minimal 3 orang!");
      return;
    }
    setIsSubmitting(true);

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const targetAmount = data.contributionAmount * membersList.length;

      const newGroup = {
        id: `aris-${Date.now()}`,
        name: data.name,
        targetAmount,
        contributionAmount: data.contributionAmount,
        members: membersList,
        winnerSchedule: membersList.map((m, idx) => ({
          month: idx + 1,
          memberName: m,
          won: false,
        })),
        status: "active" as const,
        createdAt: new Date().toISOString().split("T")[0],
      };

      const saved = localStorage.getItem("umkm_arisan_groups");
      let groupsList = [];
      if (saved) {
        groupsList = JSON.parse(saved);
      }
      groupsList = [newGroup, ...groupsList];
      localStorage.setItem("umkm_arisan_groups", JSON.stringify(groupsList));

      router.push("/komunitas");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/komunitas"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Arisan Digital
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Buat Grup Arisan Baru</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Nama Grup Arisan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.name ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Contoh: Arisan Ibu PKK RT 04"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contributionAmount" className="block text-sm font-medium text-slate-700 mb-1">
                Iuran Per Anggota Bulanan (Rp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                id="contributionAmount"
                {...register("contributionAmount", { valueAsNumber: true })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.contributionAmount ? "border-rose-500" : "border-gray-300"
                }`}
                placeholder="Jumlah iuran"
              />
              {errors.contributionAmount && (
                <p className="mt-1 text-sm text-rose-600" role="alert">{errors.contributionAmount.message}</p>
              )}
            </div>

            {/* Members Input */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tambah Anggota Arisan <span className="text-rose-500">*</span>
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik nama anggota baru..."
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah
                </button>
              </div>

              {/* Members List */}
              <div className="mt-3 space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {membersList.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada anggota yang ditambahkan. Tambahkan minimal 3 orang.</p>
                ) : (
                  membersList.map((m) => (
                    <div key={m} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100 text-sm">
                      <span className="font-medium text-slate-700">{m}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(m)}
                        className="text-rose-600 hover:text-rose-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Membuat Grup Arisan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Buat Arisan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
