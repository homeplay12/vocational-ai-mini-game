import { usePlane } from "@react-three/cannon"
import { zones } from "../data/zones"
import { Player } from "./Player"
import { Zone } from "./Zone"
import { Trees } from "./Environment"

export const World: React.FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }))

  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
      <Player />
      {zones.map((zone) => (
        <Zone key={zone.id} zone={zone} />
      ))}
      <Trees />
    </group>
  )
}
