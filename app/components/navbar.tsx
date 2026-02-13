"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false) // NEW: State for mobile projects dropdown

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mission", href: "/#mission" },
    { name: "Vision", href: "/#vision" },
    { name: "Team", href: "/team" },
  ]

  const projects = [
    { name: "Terrasense", href: "/terrasense" },
    { name: "Match Pulse", href: "/matchpulse" },
    { name: "P2P", href: "/p2p" },
  ]

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setIsMobileProjectsOpen(false) // Reset dropdown state for next time
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] navbar-glass h-24 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between md:grid md:grid-cols-3 items-center">
          
          {/* LEFT: Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 cursor-hover justify-self-start group z-50"
            onClick={handleLinkClick}
          >
            <img 
              src="/images/perks-plus-logo.png" 
              alt="Perks Plus Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform group-hover:scale-110" 
            />
            <span className="font-serif font-bold text-primary text-xl md:text-2xl tracking-tight">
              Perks Plus
            </span>
          </Link>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            className="md:hidden z-50 text-foreground p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
          
          {/* MIDDLE: Nav Items (Desktop Only) */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-all cursor-hover relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

            {/* Projects Dropdown (Desktop) */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-primary transition-all cursor-hover outline-none">
                Projects 
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
              </button>
              
              <div 
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-56 pt-4", 
                  "transition-all duration-300 transform origin-top",
                  isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                )}
              >
                <div className="bg-black border border-white/10 rounded-2xl p-2 shadow-xl">
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
          </div>
          
          {/* RIGHT: Button (Desktop Only) */}
          <div className="hidden md:flex justify-self-end">
            <Link href="/contact">
              <Button 
                variant="default" 
                size="lg" 
                className="premium-hover font-semibold px-8 rounded-full bg-primary text-black hover:bg-white cursor-hover shadow-[0_0_20px_rgba(218,165,32,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl transition-all duration-500 flex flex-col items-center justify-center md:hidden overflow-y-auto",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8 text-center w-full px-6 py-24">
          
          {/* Standard Links */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className="text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors w-full"
            >
              {item.name}
            </Link>
          ))}

          <div className="w-16 h-[1px] bg-primary/30 my-2" />

          {/* Projects Dropdown (Mobile Accordion) */}
          <div className="flex flex-col items-center w-full">
            <button 
              onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
              className="flex items-center justify-center gap-2 text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors w-full focus:outline-none"
            >
              Projects
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300 text-primary", isMobileProjectsOpen && "rotate-180")} />
            </button>

            {/* Expandable Project Links Container */}
            <div 
              className={cn(
                "flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out w-full",
                isMobileProjectsOpen ? "max-h-64 opacity-100 mt-6 gap-6" : "max-h-0 opacity-0 mt-0 gap-0"
              )}
            >
              {projects.map((project) => (
                <Link
                  key={project.name}
                  href={project.href}
                  onClick={handleLinkClick}
                  className="text-xl font-serif font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <Link href="/contact" onClick={handleLinkClick} className="mt-8 w-full max-w-xs">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-bold rounded-full bg-primary text-black hover:bg-white shadow-[0_0_20px_rgba(218,165,32,0.3)]"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
