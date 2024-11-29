export type Exercise = {
  name: string;
  type: string;
};

export type Exercise2 = {
  name: string;
  type: string;
  sets: Set[];
  notes: string;
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
