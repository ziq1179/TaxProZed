const pricingItems = [
  {
    name: "Salary Tax Return Filing",
    price: "PKR 5,000",
    description: "Complete filing support for salaried individuals.",
  },
  {
    name: "Business Tax Return",
    price: "On Quote",
    description: "Tailored for AOPs, SMEs, and business entities.",
  },
  {
    name: "Tax Appeal Support",
    price: "On Quote",
    description: "Expert representation for appeals and notices.",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-xl shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
        Transparent Pricing
      </h2>
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        Clear fees—no hidden charges. Contact us for custom packages.
      </p>
      <div className="space-y-4">
        {pricingItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-1 rounded-xl border border-slate-200/60 p-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                {item.name}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 sm:shrink-0">
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
