# Master Prompt: UMKM Legalitas & Micro-Capital

> **Agent Instruction:** Execute tasks phase by phase. Update CHECKPOINT.md after EACH task.  
> **Rule:** Complete current phase 100% before starting next phase.

---

## Phase 1.1: Project Setup & Config

### Task 1.1.1: Initialize Next.js Project
```
Create Next.js 14 project with TypeScript:
- App Router enabled
- src/ directory enabled
- Tailwind CSS enabled
- ESLint enabled
- No src/app/page.tsx yet (we'll create custom)
```
**Files to create:**
- `package.json` (with all dependencies)
- `tsconfig.json`
- `next.config.js` (static export)
- `.gitignore`

**Dependencies to install:**
```bash
npm install next@14 react react-dom typescript @types/node @types/react @types/react-dom
npm install tailwindcss postcss autoprefixer @tailwindcss/forms
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install react-hook-form zod @hookform/resolvers
npm install jspdf
npm install @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-toast
npm install @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-label
```

**Update CHECKPOINT:** Mark 1.1.1 as ✅

---

### Task 1.1.2: Setup Tailwind & Global Styles
```
Configure Tailwind with custom theme:
- Primary: emerald-600
- Custom scrollbar styling
- CSS variables for shadcn/ui
- Mobile-first base styles
```
**Files to create:**
- `tailwind.config.ts`
- `src/app/globals.css`
- `postcss.config.js`

**Update CHECKPOINT:** Mark 1.1.2 as ✅

---

### Task 1.1.3: Install shadcn/ui Components
```
Install these shadcn/ui components via CLI:
- button
- card
- input
- label
- select
- checkbox
- dialog
- toast
- progress
- sheet (for mobile menu)
- separator
- badge
```
**Files to create:**
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/toaster.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/use-toast.ts`

**Update CHECKPOINT:** Mark 1.1.3 as ✅

---

### Task 1.1.4: Create Project Structure
```
Create all necessary folders:
```
src/
├── app/
│   ├── cek-legalitas/
│   ├── panduan/
│   │   └── [id]/
│   ├── kalkulator-pajak/
│   ├── template-surat/
│   │   └── [id]/
│   ├── dashboard/
│   └── profil/
├── components/
│   ├── ui/          (shadcn components)
│   ├── layout/
│   ├── landing/
│   ├── cek-legalitas/
│   ├── panduan/
│   ├── pajak/
│   ├── surat/
│   ├── dashboard/
│   └── profil/
├── context/
├── data/
├── hooks/
├── lib/
└── types/
```

**Update CHECKPOINT:** Mark 1.1.4 as ✅

---

### Task 1.1.5: Create TypeScript Types
```
Create comprehensive types for all entities:
- UserData
- StatusLegal
- PajakEntry
- SuratEntry
- PanduanItem
- PanduanStep
- TemplateSurat
- TemplateField
- FiturItem
```
**File:** `src/types/index.ts`

**Update CHECKPOINT:** Mark 1.1.5 as ✅

---

### Task 1.1.6: Create Utility Functions
```
Create helper functions:
- cn() - className merger
- formatRupiah() - currency formatter
- formatDate() - date formatter
- generateId() - unique ID generator
- calculatePajakUmkm() - tax calculation
- calculateProgressLegalitas() - progress calculator
- replaceTemplate() - template string replacement
```
**File:** `src/lib/utils.ts`

**Update CHECKPOINT:** Mark 1.1.6 as ✅

---

### Task 1.1.7: Create Constants
```
Create app constants:
- APP_NAME, APP_DESCRIPTION
- NAV_LINKS
- JENIS_USAHA_OPTIONS
- SKALA_USAHA_OPTIONS
- LEGAL_STATUS_LABELS
- PAJAK_UMKM_INFO
```
**File:** `src/lib/constants.ts`

**Update CHECKPOINT:** Mark 1.1.7 as ✅

---

### Task 1.1.8: Create useLocalStorage Hook
```
Create custom hook for LocalStorage:
- SSR-safe (check window exists)
- JSON parse/stringify
- Error handling
- Sync with React state
```
**File:** `src/hooks/useLocalStorage.ts`

**Update CHECKPOINT:** Mark 1.1.8 as ✅

---

### Task 1.1.9: Create UserContext
```
Create React Context for global state:
- UserData management
- StatusLegal updates
- PajakEntry CRUD
- SuratEntry CRUD
- Auto-calculate progress
```
**File:** `src/context/UserContext.tsx`

**Update CHECKPOINT:** Mark 1.1.9 as ✅

---

### Task 1.1.10: Verify Build
```
Run:
npm run build
```
Must pass with 0 errors.

**Update CHECKPOINT:** Mark 1.1.10 as ✅  
**Mark Phase 1.1 as COMPLETE**

---

## Phase 1.2: Layout & Navigation

### Task 1.2.1: Create Root Layout
```
Create app layout with:
- UserProvider wrapping
- Navbar + Footer
- Metadata (title, description, keywords)
- Inter font
- Toast provider
```
**File:** `src/app/layout.tsx`

**Update CHECKPOINT:** Mark 1.2.1 as ✅

---

### Task 1.2.2: Create Navbar
```
Create responsive Navbar:
- Logo (text-based: "UMKM Legal")
- Nav links (desktop)
- Mobile hamburger menu (Sheet component)
- Active link highlighting
- Sticky on scroll
```
**File:** `src/components/layout/Navbar.tsx`

**Update CHECKPOINT:** Mark 1.2.2 as ✅

---

### Task 1.2.3: Create Footer
```
Create Footer:
- App name & description
- Quick links
- Social links (placeholder)
- Copyright
```
**File:** `src/components/layout/Footer.tsx`

**Update CHECKPOINT:** Mark 1.2.3 as ✅

---

### Task 1.2.4: Create Landing Page
```
Create main page that imports:
- HeroSection
- FiturGrid
- CtaSection
```
**File:** `src/app/page.tsx`

**Update CHECKPOINT:** Mark 1.2.4 as ✅

---

### Task 1.2.5: Create HeroSection
```
Create hero section:
- Headline: "Kelola Legalitas UMKM Anda dengan Mudah"
- Subheadline explaining value prop
- CTA button to Cek Legalitas
- Illustration/gradient background
- Mobile-optimized
```
**File:** `src/components/landing/HeroSection.tsx`

**Update CHECKPOINT:** Mark 1.2.5 as ✅

---

### Task 1.2.6: Create FiturGrid
```
Create 4 feature cards:
1. Cek Legalitas (ShieldCheck icon, emerald)
2. Panduan Perizinan (BookOpen icon, blue)
3. Kalkulator Pajak (Calculator icon, amber)
4. Template Surat (FileText icon, rose)

Each card: icon, title, description, link
```
**File:** `src/components/landing/FiturGrid.tsx`

**Update CHECKPOINT:** Mark 1.2.6 as ✅

---

### Task 1.2.7: Create CtaSection
```
Create call-to-action section:
- "Siap Mengurus Legalitas UMKM Anda?"
- Button to /cek-legalitas
- Trust indicators (free, no registration, etc.)
```
**File:** `src/components/landing/CtaSection.tsx`

**Update CHECKPOINT:** Mark 1.2.7 as ✅  
**Mark Phase 1.2 as COMPLETE**

---

## Phase 1.3: Cek Legalitas

### Task 1.3.1: Create Cek Legalitas Page
```
Create page layout:
- Page title & description
- ProgressBar component
- ChecklistLegalitas component
- RekomendasiSection component
```
**File:** `src/app/cek-legalitas/page.tsx`

**Update CHECKPOINT:** Mark 1.3.1 as ✅

---

### Task 1.3.2: Create ProgressBar
```
Create progress indicator:
- Visual bar 0-100%
- Percentage text
- Color: emerald (progress), gray (remaining)
- Animated transition
```
**File:** `src/components/cek-legalitas/ProgressBar.tsx`

**Update CHECKPOINT:** Mark 1.3.2 as ✅

---

### Task 1.3.3: Create ChecklistLegalitas
```
Create checklist with 5 items:
- NIB (Nomor Induk Berusaha)
- NPWP Badan Usaha
- Sertifikat Halal
- IUMK (Izin Usaha Mikro Kecil)
- TDP (Tanda Daftar Perusahaan)

Each: checkbox + label + description
Update UserContext on change
```
**File:** `src/components/cek-legalitas/ChecklistLegalitas.tsx`

**Update CHECKPOINT:** Mark 1.3.3 as ✅

---

### Task 1.3.4: Create RekomendasiSection
```
Create recommendation section:
- Analyze checked items
- Show "Next steps" based on missing items
- Link to relevant Panduan
- Encouraging tone
```
**File:** `src/components/cek-legalitas/RekomendasiSection.tsx`

**Update CHECKPOINT:** Mark 1.3.4 as ✅  
**Mark Phase 1.3 as COMPLETE**

---

## Phase 1.4: Panduan Perizinan

### Task 1.4.1: Verify Panduan Data
```
Ensure src/data/panduan.ts exists with:
- 5 panduan items (NIB, NPWP, IUMK, Sertifikat Halal, TDP)
- Each with: id, judul, deskripsi, icon, estimasiWaktu, biaya, steps, dokumenDiperlukan
```
**File:** `src/data/panduan.ts`

**Update CHECKPOINT:** Mark 1.4.1 as ✅

---

### Task 1.4.2: Create Panduan List Page
```
Create page showing all panduan:
- Grid layout
- Search/filter (optional)
- Each item: card with icon, title, desc, time, cost
```
**File:** `src/app/panduan/page.tsx`

**Update CHECKPOINT:** Mark 1.4.2 as ✅

---

### Task 1.4.3: Create PanduanCard
```
Create card component:
- Icon (Lucide)
- Title
- Short description
- Estimasi waktu badge
- Biaya badge
- Link to detail
```
**File:** `src/components/panduan/PanduanCard.tsx`

**Update CHECKPOINT:** Mark 1.4.3 as ✅

---

### Task 1.4.4: Create Panduan Detail Page
```
Create dynamic route page:
- Fetch panduan by ID
- Show full content
- Include StepTimeline
- Include DocumentChecklist
- Link to official website
```
**File:** `src/app/panduan/[id]/page.tsx`

**Update CHECKPOINT:** Mark 1.4.4 as ✅

---

### Task 1.4.5: Create StepTimeline
```
Create timeline component:
- Vertical timeline
- Step number + title + description
- Tips in callout box
- Checkable steps (optional)
```
**File:** `src/components/panduan/StepTimeline.tsx`

**Update CHECKPOINT:** Mark 1.4.5 as ✅

---

### Task 1.4.6: Create DocumentChecklist
```
Create document list:
- List of required documents
- Checkbox for tracking
- Download template link (if available)
```
**File:** `src/components/panduan/DocumentChecklist.tsx`

**Update CHECKPOINT:** Mark 1.4.6 as ✅  
**Mark Phase 1.4 as COMPLETE**

---

## Phase 1.5: Kalkulator Pajak

### Task 1.5.1: Create Kalkulator Pajak Page
```
Create page layout:
- Title & description
- FormInput component
- HasilKalkulasi component
- RiwayatPajak component
```
**File:** `src/app/kalkulator-pajak/page.tsx`

**Update CHECKPOINT:** Mark 1.5.1 as ✅

---

### Task 1.5.2: Create FormInput
```
Create form with React Hook Form + Zod:
- Omzet (number, rupiah format)
- Biaya Operasional (number, rupiah format)
- Periode (select: bulan/tahun)
- Submit button
- Validation: required, min 0
```
**File:** `src/components/pajak/FormInput.tsx`

**Update CHECKPOINT:** Mark 1.5.2 as ✅

---

### Task 1.5.3: Create HasilKalkulasi
```
Create result display:
- Penghasilan Neto (Omzet - Biaya)
- Tarif Pajak (0.5%)
- Pajak Terutang
- Visual cards with icons
- Color coding
```
**File:** `src/components/pajak/HasilKalkulasi.tsx`

**Update CHECKPOINT:** Mark 1.5.3 as ✅

---

### Task 1.5.4: Create RiwayatPajak
```
Create history table:
- Table with columns: Periode, Omzet, Pajak, Tanggal
- Delete action
- Empty state
- Sort by date (newest first)
```
**File:** `src/components/pajak/RiwayatPajak.tsx`

**Update CHECKPOINT:** Mark 1.5.4 as ✅  
**Mark Phase 1.5 as COMPLETE**

---

## Phase 1.6: Template Surat

### Task 1.6.1: Verify Template Data
```
Ensure src/data/template-surat.ts exists with:
- 4 templates (Pengantar RT, Domisili, Permohonan NIB, Keterangan Usaha)
- Each with: id, nama, deskripsi, icon, fields[], content
```
**File:** `src/data/template-surat.ts`

**Update CHECKPOINT:** Mark 1.6.1 as ✅

---

### Task 1.6.2: Create Template List Page
```
Create page showing all templates:
- Grid layout
- Each: card with icon, title, description
```
**File:** `src/app/template-surat/page.tsx`

**Update CHECKPOINT:** Mark 1.6.2 as ✅

---

### Task 1.6.3: Create TemplateCard
```
Create card component:
- Icon
- Title
- Description
- "Buat Surat" button
```
**File:** `src/components/surat/TemplateCard.tsx`

**Update CHECKPOINT:** Mark 1.6.3 as ✅

---

### Task 1.6.4: Create SuratForm
```
Create dynamic form:
- Generate fields from template data
- Support: text, textarea, date, select
- Validation with Zod
- Submit to generate preview
```
**File:** `src/components/surat/SuratForm.tsx`

**Update CHECKPOINT:** Mark 1.6.4 as ✅

---

### Task 1.6.5: Create PdfPreview
```
Create preview + download:
- Show formatted letter preview
- Replace {{variables}} with form data
- Download as PDF (jsPDF)
- Save to history (SuratEntry)
```
**File:** `src/components/surat/PdfPreview.tsx`

**Update CHECKPOINT:** Mark 1.6.5 as ✅

---

### Task 1.6.6: Create Template Detail Page
```
Create dynamic route:
- Fetch template by ID
- Show SuratForm
- Show PdfPreview on submit
```
**File:** `src/app/template-surat/[id]/page.tsx`

**Update CHECKPOINT:** Mark 1.6.6 as ✅  
**Mark Phase 1.6 as COMPLETE**

---

## Phase 1.7: Dashboard & Profil

### Task 1.7.1: Create Dashboard Page
```
Create dashboard layout:
- Welcome message with user name
- ProgressOverview
- StatusCards
- Quick links to features
```
**File:** `src/app/dashboard/page.tsx`

**Update CHECKPOINT:** Mark 1.7.1 as ✅

---

### Task 1.7.2: Create ProgressOverview
```
Create progress visualization:
- Circular or linear progress
- Percentage text
- "X dari 5 izin sudah lengkap"
- Color based on progress
```
**File:** `src/components/dashboard/ProgressOverview.tsx`

**Update CHECKPOINT:** Mark 1.7.2 as ✅

---

### Task 1.7.3: Create StatusCards
```
Create status cards:
- 5 cards (NIB, NPWP, Halal, IUMK, TDP)
- Each: icon, name, status (✅/❌), action link
```
**File:** `src/components/dashboard/StatusCards.tsx`

**Update CHECKPOINT:** Mark 1.7.3 as ✅

---

### Task 1.7.4: Create Profil Page
```
Create profile page:
- Form with React Hook Form + Zod
- Fields: namaUsaha, pemilik, alamat, jenisUsaha, skalaUsaha
- Save to UserContext
```
**File:** `src/app/profil/page.tsx`

**Update CHECKPOINT:** Mark 1.7.4 as ✅

---

### Task 1.7.5: Create FormProfil
```
Create profile form:
- Text inputs
- Select for jenisUsaha (from constants)
- Select for skalaUsaha (from constants)
- Save button with loading state
- Success toast
```
**File:** `src/components/profil/FormProfil.tsx`

**Update CHECKPOINT:** Mark 1.7.5 as ✅  
**Mark Phase 1.7 as COMPLETE**

---

## Phase 1.8: Polish & Final

### Task 1.8.1: Add Loading States
```
Add to all pages:
- Skeleton screens or spinners
- Loading button states
- Suspense boundaries
```
**Files:** All page.tsx files

**Update CHECKPOINT:** Mark 1.8.1 as ✅

---

### Task 1.8.2: Add Toast Notifications
```
Add toast for:
- Save success
- Error messages
- Form validation errors
- Action confirmations
```
**Files:** All interactive components

**Update CHECKPOINT:** Mark 1.8.2 as ✅

---

### Task 1.8.3: Responsive Check
```
Test all breakpoints:
- 320px (small phone)
- 375px (iPhone SE)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

Fix any overflow, truncation, or layout issues.
```
**Files:** All components

**Update CHECKPOINT:** Mark 1.8.3 as ✅

---

### Task 1.8.4: Error Handling
```
Add error boundaries:
- Global error boundary
- 404 page
- Fallback UI for failed components
- Try/catch in all client logic
```
**Files:** `src/app/error.tsx`, `src/app/not-found.tsx`

**Update CHECKPOINT:** Mark 1.8.4 as ✅

---

### Task 1.8.5: Update README
```
Write comprehensive README:
- Project description
- Features list
- Tech stack
- Installation guide
- Usage guide
- Screenshots (placeholder)
- Contributing guide
- License
```
**File:** `README.md`

**Update CHECKPOINT:** Mark 1.8.5 as ✅

---

### Task 1.8.6: Final Build Test
```
Run:
npm run build
```
Must pass with 0 errors and 0 warnings.

**Update CHECKPOINT:** Mark 1.8.6 as ✅  
**Mark Phase 1.8 as COMPLETE**  
**Mark Phase 1 as COMPLETE**  
**Notify user: "Phase 1 complete! Ready for Phase 2?"**

---

## Phase 2: Micro-Capital & Financial Management

> **STATUS:** 🔒 LOCKED  
> **Prerequisite:** Phase 1 100% complete  
> **Gate:** NIB + NPWP verification system

### Phase 2.1: Backend Setup
- Supabase project setup
- Database schema design
- Authentication system
- Row Level Security (RLS)

### Phase 2.2: Crowdfunding
- Campaign creation
- Campaign listing
- Investment flow
- Escrow system

### Phase 2.3: Financial Dashboard
- Income/expense tracking
- Charts and reports
- Budgeting
- Forecasting

### Phase 2.4: Micro-Loan
- Loan application
- Lender matching
- Repayment schedule
- Credit scoring

### Phase 2.5: Community Pool
- Arisan digital
- Group savings
- Emergency fund

### Phase 2.6: Polish
- Security audit
- Performance optimization
- Production deployment

---

## Agent Reminders

1. **After EVERY task:** Update CHECKPOINT.md
2. **After EVERY phase:** Run `npm run build` to verify
3. **If build fails:** Fix before proceeding
4. **If stuck:** Ask user, don't guess
5. **Keep it simple:** Don't over-engineer
6. **Test on mobile:** Always check 320px width
