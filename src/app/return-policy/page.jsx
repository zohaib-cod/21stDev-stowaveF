import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Return Policy — Stowave",
  description: "How returns, exchanges, and refunds work at Stowave.",
};

export default function ReturnPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Return Policy"
      updated="July 13, 2026"
      active="/return-policy"
    >
      <p className="text-[15px] leading-relaxed text-stone-600">
        We want you to be happy with your Stowave shirt. If something isn't
        right, here's exactly how returns, exchanges, and refunds work.
      </p>

      <Section number={1} title="Return window">
        <p>
          You can request a return or exchange within{" "}
          <span className="font-medium text-stone-800">7 days</span> of
          receiving your order. Requests made after this window can't be
          accepted.
        </p>
      </Section>

      <Section number={2} title="Condition of the item">
        <p>To be eligible for a return, the shirt must be:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Unworn, unwashed, and undamaged.</li>
          <li>In its original packaging, with tags still attached.</li>
          <li>Accompanied by the original receipt or order confirmation.</li>
        </ul>
      </Section>

      <Section number={3} title="Non-returnable items">
        <p>
          Items marked "Final Sale," gift cards, and any shirt that shows
          signs of wear or was altered after delivery cannot be returned.
        </p>
      </Section>

      <Section number={4} title="How to start a return">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Email{" "}
            <a
              href="mailto:stowave.store@gmail.com"
              className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              stowave.store@gmail.com
            </a>{" "}
            with your order number and reason for return.
          </li>
          <li>We'll confirm eligibility and send you a return address.</li>
          <li>Pack the item securely and ship it back to us.</li>
          <li>We'll notify you once we receive and inspect it.</li>
        </ol>
      </Section>

      <Section number={5} title="Exchanges">
        <p>
          Need a different size? Let us know when you request your return
          and we'll send the replacement as soon as the original item is
          back with us and passes inspection, subject to stock availability.
        </p>
      </Section>

      <Section number={6} title="Refunds">
        <p>
          Once your return is inspected and approved, we'll issue a refund to
          your original payment method within{" "}
          <span className="font-medium text-stone-800">5–7 business days</span>.
          Original shipping charges are non-refundable, and return shipping
          is paid by the customer unless the item arrived damaged or
          incorrect.
        </p>
      </Section>

      <Section number={7} title="Damaged or incorrect items">
        <p>
          If your shirt arrives damaged, defective, or different from what
          you ordered, contact us within 48 hours of delivery with photos of
          the item and packaging. We'll arrange a free replacement or full
          refund, whichever you prefer.
        </p>
      </Section>

      <Section number={8} title="Questions">
        <p>
          Reach us anytime at{" "}
          <a
            href="mailto:stowave.store@gmail.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.store@gmail.com
          </a>{" "}
          — we're a small team of five and read every message ourselves.
        </p>
      </Section>
    </LegalLayout>
  );
}