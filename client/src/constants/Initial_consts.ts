const defaultSets = [
  { reps: 8, weight: 10 },
  { reps: 8, weight: 15 },
];

export const defaultExercises = [
  { name: "defaultExercise1", type: "default", sets: defaultSets },
  { name: "defaultExercise2", type: "default", sets: defaultSets },
];

export const defaultAvaliableExercises = [
  { name: "Dumbbell Bench Press", type: "Chest", sets: defaultSets },
  { name: "Dumbbell Flies", type: "Chest", sets: defaultSets },
  { name: "Barbell Bench Press", type: "Chest", sets: defaultSets },
  { name: "Bench Dips", type: "Triceps", sets: defaultSets },
  { name: "Cable Push Down", type: "Triceps", sets: defaultSets },
  { name: "EZ Bar Curls", type: "Biceps", sets: defaultSets },
  { name: "Dumbbell Curls", type: "Biceps", sets: defaultSets },
  { name: "Squats", type: "Legs", sets: defaultSets },
  { name: "Elevated Squats", type: "Legs", sets: defaultSets },
  { name: "Calf Raises", type: "Legs", sets: defaultSets },
  { name: "Deadlifts", type: "Back", sets: defaultSets },
];

export const API_BASE_URL = 
  process.env.REACT_APP_API_URL || "http://localhost:8080";