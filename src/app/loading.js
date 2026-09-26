export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-161px)] items-center justify-center bg-black px-6 py-20 text-white">
      <div className="text-center" role="status" aria-live="polite">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-[#ccff00]" />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}