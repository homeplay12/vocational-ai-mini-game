import { Instance, Instances, Sky, Stars, Cloud } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export const Environment: React.FC = () => {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.5}
        azimuth={0.25}
        rayleigh={3}
        turbidity={8}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade={true}
        speed={1}
      />
      <ambientLight intensity={0.5} color="#a3c2b5" />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <fog attach="fog" args={["#2a4d38", 30, 100]} />
      <Clouds />
    </>
  )
}

const Clouds: React.FC = () => {
  return (
    <group position={[0, 15, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Cloud
          key={i}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 5,
            Math.random() * 100 - 50,
          ]}
          scale={3}
        />
      ))}
    </group>
  )
}

export const Trees: React.FC = () => {
  const instanceRef = useRef<THREE.InstancedMesh>(null)

  useFrame(({ clock }) => {
    if (instanceRef.current) {
      instanceRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <Instances limit={50}>
      <cylinderGeometry args={[0.2, 0.3, 2]} />
      <meshStandardMaterial color="#2d4f1e" roughness={0.8} />
      {Array.from({ length: 50 }).map((_, i) => (
        <Instance
          key={i}
          position={[Math.random() * 80 - 40, 1, Math.random() * 80 - 40]}
          scale={[1, 1.5 + Math.random(), 1]}
          rotation={[0, Math.random() * Math.PI, 0]}
        />
      ))}
    </Instances>
  )
}
