"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname();
  const [counts, setCounts] = useState({ plan: planCount, saved: savedCount });

  useEffect(() => {
    const updateCounts = () => {
      const readCount = (key) => JSON.parse(localStorage.getItem(key) || "[]").length;
      setCounts({ plan: readCount("fitlog-plan"), saved: readCount("fitlog-saved") });
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage-update", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <nav className="w-full border-b border-gray-800 bg-black">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:h-20 sm:flex-nowrap sm:gap-0 sm:px-6 sm:py-0">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-xl font-black uppercase tracking-tight text-white"
        >
          <Image
            src="/logo.png"
            alt="Fitlog logo"
            width={34}
            height={34}
          />
          <span className="ml-1">FitLog</span>
        </Link>

        {/* Navigation Links */}
        <div className="order-3 flex w-full items-center justify-center gap-1 sm:absolute sm:left-1/2 sm:order-none sm:w-auto sm:-translate-x-1/2 sm:gap-2">
          <Link
            href="/workout"
            className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-5 ${
              isActive("/workout")
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-5 ${
              isActive("/my-plan")
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Side Badges */}
        <div className="flex items-center gap-1 sm:gap-3">

          {/* Plan */}
          <div className="flex items-center gap-1 rounded-full bg-[#ccff00] px-2 py-1.5 text-xs font-bold text-black sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
            <span>Plan</span>
            <span>{counts.plan}</span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-1 rounded-full border border-[#ccff00] px-2 py-1.5 text-xs font-bold text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
            <span>Saved</span>
            <span>{counts.saved}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}