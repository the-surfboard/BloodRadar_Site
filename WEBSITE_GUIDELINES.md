# BloodRadar Website Guidelines & Truecaller Setup Blueprint

> **Purpose:** This document provides the complete structural blueprint, design guidelines, Truecaller SDK verification rules, and technical standards for the `bloodradar_site` project located at `c:\Projects\bloodradar_site`.

---

## 1. Project Overview & Truecaller Verification Goal

To enable zero-OTP **Truecaller SDK Authentication** in the BloodRadar mobile app and pass production app review, Truecaller requires a verified application landing page containing:
1. **Official Privacy Policy URL** (`/privacy.html`) explicitly detailing Truecaller SDK data usage.
2. **Official Terms of Service URL** (`/terms.html`) detailing voluntary, unpaid NACO donor compliance.
3. **App Showcase & Download Badges**: Google Play Store and Apple App Store badges positioned directly above the footer.
4. **Branding Alignment**: UI/UX must match the BloodRadar mobile app aesthetic 100%.

---

## 2. Directory Structure (`c:\Projects\bloodradar_site`)

```
c:\Projects\bloodradar_site\
├── index.html              # Main landing page (Hero, 2-Tier Pipeline, Calculator, Badges)
├── privacy.html            # Privacy Policy for Truecaller & Play Store Verification
├── terms.html              # Terms of Service & Voluntary Donor Liability Disclaimer
├── WEBSITE_GUIDELINES.md   # This master guideline document
├── MASTER_PROMPT.md        # AI prompt for extending or rebuilding the site
├── css\
│   └── styles.css          # Design system CSS (Crimson #FF3B30, Glassmorphism, Responsive)
├── js\
│   └── app.js              # Interactive radar, smooth scroll, compatibility calculator
└── assets\
    ├── images\
    │   ├── logo.webp
    │   ├── red_transparent.webp
    │   └── white_transparent.webp
    └── badges\
        ├── google-play-badge.svg
        └── app-store-badge.svg
```

---

## 3. Design System & Aesthetics (Apple x Google Hybrid)

Every page must strictly adhere to the following visual standards:

### 3.1 Color Palette
- **Brand Crimson Primary:** `#FF3B30` (Hover: `#E02D22`, Light Tint: `rgba(255, 59, 48, 0.08)`)
- **Dark Slate Backgrounds:** `#0F172A` (Cards: `#1E293B`)
- **Light Surface Backgrounds:** `#FAFAFC` (Cards: `#FFFFFF`)
- **Accent Emerald:** `#10B981` (Active Lifeline status)
- **Text:** Slate Dark `#0F172A`, Slate Muted `#64748B`, Light `#F8FAFC`

### 3.2 Typography
- **Headings (H1–H4):** `Outfit`, sans-serif (Font Weight: 800, tight letter-spacing).
- **Body & Microcopy:** `Inter`, sans-serif (Font Weight: 400/500/600).

### 3.3 UI Components & Micro-Interactions
- **Radar Visual:** Pulsing rings with a 360° radar sweep animation showcasing live donor nodes (`A+`, `O-`, `AB+`).
- **Store Badges:** High-contrast Google Play and App Store SVG badges placed in a dedicated store section above the footer.
- **Glassmorphism Nav:** Sticky header with `backdrop-filter: blur(16px)` and translucent background.

---

## 4. Truecaller SDK Privacy Verification Checklist

When submitting your Truecaller developer application:
1. Provide Privacy Policy URL: `https://your-domain.com/privacy.html`
2. Ensure Section 2 of `privacy.html` contains:
   - Clear declaration of Truecaller OAuth phone number verification.
   - Commitment to zero third-party data selling.
   - Description of encrypted phone number storage.
3. Provide Terms of Service URL: `https://your-domain.com/terms.html`

---

## 5. Technical Do's and Don'ts

### ✅ DO:
- Keep the site lightweight, fast, and 100% responsive across mobile, tablet, and desktop.
- Maintain absolute visual parity with the Flutter mobile app.
- Ensure all download buttons and navigation anchors smooth scroll or link directly to store/privacy targets.

### ❌ DON'T:
- Never use generic placeholder images or broken asset paths.
- Never add commercial/paid blood donation ads — BloodRadar is 100% voluntary & non-commercial.
- Do not use heavy JS frameworks (React/Vue) if plain Vanilla HTML/CSS/JS delivers sub-second load times.
