"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AMBER = "#C7954A";

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) return;

    let mouseX = -100;
    let mouseY = -100;
    let isOverInteractive = false;
    let rafId;

    const updateMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    /* ==========================================
       INTERACTIVE ELEMENTS
    ========================================== */

    const isInteractive = (target) => {
      return target?.closest(
        "button, a, [role='button'], input[type='button'], input[type='submit']"
      );
    };

    /* ==========================================
       MOUSE MOVE
    ========================================== */

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const interactive = isInteractive(e.target);

      if (interactive) {
        if (!isOverInteractive) {
          isOverInteractive = true;

          // Custom cursor completely hide
          gsap.set(outer, {
            opacity: 0,
          });

          gsap.set(inner, {
            opacity: 0,
          });

          // Browser arrow cursor
          document.body.classList.add(
            "native-cursor-active"
          );
        }
      } else {
        if (isOverInteractive) {
          isOverInteractive = false;

          // Custom cursor show
          gsap.set(outer, {
            opacity: 1,
          });

          gsap.set(inner, {
            opacity: 1,
          });

          document.body.classList.remove(
            "native-cursor-active"
          );
        }
      }
    };

    /* ==========================================
       CLICK EFFECT
    ========================================== */

    const handlePointerDown = () => {
      if (isOverInteractive) return;

      gsap.to(inner, {
        scale: 2,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const handlePointerUp = () => {
      if (isOverInteractive) return;

      gsap.to(inner, {
        scale: 1,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    /* ==========================================
       CURSOR ANIMATION
    ========================================== */

    const animate = () => {
      if (!isOverInteractive) {
        // Inner dot
        gsap.set(inner, {
          x: mouseX,
          y: mouseY,
        });

        // Outer circle
        gsap.to(outer, {
          x: mouseX - 20,
          y: mouseY - 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          duration: 0.12,
          ease: "power2.out",
          overwrite: true,
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    /* ==========================================
       EVENTS
    ========================================== */

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "pointerup",
      handlePointerUp
    );

    animate();

    /* ==========================================
       CLEANUP
    ========================================== */

    return () => {
      cancelAnimationFrame(rafId);

      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      document.body.classList.remove(
        "native-cursor-active"
      );
    };
  }, []);

  return (
    <>
      {/* ==========================================
          OUTER CUSTOM CURSOR
      ========================================== */}

      <div
        ref={outerRef}
        aria-hidden="true"
        className="custom-cursor-outer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,

          width: 40,
          height: 40,

          border: `1.5px solid ${AMBER}`,
          borderRadius: "50%",

          backgroundColor: "transparent",

          pointerEvents: "none",

          zIndex: 999999,

          boxSizing: "border-box",

          willChange:
            "transform, opacity",
        }}
      />

      {/* ==========================================
          INNER GOLD DOT
      ========================================== */}

      <div
        ref={innerRef}
        aria-hidden="true"
        className="custom-cursor-inner"
        style={{
          position: "fixed",

          top: 0,
          left: 0,

          width: 8,
          height: 8,

          marginLeft: -4,
          marginTop: -4,

          borderRadius: "50%",

          backgroundColor: AMBER,

          pointerEvents: "none",

          zIndex: 1000000,

          boxSizing: "border-box",

          willChange:
            "transform, opacity",
        }}
      />

      {/* ==========================================
          CURSOR CSS
      ========================================== */}

      <style jsx global>{`
        /* Desktop / Mouse */
        @media (hover: hover) and (pointer: fine) {
          /*
            Normal page:
            custom cursor active
          */
          html,
          body,
          body * {
            cursor: none !important;
          }

          /*
            BUTTON / LINK HOVER:
            custom cursor hidden
            native arrow visible
          */
          body.native-cursor-active,
          body.native-cursor-active * {
            cursor: auto !important;
          }

          body.native-cursor-active
            button,
          body.native-cursor-active
            a,
          body.native-cursor-active
            [role="button"],
          body.native-cursor-active
            input[type="button"],
          body.native-cursor-active
            input[type="submit"] {
            cursor: pointer !important;
          }

          /*
            Custom cursor itself never captures mouse
          */
          .custom-cursor-outer,
          .custom-cursor-inner {
            pointer-events: none !important;
          }
        }

        /* Mobile / Touch */
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-outer,
          .custom-cursor-inner {
            display: none !important;
          }

          html,
          body,
          body * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}