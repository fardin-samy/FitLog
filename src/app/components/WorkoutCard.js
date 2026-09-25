
import Link from "next/link";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-800 bg-[#111] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      {/* Image */}
      <div className="relative h-88 w-full overflow-hidden bg-gray-900 sm:h-80">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-contain p-3 transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#ccff00]/40 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="mt-4 text-lg font-black uppercase leading-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-gray-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-400">

          <span className="flex items-center gap-1">
            ⏱️ {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            🔥 {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            ⭐ {workout.rating}
          </span>

        </div>
      </div>
    </Link>
  );
}
