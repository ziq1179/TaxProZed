/**
 * Pakistan Salary Tax Calculator
 * Implements FBR tax slabs for salaried individuals (2014-2027)
 * High-income surcharge: 9% on total tax when income exceeds Rs. 10 million (2025-26+)
 */

export type TaxYear = number;

export interface TaxBracket {
  min: number;
  max: number;
  fixed: number;
  rate: number;
}

export interface TaxSlabConfig {
  year: TaxYear;
  exemptionLimit: number;
  brackets: TaxBracket[];
  surchargeThreshold?: number;
  surchargeRate?: number;
}

const TAX_SLABS: Record<string, TaxSlabConfig> = {
  "2026": {
    year: 2026,
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
  "2021": {
    year: 2021,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.05 },
      { min: 1_200_001, max: 1_800_000, fixed: 30_000, rate: 0.1 },
      { min: 1_800_001, max: 2_500_000, fixed: 90_000, rate: 0.15 },
      { min: 2_500_001, max: 3_500_000, fixed: 195_000, rate: 0.175 },
      { min: 3_500_001, max: 5_000_000, fixed: 370_000, rate: 0.2 },
      { min: 5_000_001, max: 8_000_000, fixed: 670_000, rate: 0.225 },
      { min: 8_000_001, max: 12_000_000, fixed: 1_345_000, rate: 0.25 },
      { min: 12_000_001, max: 30_000_000, fixed: 2_345_000, rate: 0.275 },
      { min: 30_000_001, max: 50_000_000, fixed: 7_295_000, rate: 0.3 },
      { min: 50_000_001, max: 75_000_000, fixed: 13_295_000, rate: 0.325 },
      { min: 75_000_001, max: Infinity, fixed: 21_420_000, rate: 0.35 },
    ],
  },
  "2020": {
    year: 2020,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.05 },
      { min: 1_200_001, max: 1_800_000, fixed: 30_000, rate: 0.1 },
      { min: 1_800_001, max: 2_500_000, fixed: 90_000, rate: 0.15 },
      { min: 2_500_001, max: 3_500_000, fixed: 195_000, rate: 0.175 },
      { min: 3_500_001, max: 5_000_000, fixed: 370_000, rate: 0.2 },
      { min: 5_000_001, max: 8_000_000, fixed: 670_000, rate: 0.225 },
      { min: 8_000_001, max: 12_000_000, fixed: 1_345_000, rate: 0.25 },
      { min: 12_000_001, max: 30_000_000, fixed: 2_345_000, rate: 0.275 },
      { min: 30_000_001, max: 50_000_000, fixed: 7_295_000, rate: 0.3 },
      { min: 50_000_001, max: 75_000_000, fixed: 13_295_000, rate: 0.325 },
      { min: 75_000_001, max: Infinity, fixed: 21_420_000, rate: 0.35 },
    ],
  },
  "2019": {
    year: 2019,
    exemptionLimit: 600_000,
    brackets: [
      { min: 0, max: 600_000, fixed: 0, rate: 0 },
      { min: 600_001, max: 1_200_000, fixed: 0, rate: 0.05 },
      { min: 1_200_001, max: 1_800_000, fixed: 30_000, rate: 0.1 },
      { min: 1_800_001, max: 2_500_000, fixed: 90_000, rate: 0.15 },
      { min: 2_500_001, max: 3_500_000, fixed: 195_000, rate: 0.175 },
      { min: 3_500_001, max: 5_000_000, fixed: 370_000, rate: 0.2 },
      { min: 5_000_001, max: 8_000_000, fixed: 670_000, rate: 0.225 },
      { min: 8_000_001, max: 12_000_000, fixed: 1_345_000, rate: 0.25 },
      { min: 12_000_001, max: 30_000_000, fixed: 2_345_000, rate: 0.275 },
      { min: 30_000_001, max: 50_000_000, fixed: 7_295_000, rate: 0.3 },
      { min: 50_000_001, max: 75_000_000, fixed: 13_295_000, rate: 0.325 },
      { min: 75_000_001, max: Infinity, fixed: 21_420_000, rate: 0.35 },
    ],
  },
  "2018": {
    year: 2018,
    exemptionLimit: 400_000,
    brackets: [
      { min: 0, max: 400_000, fixed: 0, rate: 0 },
      { min: 400_001, max: 800_000, fixed: 1_000, rate: 0 },
      { min: 800_001, max: 1_200_000, fixed: 2_000, rate: 0 },
      { min: 1_200_001, max: 2_500_000, fixed: 2_000, rate: 0.05 },
      { min: 2_500_001, max: 4_000_000, fixed: 65_000, rate: 0.15 },
      { min: 4_000_001, max: 8_000_000, fixed: 290_000, rate: 0.2 },
      { min: 8_000_001, max: Infinity, fixed: 1_090_000, rate: 0.25 },
    ],
  },
  "2017": {
    year: 2017,
    exemptionLimit: 400_000,
    brackets: [
      { min: 0, max: 400_000, fixed: 0, rate: 0 },
      { min: 400_001, max: 500_000, fixed: 0, rate: 0.02 },
      { min: 500_001, max: 750_000, fixed: 2_000, rate: 0.05 },
      { min: 750_001, max: 1_400_000, fixed: 14_500, rate: 0.1 },
      { min: 1_400_001, max: 1_500_000, fixed: 79_500, rate: 0.12 },
      { min: 1_500_001, max: 1_800_000, fixed: 92_000, rate: 0.15 },
      { min: 1_800_001, max: 2_500_000, fixed: 137_000, rate: 0.175 },
      { min: 2_500_001, max: 3_000_000, fixed: 259_500, rate: 0.2 },
      { min: 3_000_001, max: 3_500_000, fixed: 359_500, rate: 0.225 },
      { min: 3_500_001, max: 4_000_000, fixed: 472_000, rate: 0.25 },
      { min: 4_000_001, max: 7_000_000, fixed: 597_000, rate: 0.275 },
      { min: 7_000_001, max: Infinity, fixed: 1_422_000, rate: 0.3 },
    ],
  },
  "2016": {
    year: 2016,
    exemptionLimit: 400_000,
    brackets: [
      { min: 0, max: 400_000, fixed: 0, rate: 0 },
      { min: 400_001, max: 500_000, fixed: 0, rate: 0.02 },
      { min: 500_001, max: 750_000, fixed: 2_000, rate: 0.05 },
      { min: 750_001, max: 1_400_000, fixed: 14_500, rate: 0.1 },
      { min: 1_400_001, max: 1_500_000, fixed: 79_500, rate: 0.125 },
      { min: 1_500_001, max: 1_800_000, fixed: 92_000, rate: 0.15 },
      { min: 1_800_001, max: 2_500_000, fixed: 137_000, rate: 0.175 },
      { min: 2_500_001, max: 3_000_000, fixed: 259_500, rate: 0.2 },
      { min: 3_000_001, max: 3_500_000, fixed: 359_500, rate: 0.225 },
      { min: 3_500_001, max: 4_000_000, fixed: 472_000, rate: 0.25 },
      { min: 4_000_001, max: 7_000_000, fixed: 597_000, rate: 0.275 },
      { min: 7_000_001, max: Infinity, fixed: 1_422_000, rate: 0.3 },
    ],
  },
  "2015": {
    year: 2015,
    exemptionLimit: 400_000,
    brackets: [
      { min: 0, max: 400_000, fixed: 0, rate: 0 },
      { min: 400_001, max: 500_000, fixed: 0, rate: 0.02 },
      { min: 500_001, max: 750_000, fixed: 2_000, rate: 0.05 },
      { min: 750_001, max: 1_400_000, fixed: 14_500, rate: 0.1 },
      { min: 1_400_001, max: 1_500_000, fixed: 79_500, rate: 0.125 },
      { min: 1_500_001, max: 1_800_000, fixed: 92_000, rate: 0.15 },
      { min: 1_800_001, max: 2_500_000, fixed: 137_000, rate: 0.175 },
      { min: 2_500_001, max: 3_000_000, fixed: 259_500, rate: 0.2 },
      { min: 3_000_001, max: 3_500_000, fixed: 359_500, rate: 0.225 },
      { min: 3_500_001, max: 4_000_000, fixed: 472_000, rate: 0.25 },
      { min: 4_000_001, max: 7_000_000, fixed: 597_000, rate: 0.275 },
      { min: 7_000_001, max: Infinity, fixed: 1_422_000, rate: 0.3 },
    ],
  },
  "2014": {
    year: 2014,
    exemptionLimit: 400_000,
    brackets: [
      { min: 0, max: 400_000, fixed: 0, rate: 0 },
      { min: 400_001, max: 750_000, fixed: 0, rate: 0.05 },
      { min: 750_001, max: 1_400_000, fixed: 17_500, rate: 0.1 },
      { min: 1_400_001, max: 1_500_000, fixed: 82_000, rate: 0.125 },
      { min: 1_500_001, max: 1_800_000, fixed: 95_000, rate: 0.15 },
      { min: 1_800_001, max: 2_500_000, fixed: 140_000, rate: 0.175 },
      { min: 2_500_001, max: 3_000_000, fixed: 262_500, rate: 0.2 },
      { min: 3_000_001, max: 3_500_000, fixed: 362_500, rate: 0.225 },
      { min: 3_500_001, max: 4_000_000, fixed: 475_000, rate: 0.25 },
      { min: 4_000_001, max: 7_000_000, fixed: 600_000, rate: 0.275 },
      { min: 7_000_001, max: Infinity, fixed: 1_425_000, rate: 0.3 },
    ],
  },
};

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

export const SUPPORTED_YEARS: TaxYear[] = [
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
];
