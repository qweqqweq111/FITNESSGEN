import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  illustration: string;
  description?: string;
  muscleGroup?: string;
  equipment?: string;
}

interface WorkoutRoutineProps {
  exercises?: Exercise[];
  title?: string;
  onGenerateNew?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
  isLoading?: boolean;
}

// Sample alternative exercises by muscle group
const alternativeExercises = {
  chest: [
    { name: "Push-ups", equipment: "Bodyweight", muscleGroup: "Chest" },
    { name: "Bench Press", equipment: "Barbell", muscleGroup: "Chest" },
    { name: "Chest Fly", equipment: "Dumbbells", muscleGroup: "Chest" },
    { name: "Incline Press", equipment: "Dumbbells", muscleGroup: "Chest" },
    { name: "Decline Push-ups", equipment: "Bodyweight", muscleGroup: "Chest" },
    { name: "Diamond Push-ups", equipment: "Bodyweight", muscleGroup: "Chest" },
    {
      name: "Dumbbell Chest Press",
      equipment: "Dumbbells",
      muscleGroup: "Chest",
    },
    { name: "Dumbbell Flyes", equipment: "Dumbbells", muscleGroup: "Chest" },
    {
      name: "Incline Dumbbell Press",
      equipment: "Dumbbells",
      muscleGroup: "Chest",
    },
    { name: "Decline Bench Press", equipment: "Barbell", muscleGroup: "Chest" },
    {
      name: "Resistance Band Chest Press",
      equipment: "Resistance Bands",
      muscleGroup: "Chest",
    },
  ],
  back: [
    { name: "Pull-ups", equipment: "Bodyweight", muscleGroup: "Back" },
    { name: "Bent-over Rows", equipment: "Barbell", muscleGroup: "Back" },
    { name: "Lat Pulldown", equipment: "Cable Machine", muscleGroup: "Back" },
    { name: "Deadlift", equipment: "Barbell", muscleGroup: "Back" },
    { name: "Inverted Rows", equipment: "Bodyweight", muscleGroup: "Back" },
    { name: "Superman Hold", equipment: "Bodyweight", muscleGroup: "Back" },
    { name: "Dumbbell Rows", equipment: "Dumbbells", muscleGroup: "Back" },
    { name: "Dumbbell Pullovers", equipment: "Dumbbells", muscleGroup: "Back" },
    {
      name: "Resistance Band Rows",
      equipment: "Resistance Bands",
      muscleGroup: "Back",
    },
    {
      name: "Resistance Band Pull-aparts",
      equipment: "Resistance Bands",
      muscleGroup: "Back",
    },
    { name: "Cable Rows", equipment: "Cable Machine", muscleGroup: "Back" },
  ],
  legs: [
    { name: "Bodyweight Squats", equipment: "Bodyweight", muscleGroup: "Legs" },
    { name: "Lunges", equipment: "Bodyweight", muscleGroup: "Legs" },
    { name: "Leg Press", equipment: "Machine", muscleGroup: "Legs" },
    { name: "Deadlift", equipment: "Barbell", muscleGroup: "Legs" },
    { name: "Glute Bridges", equipment: "Bodyweight", muscleGroup: "Legs" },
    { name: "Dumbbell Squats", equipment: "Dumbbells", muscleGroup: "Legs" },
    { name: "Dumbbell Lunges", equipment: "Dumbbells", muscleGroup: "Legs" },
    {
      name: "Dumbbell Romanian Deadlifts",
      equipment: "Dumbbells",
      muscleGroup: "Legs",
    },
    { name: "Barbell Squats", equipment: "Barbell", muscleGroup: "Legs" },
    { name: "Barbell Lunges", equipment: "Barbell", muscleGroup: "Legs" },
    {
      name: "Barbell Romanian Deadlifts",
      equipment: "Barbell",
      muscleGroup: "Legs",
    },
    {
      name: "Banded Squats",
      equipment: "Resistance Bands",
      muscleGroup: "Legs",
    },
    {
      name: "Banded Lateral Walks",
      equipment: "Resistance Bands",
      muscleGroup: "Legs",
    },
    {
      name: "Banded Glute Bridges",
      equipment: "Resistance Bands",
      muscleGroup: "Legs",
    },
  ],
  shoulders: [
    {
      name: "Pike Push-ups",
      equipment: "Bodyweight",
      muscleGroup: "Shoulders",
    },
    {
      name: "Handstand Hold",
      equipment: "Bodyweight",
      muscleGroup: "Shoulders",
    },
    {
      name: "Shoulder Press",
      equipment: "Dumbbells",
      muscleGroup: "Shoulders",
    },
    {
      name: "Lateral Raises",
      equipment: "Dumbbells",
      muscleGroup: "Shoulders",
    },
    { name: "Front Raises", equipment: "Dumbbells", muscleGroup: "Shoulders" },
    { name: "Overhead Press", equipment: "Barbell", muscleGroup: "Shoulders" },
    { name: "Upright Rows", equipment: "Barbell", muscleGroup: "Shoulders" },
    {
      name: "Banded Shoulder Press",
      equipment: "Resistance Bands",
      muscleGroup: "Shoulders",
    },
    {
      name: "Banded Lateral Raises",
      equipment: "Resistance Bands",
      muscleGroup: "Shoulders",
    },
    {
      name: "Banded Front Raises",
      equipment: "Resistance Bands",
      muscleGroup: "Shoulders",
    },
  ],
  arms: [
    { name: "Tricep Dips", equipment: "Bodyweight", muscleGroup: "Arms" },
    { name: "Diamond Push-ups", equipment: "Bodyweight", muscleGroup: "Arms" },
    { name: "Chin-ups", equipment: "Bodyweight", muscleGroup: "Arms" },
    { name: "Bicep Curls", equipment: "Dumbbells", muscleGroup: "Arms" },
    { name: "Hammer Curls", equipment: "Dumbbells", muscleGroup: "Arms" },
    { name: "Tricep Kickbacks", equipment: "Dumbbells", muscleGroup: "Arms" },
    {
      name: "Overhead Tricep Extensions",
      equipment: "Dumbbells",
      muscleGroup: "Arms",
    },
    { name: "Barbell Curls", equipment: "Barbell", muscleGroup: "Arms" },
    {
      name: "Close-grip Bench Press",
      equipment: "Barbell",
      muscleGroup: "Arms",
    },
    { name: "Skull Crushers", equipment: "Barbell", muscleGroup: "Arms" },
    {
      name: "Banded Bicep Curls",
      equipment: "Resistance Bands",
      muscleGroup: "Arms",
    },
    {
      name: "Banded Tricep Pushdowns",
      equipment: "Resistance Bands",
      muscleGroup: "Arms",
    },
  ],
  core: [
    { name: "Plank", equipment: "Bodyweight", muscleGroup: "Core" },
    { name: "Crunches", equipment: "Bodyweight", muscleGroup: "Core" },
    { name: "Russian Twists", equipment: "Bodyweight", muscleGroup: "Core" },
    { name: "Leg Raises", equipment: "Bodyweight", muscleGroup: "Core" },
    { name: "Mountain Climbers", equipment: "Bodyweight", muscleGroup: "Core" },
    {
      name: "Dumbbell Russian Twists",
      equipment: "Dumbbells",
      muscleGroup: "Core",
    },
    {
      name: "Dumbbell Side Bends",
      equipment: "Dumbbells",
      muscleGroup: "Core",
    },
    {
      name: "Banded Pallof Press",
      equipment: "Resistance Bands",
      muscleGroup: "Core",
    },
    {
      name: "Banded Rotations",
      equipment: "Resistance Bands",
      muscleGroup: "Core",
    },
  ],
  full_body: [
    { name: "Burpees", equipment: "Bodyweight", muscleGroup: "Full Body" },
    {
      name: "Mountain Climbers",
      equipment: "Bodyweight",
      muscleGroup: "Full Body",
    },
    { name: "Jump Squats", equipment: "Bodyweight", muscleGroup: "Full Body" },
    { name: "Push-ups", equipment: "Bodyweight", muscleGroup: "Full Body" },
    {
      name: "Dumbbell Thrusters",
      equipment: "Dumbbells",
      muscleGroup: "Full Body",
    },
    { name: "Renegade Rows", equipment: "Dumbbells", muscleGroup: "Full Body" },
    {
      name: "Dumbbell Clean and Press",
      equipment: "Dumbbells",
      muscleGroup: "Full Body",
    },
    {
      name: "Barbell Deadlifts",
      equipment: "Barbell",
      muscleGroup: "Full Body",
    },
    { name: "Barbell Squats", equipment: "Barbell", muscleGroup: "Full Body" },
    { name: "Clean and Jerk", equipment: "Barbell", muscleGroup: "Full Body" },
    {
      name: "Banded Squats to Overhead Press",
      equipment: "Resistance Bands",
      muscleGroup: "Full Body",
    },
  ],
  upper_body: [
    { name: "Push-ups", equipment: "Bodyweight", muscleGroup: "Upper Body" },
    { name: "Pull-ups", equipment: "Bodyweight", muscleGroup: "Upper Body" },
    { name: "Tricep Dips", equipment: "Bodyweight", muscleGroup: "Upper Body" },
    {
      name: "Dumbbell Chest Press",
      equipment: "Dumbbells",
      muscleGroup: "Upper Body",
    },
    {
      name: "Dumbbell Rows",
      equipment: "Dumbbells",
      muscleGroup: "Upper Body",
    },
    {
      name: "Dumbbell Shoulder Press",
      equipment: "Dumbbells",
      muscleGroup: "Upper Body",
    },
    { name: "Bench Press", equipment: "Barbell", muscleGroup: "Upper Body" },
    { name: "Barbell Rows", equipment: "Barbell", muscleGroup: "Upper Body" },
    { name: "Overhead Press", equipment: "Barbell", muscleGroup: "Upper Body" },
  ],
  lower_body: [
    {
      name: "Bodyweight Squats",
      equipment: "Bodyweight",
      muscleGroup: "Lower Body",
    },
    { name: "Lunges", equipment: "Bodyweight", muscleGroup: "Lower Body" },
    {
      name: "Glute Bridges",
      equipment: "Bodyweight",
      muscleGroup: "Lower Body",
    },
    { name: "Calf Raises", equipment: "Bodyweight", muscleGroup: "Lower Body" },
    {
      name: "Dumbbell Squats",
      equipment: "Dumbbells",
      muscleGroup: "Lower Body",
    },
    {
      name: "Dumbbell Lunges",
      equipment: "Dumbbells",
      muscleGroup: "Lower Body",
    },
    {
      name: "Dumbbell Romanian Deadlifts",
      equipment: "Dumbbells",
      muscleGroup: "Lower Body",
    },
    { name: "Barbell Squats", equipment: "Barbell", muscleGroup: "Lower Body" },
    {
      name: "Barbell Romanian Deadlifts",
      equipment: "Barbell",
      muscleGroup: "Lower Body",
    },
    {
      name: "Barbell Hip Thrusts",
      equipment: "Barbell",
      muscleGroup: "Lower Body",
    },
  ],
  default: [
    { name: "Push-ups", equipment: "Bodyweight", muscleGroup: "Chest" },
    { name: "Bodyweight Squats", equipment: "Bodyweight", muscleGroup: "Legs" },
    { name: "Plank", equipment: "Bodyweight", muscleGroup: "Core" },
    { name: "Lunges", equipment: "Bodyweight", muscleGroup: "Legs" },
    { name: "Mountain Climbers", equipment: "Bodyweight", muscleGroup: "Core" },
  ],
};

const WorkoutRoutine: React.FC<WorkoutRoutineProps> = ({
  exercises = [
    {
      id: "1",
      name: "Push-ups",
      sets: 3,
      reps: 12,
      rest: 60,
      illustration:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      description: "Standard push-ups targeting chest, shoulders, and triceps.",
      muscleGroup: "Chest",
      equipment: "Bodyweight",
    },
    {
      id: "2",
      name: "Squats",
      sets: 4,
      reps: 15,
      rest: 90,
      illustration:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
      description:
        "Bodyweight squats targeting quadriceps, hamstrings, and glutes.",
      muscleGroup: "Legs",
      equipment: "Bodyweight",
    },
    {
      id: "3",
      name: "Plank",
      sets: 3,
      reps: 1,
      rest: 60,
      illustration:
        "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80",
      description: "Hold for 30-60 seconds, targeting core muscles.",
      muscleGroup: "Core",
      equipment: "Bodyweight",
    },
  ],
  title = "Your Custom Workout Routine",
  onGenerateNew = () => console.log("Generate new routine"),
  onSave = () => console.log("Save routine"),
  onPrint = () => console.log("Print routine"),
  isLoading = false,
}) => {
  const [workoutExercises, setWorkoutExercises] = useState(exercises);

  const handlePrint = () => {
    onPrint();
    window.print();
  };

  // Exercise image mapping for proper exercise illustrations
  const exerciseImageMap: Record<string, string> = {
    // Push exercises
    "Push-ups":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Decline Push-ups":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Diamond Push-ups":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Pike Push-ups":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",

    // Pull exercises
    "Pull-ups":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Chin-ups":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Inverted Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",

    // Squats and leg exercises
    "Bodyweight Squats":
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    "Dumbbell Squats":
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    "Barbell Squats":
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    "Banded Squats":
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    "Jump Squats":
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",

    // Lunges
    Lunges:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Dumbbell Lunges":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Barbell Lunges":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",

    // Deadlifts
    Deadlifts:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Barbell Deadlifts":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Dumbbell Romanian Deadlifts":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Barbell Romanian Deadlifts":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",

    // Bench Press
    "Bench Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Incline Bench Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Decline Bench Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Close-grip Bench Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",

    // Dumbbell exercises
    "Dumbbell Chest Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Dumbbell Flyes":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Incline Dumbbell Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Dumbbell Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Dumbbell Pullovers":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Dumbbell Shoulder Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Dumbbell Bicep Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Bicep Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Hammer Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Dumbbell Thrusters":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Dumbbell Clean and Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Dumbbell Calf Raises":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Dumbbell Russian Twists":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Dumbbell Side Bends":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",

    // Barbell exercises
    "Barbell Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Barbell Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Overhead Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Upright Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Clean and Jerk":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Barbell Hip Thrusts":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Barbell Calf Raises":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",

    // Core exercises
    Plank:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    Crunches:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Mountain Climbers":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Russian Twists":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Leg Raises":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",

    // Other exercises
    "Tricep Dips":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Tricep Kickbacks":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Overhead Tricep Extensions":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Skull Crushers":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Lateral Raises":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Front Raises":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Glute Bridges":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Calf Raises":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Superman Hold":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    Burpees:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Handstand Hold":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Renegade Rows":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",

    // Resistance band exercises
    "Resistance Band Chest Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Resistance Band Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Resistance Band Pull-aparts":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Banded Bicep Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Banded Tricep Pushdowns":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Banded Shoulder Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Banded Lateral Raises":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Banded Front Raises":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Banded Lateral Walks":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Banded Glute Bridges":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Banded Pallof Press":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Banded Rotations":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Banded Squats to Overhead Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Banded Rows to Tricep Extension":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Banded Jumping Jacks":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Banded Leg Press":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Banded Tricep Extensions":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Banded Hammer Curls":
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Banded Chest Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Banded Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Resistance Band Flyes":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Handstand Hold (against wall)":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Hanging Leg Raises":
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    "Lat Pulldowns":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Cable Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Face Pulls":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    Squats:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    "Leg Press":
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    "Bent-over Rows":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "Lat Pulldown":
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    Deadlift:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    "Shoulder Press":
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
    "Chest Fly":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "Incline Press":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  };

  // Function to get exercise image
  const getExerciseImage = (exerciseName: string): string => {
    return (
      exerciseImageMap[exerciseName] ||
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80"
    );
  };

  const handleChangeExercise = (exerciseId: string) => {
    setWorkoutExercises((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          // Determine which muscle group to pull from
          const muscleGroup = (exercise.muscleGroup?.toLowerCase() ||
            "default") as keyof typeof alternativeExercises;
          const alternatives =
            alternativeExercises[muscleGroup] || alternativeExercises.default;

          // Get a random alternative that's not the current exercise
          const filteredAlternatives = alternatives.filter(
            (alt) => alt.name !== exercise.name,
          );

          if (filteredAlternatives.length === 0) {
            // If no alternatives found, try from default exercises
            const defaultAlternatives = alternativeExercises.default.filter(
              (alt) => alt.name !== exercise.name,
            );
            if (defaultAlternatives.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * defaultAlternatives.length,
              );
              const newExercise = defaultAlternatives[randomIndex];

              return {
                ...exercise,
                name: newExercise.name,
                equipment: newExercise.equipment,
                muscleGroup: newExercise.muscleGroup,
                illustration: getExerciseImage(newExercise.name),
              };
            }
            return exercise; // No alternatives found, keep current
          }

          const randomIndex = Math.floor(
            Math.random() * filteredAlternatives.length,
          );
          const newExercise = filteredAlternatives[randomIndex];

          return {
            ...exercise,
            name: newExercise.name,
            equipment: newExercise.equipment,
            muscleGroup: newExercise.muscleGroup,
            illustration: getExerciseImage(newExercise.name),
          };
        }
        return exercise;
      });
    });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white/90 backdrop-blur-sm">
        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Generating Your Workout
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Our AI is crafting the perfect routine based on your preferences...
          </p>
          <div className="mt-6 flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-8 md:p-12">
        <div className="flex flex-col space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <svg
                className="w-4 h-4 mr-2"
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
              Workout Generated Successfully
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your personalized workout routine is ready! Each exercise is
              carefully selected to match your preferences and fitness goals.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={onGenerateNew}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <RefreshCw className="h-5 w-5" />
              Generate New Routine
            </Button>
          </div>

          {/* Exercise Cards Grid - 3 on top, 3 on bottom */}
          <div className="space-y-8">
            {/* Top row - first 3 exercises */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-5xl mx-auto">
              {workoutExercises.slice(0, 3).map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="w-full max-w-sm transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <ExerciseCard
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    restPeriod={`${exercise.rest} seconds`}
                    imageUrl={exercise.illustration}
                    muscleGroup={exercise.muscleGroup}
                    equipment={exercise.equipment}
                    onChangeExercise={() => handleChangeExercise(exercise.id)}
                  />
                </div>
              ))}
            </div>

            {/* Bottom row - remaining exercises */}
            {workoutExercises.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-5xl mx-auto">
                {workoutExercises.slice(3).map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="w-full max-w-sm transform transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${(index + 3) * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <ExerciseCard
                      name={exercise.name}
                      sets={exercise.sets}
                      reps={exercise.reps}
                      restPeriod={`${exercise.rest} seconds`}
                      imageUrl={exercise.illustration}
                      muscleGroup={exercise.muscleGroup}
                      equipment={exercise.equipment}
                      onChangeExercise={() => handleChangeExercise(exercise.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {workoutExercises.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No exercises in this routine yet
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                It looks like your routine is empty. Let's generate some
                exercises for you!
              </p>
              <Button
                onClick={onGenerateNew}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Generate Routine
              </Button>
            </div>
          )}

          {/* Workout Summary */}
          {workoutExercises.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Workout Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {workoutExercises.length}
                  </div>
                  <div className="text-gray-600 font-medium">
                    Total Exercises
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {workoutExercises.reduce((total, ex) => total + ex.sets, 0)}
                  </div>
                  <div className="text-gray-600 font-medium">Total Sets</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ~
                    {Math.round(
                      workoutExercises.reduce(
                        (total, ex) => total + ex.sets * ex.rest,
                        0,
                      ) / 60,
                    )}
                  </div>
                  <div className="text-gray-600 font-medium">Est. Minutes</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutRoutine;
