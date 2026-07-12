# Arsitektur: UMKM Legalitas & Micro-Capital

## Entity Relationship (Fase 1)

```
UserData (LocalStorage)
├── id: string
├── namaUsaha: string
├── pemilik: string
├── alamat: string
├── jenisUsaha: string
├── skalaUsaha: "mikro" | "kecil" | "menengah"
├── statusLegal: StatusLegal
├── progressLegalitas: number (0-100)
├── riwayatPajak: PajakEntry[]
├── suratDibuat: SuratEntry[]
├── createdAt: string
└── updatedAt: string

StatusLegal
├── nib: boolean
├── npwp: boolean
├── sertifikatHalal: boolean
├── iumk: boolean
└── tdp: boolean

PajakEntry
├── id: string
├── periode: string
├── omzet: number
├── biayaOperasional: number
├── penghasilanNeto: number
├── tarifPajak: number (0.5%)
├── pajakTerutang: number
└── tanggalHitung: string

SuratEntry
├── id: string
├── jenisSurat: string
├── dataSurat: Record<string, string>
└── tanggalDibuat: string
```

## Page Structure (Fase 1)

```
/                    → Landing Page (Hero + Fitur + CTA)
/cek-legalitas      → Cek status legalitas UMKM
/panduan            → List panduan perizinan
/panduan/[id]       → Detail panduan (NIB, NPWP, dll)
/kalkulator-pajak   → Kalkulator pajak UMKM
/template-surat     → List template surat
/template-surat/[id]→ Generate & download surat
/dashboard          → Dashboard progress legalitas
/profil             → Data UMKM user
```

## Component Tree

```
Layout (Server Component)
├── Navbar (Client)
│   ├── Logo
│   ├── NavLinks (desktop)
│   └── MobileMenu (sheet/drawer)
├── Main Content
│   └── [Page Specific Components]
└── Footer (Server)

Pages:
├── LandingPage
│   ├── HeroSection
│   ├── FiturGrid (4 cards)
│   └── CtaSection
├── CekLegalitasPage
│   ├── ProgressBar
│   ├── ChecklistLegalitas
│   └── RekomendasiSection
├── PanduanPage
│   ├── PanduanCard[]
│   └── SearchFilter
├── PanduanDetailPage
│   ├── StepTimeline
│   ├── DocumentChecklist
│   └── ActionButton
├── KalkulatorPajakPage
│   ├── FormInput (React Hook Form + Zod)
│   ├── HasilKalkulasi
│   └── RiwayatPajak
├── TemplateSuratPage
│   ├── TemplateCard[]
│   └── PreviewModal
├── DashboardPage
│   ├── ProgressOverview
│   ├── StatusCards
│   └── RecentActivity
└── ProfilPage
    ├── FormProfil (React Hook Form + Zod)
    └── StatusLegalSummary
```

## Data Flow (Fase 1)

```
User Input (Form)
    │
    ▼
Zod Validation
    │
    ▼
React Hook Form
    │
    ▼
UserContext (State)
    │
    ▼
LocalStorage (Persist)
    │
    ▼
UI Update (Re-render)
```

## Gate System (Fase 1 → Fase 2)

```
UMKM User
    │
    ▼
Fase 1: Legalitas
├── Cek status
├── Urus perizinan
├── Hitung pajak
└── Generate surat
    │
    ▼
GATE: NIB ✓ AND NPWP ✓
    │
    ├── YES → Unlock Fase 2
    │           ├── Crowdfunding
    │           ├── Financial Dashboard
    │           ├── Micro-Loan
    │           └── Community Pool
    │
    └── NO → Redirect ke Panduan Perizinan
```

## Fase 2 Architecture (Future)

```
┌─────────────────────────────────────────────┐
│              CLIENT (Next.js 14)            │
│  - React + TypeScript + Tailwind + shadcn   │
│  - React Hook Form + Zod                    │
│  - Recharts (financial charts)              │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│              API LAYER                      │
│  - Next.js API Routes                     │
│  - NextAuth.js / Supabase Auth            │
│  - RBAC (Role-Based Access Control)       │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│              BACKEND (Supabase)             │
│  - PostgreSQL (Database)                    │
│  - Realtime (Live updates)                  │
│  - Storage (Dokumen, foto)                  │
│  - Edge Functions (Serverless)              │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│           EXTERNAL SERVICES                 │
│  - Midtrans / Xendit (Payment)              │
│  - WhatsApp API (Notification)              │
│  - OSS RBA (NIB Verification)               │
│  - DJP Online (NPWP Verification)             │
└─────────────────────────────────────────────┘
```

## Security Considerations

### Fase 1
- No sensitive data in LocalStorage (no real NIK, no passwords)
- PDF generated client-side (no server upload)
- No authentication needed

### Fase 2
- Encrypt sensitive data at rest
- Row Level Security (RLS) in Supabase
- HTTPS only
- Rate limiting on API
- Input sanitization
- Audit logging
