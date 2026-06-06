"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => {
      document.body.style.overflow = prev ? "" : "hidden";
      return !prev;
    });
  }

  function closeMenu() {
    setIsOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <>
      <nav>
        <div className="nav-container">
          <a className="logo" href="#">
            <div className="logo-icon">
              <Image src="/newlogo.png" alt="Logo" className="logo-img" width={36} height={36} priority />
            </div>
            <span>Arbiter</span>
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#mission">Mission</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
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
      </nav>

      <div
        className={`mobile-nav ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <ul>
          <li><a href="#features" onClick={closeMenu}>Features</a></li>
          <li><a href="#mission" onClick={closeMenu}>Mission</a></li>
          <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </>
  );
}
