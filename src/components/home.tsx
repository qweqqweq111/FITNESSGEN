import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import PreferenceForm from "./PreferenceForm";
import WorkoutRoutine from "./WorkoutRoutine";

interface WorkoutExercise {
  id?: string;
  name: string;
  sets: number;
  reps: string | number;
  rest: string;
  illustration: string;
  description?: string;
  muscleGroup?: string;
  equipment?: string;
}

interface WorkoutRoutineData {
  title: string;
  exercises: WorkoutExercise[];
}

// Map muscle groups to more specific categories
const muscleGroupMap: Record<string, string> = {
  full_body: "Full Body",
  upper_body: "Upper Body",
  lower_body: "Lower Body",
  core: "Core",
  chest: "Chest",
  back: "Back",
  shoulders: "Shoulders",
  arms: "Arms",
  legs: "Legs",
  glutes: "Glutes",
};

const HomePage = () => {
  const [workoutRoutine, setWorkoutRoutine] =
    useState<WorkoutRoutineData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Exercise database by muscle group and equipment
  const exerciseDatabase = {
    chest: {
      bodyweight: [
        { name: "Push-ups", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Decline Push-ups", reps: "8-10", sets: 3, rest: "60 sec" },
        { name: "Diamond Push-ups", reps: "8-10", sets: 3, rest: "60 sec" },
      ],
      dumbbells: [
        {
          name: "Dumbbell Chest Press",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
        { name: "Dumbbell Flyes", reps: "10-12", sets: 3, rest: "60 sec" },
        {
          name: "Incline Dumbbell Press",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
      ],
      barbell: [
        { name: "Bench Press", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Incline Bench Press", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Decline Bench Press", reps: "8-10", sets: 4, rest: "90 sec" },
      ],
      resistance_bands: [
        {
          name: "Resistance Band Chest Press",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Resistance Band Flyes",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
      ],
    },
    back: {
      bodyweight: [
        { name: "Pull-ups", reps: "6-8", sets: 3, rest: "90 sec" },
        { name: "Inverted Rows", reps: "8-10", sets: 3, rest: "60 sec" },
        { name: "Superman Hold", reps: "20-30 sec", sets: 3, rest: "45 sec" },
      ],
      dumbbells: [
        { name: "Dumbbell Rows", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Dumbbell Pullovers", reps: "10-12", sets: 3, rest: "60 sec" },
      ],
      barbell: [
        { name: "Barbell Rows", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Deadlifts", reps: "6-8", sets: 4, rest: "120 sec" },
      ],
      resistance_bands: [
        {
          name: "Resistance Band Rows",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Resistance Band Pull-aparts",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
      ],
      pull_up_bar: [
        { name: "Pull-ups", reps: "6-8", sets: 3, rest: "90 sec" },
        { name: "Chin-ups", reps: "6-8", sets: 3, rest: "90 sec" },
        { name: "Hanging Leg Raises", reps: "8-10", sets: 3, rest: "60 sec" },
      ],
      cable_machine: [
        { name: "Lat Pulldowns", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Cable Rows", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Face Pulls", reps: "12-15", sets: 3, rest: "60 sec" },
      ],
    },
    legs: {
      bodyweight: [
        { name: "Bodyweight Squats", reps: "15-20", sets: 3, rest: "60 sec" },
        { name: "Lunges", reps: "10-12 each leg", sets: 3, rest: "60 sec" },
        { name: "Glute Bridges", reps: "15-20", sets: 3, rest: "45 sec" },
      ],
      dumbbells: [
        { name: "Dumbbell Squats", reps: "10-12", sets: 3, rest: "60 sec" },
        {
          name: "Dumbbell Lunges",
          reps: "8-10 each leg",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Dumbbell Romanian Deadlifts",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
      ],
      barbell: [
        { name: "Barbell Squats", reps: "8-10", sets: 4, rest: "90 sec" },
        {
          name: "Barbell Lunges",
          reps: "8-10 each leg",
          sets: 3,
          rest: "90 sec",
        },
        {
          name: "Barbell Romanian Deadlifts",
          reps: "8-10",
          sets: 4,
          rest: "90 sec",
        },
      ],
      resistance_bands: [
        { name: "Banded Squats", reps: "12-15", sets: 3, rest: "60 sec" },
        {
          name: "Banded Lateral Walks",
          reps: "12-15 each side",
          sets: 3,
          rest: "45 sec",
        },
        {
          name: "Banded Glute Bridges",
          reps: "15-20",
          sets: 3,
          rest: "45 sec",
        },
      ],
    },
    core: {
      bodyweight: [
        { name: "Plank", reps: "30-60 sec", sets: 3, rest: "45 sec" },
        { name: "Crunches", reps: "15-20", sets: 3, rest: "45 sec" },
        {
          name: "Mountain Climbers",
          reps: "20 each side",
          sets: 3,
          rest: "45 sec",
        },
        {
          name: "Russian Twists",
          reps: "10-15 each side",
          sets: 3,
          rest: "45 sec",
        },
      ],
      dumbbells: [
        {
          name: "Dumbbell Russian Twists",
          reps: "10-12 each side",
          sets: 3,
          rest: "45 sec",
        },
        {
          name: "Dumbbell Side Bends",
          reps: "10-12 each side",
          sets: 3,
          rest: "45 sec",
        },
      ],
      resistance_bands: [
        {
          name: "Banded Pallof Press",
          reps: "10-12 each side",
          sets: 3,
          rest: "45 sec",
        },
        {
          name: "Banded Rotations",
          reps: "10-12 each side",
          sets: 3,
          rest: "45 sec",
        },
      ],
    },
    shoulders: {
      bodyweight: [
        { name: "Pike Push-ups", reps: "8-10", sets: 3, rest: "60 sec" },
        {
          name: "Handstand Hold (against wall)",
          reps: "20-30 sec",
          sets: 3,
          rest: "60 sec",
        },
      ],
      dumbbells: [
        {
          name: "Dumbbell Shoulder Press",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
        { name: "Lateral Raises", reps: "10-12", sets: 3, rest: "45 sec" },
        { name: "Front Raises", reps: "10-12", sets: 3, rest: "45 sec" },
      ],
      barbell: [
        { name: "Overhead Press", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Upright Rows", reps: "10-12", sets: 3, rest: "60 sec" },
      ],
      resistance_bands: [
        {
          name: "Banded Shoulder Press",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Banded Lateral Raises",
          reps: "12-15",
          sets: 3,
          rest: "45 sec",
        },
        { name: "Banded Front Raises", reps: "12-15", sets: 3, rest: "45 sec" },
      ],
    },
    arms: {
      bodyweight: [
        { name: "Tricep Dips", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Diamond Push-ups", reps: "8-10", sets: 3, rest: "60 sec" },
        { name: "Chin-ups", reps: "6-8", sets: 3, rest: "60 sec" },
      ],
      dumbbells: [
        {
          name: "Dumbbell Bicep Curls",
          reps: "10-12",
          sets: 3,
          rest: "45 sec",
        },
        { name: "Hammer Curls", reps: "10-12", sets: 3, rest: "45 sec" },
        { name: "Tricep Kickbacks", reps: "10-12", sets: 3, rest: "45 sec" },
        {
          name: "Overhead Tricep Extensions",
          reps: "10-12",
          sets: 3,
          rest: "45 sec",
        },
      ],
      barbell: [
        { name: "Barbell Curls", reps: "8-10", sets: 3, rest: "60 sec" },
        {
          name: "Close-grip Bench Press",
          reps: "8-10",
          sets: 3,
          rest: "60 sec",
        },
        { name: "Skull Crushers", reps: "8-10", sets: 3, rest: "60 sec" },
      ],
      resistance_bands: [
        { name: "Banded Bicep Curls", reps: "12-15", sets: 3, rest: "45 sec" },
        {
          name: "Banded Tricep Pushdowns",
          reps: "12-15",
          sets: 3,
          rest: "45 sec",
        },
        { name: "Banded Hammer Curls", reps: "12-15", sets: 3, rest: "45 sec" },
      ],
    },
    full_body: {
      bodyweight: [
        { name: "Burpees", reps: "10-15", sets: 3, rest: "60 sec" },
        {
          name: "Mountain Climbers",
          reps: "20 each side",
          sets: 3,
          rest: "45 sec",
        },
        { name: "Jump Squats", reps: "12-15", sets: 3, rest: "60 sec" },
        { name: "Push-ups", reps: "10-12", sets: 3, rest: "60 sec" },
      ],
      dumbbells: [
        { name: "Dumbbell Thrusters", reps: "10-12", sets: 3, rest: "60 sec" },
        {
          name: "Renegade Rows",
          reps: "8-10 each arm",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Dumbbell Clean and Press",
          reps: "8-10",
          sets: 3,
          rest: "60 sec",
        },
      ],
      barbell: [
        { name: "Barbell Deadlifts", reps: "6-8", sets: 4, rest: "90 sec" },
        { name: "Barbell Squats", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Clean and Jerk", reps: "6-8", sets: 4, rest: "90 sec" },
      ],
      resistance_bands: [
        {
          name: "Banded Squats to Overhead Press",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Banded Rows to Tricep Extension",
          reps: "12-15",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Banded Jumping Jacks",
          reps: "20-25",
          sets: 3,
          rest: "45 sec",
        },
      ],
    },
    upper_body: {
      bodyweight: [
        { name: "Push-ups", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Pull-ups", reps: "6-8", sets: 3, rest: "60 sec" },
        { name: "Tricep Dips", reps: "10-12", sets: 3, rest: "60 sec" },
      ],
      dumbbells: [
        {
          name: "Dumbbell Chest Press",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
        { name: "Dumbbell Rows", reps: "10-12", sets: 3, rest: "60 sec" },
        {
          name: "Dumbbell Shoulder Press",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
        { name: "Bicep Curls", reps: "10-12", sets: 3, rest: "45 sec" },
      ],
      barbell: [
        { name: "Bench Press", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Barbell Rows", reps: "8-10", sets: 4, rest: "90 sec" },
        { name: "Overhead Press", reps: "8-10", sets: 3, rest: "90 sec" },
      ],
      resistance_bands: [
        { name: "Banded Chest Press", reps: "12-15", sets: 3, rest: "60 sec" },
        { name: "Banded Rows", reps: "12-15", sets: 3, rest: "60 sec" },
        { name: "Banded Bicep Curls", reps: "12-15", sets: 3, rest: "45 sec" },
        {
          name: "Banded Tricep Extensions",
          reps: "12-15",
          sets: 3,
          rest: "45 sec",
        },
      ],
    },
    lower_body: {
      bodyweight: [
        { name: "Bodyweight Squats", reps: "15-20", sets: 3, rest: "60 sec" },
        { name: "Lunges", reps: "10-12 each leg", sets: 3, rest: "60 sec" },
        { name: "Glute Bridges", reps: "15-20", sets: 3, rest: "45 sec" },
        { name: "Calf Raises", reps: "15-20", sets: 3, rest: "45 sec" },
      ],
      dumbbells: [
        { name: "Dumbbell Squats", reps: "10-12", sets: 3, rest: "60 sec" },
        {
          name: "Dumbbell Lunges",
          reps: "8-10 each leg",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Dumbbell Romanian Deadlifts",
          reps: "10-12",
          sets: 3,
          rest: "60 sec",
        },
        {
          name: "Dumbbell Calf Raises",
          reps: "12-15",
          sets: 3,
          rest: "45 sec",
        },
      ],
      barbell: [
        { name: "Barbell Squats", reps: "8-10", sets: 4, rest: "90 sec" },
        {
          name: "Barbell Romanian Deadlifts",
          reps: "8-10",
          sets: 4,
          rest: "90 sec",
        },
        { name: "Barbell Hip Thrusts", reps: "10-12", sets: 3, rest: "60 sec" },
        { name: "Barbell Calf Raises", reps: "12-15", sets: 3, rest: "45 sec" },
      ],
      resistance_bands: [
        { name: "Banded Squats", reps: "12-15", sets: 3, rest: "60 sec" },
        {
          name: "Banded Lateral Walks",
          reps: "12-15 each side",
          sets: 3,
          rest: "45 sec",
        },
        {
          name: "Banded Glute Bridges",
          reps: "15-20",
          sets: 3,
          rest: "45 sec",
        },
        { name: "Banded Leg Press", reps: "12-15", sets: 3, rest: "60 sec" },
      ],
    },
  };

  // Mock function to generate a workout routine based on form data
  const generateWorkoutRoutine = (formData: any) => {
    setIsLoading(true);

    // Simulate API call or processing time
    setTimeout(() => {
      // Get the selected muscle groups or default to full body
      const targetMuscles =
        formData.targetMuscles && formData.targetMuscles.length > 0
          ? formData.targetMuscles
          : ["full_body"];

      // Get the selected equipment or default to bodyweight
      const equipment =
        formData.equipment && formData.equipment.length > 0
          ? formData.equipment
          : ["bodyweight"];

      // Get the first selected muscle group for the title
      const primaryMuscleGroup =
        muscleGroupMap[targetMuscles[0]] || "Full Body";

      // Generate exercises based on user selections
      const generatedExercises: WorkoutExercise[] = [];

      // Try to select exercises for each muscle group
      targetMuscles.forEach((muscleGroup) => {
        // Skip if we already have enough exercises
        if (generatedExercises.length >= 5) return;

        // Find available exercises for this muscle group with the selected equipment
        const muscleExercises: any[] = [];

        equipment.forEach((equip) => {
          if (
            exerciseDatabase[muscleGroup as keyof typeof exerciseDatabase]?.[
              equip as keyof (typeof exerciseDatabase)[keyof typeof exerciseDatabase]
            ]
          ) {
            const exercises =
              exerciseDatabase[muscleGroup as keyof typeof exerciseDatabase][
                equip as keyof (typeof exerciseDatabase)[keyof typeof exerciseDatabase]
              ];
            muscleExercises.push(...exercises);
          }
        });

        // If no exercises found with selected equipment, try bodyweight
        if (
          muscleExercises.length === 0 &&
          exerciseDatabase[muscleGroup as keyof typeof exerciseDatabase]
            ?.bodyweight
        ) {
          muscleExercises.push(
            ...exerciseDatabase[muscleGroup as keyof typeof exerciseDatabase]
              .bodyweight,
          );
        }

        // Select a random exercise from available ones
        if (muscleExercises.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * muscleExercises.length,
          );
          const exercise = muscleExercises[randomIndex];

          // Add to our workout
          generatedExercises.push({
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            rest: exercise.rest,
            illustration: `https://api.dicebear.com/7.x/avataaars/svg?seed=${exercise.name.toLowerCase().replace(/\s+/g, "")}_${formData.fitnessLevel}`,
            muscleGroup: muscleGroupMap[muscleGroup],
            equipment:
              equipment
                .find(
                  (e) =>
                    exerciseDatabase[
                      muscleGroup as keyof typeof exerciseDatabase
                    ][
                      e as keyof (typeof exerciseDatabase)[keyof typeof exerciseDatabase]
                    ],
                )
                ?.replace("_", " ") || "Bodyweight",
          });
        }
      });

      // If we don't have enough exercises, add some from other muscle groups
      while (generatedExercises.length < 5) {
        // Pick a random muscle group and equipment
        const muscleGroups = Object.keys(exerciseDatabase);
        const randomMuscleGroup =
          muscleGroups[Math.floor(Math.random() * muscleGroups.length)];

        // Try to use selected equipment first
        let selectedEquipment =
          equipment[Math.floor(Math.random() * equipment.length)];
        let exercises =
          exerciseDatabase[randomMuscleGroup as keyof typeof exerciseDatabase][
            selectedEquipment as keyof (typeof exerciseDatabase)[keyof typeof exerciseDatabase]
          ];

        // If no exercises found, try bodyweight
        if (!exercises) {
          exercises =
            exerciseDatabase[randomMuscleGroup as keyof typeof exerciseDatabase]
              .bodyweight;
        }

        if (exercises) {
          const randomExercise =
            exercises[Math.floor(Math.random() * exercises.length)];

          // Check if we already have this exercise
          if (!generatedExercises.some((e) => e.name === randomExercise.name)) {
            generatedExercises.push({
              name: randomExercise.name,
              sets: randomExercise.sets,
              reps: randomExercise.reps,
              rest: randomExercise.rest,
              illustration: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomExercise.name.toLowerCase().replace(/\s+/g, "")}_${formData.fitnessLevel}`,
              muscleGroup: muscleGroupMap[randomMuscleGroup],
              equipment: selectedEquipment.replace("_", " "),
            });
          }
        }
      }

      // Adjust difficulty based on fitness level
      if (
        formData.fitnessLevel === "intermediate" ||
        formData.fitnessLevel === "advanced"
      ) {
        generatedExercises.forEach((exercise) => {
          if (formData.fitnessLevel === "advanced") {
            exercise.sets = Math.min(exercise.sets + 2, 5); // Add up to 2 sets, max 5
          } else {
            exercise.sets = Math.min(exercise.sets + 1, 4); // Add 1 set, max 4
          }
        });
      }

      // Generate the workout routine
      const routine: WorkoutRoutineData = {
        title: `${formData.fitnessLevel.charAt(0).toUpperCase() + formData.fitnessLevel.slice(1)} ${primaryMuscleGroup} Workout`,
        exercises: generatedExercises,
      };

      setWorkoutRoutine(routine);
      setIsLoading(false);
    }, 1500);
  };

  const handleGenerateNewRoutine = () => {
    // Reset to form view
    setWorkoutRoutine(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FitGen ProMax
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-7xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          {!workoutRoutine && (
            <div className="text-center mb-16">
              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Perfect
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Workout Routine
                </span>
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Generate personalized workout routines tailored to your fitness
                level, available equipment, and target goals. Get started in
                under 60 seconds.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  No signup required
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Instant generation
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Print & save friendly
                </div>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <motion.div
            className={`${!workoutRoutine ? "bg-white/70" : "bg-white/90"} backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {!workoutRoutine ? (
              <div className="p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Customize Your Workout
                    </h2>
                    <p className="text-gray-600">
                      Tell us about your preferences and we'll create the
                      perfect routine for you
                    </p>
                  </div>
                  <PreferenceForm
                    onSubmit={generateWorkoutRoutine}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
                <div className="relative">
                  <WorkoutRoutine
                    title={workoutRoutine.title}
                    exercises={workoutRoutine.exercises.map((ex, index) => ({
                      id: `generated-${index}`,
                      name: ex.name,
                      sets: ex.sets,
                      reps: ex.reps,
                      rest: 60,
                      illustration: ex.illustration,
                      muscleGroup: ex.muscleGroup,
                      equipment: ex.equipment,
                    }))}
                    onGenerateNew={handleGenerateNewRoutine}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Features Section */}
          {!workoutRoutine && (
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Recommendations
                </h3>
                <p className="text-gray-600 text-sm">
                  AI-powered exercise selection based on your equipment and
                  goals
                </p>
              </div>
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Instant Results
                </h3>
                <p className="text-gray-600 text-sm">
                  Get your personalized workout routine in seconds, not hours
                </p>
              </div>
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fully Customizable
                </h3>
                <p className="text-gray-600 text-sm">
                  Adjust difficulty, duration, and target muscle groups to fit
                  your needs
                </p>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center text-gray-500 text-sm">
            <div className="flex justify-center items-center space-x-6 mb-4">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
            <p>
              © {new Date().getFullYear()} FitGen ProMax. Crafted with ❤️ for
              fitness enthusiasts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
