import React from "react"
import { useGameStore } from "../store/gameStore"
import { zones } from "../data/zones"

export const UI: React.FC = () => {
  const currentZone = useGameStore((state) => state.currentZone)
  const zone = zones.find((z) => z.id === currentZone)
  const [answer, setAnswer] = React.useState("")

  if (!zone) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    useGameStore.getState().setAnswer(zone.id, answer)
    setAnswer("")
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white pointer-events-auto">
        <h2 className="text-xl mb-2">{zone.question}</h2>
        <p className="text-sm mb-4 text-gray-300">{zone.hint}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300"
            placeholder="Escribe tu respuesta..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
