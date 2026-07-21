import LegalLayout from "../components/Legallayout";

export const metadata = {
  title: "Features — Stowave",
  description: "What makes a Stowave shirt different — fabric, fit, and finishing.",
};

const FEATURES = [
  {
    title: "Heavyweight fabric",
    desc: "We use thicker, denser cotton than most fast-fashion shirts so it holds shape wash after wash instead of thinning out.",
  },
  {
    title: "Reinforced stitching",
    desc: "Double-stitched seams at the shoulders, sleeves, and hem — the spots that usually give out first.",
  },
  {
    title: "Pre-shrunk",
    desc: "Fabric is treated before cutting, so the size you order is the size you keep after the first wash.",
  },
  {
    title: "Colorfast dye",
    desc: "Dyed to resist fading in regular machine washes, so black stays black instead of turning grey.",
  },
  {
    title: "Tagless comfort",
    desc: "Printed care labels instead of stitched-in tags, so there's nothing scratching at the back of your neck.",
  },
  {
    title: "True-to-size fit",
    desc: "Every size is fit-tested on real bodies before it goes into our size chart — no guessing between two sizes.",
  },
];

export default function FeaturesPage() {
  return (
    <LegalLayout eyebrow="Product" title="Features" updated="July 13, 2026" active="/features">
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">
          Why it's different
        </p>
        <p className="mt-2 text-lg font-semibold text-stone-900">
          Built to be worn for years, not seasons.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
          Every Stowave shirt goes through the same short checklist before
          it's allowed to ship. None of this is flashy — it's the boring
          stuff that decides whether a shirt survives its first year.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-stone-950">What's built in</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-stone-200 bg-white px-5 py-4"
            >
              <p className="text-sm font-medium text-stone-800">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Curious how a specific shirt is made, or want care instructions?
          Email us at{" "}
          <a
            href="mailto:stowave.store@gmail.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.store@gmail.com
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  );
}