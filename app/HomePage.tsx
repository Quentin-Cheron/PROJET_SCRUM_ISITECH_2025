"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, User, Sparkles, Building2, CreditCard, Phone, Clock, Heart, Download, Book, Shield, Users, Leaf, Award, Target, Zap } from "lucide-react";
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
              <img src="/LogoNavbar.svg" alt="Logo SYNÉGO" className="w-auto h-32 md:h-40 object-contain" />
            </div>

            {/* Slogan */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0A1D35] animate-slide-up" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
              Être enfin soi,
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0A1D35] mb-8 animate-slide-up-delay" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
              Mes approches
            </h2>
            <p className="text-sm md:text-base text-center mb-6 text-[#0A1D35] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              Découvre mes méthodes pour ton bien-être et ton équilibre
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {/* Equilibre émotionnel Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-shadow flex flex-col">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-[#6CAED6] flex items-center justify-center overflow-hidden">
                    <img src="/relaxations.jfif" alt="Equilibre émotionnel" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1 text-[#0A1D35] text-center" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Équilibre émotionnel
                </h3>
                <p className="text-xs text-[#0A1D35] mb-2 text-center italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Apaiser l'esprit et l'émotionnel
                </p>
                <p className="text-xs text-[#0A1D35] mb-2 text-center leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  <span className="font-semibold">Techniques :</span> Hypnothérapie, sophrologie, EFT, dialogue intérieur
                </p>
                <p className="text-xs md:text-sm text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Libérer les blocages, gérer le stress et l'anxiété, retrouver la sérénité et la clarté mentale.
                </p>
                <Link href="/details/equilibre" className="inline-flex items-center justify-center gap-1 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-4 py-2 text-xs md:text-sm rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Connaissance de soi Card - Premium */}
              <div className="relative bg-gradient-to-br from-[#D0E7F5] via-white to-[#F2E8DC] rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#6CAED6] flex flex-col transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] flex items-center justify-center overflow-hidden ring-4 ring-[#6CAED6]/30">
                    <img src="/bien-etre.jfif" alt="Connaissance de soi" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-[#0A1D35] text-center" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  La connaissance de soi
                </h3>
                <p className="text-sm text-[#0A1D35] mb-2 text-center italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Révéler ta nature profonde
                </p>
                <p className="text-xs md:text-sm text-[#0A1D35] mb-2 text-center leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  <span className="font-semibold">Techniques :</span> MBTI, Ennéagramme, Process Com, Archétypes, dialogue pédagogique, gestion d'apprentissage
                </p>
                <p className="text-sm md:text-base text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Comprendre tes mécanismes, tes motivations et ton fonctionnement unique pour être aligné.
                </p>
                <Link href="/details/connaissance" className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#0A1D35] to-[#163554] hover:from-[#163554] hover:to-[#0A1D35] text-white font-semibold px-5 py-2.5 text-sm md:text-base rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  En savoir plus
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Harmonie corporelle Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-shadow flex flex-col">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-[#D9C9B4] flex items-center justify-center overflow-hidden">
                    <img src="/acupunctures.jfif" alt="Harmonie corporelle" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1 text-[#0A1D35] text-center" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Harmonie corporelle
                </h3>
                <p className="text-xs text-[#0A1D35] mb-2 text-center italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Restaurer le flux énergétique et ton bien-être
                </p>
                <p className="text-xs text-[#0A1D35] mb-2 text-center leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  <span className="font-semibold">Techniques :</span> Acupuncture, shiatsu, tuina
                </p>
                <p className="text-xs md:text-sm text-[#0A1D35] leading-relaxed text-center mb-4 flex-grow" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Relancer l'énergie vitale, soulager les tensions physiques, améliorer ton sommeil et ton bien-être général.
                </p>
                <Link href="/details/harmonie" className="inline-flex items-center justify-center gap-1 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-4 py-2 text-xs md:text-sm rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <p className="text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-4 mt-5 italic text-black" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              *{" "}
              <Link href="/entreprises" className="underline hover:text-[#6CAED6] transition-colors">
                Des offres sont également disponibles pour les entreprises
              </Link>{" "}
              sous forme de devis personnalisés.
            </p>
            {/* Redirection vers Blog */}
            <div className="flex justify-center mt-5">
              <Link href="/blogs" className="inline-flex items-center justify-center gap-2 bg-[#6CAED6] hover:bg-[#5a9bc4] text-[#0A1D35] font-semibold px-6 py-3 text-base rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6CAED6]/30" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Découvrir nos derniers posts
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Livre Blanc Section */}
        <section 
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="fade-in-section py-12 px-4 bg-gradient-to-br from-[#0A1D35] via-[#163554] to-[#0A1D35] relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-[#6CAED6]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D0E7F5]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#6CAED6]/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon and Visual Element */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#6CAED6] to-[#0A1D35] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                      <Book className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#6CAED6] rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block mb-3">
                    <span className="px-4 py-1 bg-[#6CAED6]/20 text-[#0A1D35] text-xs md:text-sm font-semibold rounded-full" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                      📚 Ressource Gratuite
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                    Libère-toi de la dépendance affective
                  </h2>
                  <p className="text-base md:text-lg text-[#0A1D35] mb-2 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    <span className="font-semibold">Télécharge gratuitement</span> mon livre blanc complet sur la dépendance affective.
                  </p>
                  <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Découvre les clés pour comprendre, identifier et transformer tes relations affectives. Un guide pratique pour retrouver ton autonomie émotionnelle et construire des liens sains et épanouissants.
                  </p>
                  
                  {/* CTA Button */}
                  <Link 
                    href="/ressource" 
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#6CAED6] to-[#5a9bc4] hover:from-[#5a9bc4] hover:to-[#4a8db5] text-white font-bold px-8 py-4 text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    <Download className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                    Télécharger le livre blanc gratuitement
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                  
                  <p className="text-xs text-gray-500 mt-4 italic" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    ✨ Format PDF • Livraison instantanée • 100% gratuit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Section */}
        <section
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="fade-in-section py-16 px-4 bg-gradient-to-br from-[#F2E8DC] via-white to-[#D0E7F5] relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#6CAED6]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D9C9B4]/15 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0A1D35] to-[#6CAED6] rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#6CAED6] rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Mon parcours
              </h2>
              <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-[#0A1D35] mb-2" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                <span className="font-semibold text-[#6CAED6]">Depuis 3 ans</span>, je me consacre à l'accompagnement personnalisé vers le bien-être et l'équilibre de vie.
              </p>
              <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed text-gray-700" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Je vous propose une approche holistique combinant acupuncture, shiatsu et acupression pour vous aider à retrouver votre équilibre énergétique et à mieux gérer votre stress au quotidien.
              </p>
            </div>

            {/* Stats/Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Stat 1 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#0A1D35]/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A1D35] to-[#163554] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  3 ans
                </div>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  d'expérience dans l'accompagnement personnalisé
                </p>
              </div>

              {/* Stat 2 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#0A1D35]/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Target className="w-8 h-8 text-[#0A1D35]" />
                </div>
                <div className="text-3xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Holistique
                </div>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Approche globale du corps et de l'esprit
                </p>
              </div>

              {/* Stat 3 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#0A1D35]/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D9C9B4] to-[#F2E8DC] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-[#0A1D35]" />
                </div>
                <div className="text-3xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Équilibre
                </div>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Techniques douces pour retrouver ton harmonie
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-[#0A1D35]/20">
                <p className="text-lg font-semibold mb-6 text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Découvre mon histoire et mon approche en détail
                </p>
                <Link 
                  href="/about" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0A1D35] to-[#163554] hover:from-[#163554] hover:to-[#0A1D35] text-white font-bold px-8 py-4 text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  <User className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
                  En savoir plus sur moi
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="fade-in-section py-16 px-4 bg-gradient-to-br from-[#F2E8DC] via-[#D0E7F5] to-[#F2E8DC] relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#6CAED6]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#D9C9B4]/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#6CAED6] to-[#0A1D35] rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#6CAED6] rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                Ton bien-être est ma priorité
              </h2>
              <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Je t'accompagne dans ton parcours vers l'équilibre et l'épanouissement personnel. Mes méthodes douces et respectueuses t'aident à retrouver ton harmonie intérieure.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Feature 1 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#6CAED6]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-[#0A1D35]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Approche personnalisée
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Chaque accompagnement est adapté à tes besoins spécifiques et à ton rythme unique.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#6CAED6]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A1D35] to-[#163554] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Méthodes douces
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Des techniques respectueuses de ton corps et de ton esprit, sans jugement ni pression.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-[#6CAED6]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D9C9B4] to-[#F2E8DC] rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-[#0A1D35]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0A1D35]" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700 }}>
                  Harmonie durable
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Un accompagnement qui vise un équilibre profond et durable dans tous les aspects de ta vie.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-[#6CAED6]/20">
                <p className="text-lg font-semibold mb-6 text-[#0A1D35]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  Prêt(e) à commencer ton parcours vers le bien-être ?
                </p>
                <Link 
                  href="/reservation" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#6CAED6] to-[#5a9bc4] hover:from-[#5a9bc4] hover:to-[#4a8db5] text-white font-bold px-8 py-4 text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
                  Réserver ta séance maintenant
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
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
