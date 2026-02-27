import Link from "next/link";

const faqs = [
  {
    question: "How is the 9% high-income surcharge calculated?",
    answer:
      "If your taxable income exceeds Rs. 10 million in FY 2025-26, a 9% surcharge is applied to your total tax amount (not your income). For example, if your tax is Rs. 1 million, the surcharge adds Rs. 90,000.",
  },
  {
    question: "What is the tax-free threshold for salaried individuals?",
    answer:
      "For FY 2018-19 onwards, the tax-free threshold is Rs. 600,000 annually (Rs. 50,000 monthly). For FY 2014-15 to 2017-18, it was Rs. 400,000 annually.",
  },
  {
    question: "When is the income tax return filing deadline?",
    answer:
      "The deadline is typically September 30 for salaried individuals. Check the FBR website for the latest updates each year.",
  },
  {
    question: "Can I file my tax return myself?",
    answer:
      "Yes, you can file online via the FBR IRIS portal. However, for complex cases or if you're unsure, consulting a tax professional is recommended.",
  },
  {
    question: "What documents do I need for salary tax filing?",
    answer:
      "You'll need your salary slips, Form-16 (if provided by employer), bank statements, NTN, and CNIC. Keep records of any deductions or exemptions you're claiming.",
  },
  {
    question: "How accurate is the tax calculator?",
    answer:
      "Our calculator uses official FBR tax slabs and is updated for each fiscal year. However, it's for illustrative purposes. Consult a tax professional for official filings.",
  },
  {
    question: "Do I need to pay advance tax?",
    answer:
      "If you're a salaried employee, your employer deducts tax at source. Self-employed individuals and business owners typically pay advance tax quarterly.",
  },
  {
    question: "What's the difference between tax years?",
    answer:
      "Tax slabs change annually based on the federal budget. Our calculator supports FY 2014-15 through FY 2025-26, allowing you to compare rates across years.",
  },
  {
    question: "How much do you charge for tax filing?",
    answer:
      "Salary tax return filing costs PKR 5,000. Business tax returns and other services are quoted based on complexity. Contact us for a custom quote.",
  },
  {
    question: "Can you help with tax appeals?",
    answer:
      "Yes, we provide expert representation for tax appeals and notices from FBR. Contact us through the consultation form for assistance.",
  },
];

export const metadata = {
  title: "FAQ | TaxPro Pakistan",
  description: "Frequently asked questions about Pakistan income tax, filing, and our services.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
        Frequently Asked Questions
      </h1>
      <p className="mb-12 text-lg text-slate-600">
        Common questions about Pakistan income tax, filing, and our services.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
          >
            <h2 className="mb-3 text-lg font-semibold text-slate-800">
              {faq.question}
            </h2>
            <p className="text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border-l-4 border-emerald-500 bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          Still have questions?
        </h2>
        <p className="mb-4 text-slate-600">
          Our tax experts are here to help. Schedule a consultation today.
        </p>
        <Link
          href="/#consultation"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
