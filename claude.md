# Project Context: UMKM Legalitas & Micro-Capital

## Overview
Web platform yang membantu UMKM mengurus legalitas (Fase 1) dan mengakses modal melalui crowdfunding komunitas (Fase 2).

## Tech Stack

### Fase 1 (Current)
- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **State:** React Context + useReducer
- **Form:** React Hook Form + Zod
- **PDF:** jsPDF (client-side generation)
- **Storage:** LocalStorage (browser only)

### Fase 2 (Future)
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Payment:** Midtrans / Xendit
- **Notification:** WhatsApp API / Email
- **Storage:** Supabase Storage

## Target User
- UMKM pemula yang belum paham legalitas
- Unbanked population (gak punya rekening bank)
- Komunitas desa dengan banyak UMKM kecil
- Investor kecil yang mau dukung UMKM lokal

## Design Principles

### Visual
- **Primary Color:** Emerald-600 (#059669) — trust, growth, legal
- **Secondary:** Slate-800 — text utama
- **Background:** Gray-50 — clean, readable
- **Accent:** Amber-500 — warnings, highlights
- **Error:** Rose-500 — errors, alerts
- **Font:** Inter (system-ui fallback)
- **Border Radius:** 0.5rem (consistent)

### Layout
- Mobile-first (320px minimum)
- Card-based design
- Generous whitespace
- Clear visual hierarchy

### Interaction
- Touch-friendly (min 44px tap target)
- Loading states for all async actions
- Toast notifications for feedback
- Smooth transitions (150-300ms)

## Architecture Rules

### Fase 1 Rules
- Server Components by default
- Client Components only for interactivity
- All data in LocalStorage
- No API calls, no backend
- No authentication

### Fase 2 Rules (Future)
- Supabase for database + auth
- API routes for sensitive operations
- Row Level Security (RLS) enabled
- Encrypt sensitive data at rest

## Naming Convention
- Components: PascalCase (e.g., `CekLegalitasCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- Utils: camelCase (e.g., `formatRupiah.ts`)
- Types: PascalCase (e.g., `UmkmData.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `APP_NAME`)

## Project Structure
```
src/
├── app/              # Routes & pages
├── components/       # UI components
│   ├── ui/           # shadcn components
│   ├── layout/       # Navbar, Footer
│   ├── landing/      # Landing page sections
│   ├── cek-legalitas/
│   ├── panduan/
│   ├── pajak/
│   ├── surat/
│   ├── dashboard/
│   └── profil/
├── context/          # React Context
├── data/             # Static data
├── hooks/            # Custom hooks
├── lib/              # Utilities & constants
└── types/            # TypeScript types
```

## Important Notes
- ALL user-facing text in Bahasa Indonesia
- Validate all inputs with Zod
- Error messages in Indonesian
- Mobile-first responsive
- Accessibility: ARIA labels, focus management
- No sensitive data in LocalStorage (NIK asli, dll)
- Loading states for every interaction
- Try/catch for all client-side logic
