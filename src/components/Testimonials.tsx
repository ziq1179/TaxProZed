const testimonials = [
  {
    quote:
      "Fast and accurate tax filing. The team handled our company registration smoothly.",
    author: "Ahmed K.",
    role: "HR Manager, Lahore",
  },
  {
    quote:
      "Professional service for salary tax returns. Highly recommend for busy professionals.",
    author: "Sarah M.",
    role: "Accountant",
  },
  {
    quote:
      "Got my business tax sorted without hassle. Clear pricing and timely support.",
    author: "Imran R.",
    role: "Business Owner, Karachi",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-xl shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
        What Our Clients Say
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote
            key={t.author}
            className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-3 flex flex-col gap-0.5">
              <cite className="not-italic font-medium text-slate-800 dark:text-slate-100">
                {t.author}
              </cite>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {t.role}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
