"use client";

import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

const sortOptions = [
  ["duration", "Duration"],
  ["caloriesBurned", "Calories"],
  ["rating", "Rating"],
];

export default function WorkoutLibrary({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = [...workouts].sort(
    (firstWorkout, secondWorkout) =>
      Number(secondWorkout[sortBy] || 0) - Number(firstWorkout[sortBy] || 0)
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">WORKOUTS</p>
          <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">The Library</h2>
          <p className="mt-3 text-gray-400">Twelve lifts covering every major muscle group.</p>
        </div>

        <label className="relative flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-gray-400">
          <span>Sort By</span>
          <span className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-full border border-white/20 bg-[#15171b] py-3 pl-4 pr-10 text-sm font-bold normal-case tracking-normal text-white outline-none transition focus:border-[#ccff00]"
            >
              {sortOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]" aria-hidden="true">
              ⌄
            </span>
          </span>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
}