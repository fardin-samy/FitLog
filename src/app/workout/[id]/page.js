import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts = await response.json();
  return workouts.find((workout) => String(workout.id) === String(id));
}

export default async function WorkoutDetail({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#library"
          className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00] hover:text-white"
        >
          Back to library
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#222630]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-[#ccff00]/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-none sm:text-6xl">
              {workout.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-400">{workout.description}</p>

            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-sm">
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="mt-1 font-bold">{workout.duration} min</p>
              </div>
              <div>
                <p className="text-gray-500">Calories</p>
                <p className="mt-1 font-bold">{workout.caloriesBurned} kcal</p>
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <p className="mt-1 font-bold text-[#ccff00]">{workout.rating}</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Equipment: <span className="font-semibold text-white">{workout.equipment}</span>
            </p>

            <h2 className="mt-10 text-xl font-black uppercase">Instructions</h2>
            <ol className="mt-4 space-y-3 text-gray-300">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="font-bold text-[#ccff00]">0{index + 1}</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
