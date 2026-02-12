"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import CustomCursor from "../components/custom-cursor"
import SpotlightCard from "../components/ui/spotlight-card"
import { CardContent } from "../components/ui/card"
import { User } from "lucide-react" 

export default function TeamPage() {
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

  // Team Members Data
  const teamMembers = [
    { id: 1, name: "T Shrithan Reddy", role: "Core Member", delay: "delay-100" },
    { id: 2, name: "Bhuvan Chilukuti", role: "Core Member", delay: "delay-200" },
    { id: 3, name: "Sidharth Rava", role: "Core Member", delay: "delay-300" },
    { id: 4, name: "Ushasvini Konduru", role: "Core Member", delay: "delay-400" },
    { id: 5, name: "Trishanth Bharath", role: "Core Member", delay: "delay-500" },
    { id: 6, name: "S Jatin Reddy", role: "Core Member", delay: "delay-600" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
           {/* Ensure perks-plus-logo.png exists in public/images/ */}
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
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow">Our Team</h1>
            <p className="text-xl text-muted-foreground tracking-widest uppercase">The Minds Behind Perks Plus</p>
          </div>

          {/* TEAM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <SpotlightCard key={member.id} className={`cursor-hover animate-slide-up ${member.delay}`}>
                <CardContent className="p-10 flex flex-col items-center text-center">
                  
                  {/* CIRCULAR PROFILE PICTURE WITH GOLDEN OUTLINE */}
                  <div className="w-40 h-40 mb-8 rounded-full border-4 border-primary/60 p-1 shadow-[0_0_30px_rgba(218,165,32,0.3)] relative group overflow-hidden bg-black/50 flex items-center justify-center">
                    
                    {/* DYNAMIC IMAGE SOURCE: 
                       Converts "T Shrithan Reddy" -> "/images/t-shrithan-reddy.jpg" 
                    */}
                    <img 
                      src={`/images/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                      }}
                    />

                    {/* Fallback Icon (Hidden by default, shown if img fails) */}
                    <User className="fallback-icon hidden w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Inner glowing ring effect */}
                    <div className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* NAME */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-serif">{member.name}</h3>
                  
                  {/* ROLE */}
                  <span className="text-sm text-primary uppercase tracking-widest font-semibold opacity-80">
                     {member.role}
                  </span>

                </CardContent>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}