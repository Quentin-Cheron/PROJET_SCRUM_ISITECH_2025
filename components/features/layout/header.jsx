"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "A propos" },
    { href: "/reservation", label: "Réservations" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0A1D35] backdrop-blur supports-[backdrop-filter]:bg-[#0A1D35]/95">
      <nav className="flex h-16 items-center justify-between">
        {/* Logo - tout à gauche */}
        <Link
          href="/"
          className="flex items-center pl-4 transition-opacity hover:opacity-80"
        >
          <img 
            src="/logoNavbar.svg" 
            alt="Logo SYNÉGO" 
            className="h-14 w-auto md:h-16 object-contain brightness-0 invert"
          />
        </Link>
        
        {/* Navigation à droite */}
        <div className="flex items-center flex-1 justify-end pr-4">

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#F2E8DC] text-sm font-medium transition-colors hover:text-[#6CAED6]"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F2E8DC]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-[#0A1D35] md:hidden">
          <ul className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-[#F2E8DC] transition-colors hover:text-[#6CAED6]"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button className="w-full bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35]">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
