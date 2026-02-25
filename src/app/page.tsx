import SalaryTaxCalculator from "@/components/SalaryTaxCalculator";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ConsultationForm from "@/components/ConsultationForm";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
          Pakistan&apos;s Tax Calculator & Consultancy
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Calculate your salary tax instantly, file returns, and get expert
          support. Trusted by HR managers, accountants, and business owners
          across Pakistan.
        </p>
      </section>

      {/* Calculator - Primary CTA */}
      <section className="mb-16">
        <SalaryTaxCalculator />
      </section>

      {/* Services */}
      <section className="mb-16">
        <Services />
      </section>

      {/* Two-column: Pricing + Consultation */}
      <section className="mb-16 grid gap-8 lg:grid-cols-2">
        <Pricing />
        <ConsultationForm />
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <Testimonials />
      </section>

      {/* Newsletter */}
      <section className="mb-8">
        <Newsletter />
      </section>
    </div>
  );
}
