"use client"

import { useEffect, useRef, useState } from "react"


export function useMouseVector(containerRef) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [vector, setVector] = useState({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      let x = e.clientX
      let y = e.clientY

      const container = containerRef?.current
      if (container) {
        const rect = container.getBoundingClientRect()
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      const last = lastPositionRef.current
      setVector({ x: x - last.x, y: y - last.y })
      lastPositionRef.current = { x, y }

      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [containerRef])

  return { position, vector }
}