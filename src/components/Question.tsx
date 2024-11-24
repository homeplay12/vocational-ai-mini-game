import { Text } from "@react-three/drei"
import { useGameStore } from "../store/gameStore"
import { questions } from "../data/questions"
import { OptionSphere } from "./OptionSphere"

export const Question = () => {
  const currentQuestion = useGameStore((state) => state.currentQuestion)
  const question = questions[currentQuestion]

  if (!question) return null

  return (
    <group>
      <Text
        position={[0, 3, -5]}
        fontSize={0.5}
        color="blue"
        anchorX="center"
        anchorY="middle"
      >
        {question.text}
      </Text>
      {question.options.map((option, index) => (
        <OptionSphere key={index} option={option} questionId={question.id} />
      ))}
    </group>
  )
}
