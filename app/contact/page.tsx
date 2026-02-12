"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import CustomCursor from "../components/custom-cursor"
import SpotlightCard from "../components/ui/spotlight-card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Mail, Send, Instagram, Linkedin, MapPin, ChevronDown } from "lucide-react"

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  // Updated state: removed screenshot, added role
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    organization: "", 
    role: "", 
    message: "" 
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.message || !formData.role) return

    setStatus("loading")

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          name: formData.name, 
          organization: formData.organization,
          role: formData.role, // Sending the selected role to your API
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus("success")
        // Reset form data
        setFormData({ name: "", email: "", organization: "", role: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* BACKGROUND ELEMENTS */}
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

      <main className="relative z-10 pt-40 px-6 pb-20 max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
        
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 premium-text-glow">Let's Connect</h1>
          <p className="text-xl text-muted-foreground tracking-widest uppercase">We'd love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT: CONTACT FORM */}
          <div className="lg:col-span-3 animate-slide-up delay-100 w-full">
            <SpotlightCard className="p-8 md:p-12 rounded-[2rem] border-primary/20 w-full cursor-auto">
              {status === "success" ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Send className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-lg text-muted-foreground">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <Button 
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-8 rounded-full bg-white/10 text-foreground hover:bg-white/20 cursor-hover"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Organization Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">Name</label>
                      <Input 
                        id="name"
                        type="text" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-14 bg-black/50 border-white/10 focus:border-primary/50 cursor-hover text-lg rounded-xl" 
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="organization" className="text-sm font-medium text-foreground/80 ml-1">Organization <span className="text-muted-foreground/50 text-xs font-normal">(Optional)</span></label>
                      <Input 
                        id="organization"
                        type="text" 
                        placeholder="Company Name" 
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="h-14 bg-black/50 border-white/10 focus:border-primary/50 cursor-hover text-lg rounded-xl" 
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  
                  {/* Email & Role Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">Email Address</label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-14 bg-black/50 border-white/10 focus:border-primary/50 cursor-hover text-lg rounded-xl" 
                        required 
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* NEW: "I am an:" Dropdown */}
                    <div className="space-y-2 relative">
                      <label htmlFor="role" className="text-sm font-medium text-foreground/80 ml-1">I am an:</label>
                      <div className="relative">
                        <select
                          id="role"
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full h-14 px-4 bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none cursor-hover text-lg rounded-xl appearance-none transition-colors text-foreground"
                          required
                          disabled={status === "loading"}
                        >
                          <option value="" disabled className="bg-black text-muted-foreground">Select your role</option>
                          <option value="Investor" className="bg-black text-foreground">Investor</option>
                          <option value="Fleet Owner" className="bg-black text-foreground">Fleet Owner</option>
                          <option value="Technology Partner" className="bg-black text-foreground">Technology Partner</option>
                          <option value="Other" className="bg-black text-foreground">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">Message</label>
                    <textarea 
                      id="message"
                      placeholder="How can we help you?" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full min-h-[150px] p-4 bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none cursor-hover text-lg rounded-xl resize-none transition-colors" 
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-black premium-hover cursor-hover shadow-[0_0_20px_rgba(218,165,32,0.2)] hover:shadow-[0_0_40px_rgba(218,165,32,0.4)] mt-4"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                  
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-4">Failed to send message. Please try again.</p>
                  )}
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* RIGHT: INFO & SOCIALS */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up delay-300 w-full h-full flex flex-col justify-between">
            
            <SpotlightCard className="p-8 rounded-[2rem] border-white/10 flex-grow cursor-auto">
              <div className="space-y-10">
                
                {/* Email Info */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">Email Us At</h3>
                  </div>
                  <a 
                    href="mailto:perksplusquery@gmail.com" 
                    className="text-lg text-muted-foreground hover:text-primary transition-colors cursor-hover ml-16 block"
                  >
                    perksplusquery@gmail.com
                  </a>
                </div>

                {/* HQ Info */}
                <div className="pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-foreground/70" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">Headquarters</h3>
                  </div>
                  <p className="text-lg text-muted-foreground ml-16">
                    Manipal, Karnataka<br/>
                    India
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 ml-2">Follow Our Journey</h3>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/theperkspluscompany/" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary hover:text-primary transition-all cursor-hover group">
                      <Instagram className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
                    </a>
                    <a href="https://www.linkedin.com/company/perksplusofficial/" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary hover:text-primary transition-all cursor-hover group">
                      <Linkedin className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
                    </a>
                  </div>
                </div>

              </div>
            </SpotlightCard>

          </div>
        </div>
      </main>
    </div>
  )
}