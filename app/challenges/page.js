
"use client";

import { useEffect, useState } from "react";
import { useAppliances } from "@/context/ApplianceContext";

// Get date in YYYY-MM-DD format
const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get previous date
const getPreviousDate = (dateKey) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  date.setDate(date.getDate() - 1);

  return getDateKey(date);
};

const challenges = [
  {
    id: 1,
    title: "Switch Off Unused Lights",
    description: "Turn off unnecessary lights for 2 hours.",
    icon: "💡",
    units: 0.018,
    points: 10,
  },
  {
    id: 2,
    title: "Reduce Fan Usage",
    description: "Reduce fan usage by 1 hour.",
    icon: "🌀",
    units: 0.075,
    points: 15,
  },
  {
    id: 3,
    title: "AC Energy Saver",
    description: "Reduce AC usage by 30 minutes.",
    icon: "❄️",
    units: 0.75,
    points: 25,
  },
  {
    id: 4,
    title: "Smart TV Habit",
    description: "Avoid unnecessary TV usage for 1 hour.",
    icon: "📺",
    units: 0.1,
    points: 10,
  },
  {
    id: 5,
    title: "Geyser Timer",
    description: "Reduce geyser usage by 15 minutes.",
    icon: "🚿",
    units: 0.5,
    points: 20,
  },
];

const achievements = [
  { title: "Energy Beginner", requirement: 1, icon: "🌱" },
  { title: "Power Saver", requirement: 3, icon: "⚡" },
  { title: "Eco Champion", requirement: 5, icon: "🏆" },
];

export default function Challenges() {
  const { rate } = useAppliances();

  const [today, setToday] = useState("");
  const [completed, setCompleted] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Load saved data after the page mounts
  useEffect(() => {
    const currentDate = getDateKey(new Date());
    setToday(currentDate);

    try {
      const savedChallenges = localStorage.getItem("ecoChallenges");
      const savedDays = localStorage.getItem("ecoChallengeDays");

      if (savedChallenges) {
        const parsed = JSON.parse(savedChallenges);

        if (
          parsed.date === currentDate &&
          Array.isArray(parsed.completed)
        ) {
          setCompleted(parsed.completed);
        }
      }

      if (savedDays) {
        const parsedDays = JSON.parse(savedDays);

        if (Array.isArray(parsedDays)) {
          setCompletedDays(parsedDays);
        }
      }
    } catch (error) {
      console.error("Error loading challenge data:", error);
    }

    setLoaded(true);
  }, []);

  // Save today's completed challenges
  useEffect(() => {
    if (!loaded || !today) return;

    localStorage.setItem(
      "ecoChallenges",
      JSON.stringify({
        date: today,
        completed,
      })
    );
  }, [completed, loaded, today]);

  // Save completed challenge days
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "ecoChallengeDays",
      JSON.stringify(completedDays)
    );
  }, [completedDays, loaded]);

  // Calculate daily streak
  useEffect(() => {
    if (!today || !loaded) return;

    let count = 0;

    let checkDate = completedDays.includes(today)
      ? today
      : getPreviousDate(today);

    while (completedDays.includes(checkDate)) {
      count++;
      checkDate = getPreviousDate(checkDate);
    }

    setStreak(count);
  }, [today, completedDays, loaded]);

  // Complete a challenge
  const completeChallenge = (challenge) => {
    if (completed.includes(challenge.id) || !today) return;

    setCompleted((previous) => [...previous, challenge.id]);

    setCompletedDays((previous) =>
      previous.includes(today) ? previous : [...previous, today]
    );
  };

  // Calculate today's statistics
  const completedChallenges = challenges.filter((challenge) =>
    completed.includes(challenge.id)
  );

  const totalPoints = completedChallenges.reduce(
    (sum, challenge) => sum + challenge.points,
    0
  );

  const unitsSaved = completedChallenges.reduce(
    (sum, challenge) => sum + challenge.units,
    0
  );

  const moneySaved = unitsSaved * rate;

  return (
    <main className="min-h-screen bg-green-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            🌱 Eco Challenges
          </h1>
          <p className="mt-2 text-gray-600">
            Complete daily challenges and save energy!
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 text-center shadow">
            <p className="text-3xl">⭐</p>
            <h2 className="mt-2 text-2xl font-bold text-green-700">
              {totalPoints}
            </h2>
            <p className="text-gray-600">Points Earned</p>
          </div>

          <div className="rounded-xl bg-white p-5 text-center shadow">
            <p className="text-3xl">⚡</p>
            <h2 className="mt-2 text-2xl font-bold text-green-700">
              {unitsSaved.toFixed(3)}
            </h2>
            <p className="text-gray-600">kWh Saved (Estimated)</p>
          </div>

          <div className="rounded-xl bg-white p-5 text-center shadow">
            <p className="text-3xl">💰</p>
            <h2 className="mt-2 text-2xl font-bold text-green-700">
              ₹{moneySaved.toFixed(2)}
            </h2>
            <p className="text-gray-600">Money Saved (Estimated)</p>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="mb-8 rounded-xl bg-white p-6 text-center shadow">
          <p className="text-4xl">🔥</p>
          <h2 className="mt-2 text-2xl font-bold text-orange-600">
            {streak} {streak === 1 ? "Day" : "Days"} Streak
          </h2>
          <p className="mt-1 text-gray-600">
            Complete at least one challenge every day to maintain your streak!
          </p>
        </div>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            🏆 Achievements
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {achievements.map((badge) => {
              const unlocked =
                completed.length >= badge.requirement;

              return (
                <div
                  key={badge.title}
                  className={`rounded-xl p-5 text-center shadow ${
                    unlocked
                      ? "bg-green-100"
                      : "bg-white opacity-60"
                  }`}
                >
                  <p className="text-4xl">{badge.icon}</p>
                  <h3 className="mt-2 font-bold text-green-800">
                    {badge.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {unlocked
                      ? "Unlocked!"
                      : `Complete ${badge.requirement} challenges`}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Daily Challenges */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            🎯 Today's Challenges
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {challenges.map((challenge) => {
              const isCompleted = completed.includes(challenge.id);

              return (
                <div
                  key={challenge.id}
                  className="flex flex-col justify-between rounded-xl bg-white p-5 shadow"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {challenge.icon}
                      </span>
                      <h3 className="text-lg font-bold text-green-800">
                        {challenge.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-gray-600">
                      {challenge.description}
                    </p>

                    <p className="mt-2 font-semibold text-green-700">
                      +{challenge.points} points
                    </p>
                  </div>

                  <button
                    onClick={() => completeChallenge(challenge)}
                    disabled={isCompleted || !today}
                    className={`mt-4 rounded-lg px-4 py-2 font-semibold text-white ${
                      isCompleted
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isCompleted ? "✓ Completed" : "Complete Challenge"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {completed.length === challenges.length && (
          <div className="mt-8 rounded-xl bg-green-100 p-6 text-center">
            <h2 className="text-xl font-bold text-green-800">
              🎉 Amazing! You completed all today's challenges!
            </h2>
            <p className="mt-2 text-green-700">
              Keep saving energy and protecting the environment.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          Note: Energy and money savings are estimates based on assumed
          usage reductions, not actual meter readings.
        </p>
      </div>
    </main>
  );
}
