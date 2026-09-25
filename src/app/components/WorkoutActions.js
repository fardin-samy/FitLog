"use client";

import { useState } from "react";

const getStoredWorkouts = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

export default function WorkoutActions({ workout }) {
  const [message, setMessage] = useState("");

  const saveWorkout = (key, successMessage) => {
    const workouts = getStoredWorkouts(key);
    const alreadyAdded = workouts.some((item) => item.id === workout.id);

    if (!alreadyAdded) {
      localStorage.setItem(key, JSON.stringify([...workouts, workout]));
    }

    window.dispatchEvent(new Event("fitlog-storage-update"));
    setMessage(alreadyAdded ? "Already added" : successMessage);
    window.setTimeout(() => setMessage(""), 2200);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => saveWorkout("fitlog-plan", "Added to today's plan")}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
        >
          <span aria-hidden="true">+</span>
          Add to today&apos;s plan
        </button>
        <button
          type="button"
          onClick={() => saveWorkout("fitlog-saved", "Saved for later")}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ccff00] hover:text-black"
        >
          <span aria-hidden="true">☆</span>
          Save for later
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm font-semibold text-[#ccff00]" role="status">
        {message}
      </p>
    </div>
  );
}