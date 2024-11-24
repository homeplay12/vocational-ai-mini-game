import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { PointerLockControls } from "@react-three/drei"
import { Vector3, Mesh } from "three"
import { useGameStore } from "../store/gameStore"

const SPEED = 10
const JUMP_FORCE = 4
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

export const Player: React.FC = () => {
  const mouseEnabled = useGameStore((state) => state.mouseEnabled)
  const setMouseEnabled = useGameStore((state) => state.setMouseEnabled)
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const [keys, setKeys] = useState({ 
    forward: false, 
    backward: false, 
    left: false, 
    right: false, 
    space: false 
  })

  const [sphereRef, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 5, 0],
    type: "Dynamic",
    fixedRotation: true,
    linearDamping: 0.95
  }))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyT') {
        setMouseEnabled(!mouseEnabled)
        if (controlsRef.current) {
          if (mouseEnabled) {
            controlsRef.current.unlock()
          } else {
            controlsRef.current.lock()
          }
        }
        return
      }

      setKeys(prev => ({
        ...prev,
        forward: e.code === 'KeyW' ? true : prev.forward,
        backward: e.code === 'KeyS' ? true : prev.backward,
        left: e.code === 'KeyA' ? true : prev.left,
        right: e.code === 'KeyD' ? true : prev.right,
        space: e.code === 'Space' ? true : prev.space
      }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({
        ...prev,
        forward: e.code === 'KeyW' ? false : prev.forward,
        backward: e.code === 'KeyS' ? false : prev.backward,
        left: e.code === 'KeyA' ? false : prev.left,
        right: e.code === 'KeyD' ? false : prev.right,
        space: e.code === 'Space' ? false : prev.space
      }))
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [mouseEnabled, setMouseEnabled])

  useEffect(() => {
    // Update camera position to match player
    api.position.subscribe((pos) => {
      camera.position.set(pos[0], pos[1] + 2, pos[2])
    })
  }, [camera, api.position])

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  useFrame(() => {
    // Calculate movement direction
    frontVector.set(0, 0, Number(keys.backward) - Number(keys.forward))
    sideVector.set(Number(keys.left) - Number(keys.right), 0, 0)
    
    // Only apply movement if any key is pressed
    if (keys.forward || keys.backward || keys.left || keys.right) {
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation)

      // Apply movement
      api.velocity.set(
        direction.x,
        velocity.current[1], // Keep current vertical velocity
        direction.z
      )
    } else {
      // Stop horizontal movement when no keys are pressed
      api.velocity.set(
        0,
        velocity.current[1],
        0
      )
    }

    // Handle jumping
    if (keys.space && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2])
    }
  })

  return (
    <>
      <PointerLockControls ref={controlsRef} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  )
}
