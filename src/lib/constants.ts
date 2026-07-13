export const APP_NAME = "UMKM Legal";
export const APP_DESCRIPTION = "Bantu UMKM urus legalitas dan pajak dengan mudah";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/cek-legalitas", label: "Cek Legalitas" },
  { href: "/panduan", label: "Panduan" },
  { href: "/kalkulator-pajak", label: "Kalkulator Pajak" },
  { href: "/template-surat", label: "Template Surat" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/crowdfunding", label: "Modal Komunitas", phase: 2 },
  { href: "/keuangan", label: "Keuangan Usaha", phase: 2 },
  { href: "/pinjaman", label: "Pinjaman Mikro", phase: 2 },
  { href: "/komunitas", label: "Arisan Digital", phase: 2 },
];

export const JENIS_USAHA_OPTIONS = [
  "Perdagangan (Toko, Warung, Online Shop)",
  "Makanan & Minuman (Restoran, Katering, Cafe)",
  "Jasa (Konsultan, Desain, Teknologi)",
  "Kerajinan (Handmade, Souvenir, Dekorasi)",
  "Pertanian & Perkebunan",
  "Peternakan & Perikanan",
  "Produksi / Manufaktur",
  "Transportasi & Logistik",
  "Pendidikan & Pelatihan",
  "Kesehatan & Kecantikan",
  "Lainnya",
];

export const SKALA_USAHA_OPTIONS = [
  { value: "mikro", label: "Mikro (Omzet < Rp 300 juta/tahun, < 4 karyawan)" },
  { value: "kecil", label: "Kecil (Omzet Rp 300 juta - 2,5 miliar/tahun, 5-19 karyawan)" },
  { value: "menengah", label: "Menengah (Omzet Rp 2,5 - 50 miliar/tahun, 20-99 karyawan)" },
];

export const LEGAL_STATUS_LABELS: Record<string, { label: string; description: string }> = {
  nib: {
    label: "NIB (Nomor Induk Berusaha)",
    description: "Identitas resmi usaha dari OSS",
  },
  npwp: {
    label: "NPWP Badan Usaha",
    description: "Nomor Pokok Wajib Pajak untuk keperluan perpajakan",
  },
  sertifikatHalal: {
    label: "Sertifikat Halal",
    description: "Wajib untuk usaha makanan & minuman",
  },
  iumk: {
    label: "IUMK (Izin Usaha Mikro Kecil)",
    description: "Izin usaha dari kelurahan/kecamatan",
  },
  tdp: {
    label: "TDP (Tanda Daftar Perusahaan)",
    description: "Sudah terintegrasi dengan NIB",
  },
};

export const PAJAK_UMKM_INFO = {
  tarif: 0.5,
  batasOmzet: 4_800_000_000, // Rp 4,8 miliar
  batasBebasPajak: 500_000_000, // Rp 500 juta (tidak kena pajak)
  deskripsi: "UMKM dengan omzet di bawah Rp 4,8 miliar/tahun dikenakan tarif pajak 0,5% dari omzet bruto.",
};
