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
      className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-lg"
    >
      <h2 className="mb-2 text-xl font-semibold text-slate-800">
        Clear Fees, No Surprises
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Transparent fees—no hidden charges. Contact us for custom packages.
      </p>
      <div className="space-y-4">
        {pricingItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-1 rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-slate-800">
                {item.name}
              </p>
              <p className="text-sm text-slate-600">
                {item.description}
              </p>
            </div>
            <p className="text-lg font-semibold text-blue-600 sm:shrink-0">
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
