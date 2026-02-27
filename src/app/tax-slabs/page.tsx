import Link from "next/link";
import { SUPPORTED_YEARS, getTaxSlab } from "@/lib/taxCalculator";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const metadata = {
  title: "Income Tax Slabs (2014-2026) | TaxPro Pakistan",
  description: "Complete reference of Pakistan FBR income tax slabs for salaried individuals from 2014 to 2026.",
};

export default function TaxSlabsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      <h1 className="mb-4 text-3xl font-bold text-slate-900">
        Pakistan Income Tax Slabs (2014–2026)
      </h1>
      <p className="mb-12 text-lg text-slate-600">
        Complete reference of FBR income tax slabs for salaried individuals. All rates are official and updated annually.
      </p>

      <div className="space-y-12">
        {SUPPORTED_YEARS.slice().reverse().map((year) => {
          const slab = getTaxSlab(year);
          return (
            <div
              key={year}
              className="rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
            >
              <h2 className="mb-4 text-2xl font-semibold text-slate-800">
                FY {year}-{String(year + 1).slice(-2)}
              </h2>
              <p className="mb-4 text-sm text-slate-600">
                Tax-free threshold: <strong>{formatCurrency(slab.exemptionLimit)}</strong> annually
                {slab.surchargeThreshold && (
                  <>
                    {" | "}
                    High-income surcharge: <strong>{(slab.surchargeRate! * 100).toFixed(0)}%</strong> above {formatCurrency(slab.surchargeThreshold)}
                  </>
                )}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b-2 border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Annual Income Range
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Tax Formula
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {slab.brackets.map((bracket, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-800">
                          {bracket.max === Infinity
                            ? `Above ${formatCurrency(bracket.min)}`
                            : `${formatCurrency(bracket.min + 1)} – ${formatCurrency(bracket.max)}`}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {bracket.rate === 0 && bracket.fixed === 0
                            ? "Tax-free"
                            : bracket.rate === 0
                            ? `Fixed ${formatCurrency(bracket.fixed)}`
                            : `${formatCurrency(bracket.fixed)} + ${(bracket.rate * 100).toFixed(1)}% of excess`}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-slate-800">
                          {bracket.rate === 0 ? "0%" : `${(bracket.rate * 100).toFixed(1)}%`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border-l-4 border-emerald-500 bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          Calculate Your Tax Now
        </h2>
        <p className="mb-4 text-slate-600">
          Use our calculator to instantly compute your salary tax for any year.
        </p>
        <Link
          href="/#calculator"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Go to Calculator
        </Link>
      </div>
    </div>
  );
}
