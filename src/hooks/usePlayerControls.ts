import { useState, useEffect } from "react"

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  })

  useEffect(() => {
    const keys = {
      KeyW: "moveForward",
      KeyS: "moveBackward",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Space: "jump",
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys[e.code as keyof typeof keys]) {
        setMovement((state) => ({
          ...state,
          [keys[e.code as keyof typeof keys]]: true,
        }))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys[e.code as keyof typeof keys]) {
        setMovement((state) => ({
          ...state,
          [keys[e.code as keyof typeof keys]]: false,
        }))
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return movement
}
