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
  currentZone: string | null
  answers: Record<string, string>
  mouseEnabled: boolean
  setCurrentZone: (zoneId: string | null) => void
  setAnswer: (zoneId: string, answer: string) => void
  setMouseEnabled: (enabled: boolean) => void
}

export interface Option {
  text: string
  value: string
  position: [number, number, number]
}

export interface InteractiveZone {
  id: string
  name: string
  position: [number, number, number]
  question: string
  hint?: string
  type?: string
  options: Option[]
}

export interface PlayerState {
  answers: Record<string, string>
  completedZones: string[]
  currentZone: string | null
  mouseEnabled: boolean
  setMouseEnabled: (enabled: boolean) => void
  setAnswer: (zoneId: string, answer: string) => void
  setCurrentZone: (zoneId: string | null) => void
}
