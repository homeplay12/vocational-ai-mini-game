import { Text } from "@react-three/drei"
import { useGameStore } from "../store/gameStore"
import { zones } from "../data/zones"
import { OptionSphere } from "./OptionSphere"
import { Question as QuestionType } from "../types/game.types"

export const Question = () => {
  const currentZone = useGameStore((state) => state.currentZone)
  const setAnswer = useGameStore((state) => state.setAnswer)
  
  const zone = zones.find(z => z.id === currentZone)
  if (!zone) return null

  return (
    <group>
      <Text
        position={[0, 3, -5]}
        fontSize={0.5}
        color="blue"
        anchorX="center"
        anchorY="middle"
      >
        {zone.question}
      </Text>
      {zone.options.map((option: { text: string; value: string }, index) => (
        <OptionSphere
          key={index}
          position={[index * 2 - ((zone.options.length - 1)), 2, -5]}
          text={option.text}
          onSelect={() => setAnswer(zone.id, option.value)}
        />
      ))}
    </group>
  )
}
