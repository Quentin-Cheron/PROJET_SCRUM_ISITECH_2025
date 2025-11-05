import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function harmoniePage() {
  return (
    <div className="bg-secondary p-10">
      <section id="harmonie-corporelle" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 scroll-mt-20">
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
    </div>
  );
}
