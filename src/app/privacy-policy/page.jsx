import LegalLayout, { Section } from "../components/Legallayout";

export const metadata = {
  title: "Privacy Policy — Stowave",
  description: "How Stowave collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 13, 2026"
      active="/privacy-policy"
    >
      <p className="text-[15px] leading-relaxed text-stone-600">
        Stowave ("we," "us," or "our") sells shirts through our online store.
        This policy explains what information we collect when you visit or
        buy from us, why we collect it, and the choices you have. By using
        our website, you agree to the practices described below.
      </p>

      <Section number={1} title="Information we collect">
        <p>We collect information in three ways:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-stone-800">You give it to us</span>{" "}
            — your name, email, phone number, shipping address, and payment
            details when you place an order or create an account.
          </li>
          <li>
            <span className="font-medium text-stone-800">We collect it automatically</span>{" "}
            — your IP address, browser type, device information, and pages
            you visit, gathered through cookies and similar tools.
          </li>
          <li>
            <span className="font-medium text-stone-800">We receive it from others</span>{" "}
            — such as payment processors or delivery partners confirming an
            order's status.
          </li>
        </ul>
      </Section>

      <Section number={2} title="How we use your information">
        <ul className="list-disc space-y-2 pl-5">
          <li>To process orders, payments, and deliveries.</li>
          <li>To respond to your questions and support requests.</li>
          <li>To send order updates and, if you opt in, occasional promotions.</li>
          <li>To improve our website, catalog, and shopping experience.</li>
          <li>To detect fraud and keep our store secure.</li>
        </ul>
      </Section>

      <Section number={3} title="Cookies">
        <p>
          We use cookies to keep items in your cart, remember your
          preferences, and understand how our store is used. You can disable
          cookies in your browser settings, though parts of the site — like
          checkout — may not work properly without them.
        </p>
      </Section>

      <Section number={4} title="Sharing your information">
        <p>
          We do not sell your personal information. We share it only with
          trusted service providers who help us run Stowave — payment
          gateways, courier companies, and hosting or analytics providers —
          and only to the extent needed for them to do their job. We may
          also disclose information if required by law.
        </p>
      </Section>

      <Section number={5} title="Data retention">
        <p>
          We keep order and account information for as long as your account
          is active, or as needed to comply with tax, accounting, and legal
          obligations. You can request deletion of your data at any time,
          subject to those requirements.
        </p>
      </Section>

      <Section number={6} title="Your rights">
        <p>
          You can ask us to access, correct, or delete your personal
          information, or to stop sending you marketing messages. To do any
          of this, contact us using the details below.
        </p>
      </Section>

      <Section number={7} title="Children's privacy">
        <p>
          Stowave is not directed at children under 13, and we do not
          knowingly collect information from them.
        </p>
      </Section>

      <Section number={8} title="Changes to this policy">
        <p>
          We may update this policy as our store grows. Changes take effect
          once posted on this page, with the "last updated" date revised
          accordingly.
        </p>
      </Section>

      <Section number={9} title="Contact us">
        <p>
          Questions about this policy or your data? Reach out at{" "}
          <a
            href="mailto:stowave.store@gmail.com"
            className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
          >
            stowave.store@gmail.com
          </a>{" "}
          and one of our team will get back to you.
        </p>
      </Section>
    </LegalLayout>
  );
}