"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, User, Sparkles, Building2, CreditCard, Phone, Clock, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  const navigationSections = [
    {
      id: "reservation",
      title: "Réservations",
      description: "Réservez votre séance d'accompagnement personnalisé",
      icon: Calendar,
      href: "/reservation",
      color: "from-[#6CAED6] to-[#D0E7F5]",
      textColor: "text-[#0A1D35]",
    },
    {
      id: "blog",
      title: "Blog",
      description: "Découvrez nos articles sur le bien-être et le développement personnel",
      icon: BookOpen,
      href: "/blogs",
      color: "from-[#D9C9B4] to-[#F2E8DC]",
      textColor: "text-[#0A1D35]",
    },
    {
      id: "about",
      title: "À propos",
      description: "En savoir plus sur notre approche thérapeutique",
      icon: User,
      href: "/about",
      color: "from-[#0A1D35] to-[#163554]",
      textColor: "text-[#F2E8DC]",
    },
  ];


  return (
    <>
      {/* SEO Meta tags */}
      <div className="hidden">
        <h1>Acupuncture</h1>
        <h2>Shiatsu</h2>
        <h3>Acupression</h3>
        <p>Bien être</p>
        <p>Gestion du stress</p>
        <p>Equilibre énergétique</p>
        <p>Coach thérapeute</p>
        <p>Développement personnel</p>
      </div>

      <div className="min-h-screen bg-[#F2E8DC]">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#D0E7F5] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D9C9B4] rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-6 animate-fade-in">
              <img src="/logoNavbar.svg" alt="Logo SYNÉGO" className="w-auto h-32 md:h-40 object-contain" />
            </div>

            {/* Slogan */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0A1D35] animate-slide-up"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
            >
              Être enfin soi,
            </h2>
            <p 
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0A1D35] mb-8 animate-slide-up-delay"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600 }}
            >
              grâce à un accompagnement soigné
            </p>

            {/* CTA Button */}
            {/* <Link href="/reservation">
              <Button 
                size="lg" 
                className="bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-8 py-6 text-lg animate-fade-in-delay"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Réserver une séance
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link> */}
          </div>
        </section>

        {/* Services Section */}
        <section 
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="fade-in-section py-8 px-4 bg-gradient-to-b from-[#D9C9B4] to-[#F2E8DC]"
        >
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0A1D35]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
            >
              Nos approches
            </h2>
            <p 
              className="text-sm md:text-base text-center mb-6 text-[#0A1D35] max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Découvrez nos méthodes pour votre bien-être
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {/* Equilibre émotionnel Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-shadow flex flex-col">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-[#6CAED6] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/relaxations.jfif" 
                      alt="Equilibre émotionnel" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold mb-1 text-[#0A1D35] text-center"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
                >
                  Équilibre émotionnel
                </h3>
                <p 
                  className="text-xs text-[#0A1D35] mb-2 text-center italic"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Apaiser l'esprit et l'émotionnel
                </p>
                <p 
                  className="text-xs text-[#0A1D35] mb-2 text-center leading-relaxed"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span className="font-semibold">Techniques :</span> Hypnothérapie, sophrologie, EFT, dialogue intérieur
                </p>
                <p 
                  className="text-xs md:text-sm text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Libérer les blocages, gérer le stress et l'anxiété, retrouver la sérénité et la clarté mentale.
                </p>
                <Link 
                  href="/details#equilibre-emotionnel"
                  className="inline-flex items-center justify-center gap-1 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-4 py-2 text-xs md:text-sm rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Connaissance de soi Card - Premium */}
              <div className="relative bg-gradient-to-br from-[#D0E7F5] via-white to-[#F2E8DC] rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#6CAED6] flex flex-col transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] flex items-center justify-center overflow-hidden ring-4 ring-[#6CAED6]/30">
                    <img 
                      src="/bien-etre.jfif" 
                      alt="Connaissance de soi" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-1 text-[#0A1D35] text-center"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
                >
                  La connaissance de soi
                </h3>
                <p 
                  className="text-sm text-[#0A1D35] mb-2 text-center italic"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Révéler la nature profonde
                </p>
                <p 
                  className="text-xs md:text-sm text-[#0A1D35] mb-2 text-center leading-relaxed"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span className="font-semibold">Techniques :</span> MBTI, Ennéagramme, Process Com, Archétypes, dialogue pédagogique, gestion d'apprentissage
                </p>
                <p 
                  className="text-sm md:text-base text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Comprendre vos mécanismes, vos motivations et votre fonctionnement unique pour être aligné.
                </p>
                <Link 
                  href="/details#connaissance-de-soi"
                  className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#0A1D35] to-[#163554] hover:from-[#163554] hover:to-[#0A1D35] text-white font-semibold px-5 py-2.5 text-sm md:text-base rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  En savoir plus
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Harmonie corporelle Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-shadow flex flex-col">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-[#D9C9B4] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/acupunctures.jfif" 
                      alt="Harmonie corporelle" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold mb-1 text-[#0A1D35] text-center"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
                >
                  Harmonie corporelle
                </h3>
                <p 
                  className="text-xs text-[#0A1D35] mb-2 text-center italic"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Restaurer le flux énergétique
                </p>
                <p 
                  className="text-xs text-[#0A1D35] mb-2 text-center leading-relaxed"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span className="font-semibold">Techniques :</span> Acupuncture, shiatsu, tuina
                </p>
                <p 
                  className="text-xs md:text-sm text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Relancer l'énergie vitale, soulager les tensions physiques, améliorer le sommeil et le bien-être général.
                </p>
                <Link 
                  href="/details#harmonie-corporelle"
                  className="inline-flex items-center justify-center gap-1 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-4 py-2 text-xs md:text-sm rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
             <p 
              className="text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-4 mt-5 italic text-black"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              * <Link href="/entreprises" className="underline hover:text-[#6CAED6] transition-colors">Des offres sont également disponibles pour les entreprises</Link> sous forme de devis personnalisés.
            </p>
            {/* Redirection vers Blog */}
            <div className="flex justify-center mt-5">
              <Link 
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-6 py-3 text-base rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6CAED6]/30"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Découvrir nos articles
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Presentation Section */}
        <section 
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="fade-in-section py-8 px-4 bg-[#F2E8DC]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6">
              <div className="flex items-center justify-center mb-3">
                <Heart size={28} className="text-[#0A1D35]" />
              </div>
              <h2 
                className="text-xl md:text-2xl font-bold text-center mb-3 text-[#0A1D35]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
              >
                Mon parcours
              </h2>
              <div className="space-y-3">
                <div className="text-center">
                  <p 
                    className="text-sm md:text-base text-[#0A1D35] mb-2"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <span className="font-semibold">Depuis 3 ans</span>, je me consacre à l'accompagnement personnalisé vers le bien-être et l'équilibre de vie.
                  </p>
                  <p 
                    className="text-xs md:text-sm text-[#0A1D35] leading-relaxed max-w-3xl mx-auto"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Je vous propose une approche holistique combinant acupuncture, shiatsu et acupression pour vous aider à retrouver votre équilibre énergétique et à mieux gérer votre stress au quotidien.
                  </p>
                </div>
                {/* Redirection vers À propos */}
                <div className="flex justify-center mt-4 pt-3 border-t border-[#D9C9B4]">
                  <Link 
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A1D35] hover:bg-[#163554] text-[#F2E8DC] border-2 border-[#0A1D35] hover:border-[#163554] font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0A1D35]/30"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    En savoir plus sur moi
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section 
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="fade-in-section py-8 px-4 bg-[#0A1D35] text-[#F2E8DC]"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-3">
              <Sparkles size={20} className="text-[#6CAED6]" />
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
            >
              Votre bien-être est notre priorité
            </h2>
            <p 
              className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Nous vous accompagnons dans votre parcours vers l'équilibre et l'épanouissement personnel. 
              Nos méthodes douces et respectueuses vous aident à retrouver votre harmonie intérieure.
            </p>

            {/* Redirection vers Réservations */}
            <div className="flex justify-center">
              <Link 
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-6 py-3 text-base rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6CAED6]/30"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Réserver votre séance
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={(el) => { sectionsRef.current[3] = el; }}
          className="fade-in-section py-8 px-4 bg-[#F2E8DC]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6">
              <h2 
                className="text-xl md:text-2xl font-bold text-center mb-4 text-[#0A1D35]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
              >
                Contactez-nous
              </h2>
              
              <div className="space-y-3">
                {/* Horaires */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 p-3 bg-[#D0E7F5] rounded-xl">
                  <Clock size={20} className="text-[#0A1D35] flex-shrink-0" />
                  <div className="text-center md:text-left">
                    <h3 
                      className="text-base font-semibold mb-1 text-[#0A1D35]"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600 }}
                    >
                      Horaires
                    </h3>
                    <p 
                      className="text-sm text-[#0A1D35] mb-1"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      <strong>9h - 12h / 18h - 22h</strong>
                    </p>
                    <p 
                      className="text-xs text-[#0A1D35]"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      Lundi • Mardi • Jeudi • Dimanche
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 p-3 bg-[#6CAED6] rounded-xl">
                  <Phone size={20} className="text-white flex-shrink-0" />
                  <div className="text-center md:text-left">
                    <h3 
                      className="text-base font-semibold mb-1 text-white"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600 }}
                    >
                      Contact
                    </h3>
                    <p 
                      className="text-sm text-white mb-1"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      <strong>06 13 23 33 43</strong>
                    </p>
                    <p 
                      className="text-xs text-white/90"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      Seulement par téléphone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .fade-in-section {
          opacity: 0;
          transition: opacity 0.6s ease-out;
        }

        .fade-in-section.fade-in-visible {
          opacity: 1;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.4s both;
        }
      `}</style>
    </>
  );
}
