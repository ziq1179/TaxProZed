"use client";

import { useState } from "react";
import { calculateSalaryTax, SUPPORTED_YEARS, type TaxYear } from "@/lib/taxCalculator";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TaxComparison() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [compareYears, setCompareYears] = useState<TaxYear[]>([2024, 2025]);
  const [error, setError] = useState<string>("");

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setMonthlyIncome(raw);
    setError("");
  };

  const handleYearToggle = (year: TaxYear) => {
    setCompareYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year].sort((a, b) => a - b)
    );
  };

  const income = parseFloat(monthlyIncome.replace(/,/g, ""));
  const isValid = !isNaN(income) && income > 0;

  const results = isValid
    ? compareYears.map((year) => ({
        year,
        data: calculateSalaryTax(income, year)!,
      }))
    : [];

  const savings = results.length === 2
    ? results[0].data.yearlyTaxTotal - results[1].data.yearlyTaxTotal
    : 0;

  return (
    <section
      id="comparison"
      className="rounded-2xl border-l-4 border-indigo-500 bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Compare Tax Across Years
      </h2>

      <div className="mb-6">
        <label
          htmlFor="compare-income"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          Monthly Income (PKR)
        </label>
        <input
          id="compare-income"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 150000"
          value={monthlyIncome}
          onChange={handleIncomeChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-600">
          Select years to compare (choose 2-4):
        </p>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_YEARS.slice().reverse().map((year) => (
            <button
              key={year}
              onClick={() => handleYearToggle(year)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                compareYears.includes(year)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              FY {year}-{String(year + 1).slice(-2)}
            </button>
          ))}
        </div>
      </div>

      {isValid && results.length >= 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ year, data }) => (
              <div
                key={year}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <h3 className="mb-3 font-semibold text-slate-800">
                  FY {year}-{String(year + 1).slice(-2)}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Yearly Tax:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(data.yearlyTaxTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Tax:</span>
                    <span className="font-medium text-slate-800">
                      {formatCurrency(data.monthlyTax)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">After Tax:</span>
                    <span className="font-medium text-emerald-600">
                      {formatCurrency(data.yearlyIncomeAfterTax)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {results.length === 2 && savings !== 0 && (
            <div className={`rounded-xl p-4 text-center ${
              savings > 0 ? "bg-red-50" : "bg-emerald-50"
            }`}>
              <p className="text-sm text-slate-600">
                {savings > 0 ? "You pay more in" : "You save in"} FY {results[1].year}-{String(results[1].year + 1).slice(-2)}:
              </p>
              <p className={`text-2xl font-bold ${
                savings > 0 ? "text-red-600" : "text-emerald-600"
              }`}>
                {formatCurrency(Math.abs(savings))}
              </p>
            </div>
          )}
        </div>
      )}

      {!isValid && monthlyIncome && (
        <p className="text-center text-sm text-slate-500">
          Enter a valid monthly income to see comparison
        </p>
      )}
    </section>
  );
}
