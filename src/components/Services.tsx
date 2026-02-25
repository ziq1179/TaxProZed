const services = [
  {
    title: "Salary Tax Calculator",
    description: "Calculate your income tax instantly using FBR-approved slabs for 2022–2025.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "Company & Firm Registration",
    description: "Assistance with SECP registration, firm setup, and compliance documentation.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Income Tax Return Filing",
    description: "End-to-end support for filing salary and business tax returns.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Legal Contract Drafting",
    description: "Professional drafting of employment, partnership, and business contracts.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-xl shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
        What We Offer
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex gap-4 rounded-xl border border-slate-200/60 p-4 transition-colors hover:border-emerald-300/60 dark:border-slate-700 dark:hover:border-emerald-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={service.icon}
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 dark:text-slate-100">
                {service.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
