import { create } from "zustand"
import { GameState } from "../types/game.types"

export const useGameStore = create<GameState>((set) => ({
  currentQuestion: 0,
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
    })),
}))
