import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-161px)] items-center justify-center bg-black px-6 py-20 text-center text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">404 Error</p>
        <h1 className="mt-4 text-5xl font-black uppercase sm:text-7xl">Page Not Found</h1>
        <p className="mx-auto mt-5 max-w-md text-gray-400">
          This route does not exist. Head back to the workout library and keep moving.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}