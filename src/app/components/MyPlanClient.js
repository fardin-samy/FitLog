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
  const [activeTab, setActiveTab] = useState("plan");

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

        <div className="mt-12 border-b border-white/10" role="tablist" aria-label="Workout lists">
          {[
            ["plan", "Today's Plan"],
            ["saved", "Saved For Later"],
          ].map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-6 border-b-2 px-1 pb-4 text-sm font-black uppercase tracking-wide transition ${
                activeTab === tab
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="mt-8" role="tabpanel">
          <WorkoutList
            workouts={activeTab === "plan" ? plan : saved}
            emptyMessage={
              activeTab === "plan"
                ? "Your plan is empty. Add a workout from the library."
                : "Nothing saved yet."
            }
          />
        </section>
      </div>
    </main>
  );
}
