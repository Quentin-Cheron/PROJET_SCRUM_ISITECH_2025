"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function DetailsPage() {
  useEffect(() => {
    // Scroll vers l'ancre si présente dans l'URL
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1D35] to-[#163554] text-[#F2E8DC] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#F2E8DC] hover:text-[#6CAED6] transition-colors mb-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            <ArrowLeft size={18} />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
            Détails de nos méthodes
          </h1>
          <p className="text-base md:text-lg mt-2 text-[#D0E7F5]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Explorez en détail nos approches thérapeutiques
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Connaissance de soi */}
        <section id="connaissance-de-soi" className="bg-gradient-to-br from-[#D0E7F5] via-white to-[#F2E8DC] rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-2 border-[#6CAED6] scroll-mt-20">
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

        {/* Section Équilibre émotionnel */}
        <section id="equilibre-emotionnel" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#6CAED6] flex items-center justify-center overflow-hidden">
              <img src="/relaxations.jfif" alt="Equilibre émotionnel" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Équilibre émotionnel
              </h2>
              <p className="text-sm md:text-base text-[#0A1D35] italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Apaiser l'esprit et l'émotionnel
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-[#0A1D35] leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              L'équilibre émotionnel est au cœur de votre bien-être. Cette approche vous permet de libérer les blocages, gérer le stress et l'anxiété, et retrouver la sérénité et la clarté mentale.
            </p>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1D35] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Techniques utilisées :
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#D0E7F5] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Hypnothérapie
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Technique d'accompagnement qui utilise l'état de conscience modifié pour accéder à l'inconscient et faciliter les changements profonds.
                  </p>
                </div>
                <div className="bg-[#D0E7F5] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Sophrologie
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Méthode de relaxation et de gestion du stress combinant des exercices de respiration, de visualisation et de relaxation musculaire.
                  </p>
                </div>
                <div className="bg-[#D0E7F5] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    EFT (Emotional Freedom Techniques)
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Technique de libération émotionnelle qui combine la stimulation de points d'acupuncture avec des affirmations pour libérer les blocages émotionnels.
                  </p>
                </div>
                <div className="bg-[#D0E7F5] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Dialogue intérieur
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Approche thérapeutique qui permet de comprendre et transformer les croyances limitantes en explorant les différentes voix intérieures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#6CAED6] rounded-xl p-6 text-center">
              <p className="text-white mb-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Prêt à retrouver votre équilibre émotionnel ?
              </p>
              <Link href="/reservation" className="inline-flex items-center gap-2 bg-white hover:bg-[#F2E8DC] text-[#0A1D35] font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Réserver une séance
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Section Harmonie corporelle */}
        <section id="harmonie-corporelle" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D9C9B4] flex items-center justify-center overflow-hidden">
              <img src="/acupunctures.jfif" alt="Harmonie corporelle" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Harmonie corporelle
              </h2>
              <p className="text-sm md:text-base text-[#0A1D35] italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Restaurer le flux énergétique
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-[#0A1D35] leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              L'harmonie corporelle est essentielle pour votre bien-être global. Ces techniques ancestrales permettent de relancer l'énergie vitale, soulager les tensions physiques, améliorer le sommeil et le bien-être général.
            </p>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1D35] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Techniques utilisées :
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#F2E8DC] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Acupuncture
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Médecine traditionnelle chinoise utilisant des aiguilles fines sur des points spécifiques du corps pour rééquilibrer l'énergie vitale (Qi) et traiter divers troubles.
                  </p>
                </div>
                <div className="bg-[#F2E8DC] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Shiatsu
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Technique de massage japonais qui utilise des pressions avec les doigts, les paumes et les coudes le long des méridiens énergétiques pour harmoniser le flux d'énergie.
                  </p>
                </div>
                <div className="bg-[#F2E8DC] rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
                    Tuina
                  </h4>
                  <p className="text-sm text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Massage thérapeutique chinois combinant pressions, étirements et manipulations pour stimuler la circulation énergétique et soulager les douleurs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#D9C9B4] rounded-xl p-6 text-center">
              <p className="text-[#0A1D35] mb-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Prêt à retrouver votre harmonie corporelle ?
              </p>
              <Link href="/reservation" className="inline-flex items-center gap-2 bg-[#0A1D35] hover:bg-[#163554] text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Réserver une séance
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation rapide */}
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <p className="text-[#0A1D35] mb-4" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Explorez nos autres méthodes
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/details#connaissance-de-soi" className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0A1D35] to-[#163554] hover:from-[#163554] hover:to-[#0A1D35] text-white font-semibold px-4 py-2 rounded-md transition-all text-sm" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Connaissance de soi
            </Link>
            <Link href="/details#equilibre-emotionnel" className="inline-flex items-center gap-1 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-4 py-2 rounded-md transition-all text-sm" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Équilibre émotionnel
            </Link>
            <Link href="/details#harmonie-corporelle" className="inline-flex items-center gap-1 bg-[#D9C9B4] hover:bg-[#C9B9A4] text-[#0A1D35] font-semibold px-4 py-2 rounded-md transition-all text-sm" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Harmonie corporelle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
