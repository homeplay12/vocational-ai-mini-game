import { InteractiveZone } from "../types/game.types"

export const zones: InteractiveZone[] = [
  {
    id: "creative-zone",
    name: "Zona Creativa",
    position: [10, 0, 10],
    question: "¿Qué te gusta crear en tu tiempo libre?",
    hint: "Puede ser arte, música, historias...",
    type: "creative",
  },
  {
    id: "tech-zone",
    name: "Zona Tech",
    position: [-10, 0, 10],
    question: "¿Qué problema te gustaría resolver con tecnología?",
    hint: "Piensa en algo que te gustaría mejorar...",
    type: "analytical",
  },
  {
    id: "social-zone",
    name: "Zona Social",
    position: [10, 0, -10],
    question: "¿Cómo te gusta ayudar a otras personas?",
    hint: "Puede ser enseñando, aconsejando...",
    type: "social",
  },
  {
    id: "practical-zone",
    name: "Zona Práctica",
    position: [-10, 0, -10],
    question: "¿Qué tipo de actividades prácticas disfrutas?",
    hint: "Deportes, manualidades, construcción...",
    type: "practical",
  },
]
