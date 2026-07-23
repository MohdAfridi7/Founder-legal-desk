import React from "react";

// 🔻 apni PNGs ka path yahan daal do (src change karo, baaki sab same rahega)
const logos = [
  { id: 1, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-1.png", alt: "Client logo 1" },
  { id: 2, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-2.png", alt: "Client logo 2" },
  { id: 3, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-3.png", alt: "Client logo 3" },
  { id: 4, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-4.png", alt: "Client logo 4" },
  { id: 5, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-5.png", alt: "Client logo 5" },
  { id: 6, src: "https://bracketweb.com/procounsel-html/assets/images/resources/brands-3-6.png", alt: "Client logo 6" },
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

      <div className="marquee-wrap relative w-full  overflow-hidden border-y border-neutral-300 bg-neutral-200 py-5 rounded-sm">
        {/* left/right edge fade so the loop reads seamless */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-neutral-200 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-neutral-200 to-transparent" />

        <div className="marquee-track flex items-center gap-20 w-max">
          {track.map((logo, i) => (
            <div
              key={i}
              className="group flex-shrink-0 h-20 flex items-center justify-center cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-18 w-auto    transition-all duration-500 ease-out
                           group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}