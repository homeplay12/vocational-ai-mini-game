import { Instance, Instances } from "@react-three/drei"

export const Trees: React.FC = () => {
  return (
    <Instances>
      <cylinderGeometry args={[0.2, 0.2, 2]} />
      <meshStandardMaterial color="#654321" />
      {Array.from({ length: 50 }).map((_, i) => (
        <Instance
          key={i}
          position={[Math.random() * 80 - 40, 1, Math.random() * 80 - 40]}
          scale={[1, 1 + Math.random(), 1]}
        />
      ))}
    </Instances>
  )
}
