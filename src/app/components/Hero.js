import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero / Banner */}
      <section className="hero-shell relative isolate mx-auto max-w-7xl overflow-hidden">
        <div className="hero-grid mx-auto grid min-h-[calc(100vh-80px)] items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            {/* Heading */}
            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="mt-7 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA */}
            <a
              href="#library"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-7 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
            >
              <span>Browse Workouts</span>

              {/* Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="hero-image-frame relative aspect-[4/5] w-full max-w-[450px] overflow-hidden rounded-2xl">
              <Image
                src="/banner.png"
                alt="FitLog workout"
                fill
                priority
                className="object-cover p-5"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
