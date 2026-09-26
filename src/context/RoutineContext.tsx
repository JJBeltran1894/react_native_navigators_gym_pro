import React, { createContext, useState, useContext, ReactNode } from "react";

export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

export type RoutineInput = {
  name: string;
  muscleGroup: string;
  duration: number | string;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, "id" | "createdAt">) => void;
  updateRoutine: (
    id: string,
    routine: Omit<Routine, "id" | "createdAt">,
  ) => void;
  deleteRoutine: (id: string) => void;
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: "1",
      name: "Pecho y Tríceps",
      muscleGroup: "Pecho",
      duration: 60,
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  const formatDuration = (val: number | string): number => {
    const parsed = typeof val === "number" ? val : parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const addRoutine = (routine: Omit<Routine, "id" | "createdAt">) => {
    const newRoutine: Routine = {
      ...routine,
      duration: formatDuration(routine.duration),
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
    };

    setRoutines((prev) => [...prev, newRoutine]);
  };

  const updateRoutine = (
    id: string,
    updatedRoutine: Omit<Routine, "id" | "createdAt">,
  ) => {
    setRoutines((prevRoutines) =>
      prevRoutines.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedRoutine,
              duration: formatDuration(updatedRoutine.duration),
            }
          : p,
      ),
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <RoutineContext.Provider
      value={{ routines, addRoutine, updateRoutine, deleteRoutine }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutines debe ser usado dentro de un RoutineProvider");
  }
  return context;
}
