/**
 * Pakistan Salary Tax Calculator
 * Implements FBR tax slabs for salaried individuals (2014-2027)
 * High-income surcharge: 9% on total tax when income exceeds Rs. 10 million (2025-26+)
 */

export type TaxYear = number; // 2014-2027

export interface TaxBracket {
  min: number;
  max: number;
  fixed: number;
  rate: number; // as decimal e.g. 0.11 = 11%
}

export interface TaxSlabConfig {
  year: TaxYear;
  exemptionLimit: number;
  brackets: TaxBracket[];
  surchargeThreshold?: number; // Income above this gets surcharge
  surchargeRate?: number; // e.g. 0.09 = 9%
}

// Tax slabs for supported years (salaried individuals)
const TAX_SLABS: Record<string, TaxSlabConfig> = {
  "2025": {
    year: 2025,
    exemptionLimit: 600_000,
    surchargeThreshold: 10_000_000,
    surchargeRate: 0.09,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.01 },
      { min: 1_200_001, max: 2_200_000, fixed: 6_000, rate: 0.11 },
      { min: 2_200_001, max: 3_200_000, fixed: 116_000, rate: 0.23 },
      { min: 3_200_001, max: 4_100_000, fixed: 346_000, rate: 0.3 },
      { min: 4_100_001, max: Infinity, fixed: 616_000, rate: 0.35 },
    ],
  },
  "2024": {
    year: 2024,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.05 },
      { min: 1_200_001, max: 2_200_000, fixed: 30_000, rate: 0.15 },
      { min: 2_200_001, max: 3_200_000, fixed: 180_000, rate: 0.25 },
      { min: 3_200_001, max: 4_100_000, fixed: 430_000, rate: 0.3 },
      { min: 4_100_001, max: Infinity, fixed: 700_000, rate: 0.35 },
    ],
  },
  "2023": {
    year: 2023,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.025 },
      { min: 1_200_001, max: 2_400_000, fixed: 15_000, rate: 0.125 },
      { min: 2_400_001, max: 3_600_000, fixed: 165_000, rate: 0.225 },
      { min: 3_600_001, max: 6_000_000, fixed: 435_000, rate: 0.275 },
      { min: 6_000_001, max: Infinity, fixed: 1_095_000, rate: 0.35 },
    ],
  },
  "2022": {
    year: 2022,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.025 },
      { min: 1_200_001, max: 2_400_000, fixed: 15_000, rate: 0.125 },
      { min: 2_400_001, max: 3_600_000, fixed: 165_000, rate: 0.2 },
      { min: 3_600_001, max: 6_000_000, fixed: 405_000, rate: 0.25 },
      { min: 6_000_001, max: 12_000_000, fixed: 1_005_000, rate: 0.325 },
      { min: 12_000_001, max: Infinity, fixed: 2_955_000, rate: 0.35 },
    ],
  },
};

// Fallback slab for years without explicit config (uses 2025-26 structure)
const DEFAULT_SLAB = TAX_SLABS["2025"];

export function getTaxSlab(year: TaxYear): TaxSlabConfig {
  const key = String(year);
  return TAX_SLABS[key] ?? DEFAULT_SLAB;
}

export function calculateAnnualTax(
  annualIncome: number,
  year: TaxYear
): { tax: number; surcharge: number; totalTax: number } {
  if (annualIncome <= 0) return { tax: 0, surcharge: 0, totalTax: 0 };

  const slab = getTaxSlab(year);
  let tax = 0;

  for (const bracket of slab.brackets) {
    if (annualIncome > bracket.max) {
      tax = bracket.fixed + (bracket.max - bracket.min) * bracket.rate;
    } else if (annualIncome > bracket.min) {
      tax = bracket.fixed + (annualIncome - bracket.min) * bracket.rate;
      break;
    }
  }

  let surcharge = 0;
  if (
    slab.surchargeThreshold &&
    slab.surchargeRate &&
    annualIncome > slab.surchargeThreshold
  ) {
    surcharge = tax * slab.surchargeRate;
  }

  return {
    tax,
    surcharge,
    totalTax: tax + surcharge,
  };
}

export interface TaxCalculationResult {
  monthlyIncome: number;
  yearlyIncome: number;
  yearlyTax: number;
  yearlySurcharge: number;
  yearlyTaxTotal: number;
  monthlyTax: number;
  yearlyIncomeAfterTax: number;
  monthlyIncomeAfterTax: number;
  year: TaxYear;
}

export function calculateSalaryTax(
  monthlyIncome: number,
  year: TaxYear
): TaxCalculationResult | null {
  if (monthlyIncome <= 0) return null;

  const yearlyIncome = monthlyIncome * 12;
  const { tax, surcharge, totalTax } = calculateAnnualTax(yearlyIncome, year);

  return {
    monthlyIncome,
    yearlyIncome,
    yearlyTax: tax,
    yearlySurcharge: surcharge,
    yearlyTaxTotal: totalTax,
    monthlyTax: totalTax / 12,
    yearlyIncomeAfterTax: yearlyIncome - totalTax,
    monthlyIncomeAfterTax: (yearlyIncome - totalTax) / 12,
    year,
  };
}

export const SUPPORTED_YEARS: TaxYear[] = [2022, 2023, 2024, 2025];
