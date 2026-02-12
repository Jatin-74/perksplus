"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { CardContent } from "./components/ui/card"
import { Instagram, Linkedin, Mail, Target, Eye, Cpu, Zap, Radio, Globe } from "lucide-react"
import CustomCursor from "./components/custom-cursor"
import Navbar from "./components/navbar"
import SpotlightCard from "./components/ui/spotlight-card"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // UPDATED: Async function to call API
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")
      } else {
        console.error("Failed to send email")
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error connecting to server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* STATIC BACKGROUND LOGO */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          <img 
            src="/images/perks-plus-logo.png" 
            alt="Perks Plus Logo Background" 
            className="w-full h-full object-contain" 
          />
        </div>
        
        {/* Floating Orbs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-slow-glow" 
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-slow-glow delay-2000"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }} 
        />
      </div>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="px-6 pt-64 pb-32 max-w-7xl mx-auto text-center">
          {/* FADE IN ANIMATION FOR HEADER */}
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow tracking-tight animate-fade-in">
            Perks Plus
          </h1>
          
          <div className="flex flex-col items-center gap-6 delay-100 animate-slide-up">
            <p className="text-xl md:text-2xl font-light text-foreground/80 tracking-widest uppercase cursor-hover">
              Sensing the real world. <span className="text-primary opacity-50">•</span> Acting before the damage.
            </p>
            <div className="w-24 h-[1px] bg-primary/30 my-4" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto cursor-hover font-light">
              We identify day-to-day problems that are often ignored, solving them through 
              <span className="text-foreground font-medium italic"> automation, cyber-physical systems, and real-time intelligence </span> 
              in a sustainable way.
            </p>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section id="mission" className="px-6 py-24 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-8 mb-16 animate-slide-up delay-200">
             <div className="h-[1px] w-24 bg-primary/30" />
             <h2 className="font-serif text-4xl font-bold text-primary premium-text-glow shrink-0">OUR MISSION</h2>
             <div className="h-[1px] w-24 bg-primary/30" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <SpotlightCard className="md:col-span-2 cursor-hover animate-slide-up delay-300 h-full group">
              <CardContent className="p-12">
                <Target className="w-12 h-12 text-primary mb-6 animate-float" />
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">Preventive Automation</h3>
                <p className="text-muted-foreground text-xl leading-relaxed font-light">
                  Solving real-world problems through cyber-physical systems. We move beyond reactive systems toward preventive automation, detecting problems before they cause harm.
                </p>
              </CardContent>
            </SpotlightCard>
            
            <SpotlightCard className="cursor-hover flex flex-col justify-center items-start p-12 text-left animate-slide-up delay-400 h-full group">
                <Cpu className="w-12 h-12 text-primary mb-6 animate-float-delayed" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Unified Solutions</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">Hardware, software, and cloud intelligence in one.</p>
            </SpotlightCard>
          </div>
        </section>

        {/* VISION SECTION */}
        <section id="vision" className="px-6 py-24 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-8 mb-16 animate-slide-up delay-400">
             <div className="h-[1px] w-24 bg-primary/30" />
             <h2 className="font-serif text-4xl font-bold text-primary premium-text-glow shrink-0">OUR VISION</h2>
             <div className="h-[1px] w-24 bg-primary/30" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <SpotlightCard className="cursor-hover flex flex-col justify-center items-start p-12 text-left animate-slide-up delay-500 h-full group">
                <Eye className="w-12 h-12 text-primary mb-6 animate-float" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Trusted Platform</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">A global standard for real-time problem solving.</p>
            </SpotlightCard>
            
            <SpotlightCard className="md:col-span-2 cursor-hover animate-slide-up delay-600 h-full group">
              <CardContent className="p-12">
                <Zap className="w-12 h-12 text-primary mb-6 animate-float-delayed" />
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">Zero-Accident Ecosystem</h3>
                <p className="text-muted-foreground text-xl leading-relaxed font-light">
                  Creating an intelligent mobility ecosystem where infrastructure prevents accidents. A future where technology quietly protects human life.
                </p>
              </CardContent>
            </SpotlightCard>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="px-6 py-24 max-w-7xl mx-auto animate-slide-up delay-500">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-primary premium-text-glow mb-4">OUR PROJECTS</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">Innovation in Action</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 text-left">
            <SpotlightCard id="terrasense" className="cursor-hover h-full animate-slide-up delay-600 group">
              <CardContent className="p-12 flex flex-col h-full items-start text-left">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-primary animate-float" />
                  </div>
                  <h3 className="text-4xl font-serif font-bold group-hover:text-primary transition-colors">TerraSense</h3>
                </div>
                <p className="text-muted-foreground text-xl leading-relaxed font-light mb-8 flex-grow">
                  TerraSense is the first innovation from Perks Plus, built to make everyday travel safer and smoother. 
                  It detects potholes, speed breakers, and road surface issues in real time and alerts upcoming drivers 
                  before they reach the hazard. The goal is simple: Reduce accidents, prevent vehicle damage, and build 
                  smarter roads using practical technology.
                </p>
                <div className="mt-auto pt-6 border-t border-primary/10 w-full">
                  <span className="text-base text-primary font-medium tracking-wider uppercase">Improving Road Safety</span>
                </div>
              </CardContent>
            </SpotlightCard>

            <SpotlightCard id="p2p" className="cursor-hover h-full animate-slide-up delay-700 group">
              <CardContent className="p-12 flex flex-col h-full items-start text-left">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Radio className="w-8 h-8 text-primary animate-float-delayed" />
                  </div>
                  <h3 className="text-4xl font-serif font-bold group-hover:text-primary transition-colors">P2P <span className="text-xl opacity-60 font-sans font-normal ml-2 text-white">Version 1</span></h3>
                </div>
                <p className="text-muted-foreground text-xl leading-relaxed font-light mb-8 flex-grow">
                  P2P Version 1 is an early innovation built on the concept of subvocal articulation to enable silent and seamless communication. 
                  The system captures subtle signals generated when a person speaks internally without producing sound. 
                  The idea is simple: Allow people to communicate without speaking aloud, especially in situations where voice cannot be used.
                </p>
                <div className="mt-auto pt-6 border-t border-primary/10 w-full">
                  <span className="text-base text-primary font-medium tracking-wider uppercase">Subvocal Technology</span>
                </div>
              </CardContent>
            </SpotlightCard>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 max-w-4xl mx-auto text-center animate-slide-up delay-700">
          <SpotlightCard className="rounded-[2rem] border-primary/20">
             <div className="p-16 space-y-8">
                <h2 className="font-serif text-4xl md:text-5xl font-bold">Let&apos;s Build the Future</h2>
                {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="h-14 bg-background/40 border-primary/20 cursor-hover text-lg" 
                      required 
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      className="h-14 px-8 premium-hover cursor-hover font-bold bg-primary text-black text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Joining..." : "Join Us"}
                    </Button>
                </form>
                ) : (
                <div className="py-4 text-primary font-bold text-2xl animate-pulse">Welcome to Perks Plus.</div>
                )}
             </div>
          </SpotlightCard>
        </section>
      </main>

      <footer className="relative z-10 px-6 py-24 border-t border-primary/10 text-center">
        <div className="flex justify-center gap-12 mb-16">
          <a href="https://instagram.com/theperkspluscompany/" className="text-primary/60 hover:text-primary transition-all cursor-hover"><Instagram className="w-8 h-8" /></a>
          <a href="https://www.linkedin.com/company/perksplusofficial/" className="text-primary/60 hover:text-primary transition-all cursor-hover"><Linkedin className="w-8 h-8" /></a>
          <a href="mailto:perksplusquery@gmail.com" className="text-primary/60 hover:text-primary transition-all cursor-hover"><Mail className="w-8 h-8" /></a>
        </div>
        <p className="text-xs text-muted-foreground/30 uppercase tracking-[0.3em]">© 2026 Perks Plus. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
