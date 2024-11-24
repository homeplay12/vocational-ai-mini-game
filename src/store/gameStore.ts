import { create } from "zustand"
import { zones } from "../data/zones"

interface GameState {
  answers: Record<string, string>
  currentZone: string | null
  currentQuestion: string | null
  mouseEnabled: boolean
  setMouseEnabled: (enabled: boolean) => void
  setAnswer: (zoneId: string, answer: string) => void
  setCurrentZone: (zoneId: string | null) => void
  setCurrentQuestion: (questionId: string | null) => void
}

export const useGameStore = create<GameState>((set) => ({
  answers: {},
  currentZone: null,
  currentQuestion: null,
  mouseEnabled: false,
  setMouseEnabled: (enabled) => set({ mouseEnabled: enabled }),
  setAnswer: (zoneId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [zoneId]: answer },
      currentQuestion: null,
      currentZone: null
    })),
  setCurrentZone: (zoneId) => set({ currentZone: zoneId }),
  setCurrentQuestion: (questionId) => set({ currentQuestion: questionId })
}))
