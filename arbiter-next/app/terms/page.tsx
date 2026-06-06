import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – Arbiter",
  description:
    "Terms of service for Arbiter, a local AI chat app for iPhone.",
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
      <main className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <section>
          <p>
            These Terms govern your use of Arbiter (&quot;the App&quot;). By
            using the App, you agree to these Terms.
          </p>

          <ol>
            <li>
              <strong>What Arbiter does</strong>
              <br />
              Arbiter is an iOS app that runs AI models locally on your device.
              You can select bundled models or download additional models from
              third‑party sources.
            </li>
            <li>
              <strong>Your responsibilities</strong>
              <br />
              <ul>
                <li>
                  <strong>Lawful use.</strong> You&apos;ll use Arbiter in
                  compliance with applicable laws and the licenses for any
                  models you download.
                </li>
                <li>
                  <strong>Model licenses &amp; content.</strong> Third‑party
                  models and datasets may have their own licenses and
                  restrictions; you&apos;re responsible for reviewing and
                  complying with them.
                </li>
                <li>
                  <strong>Backups.</strong> Your chats and models are stored on
                  your device. Maintain any backups you need.
                </li>
              </ul>
            </li>
            <li>
              <strong>Third‑party links &amp; content</strong>
              <br />
              The App may link to third parties (e.g., Hugging Face). We
              don&apos;t control or endorse third‑party sites, content, or
              models and aren&apos;t responsible for them.
            </li>
            <li>
              <strong>No professional advice</strong>
              <br />
              Outputs from AI models may be incorrect or misleading and are
              provided &quot;as is&quot; for informational purposes only. Arbiter
              does not provide professional advice.
            </li>
            <li>
              <strong>Acceptable use</strong>
              <br />
              Don&apos;t use the App to violate laws, infringe rights, or
              produce/distribute harmful content. We may restrict or terminate
              access for violations.
            </li>
            <li>
              <strong>Ownership</strong>
              <br />
              We (or our licensors) own the App and its code. You retain rights
              to your own content. Third‑party models are owned by their
              respective licensors.
            </li>
            <li>
              <strong>Disclaimers</strong>
              <br />
              THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON‑INFRINGEMENT. We do not warrant uninterrupted or
              error‑free operation or the accuracy of model outputs.
            </li>
            <li>
              <strong>Limitation of liability</strong>
              <br />
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE
              FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, EVEN
              IF ADVISED OF THE POSSIBILITY. OUR TOTAL LIABILITY FOR ANY CLAIMS
              RELATING TO THE APP SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE
              APP (IF ANY) IN THE 12 MONTHS BEFORE THE CLAIM.
            </li>
            <li>
              <strong>Indemnity</strong>
              <br />
              You will indemnify and hold us harmless from claims arising from
              your misuse of the App, violation of these Terms, or infringement
              of third‑party rights.
            </li>
            <li>
              <strong>Changes</strong>
              <br />
              We may update these Terms. We&apos;ll update the &quot;Last
              updated&quot; date and may provide in‑app notice for material
              changes. Continued use means you accept the updated Terms.
            </li>
            <li>
              <strong>Governing law</strong>
              <br />
              These Terms are governed by the laws of your principal place of
              business, excluding conflict‑of‑laws rules.
            </li>
            <li>
              <strong>Contact</strong>
              <br />
              Questions about these Terms?{" "}
              <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>
            </li>
          </ol>
        </section>
      </main>
      <footer id="contact">
        <div className="container">
          <div className="footer-content">
            <a className="footer-contact" href="mailto:hello@askarbiter.ai">
              hello@askarbiter.ai
            </a>
            <div className="footer-links">
              <Link className="footer-contact" href="/">
                Home
              </Link>
              <Link className="footer-contact" href="/privacy">
                Privacy
              </Link>
              <Link className="footer-contact" href="/terms">
                Terms
              </Link>
            </div>
            <p className="footer-copyright">
              &copy; 2025 Arbiter Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
