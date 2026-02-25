import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              TaxPro Pakistan
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Tax consultancy & compliance services
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link
              href="#calculator"
              className="text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              Calculator
            </Link>
            <Link
              href="#services"
              className="text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              Services
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              Pricing
            </Link>
            <Link
              href="#consultation"
              className="text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Reference tools: FBR tax cards and tax tables available upon
            request. This calculator is for illustrative purposes; consult a tax
            professional for official filings.
          </p>
        </div>
      </div>
    </footer>
  );
}
