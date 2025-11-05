import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function equilibrePage() {
  return (
    <body className="bg-secondary">
      <section id="equilibre-emotionnel" className="bg-white m-10 rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-20">
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
    </body>
  );
}
