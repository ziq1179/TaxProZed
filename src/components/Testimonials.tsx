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
      className="rounded-2xl border-l-4 border-teal-500 bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Trusted by Professionals
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote
            key={t.author}
            className="rounded-xl border border-slate-200/60 bg-slate-50/80 p-4 shadow-sm"
          >
            <p className="text-sm text-slate-700">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-3 flex flex-col gap-0.5">
              <cite className="not-italic font-medium text-slate-800">
                {t.author}
              </cite>
              <span className="text-xs text-slate-500">
                {t.role}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
