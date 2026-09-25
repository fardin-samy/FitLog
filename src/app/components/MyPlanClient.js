"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const readWorkouts = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

function WorkoutList({ workouts, emptyMessage }) {
  if (workouts.length === 0) {
    return <p className="border border-dashed border-white/15 p-6 text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <article key={workout.id} className="border border-white/10 bg-[#15171b] p-5">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="text-xs font-bold uppercase tracking-[0.14em] text-[#ccff00]">
                {group}
              </span>
            ))}
          </div>
          <h3 className="mt-3 text-xl font-black uppercase">{workout.name}</h3>
          <p className="mt-2 text-sm text-gray-500">{workout.duration} min / {workout.caloriesBurned} kcal</p>
          <Link
            href={`/workout/${workout.id}`}
            className="mt-5 inline-flex rounded-full border border-[#ccff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
          >
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function MyPlanClient() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const update = () => {
      setPlan(readWorkouts("fitlog-plan"));
      setSaved(readWorkouts("fitlog-saved"));
    };

    update();
    window.addEventListener("storage", update);
    window.addEventListener("fitlog-storage-update", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("fitlog-storage-update", update);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        <h1 className="mt-3 text-4xl font-black uppercase sm:text-6xl">My Plan</h1>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black uppercase">Today&apos;s Plan</h2>
          <WorkoutList workouts={plan} emptyMessage="Your plan is empty. Add a workout from the library." />
        </section>

        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-black uppercase">Saved For Later</h2>
          <WorkoutList workouts={saved} emptyMessage="Nothing saved yet." />
        </section>
      </div>
    </main>
  );
}
