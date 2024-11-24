import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { useGameStore } from "../store/gameStore"
import * as THREE from "three"

interface Props {
  option: any
  questionId: any
}

export const OptionSphere = ({ option, questionId }: Props) => {
  const mesh = useRef<THREE.Mesh>()
  const [hovered, setHovered] = useState(false)
  const setAnswer = useGameStore((state) => state.setAnswer)
  const nextQuestion = useGameStore((state) => state.nextQuestion)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    setAnswer(questionId, option.value)
    nextQuestion()
  }

  return (
    <group position={option.position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#ff9f1c" : "#2ec4b6"}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {option.text}
      </Text>
    </group>
  )
}
