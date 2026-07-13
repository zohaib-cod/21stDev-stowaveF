import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Terms & Conditions — Stowave",
  description: "The terms that govern your use of the Stowave online store.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="July 13, 2026"
      active="/terms-and-conditions"
    >
      <p className="text-[15px] leading-relaxed text-stone-600">
        These terms govern your use of the Stowave website and any purchase
        you make from us. Stowave is an independently owned online store
        selling shirts, founded and run by five co-founders: Ali Zohaib, Ali
        Husnain, Waqar Hassan, Saif-ul-Rehman, and Ali Haider. By using this
        site or placing an order, you agree to the terms below.
      </p>

      <Section number={1} title="About Stowave">
        <p>
          Stowave operates exclusively online, selling shirts and related
          apparel directly to customers. References to "we," "us," or
          "Stowave" mean the business as a whole, operated by its founders.
        </p>
      </Section>

      <Section number={2} title="Eligibility">
        <p>
          You must be at least 18 years old, or have a parent or guardian's
          permission, to place an order with us. By using this site, you
          confirm that the information you provide is accurate and current.
        </p>
      </Section>

      <Section number={3} title="Products and pricing">
        <p>
          We describe our shirts as accurately as possible, but colors may
          vary slightly depending on your screen. We reserve the right to
          correct pricing errors, update product details, or discontinue any
          item without prior notice. All prices are listed in the currency
          shown at checkout and exclude taxes or duties unless stated
          otherwise.
        </p>
      </Section>

      <Section number={4} title="Orders and payment">
        <p>
          Placing an order is an offer to buy, which we accept once payment
          is confirmed. We may cancel or refuse any order — for example, if
          an item is out of stock or we suspect fraud — and will notify you
          if that happens. Payment must be completed in full before an order
          ships.
        </p>
      </Section>

      <Section number={5} title="Shipping and delivery">
        <p>
          Delivery timelines shown at checkout are estimates, not guarantees.
          Stowave is not responsible for delays caused by couriers, customs,
          or events outside our control. Risk of loss passes to you once an
          order is handed to the delivery carrier.
        </p>
      </Section>

      <Section number={6} title="Returns and refunds">
        <p>
          Returns, exchanges, and refunds are handled under our{" "}
          <a
            href="/return-policy"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            Return Policy
          </a>
          , which forms part of these terms.
        </p>
      </Section>

      <Section number={7} title="Account responsibilities">
        <p>
          If you create an account with us, you're responsible for keeping
          your login details secure and for any activity under your account.
          Let us know immediately if you suspect unauthorized use.
        </p>
      </Section>

      <Section number={8} title="Intellectual property">
        <p>
          All content on this site — including the Stowave name, logo,
          product photography, and page designs — belongs to Stowave and may
          not be copied, reproduced, or used commercially without our
          written permission.
        </p>
      </Section>

      <Section number={9} title="Acceptable use">
        <p>
          You agree not to misuse the site — including attempting
          unauthorized access, disrupting its operation, or using it for any
          unlawful purpose. We may suspend access for anyone who violates
          these terms.
        </p>
      </Section>

      <Section number={10} title="Limitation of liability">
        <p>
          To the extent permitted by law, Stowave is not liable for indirect,
          incidental, or consequential damages arising from your use of the
          site or products, beyond the amount you paid for the relevant
          order.
        </p>
      </Section>

      <Section number={11} title="Changes to these terms">
        <p>
          We may revise these terms from time to time as Stowave grows.
          Updates take effect once posted here, with the "last updated" date
          revised. Continued use of the site means you accept the current
          terms.
        </p>
      </Section>

      <Section number={12} title="Governing law">
        <p>
          These terms are governed by the laws of Pakistan, without regard
          to conflict-of-law principles, unless otherwise required by local
          consumer protection law where you reside.
        </p>
      </Section>

      <Section number={13} title="Contact us">
        <p>
          For any questions about these terms, email{" "}
          <a
            href="mailto:stowave.store@gmail.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.store@gmail.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}