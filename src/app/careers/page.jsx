import LegalLayout from "../components/Legallayout";

export const metadata = {
  title: "Careers — Stowave",
  description: "Stowave is run entirely by its five co-founders — no open positions right now.",
};

const SKILLS = [
  { name: "Ali Zohaib", covers: "Website, helpline, SEO, ads & half of social media" },
  { name: "Ali Husnain", covers: "Other half of social media & post design" },
  { name: "Waqar Hassan", covers: "Overall management & restocking supplies" },
  { name: "Saif-ul-Rehman", covers: "Audit & meetings" },
  { name: "Ali Haider", covers: "Accounts & MS Office admin" },
];

export default function CareersPage() {
  return (
    <LegalLayout eyebrow="About" title="Careers" updated="July 13, 2026" active="/careers">
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">
          Current status
        </p>
        <p className="mt-2 text-lg font-semibold text-stone-900">
          We're not hiring right now.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
          Stowave is built and run entirely by its five co-founders. Between
          us we cover design, sourcing, operations, and marketing ourselves,
          so there's no team to join and no open roles at the moment.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-stone-950">
          Who runs what
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
          Each of us brings a different skill to the table, which is how a
          five-person team keeps a full store running end to end.
        </p>
        <ul className="mt-5 space-y-3">
          {SKILLS.map((person) => (
            <li
              key={person.name}
              className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-5 py-3"
            >
              <span className="text-sm font-medium text-stone-800">
                {person.name}
              </span>
              <span className="text-sm text-stone-500">{person.covers}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Things may change as Stowave grows. If that happens, we'll list
          open roles right here. Until then, if you'd still like to reach
          out — for a collaboration or anything else — email us at{" "}
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