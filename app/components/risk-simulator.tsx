"use client"

import { useState } from "react"
import { AlertTriangle, Zap, ShieldCheck, Activity, Car } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RiskSimulator() {
  const [speed, setSpeed] = useState(60) // km/h
  const [hazard, setHazard] = useState<"pothole" | "breaker" | "surface">("pothole")

  // Logic: Calculate Impact Force / Risk
  // Without TerraSense: Impact = Speed * HazardFactor
  // With TerraSense: Impact = (Speed reduced by alert) * HazardFactor
  
  const getHazardData = (type: string) => {
    switch (type) {
      case "pothole": return { label: "Deep Pothole", factor: 1.5, desc: "Suspension Damage Risk" }
      case "breaker": return { label: "Speed Breaker", factor: 1.2, desc: "Undercarriage Impact" }
      case "surface": return { label: "Damaged Surface", factor: 1.0, desc: "Loss of Traction" }
      default: return { label: "", factor: 1, desc: "" }
    }
  }

  const data = getHazardData(hazard)
  
  // Risk Score Calculation (0-100)
  // At 80km/h hitting a pothole is 100% damage risk.
  const rawRisk = Math.min(100, (speed * data.factor * 0.9))
  
  // With TerraSense, driver slows down to ~20km/h or avoids it.
  const reducedRisk = Math.min(100, (20 * data.factor * 0.9))

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* 1. CONTROLS (Top) */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Speed Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Driving Speed</label>
            <span className="text-2xl font-mono font-bold text-primary">{speed} <span className="text-xs text-muted-foreground">km/h</span></span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="120" 
            step="5"
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground/50 font-mono">
            <span>20</span>
            <span>120</span>
          </div>
        </div>

        {/* Hazard Selection */}
        <div className="space-y-4">
          <label className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Detected Hazard</label>
          <div className="flex gap-2">
            {[
              { id: "pothole", label: "Pothole" },
              { id: "breaker", label: "Speed Breaker" },
              { id: "surface", label: "Bad Surface" },
            ].map((h) => (
              <button
                key={h.id}
                onClick={() => setHazard(h.id as any)}
                className={cn(
                  "flex-1 py-3 px-2 rounded-lg border text-sm font-bold uppercase tracking-wide",
                  hazard === h.id 
                    ? "bg-primary text-black border-primary" 
                    : "bg-black/40 border-white/10 text-muted-foreground hover:bg-white/5"
                )}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SIMULATION RESULTS (Split View) */}
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        
        {/* SCENARIO A: STANDARD (No Alert) */}
        <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-bold uppercase tracking-widest text-sm">Without TerraSense</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Impact Speed</span>
              <span className="font-mono font-bold text-red-200">{speed} km/h</span>
            </div>
            
            {/* Static Bar (No Animation) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-wide">
                <span className="text-red-400">Vehicle Damage Prob.</span>
                <span className="font-bold text-red-400">{Math.round(rawRisk)}%</span>
              </div>
              <div className="h-2 w-full bg-red-950/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500" 
                  style={{ width: `${rawRisk}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-red-300/80 italic mt-2 border-l-2 border-red-500/30 pl-3">
              "Late detection. High impact on vehicle suspension."
            </p>
          </div>
        </div>

        {/* SCENARIO B: WITH TERRASENSE */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-bold uppercase tracking-widest text-sm">With TerraSense</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Alerted Speed</span>
              <span className="font-mono font-bold text-emerald-200">~20 km/h</span>
            </div>
            
            {/* Static Bar (No Animation) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-wide">
                <span className="text-emerald-400">Vehicle Damage Prob.</span>
                <span className="font-bold text-emerald-400">{Math.round(reducedRisk)}%</span>
              </div>
              <div className="h-2 w-full bg-emerald-950/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${reducedRisk}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-emerald-300/80 italic mt-2 border-l-2 border-emerald-500/30 pl-3">
              "Hazard alerted ahead. Smooth and safe passage."
            </p>
          </div>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="text-center pt-4 border-t border-white/5">
        <p className="text-sm text-muted-foreground">
          TerraSense reduces accident risk by <span className="text-primary font-bold">{(rawRisk - reducedRisk).toFixed(0)}%</span> in this scenario.
        </p>
      </div>
    </div>
  )
}