import React from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, Stars, PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { World } from "./World"
import { UI } from "./UI"

export const Game: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <Sky sunPosition={[100, 100, 20]} />
        <Stars />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Physics>
          <World />
        </Physics>
        <PointerLockControls />
      </Canvas>
      <UI />
    </div>
  )
}
