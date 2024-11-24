import React, { useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { useGameStore } from "../store/gameStore"
import { InteractiveZone } from "../types/game.types"
import * as THREE from "three"

interface Props {
  zone: InteractiveZone
}

export const Zone: React.FC<Props> = ({ zone }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const setCurrentZone = useGameStore((state) => state.setCurrentZone)
  const currentZoneId = useGameStore((state) => state.currentZone)
  const answers = useGameStore((state) => state.answers)
  const isAnswered = answers[zone.id]

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(clock.getElapsedTime()) * 0.2
    }
  })

  const handleClick = () => {
    if (currentZoneId === zone.id) {
      // If clicking the same zone again, close the question
      setCurrentZone(null)
    } else {
      // If clicking a different zone, show its question
      setCurrentZone(zone.id)
    }
  }

  return (
    <group position={[zone.position[0], 0, zone.position[2]]}>
      <mesh 
        ref={meshRef}
        onClick={handleClick}
        castShadow
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={isAnswered ? "#4ade80" : "#3b82f6"}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        {zone.name}
      </Text>
    </group>
  )
}
