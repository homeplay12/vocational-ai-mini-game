import React, { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { zones } from '../data/zones'

const Controls: React.FC = () => {
  const mouseEnabled = useGameStore((state) => state.mouseEnabled)
  
  return (
    <div className="fixed top-4 left-4 bg-black/50 text-white p-4 rounded-lg">
      <h3 className="font-bold mb-2">Controles:</h3>
      <ul className="space-y-1 text-sm">
        <li>WASD - Movimiento</li>
        <li>ESPACIO - Saltar</li>
        <li>T - {mouseEnabled ? "Bloquear" : "Desbloquear"} ratón</li>
        <li>Click - Interactuar con zonas</li>
      </ul>
    </div>
  )
}

const QuestionPanel: React.FC = () => {
  const currentZone = useGameStore((state) => state.currentZone)
  const answers = useGameStore((state) => state.answers)
  const setAnswer = useGameStore((state) => state.setAnswer)
  const mouseEnabled = useGameStore((state) => state.mouseEnabled)
  const [input, setInput] = useState("")

  const zone = zones.find(z => z.id === currentZone)
  const isAnswered = zone ? Boolean(answers[zone.id]) : false

  if (!zone) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setAnswer(zone.id, input.trim())
      setInput("")
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${isAnswered ? "bg-green-500" : "bg-blue-500"} animate-pulse`} />
          <h2 className="text-xl font-bold">{zone.name}</h2>
        </div>
        <p className="mb-4">{zone.question}</p>
        <p className="text-sm text-gray-400">{zone.hint}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-white/20 rounded"
            placeholder="Type your answer..."
            disabled={!mouseEnabled || isAnswered}
            onKeyDown={(e) => {
              if (e.key === "t" || e.key === "T") {
                e.stopPropagation()
              }
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded font-bold disabled:opacity-50 hover:bg-blue-600 transition-colors"
            disabled={!mouseEnabled || isAnswered || !input.trim()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export const UI: React.FC = () => {
  const currentZoneId = useGameStore((state) => state.currentZone)
  const setAnswer = useGameStore((state) => state.setAnswer)
  const answers = useGameStore((state) => state.answers)
  const [userAnswer, setUserAnswer] = useState('')

  const currentZone = zones.find(zone => zone.id === currentZoneId)
  const isAnswered = currentZoneId ? Boolean(answers[currentZoneId]) : false

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentZoneId) {
      setAnswer(currentZoneId, userAnswer)
      setUserAnswer('')
    }
  }

  return (
    <>
      <Controls />
      
      {currentZone && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md w-full pointer-events-auto">
            <h2 className="text-xl font-bold mb-4">{currentZone.name}</h2>
            <p className="mb-4">{currentZone.question}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full p-3 border rounded-lg resize-none h-32"
                disabled={isAnswered}
              />
              
              {isAnswered ? (
                <div className="bg-green-100 border border-green-500 text-green-700 p-3 rounded-lg">
                  Respuesta enviada
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Enviar Respuesta
                </button>
              )}
            </form>

            <button
              onClick={() => useGameStore.getState().setCurrentZone(null)}
              className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
