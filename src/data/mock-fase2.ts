import { Campaign, Loan, ArisanGroup, FinancialEntry } from "@/types";

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-01",
    title: "Ekspansi Warung Kopi Gayo Mandiri",
    description: "Membeli mesin roaster kopi baru dan menambah area outdoor tempat duduk untuk meningkatkan kapasitas pelanggan hingga 50%.",
    targetAmount: 25000000,
    currentAmount: 18500000,
    category: "kuliner",
    creatorId: "usr-umkm-01",
    creatorName: "Budi Santoso",
    status: "active",
    endDate: "2026-08-31",
    createdAt: "2026-07-01",
    investorCount: 12,
  },
  {
    id: "camp-02",
    title: "Pengembangan Kerajinan Bambu Lestari",
    description: "Pelatihan pengrajin muda di desa dan modal ekspor produk kerajinan anyaman bambu premium ke pasar Jepang.",
    targetAmount: 50000000,
    currentAmount: 50000000,
    category: "kerajinan",
    creatorId: "usr-umkm-02",
    creatorName: "Siti Rahma",
    status: "funded",
    endDate: "2026-07-10",
    createdAt: "2026-06-15",
    investorCount: 35,
  },
  {
    id: "camp-03",
    title: "Digitalisasi Jasa Konveksi Rapi Busana",
    description: "Pembelian mesin jahit komputerisasi otomatis untuk meningkatkan kecepatan dan kualitas pesanan seragam sekolah.",
    targetAmount: 35000000,
    currentAmount: 5000000,
    category: "jasa",
    creatorId: "usr-umkm-03",
    creatorName: "Ahmad Dahlan",
    status: "active",
    endDate: "2026-09-15",
    createdAt: "2026-07-05",
    investorCount: 3,
  }
];

export const mockLoans: Loan[] = [
  {
    id: "loan-01",
    amount: 10000000,
    interestRate: 0.05,
    durationMonths: 6,
    monthlyPayment: 1750000,
    totalRepayment: 10500000,
    purpose: "Beli bahan baku tepung terigu untuk produksi bakpia menjelang hari raya.",
    status: "active",
    createdAt: "2026-07-01",
    repaymentSchedule: [
      { dueDate: "2026-08-01", amount: 1750000, status: "unpaid" },
      { dueDate: "2026-09-01", amount: 1750000, status: "unpaid" },
      { dueDate: "2026-10-01", amount: 1750000, status: "unpaid" },
      { dueDate: "2026-11-01", amount: 1750000, status: "unpaid" },
      { dueDate: "2026-12-01", amount: 1750000, status: "unpaid" },
      { dueDate: "2027-01-01", amount: 1750000, status: "unpaid" },
    ]
  }
];

export const mockArisanGroups: ArisanGroup[] = [
  {
    id: "aris-01",
    name: "Paguyuban Kuliner Pasar Gede",
    targetAmount: 12000000,
    contributionAmount: 1000000,
    members: ["Budi Santoso", "Siti Rahma", "Ahmad Dahlan", "Sri Utami", "Dewi Lestari", "Hendra Wijaya", "Rudi Hartono", "Joko Susilo", "Lani Astuti", "Diana Putri", "Yudi Setiawan", "Mega Wati"],
    winnerSchedule: [
      { month: 1, memberName: "Sri Utami", won: true },
      { month: 2, memberName: "Budi Santoso", won: false },
      { month: 3, memberName: "Dewi Lestari", won: false },
      { month: 4, memberName: "Siti Rahma", won: false },
    ],
    status: "active",
    createdAt: "2026-05-01"
  }
];

export const mockFinancialEntries: FinancialEntry[] = [
  {
    id: "fin-01",
    type: "income",
    amount: 15000000,
    category: "Penjualan Produk",
    description: "Pendapatan katering mingguan Kantor Kecamatan",
    date: "2026-07-10"
  },
  {
    id: "fin-02",
    type: "expense",
    amount: 4500000,
    category: "Bahan Baku",
    description: "Beli ayam potong, beras, bumbu dapur",
    date: "2026-07-10"
  },
  {
    id: "fin-03",
    type: "expense",
    amount: 1200000,
    category: "Operasional",
    description: "Gaji 2 asisten katering harian",
    date: "2026-07-11"
  },
  {
    id: "fin-04",
    type: "income",
    amount: 3200000,
    category: "Penjualan Produk",
    description: "Pesanan nasi box ulang tahun anak",
    date: "2026-07-12"
  }
];
