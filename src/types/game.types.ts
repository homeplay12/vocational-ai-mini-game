export interface Question {
  id: string
  text: string
  options: Array<{
    text: string
    value: string
    position: [number, number, number] // 3D position
  }>
}

export interface GameState {
  currentQuestion: number
  answers: Record<string, string>
  setAnswer: (questionId: string, answer: string) => void
  nextQuestion: () => void
}

export interface InteractiveZone {
  id: string
  name: string
  position: [number, number, number]
  question: string
  hint: string
  type: "creative" | "analytical" | "social" | "practical"
}

export interface PlayerState {
  answers: Record<string, string>
  completedZones: string[]
  currentZone: string | null
}
