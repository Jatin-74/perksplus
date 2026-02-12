"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import CustomCursor from "../components/custom-cursor"
import SpotlightCard from "../components/ui/spotlight-card"
import { CardContent } from "../components/ui/card"
import { Radio, MicOff, MessageSquare, Zap, BrainCircuit } from "lucide-react"

export default function P2PPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
           <img src="/images/perks-plus-logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-slow-glow" 
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-slow-glow delay-2000"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }} 
        />
      </div>

      <main className="relative z-10 pt-40 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow">P2P <span className="text-4xl opacity-50 font-sans font-light">Version 1</span></h1>
            <p className="text-xl text-muted-foreground tracking-widest uppercase">Silent Communication Redefined</p>
          </div>

          {/* BENTO GRID */}
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            
            {/* CARD 1: MAIN CONCEPT */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-100">
              <CardContent className="p-12 flex flex-col justify-between h-full">
                <div>
                  <BrainCircuit className="w-12 h-12 text-primary mb-6 animate-float" />
                  <h2 className="text-4xl font-bold mb-6 text-foreground">Subvocal Articulation</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    P2P Version 1 is an early innovation from Perks Plus, built on the concept of subvocal articulation to enable silent and seamless communication.
                    P2P explores new ways of communication through subvocal technology and human centered innovation.
                  </p>
                </div>
              </CardContent>
            </SpotlightCard>

            {/* CARD 2: THE IDEA */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-200">
              <CardContent className="p-10 flex flex-col h-full">
                <MicOff className="w-10 h-10 text-primary mb-6 animate-float-delayed" />
                <h3 className="text-2xl font-bold mb-4">Silent Speech</h3>
                <p className="text-lg text-muted-foreground font-light">
                   Allow people to communicate without speaking aloud, especially in situations where voice cannot be used.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 3: HOW IT WORKS */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-300">
              <CardContent className="p-10 flex flex-col h-full">
                <Radio className="w-10 h-10 text-primary mb-6 animate-float" />
                <h3 className="text-2xl font-bold mb-4">Signal Capture</h3>
                <p className="text-lg text-muted-foreground font-light">
                  The system captures subtle signals generated when a person speaks internally and converts them into understandable output.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 4: INNOVATION (Wide) */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-400">
              <CardContent className="p-12 flex flex-col justify-center h-full">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-primary/10">
                    <MessageSquare className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Human Centered</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed font-light">
                      This isn't just technology; it's an extension of human capability. By bridging the gap between thought and expression without sound, 
                      we open new frontiers for <span className="text-primary font-semibold">seamless interaction</span>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </SpotlightCard>

          </div>
        </div>
      </main>
    </div>
  )
}