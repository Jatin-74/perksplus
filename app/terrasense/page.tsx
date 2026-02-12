"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import CustomCursor from "../components/custom-cursor"
import SpotlightCard from "../components/ui/spotlight-card"
import RiskSimulator from "../components/risk-simulator"
import { CardContent } from "../components/ui/card"
import { Globe, Shield, AlertTriangle, Zap, Activity, Sliders } from "lucide-react"

export default function TerrasensePage() {
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
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow">TerraSense</h1>
            <p className="text-xl text-muted-foreground tracking-widest uppercase">Smarter Roads, Safer Journeys</p>
          </div>

          {/* BENTO GRID */}
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)] mb-12">
            
            {/* CARD 1: MAIN DESCRIPTION */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-100">
              <CardContent className="p-12 flex flex-col justify-between h-full">
                <div>
                  <Globe className="w-12 h-12 text-primary mb-6 animate-float" />
                  <h2 className="text-4xl font-bold mb-6 text-foreground">The First Innovation</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    TerraSense is the first innovation from Perks Plus, built to make everyday travel safer and smoother. 
                    Perks Plus focuses on solving real world problems, where TerraSense is dedicated to improving road safety and creating safer journeys for everyone.
                  </p>
                </div>
              </CardContent>
            </SpotlightCard>

            {/* CARD 2: REAL TIME DETECTION */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-200">
              <CardContent className="p-10 flex flex-col h-full">
                <Activity className="w-10 h-10 text-primary mb-6 animate-float-delayed" />
                <h3 className="text-2xl font-bold mb-4">Real-Time Detection</h3>
                <p className="text-lg text-muted-foreground font-light">
                  Detects potholes, speed breakers, and road surface issues instantly as they appear on the road.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 3: THE GOAL */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-300">
              <CardContent className="p-10 flex flex-col h-full">
                <Shield className="w-10 h-10 text-primary mb-6 animate-float" />
                <h3 className="text-2xl font-bold mb-4">The Goal</h3>
                <p className="text-lg text-muted-foreground font-light">
                  Reduce accidents, prevent vehicle damage, and build smarter roads using practical technology.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 4: SMART ALERTS (Wide) */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-400">
              <CardContent className="p-12 flex flex-col justify-center h-full">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-primary/10">
                    <AlertTriangle className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Proactive Alerts</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed font-light">
                      It doesn't just see the road; it communicates. TerraSense alerts upcoming drivers before they reach a hazard, 
                      moving from reactive repairs to <span className="text-primary font-semibold">preventive safety</span>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </SpotlightCard>
          </div>

          {/* NEW SECTION: RISK SIMULATOR (STATIC CARD) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] flex-grow bg-primary/20" />
               <span className="text-primary font-serif font-bold text-2xl uppercase tracking-widest flex items-center gap-2">
                 <Sliders className="w-6 h-6" /> Live Risk Analysis
               </span>
               <div className="h-[1px] flex-grow bg-primary/20" />
            </div>

            {/* STATIC CONTAINER: 
                - Replaced 'glass-card' (which has hover effects) with specific utility classes.
                - No 'SpotlightCard' wrapper.
                - No 'cursor-hover' class.
            */}
            <div className="bg-black/40 backdrop-blur-2xl border border-primary/20 rounded-[2rem] p-8 md:p-12 shadow-2xl">
               <div className="mb-8 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-2">Hazard Impact Simulator</h3>
                  <p className="text-muted-foreground">See how early detection prevents vehicle damage.</p>
               </div>
               <RiskSimulator />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}