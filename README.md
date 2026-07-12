# UMKM Legalitas & Pajak

Web app yang membantu UMKM mengurus legalitas dan perpajakan dengan UI sederhana dan mudah dipahami.

## Fitur

- **Cek Status Legalitas** - Cek apakah UMKM sudah legal atau belum
- **Panduan Perizinan** - Step-by-step urus NIB, NPWP, IUMK, Sertifikat Halal, TDP
- **Kalkulator Pajak UMKM** - Hitung pajak dengan tarif 0,5%
- **Template Surat** - Generate & download surat penting (PDF)
- **Dashboard Progress** - Tracking progress legalitas
- **Profil UMKM** - Simpan data usaha

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form + Zod
- jsPDF
- LocalStorage (no backend needed)

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Buka http://localhost:3000
```

## Build untuk Production

```bash
npm run build
# Output ada di folder /dist
```

## Struktur Folder

```
src/
├── app/              # Routes & pages
├── components/       # UI components
│   ├── ui/           # shadcn components
│   └── custom/       # Custom components
├── context/          # React Context (global state)
├── data/             # Static data
├── hooks/            # Custom hooks
├── lib/              # Utilities & constants
└── types/            # TypeScript types
```

## Context Files untuk AI

- `claude.md` - Tech stack, rules, design principles
- `ARCHITECTURE.md` - Entity, page structure, component tree
- `MASTER-PROMPT.md` - Phase-by-phase development plan

## Catatan

- Data disimpan di LocalStorage (browser)
- Tidak ada backend/auth di Phase 1
- Mobile-first design
- Bahasa Indonesia

## Lisensi

MIT
