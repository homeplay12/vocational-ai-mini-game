import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import { useGameStore } from "../store/gameStore"

interface Props {
  position: [number, number, number]
  text: string
  onSelect: () => void
}

export const OptionSphere: React.FC<Props> = ({ position, text, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const answers = useGameStore((state) => state.answers)
  const currentZone = useGameStore((state) => state.currentZone)
  const hasAnswer = currentZone ? answers[currentZone] : false

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onSelect}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={hasAnswer ? "#4ade80" : "#3b82f6"}
          roughness={0.5}
          metalness={0.8}
          emissive={hasAnswer ? "#4ade80" : "#3b82f6"}
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  )
}
