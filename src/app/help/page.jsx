import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Help — Stowave",
  description: "Answers to common questions about orders, sizing, and shipping at Stowave.",
};

function Faq({ q, children }) {
  return (
    <details className="group rounded-lg border border-stone-200 bg-white px-5 py-4 open:border-amber-300 open:bg-amber-50/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-stone-800 marker:content-['']">
        {q}
        <span className="shrink-0 text-lg text-stone-400 transition-transform group-open:rotate-45 group-open:text-amber-600">
          +
        </span>
      </summary>
      <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-stone-600">
        {children}
      </div>
    </details>
  );
}

export default function HelpPage() {
  return (
    <LegalLayout eyebrow="Support" title="Help" updated="July 13, 2026" active="/help">
      <p className="text-[15px] leading-relaxed text-stone-600">
        Quick answers to what people ask us most. Can't find what you need?
        Our team of five reads every message and usually replies within one
        business day.
      </p>

      <div className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-stone-800">Still stuck?</p>
          <p className="mt-1 text-sm text-stone-500">
            Email us and we'll sort it out.
          </p>
        </div>
        <a
          href="mailto:help@stowave.com"
          className="inline-flex items-center justify-center rounded-md bg-stone-950 px-5 py-2.5 text-sm font-medium text-stone-50 transition-colors hover:bg-amber-600"
        >
          help@stowave.com
        </a>
      </div>

      <Section number={1} title="Orders & shipping">
        <div className="space-y-3">
          <Faq q="How do I track my order?">
            <p>
              Once your order ships, we email you a tracking link. You can
              also find it under "My Bag" if you checked out with an
              account.
            </p>
          </Faq>
          <Faq q="How long does delivery take?">
            <p>
              Most orders arrive within 3–7 business days, depending on your
              location. You'll see an estimated delivery window at checkout.
            </p>
          </Faq>
          <Faq q="Can I change my shipping address after ordering?">
            <p>
              If your order hasn't shipped yet, email{" "}
              <a
                href="mailto:help@stowave.com"
                className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
              >
                stowave.storet privacy@stowave.com@gmail.com
              </a>{" "}
              right away with your order number and we'll update it if
              possible.
            </p>
          </Faq>
        </div>
      </Section>

      <Section number={2} title="Sizing & fit">
        <div className="space-y-3">
          <Faq q="How do Stowave shirts fit?">
            <p>
              Our shirts run true to size with a regular, comfortable fit. If
              you prefer a looser look, we recommend sizing up.
            </p>
          </Faq>
          <Faq q="Is there a size chart?">
            <p>
              Yes — each product page includes a size chart with chest,
              length, and sleeve measurements so you can compare against a
              shirt you already own.
            </p>
          </Faq>
        </div>
      </Section>

      <Section number={3} title="Payments">
        <div className="space-y-3">
          <Faq q="What payment methods do you accept?">
            <p>
              We accept major debit and credit cards, plus the local payment
              options shown at checkout.
            </p>
          </Faq>
          <Faq q="Is my payment information secure?">
            <p>
              Yes. Payments are processed by trusted third-party gateways —
              Stowave never sees or stores your full card details.
            </p>
          </Faq>
        </div>
      </Section>

      <Section number={4} title="Returns & exchanges">
        <div className="space-y-3">
          <Faq q="What's your return window?">
            <p>
              You can request a return or exchange within 7 days of
              delivery. Full details are in our{" "}
              <a
                href="/return-policy"
                className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
              >
                Return Policy
              </a>
              .
            </p>
          </Faq>
          <Faq q="My shirt arrived damaged — what now?">
            <p>
              Sorry about that. Email us within 48 hours with photos of the
              item and packaging, and we'll send a free replacement or full
              refund.
            </p>
          </Faq>
        </div>
      </Section>

      <Section number={5} title="Contact us">
        <p>
          For anything else, reach the Stowave team at{" "}
          <a
            href="mailto:stowave.store@gmail.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.store@gmail.com
          </a>
          . We're a five-person team, so replies come from a real person,
          not a bot.
        </p>
      </Section>
    </LegalLayout>
  );
}