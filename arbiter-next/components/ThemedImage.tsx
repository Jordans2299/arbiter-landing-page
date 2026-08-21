"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ThemedImageProps {
  darkSrc: string;
  lightSrc: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
}

/**
 * Renders a Next.js Image that swaps between dark/light variants
 * based on the current site theme. Falls back to darkSrc if no
 * lightSrc is provided.
 */
export default function ThemedImage({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  unoptimized = true,
}: ThemedImageProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    function readTheme() {
      const attr = document.documentElement.getAttribute("data-theme");
      setTheme(attr === "light" ? "light" : "dark");
    }
    readTheme();

    // Watch for theme changes via attribute mutation
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const src = theme === "light" && lightSrc ? lightSrc : darkSrc;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      unoptimized={unoptimized}
    />
  );
}
