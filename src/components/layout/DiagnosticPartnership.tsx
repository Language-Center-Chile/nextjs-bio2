"use client";

import Image from "next/image";

const logos = [
  { src: "/assets/partnerships/Logo-DM-OK.svg", alt: "Diagnostic" },
  { src: "/assets/partnerships/Metro_de_Santiago_Version_Roja.jpg", alt: "Metro de Santiago" },
  { src: "/assets/partnerships/Watt's_2.webp", alt: "Watt's" },
  { src: "/assets/partnerships/efe.png", alt: "EFE" },
  { src: "/assets/partnerships/logo-mlp.svg", alt: "MLP" }
];

export default function DiagnosticPartnership() {
  return (
    <section className="py-16 bg-[#0F1115] text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Alianzas</h2>
          <p className="text-neutral-400 text-lg">
            Algunas organizaciones que confían en nuestro trabajo.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#0E1A27]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0E1A27] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0E1A27] to-transparent z-10" />

          <div className="py-8">
            <div className="marquee flex w-max items-center gap-14 px-10">
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="relative h-10 w-36 md:h-12 md:w-44 opacity-80 grayscale transition hover:grayscale-0 hover:opacity-100"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 768px) 176px, 144px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

