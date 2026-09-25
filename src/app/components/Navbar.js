"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="w-full border-b border-gray-800 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-2xl font-black uppercase tracking-tight text-white"
        >
          <Image
            src="/logo.png"
            alt="Fitlog logo"
            width={40}
            height={40}
          />
          <span className="p-2">FitLog</span>
        </Link>

        {/* Navigation Links */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <Link
            href="/workout"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isActive("/workout")
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isActive("/my-plan")
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Side Badges */}
        <div className="flex items-center gap-3">

          {/* Plan */}
          <div className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black">
            <span>Plan</span>
            <span>{planCount}</span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-2 rounded-full border border-[#ccff00] px-4 py-2 text-sm font-bold text-white">
            <span>Saved</span>
            <span>{savedCount}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}