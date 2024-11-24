import { useRef, useEffect } from "react"
import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { usePlayerControls } from "../hooks/usePlayerControls"

export const Player: React.FC = () => {
  const { camera } = useThree()
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    usePlayerControls()

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    type: "Dynamic",
    fixedRotation: true,
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v))
    return unsubscribe
  }, [api.velocity])

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => (pos.current = p))
    return unsubscribe
  }, [api.position])

  useFrame(() => {
    // Update camera position
    camera.position.copy(new Vector3(...pos.current))

    // Calculate movement direction
    const direction = new Vector3()
    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    )
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(5)
      .applyEuler(camera.rotation)

    // Apply movement
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    // Handle jumping
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2])
    }
  })

  return null
}
