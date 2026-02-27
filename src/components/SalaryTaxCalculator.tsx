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
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string>("");

  const result = useMemo(() => {
    const income = parseFloat(monthlyIncome.replace(/,/g, ""));
    if (isNaN(income) || income <= 0) return null;
    
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 200);
    
    return calculateSalaryTax(income, selectedYear);
  }, [monthlyIncome, selectedYear]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setMonthlyIncome(raw);
    setError("");
    
    if (raw && parseFloat(raw) <= 0) {
      setError("Please enter a valid amount greater than 0");
    }
  };

  return (
    <section
      id="calculator"
      className="rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Calculate Your Salary Tax (FBR 2025–26)
      </h2>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="year-select"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Choose Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as TaxYear)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
            className="mb-2 block text-sm font-medium text-slate-600"
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
            className={`w-full rounded-lg border ${
              error ? "border-red-300" : "border-slate-300"
            } bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {isCalculating && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        </div>
      )}

      {!isCalculating && result && (
        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-600">
            Results
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500">
                Yearly Income
              </span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(result.yearlyIncome)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500">
                Yearly Tax
              </span>
              <span className="font-semibold text-red-600">
                {formatCurrency(result.yearlyTax)}
              </span>
            </div>
            {result.yearlySurcharge > 0 && (
              <div className="flex justify-between sm:flex-col sm:gap-0.5">
                <span className="text-slate-500">
                  High-Income Surcharge (9%)
                </span>
                <span className="font-semibold text-amber-600">
                  {formatCurrency(result.yearlySurcharge)}
                </span>
              </div>
            )}
            <div className="flex justify-between sm:flex-col sm:gap-0.5">
              <span className="text-slate-500">
                Monthly Tax
              </span>
              <span className="font-semibold text-red-600">
                {formatCurrency(result.monthlyTax)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5 sm:col-span-2">
              <span className="text-slate-500">
                Salary After Tax (Yearly)
              </span>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(result.yearlyIncomeAfterTax)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-0.5 sm:col-span-2">
              <span className="text-slate-500">
                Salary After Tax (Monthly)
              </span>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(result.monthlyIncomeAfterTax)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
