import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function connaissancePage() {
  return (
    <div className="bg-secondary p-10">
      <section id="connaissance-de-soi" className="bg-gradient-to-br from-[#D0E7F5] via-white to-[#F2E8DC] rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-[#6CAED6]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] flex items-center justify-center overflow-hidden ring-4 ring-[#6CAED6]/30">
            <img src="/bien-etre.jfif" alt="Connaissance de soi" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
              La connaissance de soi
            </h2>
            <p className="text-sm md:text-base text-[#0A1D35] italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Révéler la nature profonde
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-base md:text-lg text-[#0A1D35] leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            La connaissance de soi est le fondement de votre développement personnel. Comprendre vos mécanismes, vos motivations et votre fonctionnement unique vous permet d'être aligné avec votre véritable nature.
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0A1D35] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
              Techniques utilisées :
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  MBTI (Myers-Briggs Type Indicator)
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Outil de typologie psychologique qui identifie votre type de personnalité parmi 16 types, permettant de mieux comprendre vos préférences et modes de fonctionnement.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  Ennéagramme
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Système de développement personnel qui identifie 9 types de personnalité, révélant vos motivations profondes, peurs et mécanismes de défense.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  Process Com
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Modèle de communication qui identifie 6 types de personnalité, améliorant la compréhension de soi et des autres dans les interactions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  Archétypes
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Exploration des archétypes jungiens pour comprendre les motifs universels qui influencent votre comportement et votre psyché.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  Dialogue pédagogique
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Approche d'accompagnement qui utilise le questionnement et l'écoute active pour favoriser la réflexion et l'apprentissage autonome.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                  Gestion d'apprentissage
                </h4>
                <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Techniques pour optimiser votre capacité d'apprentissage, comprendre vos styles d'apprentissage et développer des stratégies efficaces.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0A1D35] to-[#163554] rounded-xl p-6 text-center">
            <p className="text-white mb-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Prêt à découvrir qui vous êtes vraiment ?
            </p>
            <Link href="/reservation" className="inline-flex items-center gap-2 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Réserver une séance
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
