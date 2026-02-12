"use client"

import type React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({ 
  children, 
  className, 
  spotlightColor = "rgba(218, 165, 32, 0.25)", 
  ...props 
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setPosition({ x, y })
    setOpacity(1)

    // Calculate 3D Tilt
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5 
    const rotateY = ((x - centerX) / centerX) * 5 
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-xl overflow-hidden border border-white/10 bg-black/40",
        "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]", // SCALING ANIMATION
        "hover:shadow-[0_0_40px_-10px_rgba(218,165,32,0.3)]", // GLOW ON HOVER
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
      }}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}