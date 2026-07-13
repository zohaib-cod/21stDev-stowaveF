import Link from "next/link";

const NAV = [
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/help", label: "Help" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

const FOUNDERS = [
  "Ali Zohaib",
  "Ali Husnain",
  "Waqar Hassan",
  "Saif-ul-Rehman",
  "Ali Haider",
];

export default function LegalLayout({ eyebrow, title, updated, active, children }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Top bar */}
      {/* <header className="border-b border-stone-200 bg-stone-950 text-stone-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-mono text-lg tracking-[0.35em] text-stone-50">
            STOWAVE
          </Link>
          <nav className="hidden gap-6 text-xs uppercase tracking-widest text-stone-400 sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active === item.href
                    ? "text-amber-500"
                    : "transition-colors hover:text-stone-100"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header> */}

      {/* Title block */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: {updated}</p>
        </div>
      </section>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-10 border-l-2 border-stone-200 pl-4">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
                Stowave Legal
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                Independent shirt label, run by five co-founders. If anything
                here is unclear, reach out — a real person replies.
              </p>
            </div>
          </aside>
          <div className="space-y-12">{children}</div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="border-t border-stone-200 bg-stone-950 text-stone-400">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-sm tracking-[0.3em] text-stone-50">
                STOWAVE
              </p>
              <p className="mt-2 max-w-sm text-sm text-stone-400">
                Shirts made to last, sold direct to you online.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">
                Founded by
              </p>
              <p className="mt-2 max-w-xs text-sm text-stone-300">
                {FOUNDERS.join(" · ")}
              </p>
            </div>
          </div>
          <p className="mt-8 border-t border-stone-800 pt-6 text-xs text-stone-500">
            © {new Date().getFullYear()} Stowave. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export function Section({ number, title, children }) {
  return (
    <section id={`section-${number}`} className="scroll-mt-10">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-amber-600">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="text-xl font-semibold text-stone-950">{title}</h2>
      </div>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-stone-600">
        {children}
      </div>
    </section>
  );
}