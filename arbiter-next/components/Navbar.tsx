"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeResources(event: PointerEvent) {
      if (!resourcesRef.current?.contains(event.target as Node)) setResourcesOpen(false);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        setMobileResourcesOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeResources);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", closeResources);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, []);

  function toggle() {
    setIsOpen((prev) => {
      document.body.style.overflow = prev ? "" : "hidden";
      return !prev;
    });
  }

  function closeMenu() {
    setIsOpen(false);
    setMobileResourcesOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link className="logo" href="/">
            <div className="logo-icon">
              <Image src="/newlogo.png" alt="Logo" className="logo-img" width={36} height={36} priority />
            </div>
            <span>Arbiter</span>
          </Link>
          <ul className="nav-links">
            <li><a href="/#features">Features</a></li>
            <li><a href="/#mission">Mission</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
          <div className="nav-actions">
            <div className="nav-resource" ref={resourcesRef}>
              <button type="button" aria-haspopup="menu" aria-expanded={resourcesOpen} onClick={() => setResourcesOpen((open) => !open)}>Resources</button>
              <div className="nav-resource-menu" role="menu" hidden={!resourcesOpen}>
                <Link href="/documentation" role="menuitem" onClick={() => setResourcesOpen(false)}><strong>Docs</strong><small>Learn how Arbiter works</small></Link>
                <Link href="/benchmarks" role="menuitem" onClick={() => setResourcesOpen(false)}><strong>Benchmarks</strong><small>Compare open models</small></Link>
                <Link href="/blog" role="menuitem" onClick={() => setResourcesOpen(false)}><strong>Blog</strong><small>News, guides, and updates</small></Link>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="nav-right-mobile">
            <ThemeToggle />
            <button
              className={`hamburger ${isOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={toggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-nav ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <ul>
          <li><a href="/#features" onClick={closeMenu}>Features</a></li>
          <li className="mobile-resource">
            <button type="button" aria-expanded={mobileResourcesOpen} onClick={() => setMobileResourcesOpen((open) => !open)}>Resources</button>
            {mobileResourcesOpen && <div className="mobile-resource-links"><Link href="/documentation" onClick={closeMenu}>Docs</Link><Link href="/benchmarks" onClick={closeMenu}>Benchmarks</Link><Link href="/blog" onClick={closeMenu}>Blog</Link></div>}
          </li>
          <li><a href="/#mission" onClick={closeMenu}>Mission</a></li>
          <li><a href="/#faq" onClick={closeMenu}>FAQ</a></li>
          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </>
  );
}
