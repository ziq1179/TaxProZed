# TaxPro Pakistan — Tax Calculator & Consultancy Platform

A comprehensive tax consultancy and calculator platform for Pakistan, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Phase 1–2: Core Calculator
- **Salary Tax Calculator** — Calculate income tax for salaried individuals using FBR-approved slabs (FY 2022–2025)
- **2025–2026 Tax Logic** — Full implementation including:
  - Progressive slabs up to Rs. 4.1M+
  - High-income surcharge (9%) for taxable income above Rs. 10 million
- **Year Selector** — Choose from supported years (2022–2025)
- **Real-time Outputs** — Monthly/yearly tax, salary after tax

### Phase 3: UI/UX
- Year dropdown (2022–2027 range supported)
- Monthly income input with instant calculation
- Results: Monthly tax, yearly tax, salary after tax (monthly & yearly)

### Phase 4: Lead Generation
- **Consultation Form** — Name, Email, Phone, Profession
- **Pricing Transparency** — PKR 5,000 for salary tax return filing (displayed)

### Phase 5: Trust & Content
- Customer testimonials
- Service modules (calculator, company registration, return filing, contracts)
- Newsletter subscription
- Reference to FBR tax cards and tax tables (footer)

## Getting Started

```bash
cd it-webcalc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans & Geist Mono

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── SalaryTaxCalculator.tsx
│   ├── Services.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── ConsultationForm.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
└── lib/
    └── taxCalculator.ts  # Tax slabs & calculation engine
```

## Tax Slabs (2025–2026)

| Taxable Annual Salary | Tax Formula |
|-----------------------|-------------|
| Up to Rs. 600,000 | 0% |
| Rs. 600,001 – Rs. 1,200,000 | 1% of amount exceeding Rs. 600,000 |
| Rs. 1,200,001 – Rs. 2,200,000 | Rs. 6,000 + 11% exceeding Rs. 1,200,000 |
| Rs. 2,200,001 – Rs. 3,200,000 | Rs. 116,000 + 23% exceeding Rs. 2,200,000 |
| Rs. 3,200,001 – Rs. 4,100,000 | Rs. 346,000 + 30% exceeding Rs. 3,200,000 |
| Above Rs. 4,100,000 | Rs. 616,000 + 35% exceeding Rs. 4,100,000 |

**Surcharge:** 9% on total tax if taxable income exceeds Rs. 10 million.

## Future Enhancements

- Multi-tax calculators: PTA tax, AOP/Business tax, SME tax
- Income tax slabs page (dedicated page for slab reference)
- Blog & FAQs
- AI chat integration (e.g., Olleh AI)
- Backend API for form submissions and newsletter
- Company/firm registration and tax appeal modules
