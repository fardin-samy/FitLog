import Image from "next/image";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

        {/* Left */}
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-7 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse Workouts
            <span>→</span>
          </a>
        </div>

        {/* Right */}
        <div className="relative h-[680px] overflow-hidden rounded-2xl">
          <Image
            src="/banner.png"
            alt="FitLog workout"
            fill
            priority
            className="object-contain p-16 sm:p-20"
          />
        </div>

      </section>

      {/* ================= LIBRARY ================= */}
      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24"
      >

        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
            The Library
          </h2>

          <p className="mt-3 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </section>
    </main>
  );
}
