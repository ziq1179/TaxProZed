"use client";

import { useState } from "react";

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", profession: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section className="rounded-2xl border-l-4 border-emerald-500 bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Request Received
          </h3>
          <p className="max-w-sm text-slate-600">
            Our team will contact you within 24 hours to confirm your
            consultation appointment.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="consultation"
      className="rounded-2xl border-l-4 border-emerald-500 bg-white p-6 shadow-lg"
    >
      <h2 className="mb-2 text-xl font-semibold text-slate-800">
        Talk to a Tax Expert
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Schedule an appointment with our tax experts. We&apos;ll get back within
        24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="profession"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Profession
          </label>
          <select
            id="profession"
            name="profession"
            value={form.profession}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Select profession</option>
            <option value="salaried">Salaried Employee</option>
            <option value="business">Business Owner</option>
            <option value="hr">HR Manager</option>
            <option value="accountant">Accountant</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Brief description of your tax needs..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Request Consultation
        </button>
      </form>
    </section>
  );
}
