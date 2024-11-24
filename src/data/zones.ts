import { InteractiveZone } from "../types/game.types"

export const zones: InteractiveZone[] = [
  {
    id: "creative-zone",
    name: "Zona Creativa",
    position: [10, 3, 10],
    question: "¿Qué te gusta crear en tu tiempo libre?",
    hint: "Puede ser arte, música, historias...",
    type: "creative",
    options: [
      { text: "Dibujar o Pintar", value: "art", position: [0, 0, 0] },
      { text: "Escribir Historias", value: "writing", position: [2, 0, 0] },
      { text: "Componer Música", value: "music", position: [-2, 0, 0] }
    ]
  },
  {
    id: "tech-zone",
    name: "Zona Tech",
    position: [-10, 3, 10],
    question: "¿Qué problema te gustaría resolver con tecnología?",
    hint: "Piensa en algo que te gustaría mejorar...",
    type: "analytical",
    options: [
      { text: "Aplicaciones Móviles", value: "mobile", position: [0, 0, 0] },
      { text: "Inteligencia Artificial", value: "ai", position: [2, 0, 0] },
      { text: "Automatización", value: "automation", position: [-2, 0, 0] }
    ]
  },
  {
    id: "social-zone",
    name: "Zona Social",
    position: [10, 3, -10],
    question: "¿Cómo te gusta ayudar a otras personas?",
    hint: "Puede ser enseñando, aconsejando...",
    type: "social",
    options: [
      { text: "Enseñar", value: "teaching", position: [0, 0, 0] },
      { text: "Aconsejar", value: "counseling", position: [2, 0, 0] },
      { text: "Colaborar en Proyectos", value: "collaboration", position: [-2, 0, 0] }
    ]
  },
  {
    id: "practical-zone",
    name: "Zona Práctica",
    position: [-10, 3, -10],
    question: "¿Qué tipo de actividades prácticas disfrutas?",
    hint: "Deportes, manualidades, construcción...",
    type: "practical",
    options: [
      { text: "Deportes", value: "sports", position: [0, 0, 0] },
      { text: "Manualidades", value: "crafts", position: [2, 0, 0] },
      { text: "Construcción", value: "building", position: [-2, 0, 0] }
    ]
  },
]
