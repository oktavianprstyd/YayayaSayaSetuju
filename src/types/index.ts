// ============================================
// TYPES: UMKM Legalitas & Pajak
// ============================================

export interface UserData {
  id: string;
  namaUsaha: string;
  pemilik: string;
  alamat: string;
  jenisUsaha: string;
  skalaUsaha: "mikro" | "kecil" | "menengah";
  statusLegal: StatusLegal;
  progressLegalitas: number;
  riwayatPajak: PajakEntry[];
  suratDibuat: SuratEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface StatusLegal {
  nib: boolean;
  npwp: boolean;
  sertifikatHalal: boolean;
  iumk: boolean;
  tdp: boolean;
}

export interface PajakEntry {
  id: string;
  periode: string;
  omzet: number;
  biayaOperasional: number;
  penghasilanNeto: number;
  tarifPajak: number;
  pajakTerutang: number;
  tanggalHitung: string;
}

export interface SuratEntry {
  id: string;
  jenisSurat: string;
  dataSurat: Record<string, string>;
  tanggalDibuat: string;
}

export interface PanduanItem {
  id: string;
  judul: string;
  deskripsi: string;
  icon: string;
  estimasiWaktu: string;
  biaya: string;
  steps: PanduanStep[];
  dokumenDiperlukan: string[];
  linkResmi: string;
}

export interface PanduanStep {
  urutan: number;
  judul: string;
  deskripsi: string;
  tips?: string;
}

export interface TemplateSurat {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  fields: TemplateField[];
  content: string;
}

export interface TemplateField {
  key: string;
  label: string;
  type: "text" | "textarea" | "date" | "select";
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export interface FiturItem {
  id: string;
  judul: string;
  deskripsi: string;
  icon: string;
  href: string;
  color: string;
}
