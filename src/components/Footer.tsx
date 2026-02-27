import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#e0e8f7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="font-semibold text-blue-700">
              TaxPro Pakistan
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Tax consultancy & compliance services
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link
              href="/#calculator"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              Calculator
            </Link>
            <Link
              href="/tax-slabs"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              Tax Slabs
            </Link>
            <Link
              href="/faq"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              FAQ
            </Link>
            <Link
              href="/#consultation"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            Reference tools: FBR tax cards and tax tables available upon
            request. This calculator is for illustrative purposes; consult a tax
            professional for official filings.
          </p>
        </div>
      </div>
    </footer>
  );
}
