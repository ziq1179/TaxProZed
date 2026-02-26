"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <section className="rounded-2xl border-l-4 border-teal-500 bg-white p-6 text-center shadow-lg">
        <h3 className="font-semibold text-teal-600">
          Thank you for subscribing
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          We&apos;ll keep you updated on budget changes and tax notifications.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border-l-4 border-teal-500 bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-xl font-semibold text-slate-800">
        Never Miss a Budget Change
      </h2>
      <p className="mb-4 text-sm text-slate-600">
        Subscribe for budget updates, salary increase notifications, and tax
        news.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
