import Link from "next/link";

export default function Footer() {
  return (
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
            <Link className="footer-contact" href="/documentation">
              Docs
            </Link>
            <Link className="footer-contact" href="/blog">
              Blog
            </Link>
            <a
              className="footer-contact"
              href="https://x.com/askArbiterAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Arbiter AI on X"
            >
              X / Twitter
            </a>
            <Link className="footer-contact" href="/privacy">
              Privacy
            </Link>
            <Link className="footer-contact" href="/terms">
              Terms
            </Link>
          </div>
          <p className="footer-copyright">
            &copy; 2026 Arbiter Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
