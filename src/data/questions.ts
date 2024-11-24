import { Question } from "../types/game.types"

export const questions: Question[] = [
  {
    id: "creative",
    text: "¿Qué tipo de actividades te hacen perder la noción del tiempo?",
    options: [
      {
        text: "🎨 Crear o diseñar cosas",
        value: "creative",
        position: [-2, 1, -5],
      },
      {
        text: "🔧 Resolver problemas",
        value: "analytical",
        position: [0, 1, -5],
      },
      {
        text: "🤝 Ayudar a otros",
        value: "social",
        position: [2, 1, -5],
      },
    ],
  },
  {
    id: "math",
    text: "¿si a = 1 y b = 2, si hacemos a + b y este valor te lo devuelven, que valor sería?",
    options: [
      {
        text: "Sería 6",
        value: "creative",
        position: [-2, 1, -5],
      },
      {
        text: "🔧 Sería 3",
        value: "logico",
        position: [0, 1, -5],
      },
      {
        text: "🤝 ayudar",
        value: "social",
        position: [2, 1, -5],
      },
    ],
  },
  // Add more questions...
]
