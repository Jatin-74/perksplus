"use client"

import { useEffect, useState, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setTrail((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: trailIdRef.current++, timestamp: Date.now() },
      ].slice(-10)) // Shorter trail
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.filter((point) => Date.now() - point.timestamp < 300))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="custom-cursor-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      <svg className="absolute top-0 left-0 w-full h-full" style={{ mixBlendMode: "screen" }}>
        <path
          d={trail.length > 1 ? `M ${trail[0].x} ${trail[0].y} ` + trail.slice(1).map((p, i) => `Q ${(trail[i].x + p.x) / 2} ${(trail[i].y + p.y) / 2} ${p.x} ${p.y}`).join(" ") : ""}
          stroke="#DAA520"
          strokeWidth={1}
          fill="none"
          strokeOpacity={0.4}
        />
      </svg>

      {/* Main Cursor Dot (Smaller) */}
      <div
        className="absolute top-0 left-0 bg-primary rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          width: 8, // Reduced from 24/8
          height: 8,
          transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isClicking ? 0.8 : 1})`,
          opacity: 1,
          boxShadow: "0 0 10px 1px rgba(218, 165, 32, 0.6)",
        }}
      />
      
      {/* Outer Ring (Smaller) */}
      <div
        className="absolute top-0 left-0 border border-primary rounded-full transition-all duration-300 ease-out"
        style={{
          width: 24, // Reduced from 40
          height: 24,
          transform: `translate(${position.x - 12}px, ${position.y - 12}px) scale(${isHovering ? 1.5 : 0})`,
          opacity: isHovering ? 0.6 : 0,
        }}
      />
    </div>
  )
}