import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Pricing — Stowave",
  description: "How pricing works at Stowave — what's included, shipping, taxes, and discounts.",
};

export default function PricingPage() {
  return (
    <LegalLayout eyebrow="About" title="Pricing" updated="July 13, 2026" active="/pricing">
      <Section number={1} title="What the price includes">
        <p>
          Every listed price is for the shirt itself — fabric, stitching,
          and finishing. No hidden add-ons at checkout for the product
          itself; what you see on the product page is what you pay before
          shipping and tax.
        </p>
      </Section>

      <Section number={2} title="Shipping">
        <p>
          Shipping cost is calculated at checkout based on your location
          and is shown before you pay. We don't mark up shipping — you pay
          what the courier charges us.
        </p>
      </Section>

      <Section number={3} title="Taxes">
        <p>
          Any applicable taxes are added at checkout depending on your
          region. The final total you confirm before payment always
          includes tax.
        </p>
      </Section>

      <Section number={4} title="Currency">
        <p>
          All prices are listed in PKR. If you're paying from outside
          Pakistan, your bank or card provider handles the conversion at
          their own exchange rate.
        </p>
      </Section>

      <Section number={5} title="Discounts & sales">
        <p>
          From time to time we run limited discounts on select shirts.
          When a discount is active, the original price is shown crossed
          out next to the discounted price — no surprise codes needed at
          checkout.
        </p>
      </Section>

      <Section number={6} title="Price changes">
        <p>
          We may adjust prices as material or production costs change.
          Price changes never apply to orders you've already placed —
          only to new orders going forward.
        </p>
      </Section>

      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/60 p-6">
        <p className="text-sm leading-relaxed text-stone-600">
          Questions about a specific order or price? Email us at{" "}
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