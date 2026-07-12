# 🎨 Design Bridge: Open Design → OpenCode

> **Purpose:** Connect Open Design output to OpenCode Agent implementation  
> **Workflow:** Design (Open Design) → Bridge (this file) → Code (OpenCode)

---

## 🔄 Integration Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   OPEN DESIGN   │────▶│  DESIGN-BRIDGE  │────▶│  OPENCODE AGENT │
│   (AI Designer) │     │   (This File)   │     │  (AI Developer) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   - HTML preview         - Design tokens         - Next.js code
   - CSS styles           - Component map        - shadcn/ui
   - Color tokens         - Spacing scale        - Tailwind
   - Layout structure      - Typography           - Logic
```

---

## 🎯 How to Use

### Step 1: Export from Open Design
After generating design in Open Design:
1. Click "Export" → "Design Tokens"
2. Save to project folder as `design-tokens.json`
3. Export HTML preview as `design-preview.html`

### Step 2: Update This File
Copy design tokens from Open Design output into sections below.

### Step 3: Run OpenCode
```bash
opencode --file AGENT.md --file DESIGN-BRIDGE.md "Implement design from Open Design"
```

---

## 🎨 Design Tokens (From Open Design)

### Colors
```css
/* Primary */
--color-primary: #059669;        /* Emerald 600 */
--color-primary-light: #34D399;  /* Emerald 400 */
--color-primary-dark: #047857;   /* Emerald 700 */

/* Background */
--color-bg: #F9FAFB;             /* Gray 50 */
--color-bg-card: #FFFFFF;        /* White */
--color-bg-hover: #F3F4F6;       /* Gray 100 */

/* Text */
--color-text-primary: #1E293B;   /* Slate 800 */
--color-text-secondary: #64748B; /* Slate 500 */
--color-text-muted: #94A3B8;     /* Slate 400 */

/* Accent */
--color-accent: #F59E0B;         /* Amber 500 */
--color-accent-light: #FCD34D; /* Amber 300 */

/* Semantic */
--color-success: #10B981;        /* Emerald 500 */
--color-warning: #F59E0B;        /* Amber 500 */
--color-error: #EF4444;          /* Red 500 */
--color-info: #3B82F6;           /* Blue 500 */
```

### Typography
```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Spacing
```css
/* Base unit: 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## 🧩 Component Mapping

### Open Design Component → shadcn/ui

| Open Design | shadcn/ui | Tailwind Class |
|-------------|-----------|----------------|
| Button Primary | `Button` | `bg-emerald-600 text-white` |
| Button Secondary | `Button` variant | `bg-gray-100 text-gray-800` |
| Card | `Card` | `bg-white rounded-lg shadow-md` |
| Input | `Input` | `border-gray-300 rounded-md` |
| Select | `Select` | `border-gray-300 rounded-md` |
| Checkbox | `Checkbox` | `border-gray-300 text-emerald-600` |
| Dialog | `Dialog` | `bg-white rounded-xl shadow-xl` |
| Toast | `Toast` | `bg-gray-800 text-white rounded-lg` |
| Progress | `Progress` | `bg-emerald-600` |
| Badge | `Badge` | `bg-emerald-100 text-emerald-700` |

### Custom Components (Not in shadcn/ui)

| Component | Description | File |
|-----------|-------------|------|
| `ProgressBar` | Circular/linear progress | `src/components/cek-legalitas/ProgressBar.tsx` |
| `StepTimeline` | Vertical step timeline | `src/components/panduan/StepTimeline.tsx` |
| `PdfPreview` | PDF preview modal | `src/components/surat/PdfPreview.tsx` |
| `FiturCard` | Feature card with icon | `src/components/landing/FiturGrid.tsx` |

---

## 📐 Layout Structure (From Open Design)

### Landing Page
```
┌─────────────────────────────────────┐
│  Navbar (sticky, mobile hamburger)  │
├─────────────────────────────────────┤
│                                     │
│  HeroSection                        │
│  - Headline                         │
│  - Subheadline                      │
│  - CTA Button                       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  FiturGrid (4 cards)                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │ Cek  │ │Panduan│ │Pajak │ │Surat ││
│  │Legal │ │       │ │      │ │      ││
│  └──────┘ └──────┘ └──────┘ └──────┘│
│                                     │
├─────────────────────────────────────┤
│                                     │
│  CtaSection                         │
│  - "Siap mulai?"                    │
│  - Button to /cek-legalitas         │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### Cek Legalitas Page
```
┌─────────────────────────────────────┐
│  Navbar                             │
├─────────────────────────────────────┤
│                                     │
│  Page Title: "Cek Status Legalitas" │
│                                     │
│  ProgressBar (0-100%)               │
│  ████████████░░░░░░ 60%             │
│                                     │
│  ChecklistLegalitas                 │
│  ☐ NIB                              │
│  ☐ NPWP                             │
│  ☐ Sertifikat Halal                 │
│  ☐ IUMK                             │
│  ☐ TDP                              │
│                                     │
│  RekomendasiSection                 │
│  "Anda perlu mengurus: NIB, NPWP"   │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

---

## 🎨 Animation & Interaction (From Open Design)

### Transitions
```css
/* Default transition */
--transition-default: 150ms ease-in-out;

/* Button hover */
--transition-button: transform 150ms, background-color 150ms;

/* Card hover */
--transition-card: transform 200ms, box-shadow 200ms;

/* Page transition */
--transition-page: opacity 300ms ease-in-out;
```

### Hover States
```css
/* Button Primary */
hover: bg-emerald-700
active: bg-emerald-800

/* Card */
hover: shadow-lg, translateY(-2px)

/* Link */
hover: text-emerald-700, underline
```

### Loading States
```css
/* Skeleton */
.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

/* Spinner */
.spinner {
  border: 3px solid #f3f4f6;
  border-top: 3px solid #059669;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

---

## 📱 Responsive Breakpoints (From Open Design)

```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Layout Changes
| Screen | Layout |
|--------|--------|
| < 640px | Single column, full width cards |
| 640px+ | 2 columns for cards |
| 768px+ | Sidebar + content |
| 1024px+ | Full desktop layout |

---

## 🖼️ Asset Mapping

### Icons (Lucide React)
| Usage | Icon Name |
|-------|-----------|
| Cek Legalitas | `ShieldCheck` |
| Panduan | `BookOpen` |
| Kalkulator Pajak | `Calculator` |
| Template Surat | `FileText` |
| Dashboard | `LayoutDashboard` |
| Profil | `UserCircle` |
| Progress | `TrendingUp` |
| Check | `CheckCircle2` |
| Warning | `AlertCircle` |
| Error | `XCircle` |
| Menu | `Menu` |
| Close | `X` |
| Chevron | `ChevronRight` |
| Download | `Download` |
| Share | `Share2` |

### Images (Placeholder)
| Usage | Source |
|-------|--------|
| Hero background | Gradient or abstract pattern |
| Feature icons | Lucide icons (no images needed) |
| Empty states | Illustration or icon |

---

## 🔗 OpenCode Agent Instructions

When OpenCode reads this file, it MUST:

1. **Use design tokens** from this file (not hardcoded values)
2. **Map components** to shadcn/ui equivalents
3. **Follow layout structure** exactly
4. **Implement animations** as specified
5. **Respect responsive breakpoints**
6. **Use Indonesian text** for all UI

### Example Prompt to OpenCode:
```bash
opencode --file AGENT.md --file DESIGN-BRIDGE.md "Implement the landing page design from Open Design. Use the design tokens, component mapping, and layout structure specified in DESIGN-BRIDGE.md."
```

---

## 📝 Design Export Checklist

After using Open Design, verify:

- [ ] Design tokens exported (colors, typography, spacing)
- [ ] Component list generated
- [ ] Layout structure documented
- [ ] Animation specs included
- [ ] Responsive breakpoints defined
- [ ] Asset list created
- [ ] Accessibility notes added

---

**Version:** 1.0.0  
**Last Updated:** 2026-07-09  
**Open Design Version:** v0.14.0  
**OpenCode Version:** Latest
