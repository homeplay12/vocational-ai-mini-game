import { create } from "zustand"
import { PlayerState } from "../types/game.types"

export const useGameStore = create<PlayerState>((set) => ({
  answers: {},
  completedZones: [],
  currentZone: null,
  setAnswer: (zoneId: string, answer: string) =>
    set((state) => ({
      answers: { ...state.answers, [zoneId]: answer },
      completedZones: [...state.completedZones, zoneId],
    })),
  setCurrentZone: (zoneId: string | null) => set({ currentZone: zoneId }),
}))
