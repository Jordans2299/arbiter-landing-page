"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";

interface FirebaseCompat {
  initializeApp(config: Record<string, string>): void;
  firestore: {
    (): {
      collection(name: string): {
        add(data: Record<string, unknown>): Promise<unknown>;
      };
    };
    FieldValue: {
      serverTimestamp(): unknown;
    };
  };
}

declare const firebase: FirebaseCompat;

const firebaseConfig = {
  apiKey: "AIzaSyD_NQG1V-DbXHnhQqGBW5N19qsJDXakun0",
  authDomain: "arbiter-landing-page.firebaseapp.com",
  databaseURL: "https://arbiter-landing-page-default-rtdb.firebaseio.com",
  projectId: "arbiter-landing-page",
  storageBucket: "arbiter-landing-page.firebasestorage.app",
  messagingSenderId: "1081695267625",
  appId: "1:1081695267625:web:69972b1a5a29d90674e538",
  measurementId: "G-ME5YHRHJ0J",
};

export default function BetaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [firebaseReady, setFirebaseReady] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    setSuccess("");
    setError("");
  }, []);

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    window.addEventListener("open-beta-modal", handleOpen);

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("open-beta-modal", handleOpen);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  function initFirebase() {
    if (typeof firebase !== "undefined" && !firebaseReady) {
      firebase.initializeApp(firebaseConfig);
      setFirebaseReady(true);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const db = firebase.firestore();

      await db.collection("beta_signups").add({
        name: formData.get("full_name"),
        email: formData.get("email"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "direct",
      });

      setSuccess(
        "Thank you! Your invite request has been submitted successfully. We'll be in touch soon!"
      );
      form.reset();

      setTimeout(() => close(), 20000);
    } catch {
      setError(
        "Sorry, there was an error submitting your request. Please try again or email us directly at hello@askarbiter.ai"
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <Script
        src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
        strategy="lazyOnload"
        onLoad={initFirebase}
      />
      <Script
        src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"
        strategy="lazyOnload"
        onLoad={initFirebase}
      />

      {isOpen && (
        <div className="modal-backdrop open" onClick={close} />
      )}
      <div
        className={`modal ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="modal-card">
          <div className="modal-header">
            <h3 className="modal-title">Join the TestFlight Beta</h3>
            <button className="modal-close" onClick={close}>
              &times;
            </button>
          </div>
          <form className="beta-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name">Name*</label>
              <input
                id="full_name"
                name="full_name"
                placeholder="Your full name"
                required
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Request Invite"}
            </button>
            {success && (
              <div className="success-msg" style={{ display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span>✓</span>
                  <span>{success}</span>
                </div>
              </div>
            )}
            {error && (
              <div className="error-msg" style={{ display: "block" }}>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
