"use client";

import { useState, useMemo } from "react";
import {
  calculateSalaryTax,
  SUPPORTED_YEARS,
  type TaxYear,
} from "@/lib/taxCalculator";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function SalaryTaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<TaxYear>(2025);

  const result = useMemo(() => {
    const income = parseFloat(monthlyIncome.replace(/,/g, ""));
    if (isNaN(income) || income <= 0) return null;
    return calculateSalaryTax(income, selectedYear);
  }, [monthlyIncome, selectedYear]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setMonthlyIncome(raw);
  };

  return (
    <section
      id="calculator"
      className="rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-xl shadow-emerald-950/5 dark:border-emerald-800/40 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
        Calculate Your Salary Tax (FBR 2025–26)
      </h2>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="year-select"
            className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            Choose Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as TaxYear)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            {SUPPORTED_YEARS.map((year) => (
              <option key={year} value={year}>
                FY {year}-{String(year + 1).slice(-2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="monthly-income"
            className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            Monthly Income (PKR)
          </label>
          <input
            id="monthly-income"
            type="text"
            inputMode="decimal"
            placeholder="e.g. 150000"
            value={monthlyIncome}
            onChange={handleIncomeChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Results
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500 dark:text-slate-400">
                Yearly Income
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {formatCurrency(result.yearlyIncome)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500 dark:text-slate-400">
                Yearly Tax
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {formatCurrency(result.yearlyTax)}
              </span>
            </div>
            {result.yearlySurcharge > 0 && (
              <div className="flex justify-between sm:flex-col sm:gap-0.5">
                <span className="text-slate-500 dark:text-slate-400">
                  High-Income Surcharge (9%)
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {formatCurrency(result.yearlySurcharge)}
                </span>
              </div>
            )}
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500 dark:text-slate-400">
                Monthly Tax
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {formatCurrency(result.monthlyTax)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5 sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">
                Salary After Tax (Yearly)
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(result.yearlyIncomeAfterTax)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5 sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">
                Salary After Tax (Monthly)
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(result.monthlyIncomeAfterTax)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
