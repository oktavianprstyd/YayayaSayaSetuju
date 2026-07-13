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

// ============================================
// TYPES: Fase 2 - Micro-Capital & Crowdfunding
// ============================================

export interface UserAuth {
  id: string;
  email: string;
  name: string;
  role: "umkm" | "investor" | "admin";
  avatarUrl?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: "kuliner" | "jasa" | "kerajinan" | "pertanian" | "produksi" | "lainnya";
  creatorId: string;
  creatorName: string;
  status: "active" | "funded" | "ended";
  endDate: string;
  createdAt: string;
  investorCount: number;
}

export interface Investment {
  id: string;
  campaignId: string;
  campaignTitle: string;
  investorId: string;
  investorName: string;
  amount: number;
  tanggal: string;
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number; // e.g. 0.05 (5%)
  durationMonths: number;
  monthlyPayment: number;
  totalRepayment: number;
  purpose: string;
  status: "pending" | "approved" | "active" | "paid" | "rejected";
  createdAt: string;
  repaymentSchedule: RepaymentInstallment[];
}

export interface RepaymentInstallment {
  dueDate: string;
  amount: number;
  status: "unpaid" | "paid";
  paidAt?: string;
}

export interface ArisanGroup {
  id: string;
  name: string;
  targetAmount: number;
  contributionAmount: number;
  members: string[]; // member names
  winnerSchedule: { month: number; memberName: string; won: boolean }[];
  status: "active" | "completed";
  createdAt: string;
}

export interface FinancialEntry {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

