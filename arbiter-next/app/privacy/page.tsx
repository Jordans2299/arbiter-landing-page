import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – Arbiter",
  description:
    "Privacy policy for Arbiter, a private local AI assistant for iPhone and Mac.",
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
    <div className="legal-page">
      <Navbar />

      <header className="legal-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: June 6, 2026</p>
        </div>
      </header>

      <main className="legal-body">
        <h2>1. Introduction</h2>
        <p>
          Arbiter (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is a
          private AI assistant for iPhone and Mac. This policy explains what
          information Arbiter processes and how we handle it. Arbiter is designed
          so that your data stays on your device by default.
        </p>

        <h2>2. Data Stored on Your Device</h2>
        <p>
          The following data is created and stored locally on your device. We do
          not have access to it unless you explicitly share it with us.
        </p>
        <ul>
          <li>
            <strong>Chat conversations</strong> are stored in the app&rsquo;s
            local database (Core Data). They never leave your device unless you
            choose to export or share them.
          </li>
          <li>
            <strong>Downloaded models</strong> (GGUF and MLX formats) are stored
            in Application Support within the app&rsquo;s sandbox.
          </li>
          <li>
            <strong>Uploaded files and images</strong> (PDFs, text files, photos)
            are copied into the app sandbox for local processing and are not
            transmitted externally.
          </li>
          <li>
            <strong>Settings and preferences</strong> including selected model,
            assistant role, personalization options, theme, and server
            configuration are stored locally via UserDefaults.
          </li>
        </ul>

        <h2>3. Network Features</h2>
        <p>
          Arbiter accesses the network only for specific, user-initiated
          features. Core chat functionality with installed models works entirely
          offline.
        </p>
        <ul>
          <li>
            <strong>Model downloads:</strong> When you download a model, Arbiter
            fetches files from Hugging Face or other model hosts. Your IP address
            and standard request headers are processed by those providers under
            their respective privacy policies.
          </li>
          <li>
            <strong>Web search:</strong> When you enable the optional web search
            toggle, your search query is sent to our search endpoint
            (search.askarbiter.ai). We do not log or store search queries beyond
            what is needed to return results.
          </li>
          <li>
            <strong>Local network models:</strong> When you connect to a
            local-network model server (such as LM Studio, Ollama, or
            Arbiter&rsquo;s macOS server), your prompts are sent to that server
            on your local network. This traffic does not pass through our
            servers.
          </li>
          <li>
            <strong>macOS model server:</strong> When you serve a model from
            Arbiter for macOS, other devices on your local network can send
            prompts to your Mac. This is a direct local connection; we do not
            intermediate or log this traffic.
          </li>
          <li>
            <strong>Tips and purchases:</strong> If you choose to leave a tip,
            the transaction is processed through Apple&rsquo;s StoreKit
            infrastructure. We do not receive your payment details.
          </li>
        </ul>

        <h2>4. Analytics and Crash Data</h2>
        <p>
          Arbiter does not send usage analytics to us. Apple may collect crash
          diagnostics if you have opted in at the operating system level; those
          are governed by Apple&rsquo;s privacy policy.
        </p>

        <h2>5. Third Parties</h2>
        <ul>
          <li>
            <strong>Hugging Face and model hosts:</strong> Your IP and standard
            request headers may be processed by these providers when downloading
            models.
          </li>
          <li>
            <strong>Apple:</strong> StoreKit purchases and optional OS-level
            diagnostics are governed by Apple&rsquo;s privacy policy.
          </li>
          <li>
            <strong>Email providers:</strong> If you contact support, your
            message is processed by our email provider to deliver the mail.
          </li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>6. Data Retention and Deletion</h2>
        <ul>
          <li>
            <strong>On-device data:</strong> You control retention. Delete
            messages, models, or files within the app at any time. Uninstalling
            the app removes all local data.
          </li>
          <li>
            <strong>Support emails:</strong> We retain support messages as needed
            to handle your request and for reasonable business records. Email us
            if you want a copy or deletion.
          </li>
        </ul>

        <h2>7. Children&rsquo;s Privacy</h2>
        <p>
          Arbiter is not directed to children under 13 (or the minimum age in
          your jurisdiction). Do not use the app if you are under that age.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or
          delete personal data. For app-local data, use the app or your device
          controls. For support communications, contact{" "}
          <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>.
        </p>

        <h2>9. Security</h2>
        <p>
          App data is stored within the operating system&rsquo;s app sandbox on
          both iOS and macOS. Local network traffic between Arbiter devices stays
          on your network. No method of storage or transmission is 100% secure,
          but we use reasonable measures appropriate for a local-first
          application.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy. We will change the &ldquo;Last
          updated&rdquo; date at the top of this page and may provide in-app
          notice for material changes.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about this privacy policy? Email us at{" "}
          <a href="mailto:hello@askarbiter.ai">hello@askarbiter.ai</a>.
        </p>
      </main>

      <Footer />
    </div>
  );
}
