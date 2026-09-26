"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const readWorkouts = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

function EmptyState() {
  return (
    <div className="border border-dashed border-white/15 px-6 py-14 text-center">
      <h2 className="text-2xl font-black uppercase">Nothing Here Yet</h2>
      <p className="mt-3 text-sm text-gray-500">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function WorkoutList({ workouts, onRemove, onMarkDone }) {
  if (workouts.length === 0) {
    return <EmptyState />;
  }

  return <div className="space-y-4">{workouts.map((workout) => (
    <article
      key={workout.id}
      className={`grid gap-5 border border-white/10 bg-[#15171b] p-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center ${
        workout.completed ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-28 overflow-hidden bg-black">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="112px"
          className="object-contain p-2"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((group) => (
            <span key={group} className="text-xs font-bold uppercase tracking-[0.14em] text-[#ccff00]">
              {group}
            </span>
          ))}
        </div>
        <h3 className={`mt-2 text-xl font-black uppercase ${workout.completed ? "line-through" : ""}`}>
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex rounded-full border border-[#ccff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            type="button"
            onClick={() => onMarkDone(workout.id)}
            disabled={workout.completed}
            className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-white hover:border-[#ccff00] disabled:cursor-default disabled:border-[#ccff00]/40 disabled:text-[#ccff00]/60"
          >
            <span aria-hidden="true">✓</span>
            {workout.completed ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-gray-400 hover:border-red-400 hover:text-red-400"
        >
          ×
        </button>
      </div>
    </article>
  ))}</div>;
}

export default function MyPlanClient() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const update = () => {
      setPlan(readWorkouts("fitlog-plan"));
      setSaved(readWorkouts("fitlog-saved"));
      setLoading(false);
    };

    update();
    window.addEventListener("storage", update);
    window.addEventListener("fitlog-storage-update", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("fitlog-storage-update", update);
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const updateStorage = (key, nextWorkouts) => {
    localStorage.setItem(key, JSON.stringify(nextWorkouts));
    window.dispatchEvent(new Event("fitlog-storage-update"));
  };

  const showToast = (message) => {
    setToast(message);
  };

  const removeWorkout = (key, id) => {
    const nextWorkouts = readWorkouts(key).filter((workout) => workout.id !== id);
    updateStorage(key, nextWorkouts);
    if (key === "fitlog-plan") setPlan(nextWorkouts);
    if (key === "fitlog-saved") setSaved(nextWorkouts);
    showToast(key === "fitlog-plan" ? "Removed from today's plan" : "Removed from saved");
  };

  const markPlanWorkoutDone = (id) => {
    const nextPlan = readWorkouts("fitlog-plan").map((workout) => (
      workout.id === id ? { ...workout, completed: true } : workout
    ));
    updateStorage("fitlog-plan", nextPlan);
    setPlan(nextPlan);
    showToast("Marked as done");
  };

  const metrics = plan.reduce(
    (totals, workout) => ({
      exercises: totals.exercises + 1,
      minutes: totals.minutes + Number(workout.duration || 0),
      calories: totals.calories + Number(workout.caloriesBurned || 0),
    }),
    { exercises: 0, minutes: 0, calories: 0 }
  );

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mt-3 text-4xl font-black uppercase sm:text-6xl">My Plan</h1>
        <p className="mt-4 max-w-xl text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            ["Exercises", metrics.exercises],
            ["Minutes", metrics.minutes],
            ["Calories", metrics.calories],
          ].map(([label, value]) => (
            <div key={label} className="border border-white/10 bg-[#15171b] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#ccff00]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-b border-white/10" role="tablist" aria-label="Workout lists">
          {[
            ["plan", "Today's Plan"],
            ["saved", "Saved"],
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
          {loading ? (
            <p className="py-12 text-sm font-bold tracking-[0.16em] text-gray-500">Loading workouts…</p>
          ) : (
            <WorkoutList
              workouts={activeTab === "plan" ? plan : saved}
              onRemove={(id) => removeWorkout(activeTab === "plan" ? "fitlog-plan" : "fitlog-saved", id)}
              onMarkDone={activeTab === "plan" ? markPlanWorkoutDone : null}
            />
          )}
        </section>
      </div>
      {toast && (
        <div
          className="pointer-events-none fixed right-4 top-24 z-[100] rounded-full border border-[#ccff00] bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-2xl"
          role="alert"
          aria-live="assertive"
        >
          {toast}
        </div>
      )}
    </main>
  );
}
