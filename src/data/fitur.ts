import { FiturItem } from "@/types";

export const fiturData: FiturItem[] = [
  {
    id: "cek-legalitas",
    judul: "Cek Status Legalitas",
    deskripsi: "Cek apakah UMKM Anda sudah legal atau belum. Dapatkan rekomendasi langkah selanjutnya.",
    icon: "ShieldCheck",
    href: "/cek-legalitas",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "panduan",
    judul: "Panduan Perizinan",
    deskripsi: "Panduan lengkap urus NIB, NPWP, IUMK, Sertifikat Halal, dan TDP step-by-step.",
    icon: "BookOpen",
    href: "/panduan",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "kalkulator-pajak",
    judul: "Kalkulator Pajak UMKM",
    deskripsi: "Hitung pajak UMKM Anda dengan mudah. Pahami berapa pajak yang harus dibayar.",
    icon: "Calculator",
    href: "/kalkulator-pajak",
    color: "bg-amber-100 text-amber-700"
  },
  {
    id: "template-surat",
    judul: "Template Surat",
    deskripsi: "Generate surat penting seperti surat pengantar, keterangan domisili, dan permohonan.",
    icon: "FileText",
    href: "/template-surat",
    color: "bg-rose-100 text-rose-700"
  }
];
