import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Question } from "./Question"
import { Environment } from "./Environment"

export const Game = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment />
        <Question />
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
