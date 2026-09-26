import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
        <div className="flex items-center text-lg font-black uppercase tracking-tight">
          <Image src="/logo.png" alt="FitLog logo" width={30} height={30} />
          <span className="ml-2">FitLog</span>
        </div>
        <p className="text-sm text-gray-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}