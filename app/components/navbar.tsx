"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Standard Links (Team Removed)
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mission", href: "#mission" },
    { name: "Vision", href: "#vision" },
  ]

  // Projects for Dropdown
  const projects = [
    { name: "Terrasense", href: "#terrasense" },
    { name: "Match Pulse", href: "#matchpulse" },
    { name: "P2P", href: "#p2p" },
  ]

  return (
    <nav className="fixed top-0 w-full z-[100] navbar-glass h-24 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full grid grid-cols-3 items-center">
        
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-hover justify-self-start group">
          <img 
            src="/images/perks-plus-logo.png" 
            alt="Perks Plus Logo" 
            className="h-12 w-12 object-contain transition-transform group-hover:scale-110" 
          />
          <span className="font-serif font-bold text-primary text-2xl tracking-tight">
            Perks Plus
          </span>
        </Link>
        
        {/* MIDDLE: Nav Items */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all cursor-hover relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}

          {/* Projects Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-primary transition-all cursor-hover outline-none">
              Projects 
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
            </button>
            
            <div className={cn(
              "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 glass-card rounded-2xl p-2 transition-all duration-300 transform origin-top",
              isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            )}>
              {projects.map((project) => (
                <Link
                  key={project.name}
                  href={project.href}
                  className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-white/5 rounded-xl transition-all cursor-hover"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* RIGHT: Button */}
        <div className="justify-self-end">
          <Button 
            variant="default" 
            size="lg" 
            className="premium-hover font-semibold px-8 rounded-full bg-primary text-black hover:bg-white cursor-hover shadow-[0_0_20px_rgba(218,165,32,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  )
}