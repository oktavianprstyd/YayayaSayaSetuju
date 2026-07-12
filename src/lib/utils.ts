import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function calculatePajakUmkm(omzet: number, biayaOperasional: number): {
  penghasilanNeto: number;
  tarifPajak: number;
  pajakTerutang: number;
} {
  const penghasilanNeto = omzet - biayaOperasional;
  const tarifPajak = 0.5; // 0.5% untuk UMKM
  const pajakTerutang = Math.max(0, penghasilanNeto * (tarifPajak / 100));

  return {
    penghasilanNeto,
    tarifPajak,
    pajakTerutang,
  };
}

export function calculateProgressLegalitas(status: {
  nib: boolean;
  npwp: boolean;
  sertifikatHalal: boolean;
  iumk: boolean;
  tdp: boolean;
}): number {
  const items = Object.values(status);
  const completed = items.filter(Boolean).length;
  return Math.round((completed / items.length) * 100);
}

export function replaceTemplate(content: string, data: Record<string, string>): string {
  let result = content;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  });
  return result;
}
