import { useRef } from "react"
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { InteractiveZone } from "../types/game.types"
import { useGameStore } from "../store/gameStore"
import * as THREE from "three"

interface Props {
  zone: InteractiveZone
}

export const Zone: React.FC<Props> = ({ zone }) => {
  const ref = useRef<THREE.Mesh>()
  const completed = useGameStore((state) =>
    state.completedZones.includes(zone.id)
  )

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      const distance = state.camera.position.distanceTo(
        new THREE.Vector3(...zone.position)
      )
      if (distance < 5) {
        useGameStore.getState().setCurrentZone(zone.id)
      }
    }
  })

  return (
    <group position={zone.position}>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={completed ? "#4CAF50" : "#2196F3"}
          emissive={completed ? "#45a049" : "#1e88e5"}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {zone.name}
      </Text>
    </group>
  )
}
