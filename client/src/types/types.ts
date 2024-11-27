export type Exercise = {
  name: string;
  type: string;
  sets: number;
  reps: number;
};

export type Exercise2 = {
  name: string;
  type: string;
  sets: Set[];
};

export type Set = {
  // sets: number
  reps: number | null;
  weight: number | null;
};

export type FocusMuscles = {
  id: number;
  name: string;
  selected: boolean;
};
