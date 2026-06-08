import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service – Arbiter",
  description:
    "Terms of service for Arbiter, a private local AI assistant for iPhone and Mac.",
  openGraph: {
    title: "Terms of Service – Arbiter",
    type: "website",
  },
  alternates: {
    canonical: "https://www.askarbiter.ai/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <header className="legal-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: June 6, 2026</p>
        </div>
      </header>

      <main className="legal-body">
        <p>
          These Terms govern your use of Arbiter (&ldquo;the App&rdquo;),
          including Arbiter for iOS and Arbiter for macOS. By using the App, you
          agree to these Terms.
        </p>

        <h2>1. What Arbiter Does</h2>
        <p>
          Arbiter is a private AI assistant for iPhone and Mac that runs
          open-source language models locally on your device. You can download
          models from third-party sources, connect to local-network model
          servers, use Apple&rsquo;s Foundation Models on supported devices, and
          optionally enable web search for current information.
        </p>

        <h2>2. Your Responsibilities</h2>
        <ul>
          <li>
            <strong>Lawful use.</strong> You will use Arbiter in compliance with
            applicable laws and the licenses for any models you download or
            connect to.
          </li>
          <li>
            <strong>Model licenses and content.</strong> Third-party models and
            datasets may have their own licenses and restrictions. You are
            responsible for reviewing and complying with them.
          </li>
          <li>
            <strong>Local network use.</strong> If you serve models from your Mac
            or connect to local-network servers, you are responsible for securing
            your network and controlling access to your devices.
          </li>
          <li>
            <strong>Backups.</strong> Your chats, models, and files are stored on
            your device. Maintain any backups you need.
          </li>
        </ul>

        <h2>3. Third-Party Links and Content</h2>
        <p>
          The App may link to or interact with third parties, including Hugging
          Face for model downloads and user-configured local servers. We do not
          control or endorse third-party sites, content, or models and are not
          responsible for them.
        </p>

        <h2>4. No Professional Advice</h2>
        <p>
          Outputs from AI models may be incorrect, incomplete, or misleading and
          are provided &ldquo;as is&rdquo; for informational purposes only.
          Arbiter does not provide medical, legal, financial, or other
          professional advice. Do not rely on model outputs for decisions that
          require professional judgment.
        </p>

        <h2>5. Acceptable Use</h2>
        <p>
          Do not use the App to violate laws, infringe rights, or produce or
          distribute harmful content. We reserve the right to restrict or
          terminate access for violations of these Terms.
        </p>

        <h2>6. Tips and Purchases</h2>
        <p>
          Arbiter offers optional tips through Apple&rsquo;s StoreKit. These are
          voluntary and non-refundable except as required by applicable law or
          Apple&rsquo;s refund policies. Tips do not unlock additional features.
        </p>

        <h2>7. Ownership</h2>
        <p>
          We (or our licensors) own the App and its code. You retain rights to
          your own content, including chats, files, and images you create or
          import. Third-party models are owned by their respective licensors
          under their own license terms.
        </p>

        <h2>8. Disclaimers</h2>
        <p>
          THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. We do not warrant uninterrupted or error-free
          operation, the accuracy of model outputs, or the availability or
          quality of third-party models or servers.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
          DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, EVEN IF ADVISED OF
          THE POSSIBILITY. OUR TOTAL LIABILITY FOR ANY CLAIMS RELATING TO THE
          APP SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE APP (IF ANY) IN THE
          12 MONTHS BEFORE THE CLAIM.
        </p>

        <h2>10. Indemnity</h2>
        <p>
          You will indemnify and hold us harmless from claims arising from your
          misuse of the App, violation of these Terms, or infringement of
          third-party rights.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these Terms. We will update the &ldquo;Last
          updated&rdquo; date at the top and may provide in-app notice for
          material changes. Continued use of the App after changes take effect
          constitutes acceptance of the updated Terms.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of your principal place of
          residence, excluding conflict-of-laws rules.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these Terms? Email us at{" "}
          <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>.
        </p>
      </main>

      <Footer />
    </>
  );
}
