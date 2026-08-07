import React from "react";

// 🔻 apni PNGs ka path yahan daal do (src change karo, baaki sab same rahega)
const logos = [
  { id: 1, src: "https://startuptimes.net/storage/2f1151cb-9270-4a54-85b0-4d3ef68fecf6.png", alt: "Client logo 1" },
  { id: 2, src: "	https://clinifia.com/assets/webLogo-CGxU_-7e.png", alt: "Client logo 2" },
  { id: 3, src: "https://mytask.devobyte.in/assets/devobyte-icon-Di_8oWy7.png", alt: "Client logo 3" },
  { id: 4, src: "https://www.restylehub.com/logo.png", alt: "Client logo 4" },
  { id: 5, src: "https://i0.wp.com/centeredcarewellness.org/wp-content/uploads/2024/08/CCW-Curved-Logo-Transparent.png?resize=1024%2C690&ssl=1", alt: "Client logo 5" },
  { id: 6, src: "https://founiq.com/assets/logo-DXzbDW4g.png", alt: "Client logo 6" },
   { id: 7, src: "https://baavan.com/img/bavan.png", alt: "Client logo 7" },
];

export default function BrandCarousel() {
  // track ko duplicate karte hain taaki loop seamless dikhe
  const track = [...logos, ...logos];

  return (
    <div className="w-full flex items-center justify-center bg-neutral-50 ">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 26s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="marquee-wrap relative w-full  overflow-hidden border-y border-neutral-300 bg-neutral-400 py-5 rounded-sm">
        {/* left/right edge fade so the loop reads seamless */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-neutral-200 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-neutral-200 to-transparent" />

        <div className="marquee-track flex items-center gap-20 w-max">
         {track.map((logo, i) => (
  <div
    key={i}
    className="group flex-shrink-0 h-20 w-32 flex items-center justify-center cursor-pointer"
  >
<img
  src={logo.src}
  alt={logo.alt}
  className="max-h-12 max-w-full w-auto h-auto object-contain
             grayscale sepia saturate-200 brightness-75 contrast-125
             transition-all duration-500 ease-out
             group-hover:grayscale-0 group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:contrast-100
             group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1"
/>
  </div>
))}
        </div>
      </div>
    </div>
  );
}