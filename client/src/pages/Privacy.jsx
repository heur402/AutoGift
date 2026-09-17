import PageHeader from "../components/PageHeader";
import LegalSection from "../components/LegalSection";

export default function Privacy() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: January 2026. Placeholder text for demonstration only."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <LegalSection title="1. Overview">
          <p>
            This is a demo privacy policy for a frontend-only product catalog.
            No real user data is collected, stored, or processed. The text below
            is a placeholder and does not constitute legal advice.
          </p>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <p>
            This demo does not collect personal information. Form submissions on
            the Contact page are handled entirely in the browser and are not
            transmitted anywhere.
          </p>
        </LegalSection>

        <LegalSection title="3. How We Use Information">
          <p>
            Since no information is collected, none is used. In a production
            version, this section would describe how user data is used, stored,
            and protected.
          </p>
        </LegalSection>

        <LegalSection title="4. Cookies and Tracking">
          <p>
            This demo does not use cookies, analytics, or third-party tracking
            scripts. Product images are served from a public placeholder service.
          </p>
        </LegalSection>

        <LegalSection title="5. Third-Party Services">
          <p>
            Placeholder product images are loaded from picsum.photos. No other
            third-party services are used by this demo.
          </p>
        </LegalSection>

        <LegalSection title="6. Your Rights">
          <p>
            Because no personal data is collected, there is nothing to access,
            modify, or delete. A production version would outline applicable
            data subject rights.
          </p>
        </LegalSection>

        <LegalSection title="7. Changes to This Policy">
          <p>
            This placeholder may be updated at any time. Continued use of the
            demo after changes constitutes acceptance of the updated text.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Questions? Reach out via the Contact page.
          </p>
        </LegalSection>
      </section>
    </>
  );
}