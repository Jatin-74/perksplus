"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import CustomCursor from "../components/custom-cursor"
import SpotlightCard from "../components/ui/spotlight-card"
import { CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ScanFace, Sparkles, Activity, Share2, Smartphone, Monitor, Info } from "lucide-react"
import Link from "next/link"

export default function MatchPulsePage() {
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
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow">Match Pulse</h1>
            <p className="text-xl text-muted-foreground tracking-widest uppercase">Discover Your Compatibility</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24 animate-slide-up delay-100">
            <Link href="https://matchpulse-ai.vercel.app/" target="_blank">
              <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(218,165,32,0.15)] hover:shadow-[0_0_40px_rgba(218,165,32,0.4)] cursor-hover w-full sm:w-auto">
                <Monitor className="mr-3 w-6 h-6" /> Launch Desktop App
              </Button>
            </Link>
            <Link href="https://matchpulse-mobile.vercel.app/" target="_blank">
              <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full bg-white/5 border border-white/20 text-foreground hover:bg-white/10 hover:border-primary/50 transition-all duration-300 cursor-hover w-full sm:w-auto">
                <Smartphone className="mr-3 w-6 h-6" /> Mobile Experience
              </Button>
            </Link>
          </div>

          {/* BENTO GRID */}
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)] mb-20">
            
            {/* CARD 1: Interactive Experience (Wide) */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-200">
              <CardContent className="p-12 flex flex-col justify-between h-full">
                <div>
                  <Sparkles className="w-12 h-12 text-primary mb-6 animate-float" />
                  <h2 className="text-4xl font-bold mb-6 text-foreground">Interactive Experience</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    Match Pulse is a fun and interactive experience that lets two people discover how similar they are. 
                    Simply upload two photos and let our system do the rest.
                  </p>
                </div>
              </CardContent>
            </SpotlightCard>

            {/* CARD 2: Pattern Mapping */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-300">
              <CardContent className="p-10 flex flex-col h-full">
                <ScanFace className="w-10 h-10 text-primary mb-6 animate-float-delayed" />
                <h3 className="text-2xl font-bold mb-4">Pattern Mapping</h3>
                <p className="text-lg text-muted-foreground font-light">
                  Our system maps key facial patterns to find unique and fascinating similarities between the uploaded photos.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 3: Compatibility Score */}
            <SpotlightCard className="cursor-hover h-full animate-slide-up delay-400">
              <CardContent className="p-10 flex flex-col h-full">
                <Activity className="w-10 h-10 text-primary mb-6 animate-float" />
                <h3 className="text-2xl font-bold mb-4">Compatibility Score</h3>
                <p className="text-lg text-muted-foreground font-light">
                  The result is shown as a compatibility score that reflects exactly how closely your facial features align.
                </p>
              </CardContent>
            </SpotlightCard>

            {/* CARD 4: Curiosity & Shareable (Wide) */}
            <SpotlightCard className="md:col-span-2 cursor-hover h-full animate-slide-up delay-500">
              <CardContent className="p-12 flex flex-col justify-center h-full">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Share2 className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Curiosity & Shareable Moments</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed font-light">
                      Match Pulse is not about judging or predicting relationships. It is purely about 
                      <span className="text-primary font-semibold"> curiosity, fun,</span> and creating shareable moments between people.
                    </p>
                  </div>
                </div>
              </CardContent>
            </SpotlightCard>

          </div>

          {/* DISCLAIMER FOOTER */}
          <div className="border-t border-white/10 pt-10 mt-20 animate-slide-up delay-600">
            <div className="flex gap-4 items-start max-w-4xl mx-auto">
              <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground/60 leading-relaxed italic">
                <span className="font-bold text-primary/80 not-italic">Disclaimer:</span> Match Pulse is designed strictly for entertainment purposes. 
                The compatibility scores and facial pattern mapping are generated by AI and automated algorithms. 
                The developers and individuals associated with this project are not responsible for the results generated, their accuracy, or any interpretations thereof.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}