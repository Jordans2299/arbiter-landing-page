import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Script from "next/script";
import FluxAnalytics from "@/components/FluxAnalytics";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arbiter - Private AI on Your Device",
  description:
    "Run powerful language models locally on iPhone and Mac. Private AI with 44 models, local network serving, and Apple Intelligence support.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

function getFluxProjectKey(): string {
  const keyName =
    process.env.NODE_ENV === "production"
      ? "FLUX_ANALYTICS_KEY_PROD"
      : "FLUX_ANALYTICS_KEY_DEV";
  const projectKey = process.env[keyName];

  if (!projectKey) {
    throw new Error(`Missing required environment variable: ${keyName}`);
  }

  return projectKey;
}

const fluxProjectKey = getFluxProjectKey();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("arbiter-theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")})()`,
          }}
        />
        <FluxAnalytics projectKey={fluxProjectKey} />
        {children}
        <Script
          src="https://kit.fontawesome.com/1c37cb57ef.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
