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
