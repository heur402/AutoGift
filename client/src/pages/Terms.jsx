import PageHeader from "../components/PageHeader";
import LegalSection from "../components/LegalSection";

export default function Terms() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: January 2026. Placeholder text for demonstration only."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <LegalSection title="1. Acceptance of Terms">
          <p>
            By using this demo site, you agree to these placeholder terms. This
            is a frontend demonstration and does not offer any real products,
            services, or transactions.
          </p>
        </LegalSection>

        <LegalSection title="2. Use of the Site">
          <p>
            You may browse the demo freely. You may not attempt to disrupt the
            site, misrepresent it as a real store, or reuse its placeholder
            content as legal text.
          </p>
        </LegalSection>

        <LegalSection title="3. Products and Pricing">
          <p>
            All products, prices, categories, and images shown are sample data
            for demonstration. Nothing on this site constitutes a real offer to
            sell.
          </p>
        </LegalSection>

        <LegalSection title="4. No Purchases or Payments">
          <p>
            This demo does not process orders, payments, or refunds. The
            "Add to Cart" button is decorative and performs no action.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectual Property">
          <p>
            The demo code and layout are provided as-is. Placeholder images are
            served by picsum.photos and remain subject to that service's terms.
          </p>
        </LegalSection>

        <LegalSection title="6. Disclaimer of Warranties">
          <p>
            This demo is provided "as is" without warranties of any kind, express
            or implied, including but not limited to fitness for a particular
            purpose.
          </p>
        </LegalSection>

        <LegalSection title="7. Limitation of Liability">
          <p>
            In no event shall the authors be liable for any damages arising from
            the use of this demonstration.
          </p>
        </LegalSection>

        <LegalSection title="8. Changes to These Terms">
          <p>
            These placeholder terms may be updated at any time without notice.
          </p>
        </LegalSection>

        <LegalSection title="9. Contact">
          <p>
            Questions? Reach out via the Contact page.
          </p>
        </LegalSection>
      </section>
    </>
  );
}