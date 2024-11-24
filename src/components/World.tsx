import React, { useMemo } from 'react'
import { usePlane } from "@react-three/cannon"
import { zones } from "../data/zones"
import { Player } from "./Player"
import { Zone } from "./Zone"
import * as THREE from "three"
import { Instances, Instance } from "@react-three/drei"

export const World: React.FC = () => {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static"
  }))

  // Optimize structures by using instancing and memoization
  const structures = useMemo(() => 
    Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      position: [
        Math.random() * 40 - 20,
        2,
        Math.random() * 40 - 20
      ] as [number, number, number]
    })), 
  [])

  return (
    <>
      {/* Ground */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3f6d4e" />
      </mesh>

      {/* Structures - Using instancing for better performance */}
      <Instances limit={10}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="black" />
        {structures.map(({ key, position }) => (
          <Instance 
            key={key} 
            position={position}
          />
        ))}
      </Instances>

      {/* Zones */}
      {zones.map((zone) => (
        <Zone key={zone.id} zone={zone} />
      ))}

      {/* Player */}
      <Player />
    </>
  )
}
