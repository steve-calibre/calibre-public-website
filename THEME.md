# Calibre Design System — Polaris Theme

Design tokens and CSS extracted from the Polaris production app. Use this as the single source of truth for brand consistency across Calibre properties.

---

## CSS Custom Properties

Copy this block into your global stylesheet to use Polaris tokens:

```css
:root {
  /* ─── Brand / Primary (Navy) ─── */
  --color-primary-50:  #e8eef3;
  --color-primary-100: #d1dde7;
  --color-primary-200: #a3bacf;
  --color-primary-300: #7598b7;
  --color-primary-400: #47759f;
  --color-primary-500: #00305f;   /* Logo navy — main brand color */
  --color-primary-600: #002b56;
  --color-primary-700: #00264c;
  --color-primary-800: #001d39;
  --color-primary-900: #001326;

  /* ─── Neutrals ─── */
  --color-neutral-50:  #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* ─── Semantic ─── */
  --color-success:  #16a34a;  /* green-600 */
  --color-warning:  #d97706;  /* amber-600 */
  --color-danger:   #dc2626;  /* red-600 */
  --color-info:     #2563eb;  /* blue-600 */

  /* ─── Surface / Form ─── */
  --color-surface-input:       #f6f7fc;
  --color-border-input:        #edeff7;
  --color-text-label:          #6e7180;
  --color-text-placeholder:    #9da2b3;
  --color-text-body:           #18181a;

  /* ─── Typography ─── */
  --font-family: 'Manrope', -apple-system, BlinkMacSystemFont,
                 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  --font-weight-normal:    400;
  --font-weight-medium:    500;
  --font-weight-semibold:  600;
  --font-weight-bold:      700;
  --font-weight-extrabold: 800;
  --letter-spacing-tight:  -0.02em;
  --letter-spacing-snug:   -0.01em;

  /* ─── Border Radius ─── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* ─── Shadows ─── */
  --shadow-sm:      0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md:      0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg:      0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl:      0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-soft:    0 2px 8px rgba(0, 48, 95, 0.08);
  --shadow-hover:   0 4px 12px rgba(0, 48, 95, 0.12);
  --shadow-primary: 0 4px 14px rgba(0, 48, 95, 0.2);

  /* ─── Transitions ─── */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
}
```

---

## Typography

| Element | Size | Weight | Letter Spacing |
|---------|------|--------|----------------|
| h1 | 1.875rem → 2.25rem (md) | 600 | -0.02em |
| h2 | 1.5rem → 1.875rem (md) | 600 | -0.01em |
| h3 | 1.25rem → 1.5rem (md) | 600 | — |
| Body | 0.875rem | 400 | — |
| Label | 0.875rem | 700–800 | — |

**Font import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
```

---

## Gradients

```css
.gradient-primary {
  background: linear-gradient(135deg, #00305f 0%, #001d39 100%);
}

.gradient-light {
  background: linear-gradient(135deg, #336ba3 0%, #00305f 100%);
}

.gradient-subtle {
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
}

.text-gradient-primary {
  background: linear-gradient(to right, var(--color-primary-400), var(--color-primary-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Animations

```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(10px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

@keyframes slide-down {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
```

---

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `--color-primary-500` | white | — | `--color-primary-600`, shadow-md |
| **Secondary** | `#edeff7` | `#18181a` | — | `--color-neutral-300` bg |
| **Outline** | transparent | `--color-primary-700` | 2px `--color-primary-500` | `--color-primary-50` bg |
| **Danger** | `--color-danger` | white | — | darken 10%, shadow-md |
| **Ghost** | transparent | `--color-neutral-700` | — | `--color-neutral-100` bg |

**Sizes:** sm `px-3 py-2`, md `px-5 py-2.5`, lg `px-6 py-3.5`
**Radius:** `--radius-lg` (12px)
**Font weight:** 800 (extrabold)

### Cards

```css
.card {
  background: #ffffff;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-xl);       /* 16px */
  box-shadow: var(--shadow-md);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
.card-header {
  background: var(--gradient-subtle);
  padding: 1.25rem 1.5rem;
}
.card-body {
  padding: 1.25rem 1.5rem;
}
.card-footer {
  background: rgba(250, 250, 250, 0.5);
  padding: 1rem 1.5rem;
}
```

### Inputs

```css
.input {
  background: var(--color-surface-input);
  border: 1px solid var(--color-border-input);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-body);
  transition: all var(--duration-fast) var(--ease-smooth);
}
.input::placeholder {
  color: var(--color-text-placeholder);
  font-weight: var(--font-weight-bold);
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-500);
  border-color: var(--color-primary-500);
}
.input--error {
  border-color: var(--color-danger);
}
```

### Badges

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| **Default** | `#edeff7` | `#6e7180` | `#edeff7` |
| **Primary** | `--color-primary-50` | `--color-primary-700` | `--color-primary-200` |
| **Success** | `#f0fdf4` | `#15803d` | `#bbf7d0` |
| **Warning** | `#fffbeb` | `#a16207` | `#fde68a` |
| **Danger** | `#fef2f2` | `#b91c1c` | `#fecaca` |
| **Info** | `#eff6ff` | `#1d4ed8` | `#bfdbfe` |

Radius: `--radius-full` (pill shape)

### Modals

```css
.modal-backdrop {
  background: rgba(24, 24, 26, 0.48);
  backdrop-filter: blur(12px);
}
.modal {
  border-radius: var(--radius-2xl);       /* 24px */
  box-shadow: 0 48px 96px 0 rgba(24, 24, 26, 0.16);
  animation: scale-in var(--duration-fast) var(--ease-smooth);
}
```

### Glass Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(229, 229, 229, 0.5);
}
```

---

## Tailwind Mapping

If using Tailwind, extend your config with these tokens:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8eef3',
          100: '#d1dde7',
          200: '#a3bacf',
          300: '#7598b7',
          400: '#47759f',
          500: '#00305f',
          600: '#002b56',
          700: '#00264c',
          800: '#001d39',
          900: '#001326',
        },
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont',
               'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft:    '0 2px 8px rgba(0, 48, 95, 0.08)',
        hover:   '0 4px 12px rgba(0, 48, 95, 0.12)',
        primary: '0 4px 14px rgba(0, 48, 95, 0.2)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
}
```

---

## Scrollbar

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--color-neutral-100); }
::-webkit-scrollbar-thumb {
  background: var(--color-neutral-300);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover { background: var(--color-neutral-400); }
```

---

## Design Principles

1. **Navy anchor** — `#00305f` is the brand gravity; everything orbits it
2. **Generous whitespace** — prefer breathing room over density
3. **Smooth motion** — 200–300ms with `cubic-bezier(0.4, 0, 0.2, 1)`
4. **Elevation hierarchy** — shadow scale creates clear depth layers
5. **Semantic color** — green/amber/red/blue for status, never decorative
6. **Accessibility** — visible focus rings, sufficient contrast ratios
