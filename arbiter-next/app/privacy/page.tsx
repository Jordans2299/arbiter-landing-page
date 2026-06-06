import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Arbiter",
  description: "Privacy policy for Arbiter, a local AI chat app for iPhone.",
  openGraph: {
    title: "Privacy Policy – Arbiter",
    type: "website",
  },
  alternates: {
    canonical: "https://www.askarbiter.ai/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <h1>Privacy Policy</h1>
        <p>
          Arbiter (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) is a local AI
          chat app for iOS. This policy explains what information Arbiter
          processes and how we handle it.
        </p>

        <ol>
          <li>
            <strong>What Arbiter is</strong>
            <p>
              Arbiter lets you run small language models on your device. You can
              use bundled models or download additional GGUF models into the
              app&apos;s sandbox.
            </p>
          </li>
          <li>
            <strong>What data we process</strong>
            <ul>
              <li>
                <strong>Chat content (on device):</strong> Your conversations
                are stored locally in the app&apos;s database (Core Data).
              </li>
              <li>
                <strong>Downloaded models (on device):</strong> Model files are
                stored in Application Support (downloaded_models).
              </li>
              <li>
                <strong>Settings (on device):</strong> Things like selected
                model, temperature, and theme are stored locally (e.g.,
                UserDefaults).
              </li>
              <li>
                <strong>
                  Support communications (off device if you contact us):
                </strong>{" "}
                If you email{" "}
                <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>,
                we receive whatever you send (your email address and message
                content).
              </li>
            </ul>
            <p>We do not upload your chats or models to our servers.</p>
          </li>
          <li>
            <strong>Analytics &amp; crash data</strong>
            <p>
              By default, Arbiter does not send usage analytics to us. Apple or
              TestFlight may collect crash diagnostics if you&apos;ve opted in at
              the OS level; those are governed by Apple&apos;s policies.
            </p>
          </li>
          <li>
            <strong>Network access</strong>
            <p>
              Arbiter may access the network to download models from third‑party
              sources (e.g., Hugging Face). When you use those links, the host
              site&apos;s privacy policy applies.
            </p>
          </li>
          <li>
            <strong>Third parties</strong>
            <ul>
              <li>
                <strong>Hugging Face or other model hosts:</strong> your IP and
                standard request headers may be processed by those providers
                when downloading models.
              </li>
              <li>
                <strong>Email providers:</strong> if you contact support, your
                message is processed by our email provider to deliver the mail.
              </li>
            </ul>
            <p>We do not sell your personal information.</p>
          </li>
          <li>
            <strong>Data retention &amp; deletion</strong>
            <ul>
              <li>
                <strong>On device:</strong> You control retention. Delete
                messages or models in the app to remove them from your device.
                Deleting the app removes its local data.
              </li>
              <li>
                <strong>Support emails:</strong> We retain support messages as
                needed to handle your request and for reasonable business
                records; email us if you want a copy or deletion.
              </li>
            </ul>
          </li>
          <li>
            <strong>Children&apos;s privacy</strong>
            <p>
              Arbiter is not directed to children under 13 (or the minimum age
              in your jurisdiction). Do not use the app if you are under that
              age.
            </p>
          </li>
          <li>
            <strong>Your rights</strong>
            <p>
              Depending on your location, you may have rights to access,
              correct, or delete personal data. For app‑local data, use the app
              or your device controls. For support emails, contact{" "}
              <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>.
            </p>
          </li>
          <li>
            <strong>Security</strong>
            <p>
              We store app data in iOS&apos;s app sandbox. No method of storage
              or transmission is 100% secure, but we use reasonable measures
              appropriate for a local app.
            </p>
          </li>
          <li>
            <strong>Changes to this policy</strong>
            <p>
              We may update this policy. We&apos;ll change the &quot;Last
              updated&quot; date above and may provide in‑app notice for
              material changes.
            </p>
          </li>
          <li>
            <strong>Contact</strong>
            <p>
              Questions?{" "}
              <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>
            </p>
          </li>
        </ol>
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
