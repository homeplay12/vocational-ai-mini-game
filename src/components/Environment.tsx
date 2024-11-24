import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export const Environment = () => {
  const groupRef = useRef<THREE.Group>()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Decorative background elements */}
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}
