import LegalLayout from "../components/Legallayout";

export const metadata = {
  title: "Our Team — Stowave",
  description: "Meet the five co-founders behind Stowave.",
};

const TEAM = [
  {
    name: "Ali Zohaib",
    role: "Website, SEO & Ads",
    focus: "Runs the website and helpline, and looks after SEO, ads, and half of our social media.",
  },
  {
    name: "Ali Husnain",
    role: "Social Media & Design",
    focus: "Covers the other half of social media and designs the posts you see there.",
  },
  {
    name: "Waqar Hassan",
    role: "Management & Supply",
    focus: "Oversees overall management and makes sure we restock whatever runs out.",
  },
  {
    name: "Saif-ul-Rehman",
    role: "Audit & Coordination",
    focus: "Keeps the books audited and our meetings on track.",
  },
  {
    name: "Ali Haider",
    role: "Accounts & Admin",
    focus: "Manages accounts and keeps our records in order.",
  },
];

function initials(fullName) {
  return fullName
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <LegalLayout eyebrow="About" title="Our Team" updated="July 13, 2026" active="/team">
      <p className="text-[15px] leading-relaxed text-stone-600">
        Stowave is built and run by five people, not a boardroom. We design,
        source, and ship every shirt ourselves, which is why the store still
        feels small even as it grows.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 font-mono text-lg text-amber-500">
              {initials(member.name)}
            </div>
            <div>
              <p className="text-base font-semibold text-stone-900">
                {member.name}
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-widest text-amber-600">
                {member.role}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              {member.focus}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Want to reach the team directly? Email{" "}
          <a
            href="mailto:hello@stowave.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            hello@stowave.com
          </a>{" "}
          — every message goes to all five of us.
        </p>
      </div>
    </LegalLayout>
  );
}