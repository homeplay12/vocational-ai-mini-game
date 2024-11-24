import React from "react"
import { Game } from "./components/Game"

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Game />
      <div className="fixed top-0 left-0 p-4 text-white text-sm pointer-events-none">
        <p>WASD - Movimiento</p>
        <p>Mouse - Mirar alrededor</p>
        <p>Espacio - Saltar</p>
        <p>Click - Interactuar</p>
      </div>
    </div>
  )
}

export default App
