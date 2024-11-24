import React, { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Stars, PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { World } from "./World"
import { UI } from "./UI"
import { useGameStore } from "../store/gameStore"
import { Vector3 } from "three"

interface Structure {
  position: [number, number]
  id: string
}

class ChunkGenerator {
  private spacing: number
  private structuresPerChunk: number
  
  constructor(spacing: number = 20, structuresPerChunk: number = 6) {
    this.spacing = spacing
    this.structuresPerChunk = structuresPerChunk
  }
  
  generateStructures(chunkX: number, chunkZ: number): Structure[] {
    const structures: Structure[] = []
    const chunkOffsetX = chunkX * this.spacing * 4
    const chunkOffsetZ = chunkZ * this.spacing * 4
    
    for (let i = 0; i < this.structuresPerChunk; i++) {
      const x = chunkOffsetX + (Math.random() - 0.5) * this.spacing * 3
      const z = chunkOffsetZ + (Math.random() - 0.5) * this.spacing * 3
      structures.push({
        position: [x, z],
        id: `structure-${chunkX}-${chunkZ}-${i}`
      })
    }
    
    return structures
  }
}

const Structures: React.FC<{ playerPosition: Vector3 }> = ({ playerPosition }) => {
  const chunkGenerator = useMemo(() => new ChunkGenerator(), [])
  const structures = useMemo(() => {
    const allStructures: Structure[] = []
    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        allStructures.push(...chunkGenerator.generateStructures(x, z))
      }
    }
    return allStructures
  }, [chunkGenerator])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#3f6d4e" roughness={0.8} metalness={0.1} />
      </mesh>

      {structures.map((structure) => (
        <mesh
          key={structure.id}
          position={[structure.position[0], 7.5, structure.position[1]]}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.2, 15, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      ))}
    </group>
  )
}

const PlayerPositionTracker: React.FC<{
  onPositionUpdate: (position: Vector3) => void
}> = ({ onPositionUpdate }) => {
  const { camera } = useThree()
  
  useFrame(() => {
    onPositionUpdate(camera.position)
  })
  
  return null
}


export const Game: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <color attach="background" args={["#87CEEB"]} />
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Physics>
          <World />
        </Physics>
      </Canvas>
      <UI />
    </div>
  )
}

export default Game
