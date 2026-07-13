import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Marketplace — Stowave",
  description: "Where you can buy genuine Stowave shirts, and where you can't.",
};

const CHANNELS = [
  { name: "stowave.com", status: "Official", note: "The only place we guarantee price, stock, and warranty." },
  { name: "Daraz", status: "Not listed", note: "We don't currently sell through Daraz." },
  { name: "Instagram / Facebook DMs", status: "Caution", note: "We don't take orders over DM — always checkout on our site." },
  { name: "Resellers", status: "Not authorized", note: "Any shirt sold outside our site isn't covered by our return policy." },
];

export default function MarketplacePage() {
  return (
    <LegalLayout eyebrow="About" title="Marketplace" updated="July 13, 2026" active="/marketplace">
      <Section number={1} title="Where we actually sell">
        <p>
          Stowave is sold directly through our own website only. We don't
          run stores on third-party marketplaces, and we don't authorize
          anyone else to sell on our behalf.
        </p>
      </Section>

      <div>
        <h2 className="text-xl font-semibold text-stone-950">Where to buy — and where not to</h2>
        <ul className="mt-5 space-y-3">
          {CHANNELS.map((ch) => (
            <li
              key={ch.name}
              className="flex flex-col gap-1 rounded-lg border border-stone-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="text-sm font-medium text-stone-800">{ch.name}</span>
                <p className="mt-1 text-sm text-stone-500">{ch.note}</p>
              </div>
              <span
                className={
                  ch.status === "Official"
                    ? "self-start rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 sm:self-center"
                    : "self-start rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 sm:self-center"
                }
              >
                {ch.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Section number={2} title="Why this matters">
        <p>
          Prices, sizing, and stock shown anywhere other than our own site
          can be outdated or incorrect. Orders placed outside stowave.com
          also fall outside our return policy, since we have no way to
          verify what was actually paid or shipped.
        </p>
      </Section>

      <Section number={3} title="Spot something suspicious?">
        <p>
          If you come across a page or seller claiming to be Stowave
          somewhere other than our own site, let us know — we'd rather
          hear about it early than have someone get a shirt that isn't
          actually ours.
        </p>
      </Section>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Always check out at{" "}
          <a
            href="/"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.com
          </a>
          . Questions or reports go to{" "}
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