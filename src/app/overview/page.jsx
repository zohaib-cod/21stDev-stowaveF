import LegalLayout from "../components/Legallayout";

export const metadata = {
  title: "Overview — Stowave",
  description: "A quick look at what Stowave is, how it started, and how it runs.",
};

const STATS = [
  { label: "Founded", value: "2025" },
  { label: "Co-founders", value: "5" },
  { label: "Shirts shipped", value: "10k+" },
  { label: "Team members hired", value: "0" },
];

const VALUES = [
  {
    title: "Made to last",
    desc: "We'd rather sell one shirt that lasts five years than five shirts that don't.",
  },
  {
    title: "Direct, no middlemen",
    desc: "Sold straight from us to you — no retail markup, no wholesale games.",
  },
  {
    title: "Small on purpose",
    desc: "Five founders, no hires. Every decision is made by someone who owns the outcome.",
  },
];

export default function OverviewPage() {
  return (
    <LegalLayout eyebrow="About" title="Overview" updated="July 13, 2026" active="/overview">
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">
          What we are
        </p>
        <p className="mt-2 text-lg font-semibold text-stone-900">
          An independent shirt label, run by five people.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
          Stowave started as a side project between five friends who wanted
          shirts that actually held up. No investors, no big team — just
          five co-founders handling design, sourcing, operations, and
          marketing ourselves, and selling directly online.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-stone-950">By the numbers</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-stone-200 bg-white px-4 py-5 text-center"
            >
              <p className="text-2xl font-semibold text-stone-950">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-stone-950">What we care about</h2>
        <ul className="mt-5 space-y-3">
          {VALUES.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-stone-200 bg-white px-5 py-4"
            >
              <p className="text-sm font-medium text-stone-800">{item.title}</p>
              <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Want to know more about who's behind Stowave? Check the{" "}
          <a
            href="/team"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            Team
          </a>{" "}
          page, or reach out at{" "}
          <a
            href="mailto:hello@stowave.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            hello@stowave.com
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  );
}