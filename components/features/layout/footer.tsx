"use client";

import CGUContent from "@/components/features/legal/cgu-content";
import CGVContent from "@/components/features/legal/cgv-content";
import MentionsLegalesContent from "@/components/features/legal/mentions-legales-content";
import Modal from "@/components/ui/modal";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openModal, setOpenModal] = useState<"cgv" | "cgu" | "mentions" | null>(
    null,
  );

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/reservation", label: "Réservations" },
    { href: "/entreprises", label: "Entreprises" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "À propos" },
  ];

  const legalLinks = [
    { id: "cgv" as const, label: "CGV" },
    { id: "cgu" as const, label: "CGU" },
    { id: "mentions" as const, label: "Mentions légales" },
  ];

  return (
    <footer className="bg-[#0A1D35] text-[#F2E8DC] border-t border-[#163554]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo et Description */}
          <div className="lg:col-span-1">
            <div className="inline-block">
              <img
                src="/logoNavbar.svg"
                alt="Logo SYNÉGO"
                className="h-20 w-40 md:w-auto object-contain brightness-0 invert"
              />
            </div>
            <p
              className="text-sm text-[#D0E7F5] leading-relaxed"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Accompagnement personnalisé vers le bien-être et l'équilibre de
              vie depuis 3 ans.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-lg font-bold mb-4 text-[#F2E8DC]"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 700,
              }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#D0E7F5] hover:text-[#6CAED6] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3
              className="text-lg font-bold mb-4 text-[#F2E8DC]"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 700,
              }}
            >
              Informations légales
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setOpenModal(link.id)}
                    className="text-sm text-[#D0E7F5] hover:text-[#6CAED6] transition-colors text-left"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-lg font-bold mb-4 text-[#F2E8DC]"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 700,
              }}
            >
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:0613233343"
                  className="text-sm text-[#D0E7F5] hover:text-[#6CAED6] transition-colors"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  06 13 23 33 43
                </a>
              </li>
              <li>
                <p
                  className="text-sm text-[#D0E7F5]"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  9h - 12h / 18h - 22h
                </p>
                <p
                  className="text-xs text-[#D0E7F5]/80"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  Lun • Mar • Jeu • Dim
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#163554] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs text-[#D0E7F5]/80 text-center md:text-left"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              © {currentYear} Synégo. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Modales */}
      <Modal
        isOpen={openModal === "cgv"}
        onClose={() => setOpenModal(null)}
        title="Conditions Générales de Vente"
      >
        <CGVContent />
      </Modal>

      <Modal
        isOpen={openModal === "cgu"}
        onClose={() => setOpenModal(null)}
        title="Conditions Générales d'Utilisation"
      >
        <CGUContent />
      </Modal>

      <Modal
        isOpen={openModal === "mentions"}
        onClose={() => setOpenModal(null)}
        title="Mentions légales"
      >
        <MentionsLegalesContent />
      </Modal>
    </footer>
  );
}
