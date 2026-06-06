"use client";

import { useEffect, useRef } from "react";

export default function FloatingPlanets() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function updateParallax() {
      const container = containerRef.current;
      if (!container) return;

      const scrolled = window.pageYOffset;
      const sketches = container.querySelectorAll(".sketch");

      sketches.forEach((sketch, index) => {
        const speed = index % 2 === 0 ? 0.15 : 0.25;
        const yPos = -(scrolled * speed);
        (sketch as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sketches-container" ref={containerRef}>
      {/* LEFT SIDE PLANETS */}
      <div className="sketch sketch-planet left-1 float-up">
        <div className="planet-surface gas-giant"></div>
      </div>
      <div
        className="sketch sketch-planet left-2 float-down"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="planet-surface rocky-planet"></div>
      </div>
      <div
        className="sketch sketch-planet left-3 float-up"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="planet-surface ice-planet"></div>
        <div className="planet-ring"></div>
      </div>
      <div
        className="sketch asteroid-belt left-4 float-down"
        style={{ animationDelay: "2.2s" }}
      >
        <div className="asteroid asteroid-1"></div>
        <div className="asteroid asteroid-2"></div>
        <div className="asteroid asteroid-3"></div>
      </div>
      <div
        className="sketch sketch-planet left-5 float-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="planet-surface desert-planet"></div>
      </div>

      {/* RIGHT SIDE PLANETS */}
      <div
        className="sketch sketch-planet right-1 float-down"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="planet-surface lava-planet"></div>
      </div>
      <div
        className="sketch sketch-planet right-2 float-up"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="planet-surface ocean-planet"></div>
        <div className="small-moon"></div>
      </div>
      <div
        className="sketch sketch-planet right-3 float-down"
        style={{ animationDelay: "1.9s" }}
      >
        <div className="planet-surface purple-giant"></div>
        <div className="planet-ring diagonal-ring"></div>
      </div>
      <div
        className="sketch sketch-planet right-4 float-up"
        style={{ animationDelay: "2.6s" }}
      >
        <div className="planet-surface forest-planet"></div>
      </div>
      <div
        className="sketch binary-system right-5 float-down"
        style={{ animationDelay: "0.9s" }}
      >
        <div className="planet-surface twin-1"></div>
        <div className="planet-surface twin-2"></div>
        <div className="orbital-path"></div>
      </div>

      {/* CENTER SCATTERED OBJECTS */}
      <div
        className="sketch comet center-1 float-up"
        style={{ animationDelay: "3.2s" }}
      >
        <div className="comet-core"></div>
        <div className="comet-tail"></div>
      </div>
      <div
        className="sketch sketch-planet center-2 float-down"
        style={{ animationDelay: "1.7s" }}
      >
        <div className="planet-surface crystal-planet"></div>
      </div>
      <div
        className="sketch space-station center-3 float-up"
        style={{ animationDelay: "2.4s" }}
      >
        <div className="station-core"></div>
        <div className="station-ring"></div>
        <div className="docking-ports"></div>
      </div>
    </div>
  );
}
