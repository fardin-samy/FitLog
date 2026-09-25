import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";

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

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div className="relative h-[30rem] min-w-0 overflow-hidden rounded-2xl bg-black sm:h-[36rem] lg:h-[42rem]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain p-2 mix-blend-screen sm:p-4"
            />
          </div>

          <div className="min-w-0 max-w-xl lg:pt-4">
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

            <h1 className="mt-5 text-3xl font-black uppercase leading-none sm:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">{workout.description}</p>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", workout.sets],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", workout.rating],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-bold uppercase tracking-[0.14em] text-gray-500">{label}</span>
                  <span className="text-right font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-xl font-black uppercase">Instructions</h2>
            <ol className="mt-4 space-y-3 text-gray-300">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="font-bold text-[#ccff00]">0{index + 1}</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}
