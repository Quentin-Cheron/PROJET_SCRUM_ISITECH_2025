"use client";

import {
  Building2,
  CheckCircle,
  FileText,
  Mail,
  Phone,
  Target,
  Users,
} from "lucide-react";

export default function EntreprisesPage() {
  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1D35] to-[#163554] text-[#F2E8DC] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Building2 size={36} className="text-[#6CAED6]" />
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 700,
                }}
              >
                Solutions pour entreprises
              </h1>
              <p
                className="text-base md:text-lg mt-2 text-[#D0E7F5]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Bien-être et développement professionnel sur mesure
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <p
            className="text-base md:text-lg text-[#0A1D35] leading-relaxed text-center"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Investissez dans le bien-être et le développement de vos équipes
            avec nos solutions personnalisées. Nous proposons des interventions
            sur mesure adaptées à vos besoins spécifiques et à votre culture
            d'entreprise.
          </p>
        </section>

        {/* Comment ça fonctionne */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0A1D35]"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
            }}
          >
            Comment ça fonctionne ?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D35]">1</span>
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-[#0A1D35]"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Prise de contact
              </h3>
              <p
                className="text-sm text-[#0A1D35]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Contactez-nous pour discuter de vos besoins et objectifs
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D35]">2</span>
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-[#0A1D35]"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Analyse & proposition
              </h3>
              <p
                className="text-sm text-[#0A1D35]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Nous analysons votre situation et élaborons une proposition
                personnalisée
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D35]">3</span>
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-[#0A1D35]"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Devis personnalisé
              </h3>
              <p
                className="text-sm text-[#0A1D35]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Réception d'un devis détaillé avec les modalités et tarifs
              </p>
            </div>

            {/* Étape 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6CAED6] to-[#D0E7F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D35]">4</span>
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-[#0A1D35]"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Intervention
              </h3>
              <p
                className="text-sm text-[#0A1D35]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Mise en place et suivi de l'accompagnement de vos équipes
              </p>
            </div>
          </div>
        </section>

        {/* Services proposés */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0A1D35]"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
            }}
          >
            Services proposés
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ateliers collectifs */}
            <div className="bg-gradient-to-br from-[#D0E7F5] to-[#F2E8DC] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users size={28} className="text-[#0A1D35]" />
                <h3
                  className="text-xl font-bold text-[#0A1D35]"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Ateliers collectifs
                </h3>
              </div>
              <p
                className="text-sm text-[#0A1D35] mb-4"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Sessions de groupe pour la gestion du stress, le bien-être au
                travail et le développement personnel.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Gestion du stress et des émotions
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Sophrologie et relaxation
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Communication et cohésion d'équipe
                  </span>
                </li>
              </ul>
            </div>

            {/* Accompagnement individuel */}
            <div className="bg-gradient-to-br from-[#D0E7F5] to-[#F2E8DC] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target size={28} className="text-[#0A1D35]" />
                <h3
                  className="text-xl font-bold text-[#0A1D35]"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Accompagnement individuel
                </h3>
              </div>
              <p
                className="text-sm text-[#0A1D35] mb-4"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Séances personnalisées pour vos collaborateurs : coaching,
                développement personnel et équilibre de vie.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Coaching professionnel
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Connaissance de soi (MBTI, Ennéagramme)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Hypnothérapie et sophrologie
                  </span>
                </li>
              </ul>
            </div>

            {/* Formations */}
            <div className="bg-gradient-to-br from-[#D0E7F5] to-[#F2E8DC] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={28} className="text-[#0A1D35]" />
                <h3
                  className="text-xl font-bold text-[#0A1D35]"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Formations
                </h3>
              </div>
              <p
                className="text-sm text-[#0A1D35] mb-4"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Modules de formation sur le bien-être, la gestion du stress et
                le développement des compétences relationnelles.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Gestion du stress et résilience
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Communication interpersonnelle
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Équilibre vie professionnelle / personnelle
                  </span>
                </li>
              </ul>
            </div>

            {/* Programmes sur mesure */}
            <div className="bg-gradient-to-br from-[#D0E7F5] to-[#F2E8DC] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={28} className="text-[#0A1D35]" />
                <h3
                  className="text-xl font-bold text-[#0A1D35]"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Programmes sur mesure
                </h3>
              </div>
              <p
                className="text-sm text-[#0A1D35] mb-4"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Solutions complètes adaptées à vos enjeux spécifiques : qualité
                de vie au travail, prévention des risques psycho-sociaux.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Programmes QVT (Qualité de Vie au Travail)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Prévention des RPS
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#0A1D35]">
                  <CheckCircle
                    size={16}
                    className="text-[#6CAED6] mt-0.5 flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Accompagnement au changement
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="bg-gradient-to-br from-[#0A1D35] to-[#163554] rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-[#F2E8DC]">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-6"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
            }}
          >
            Pourquoi choisir nos services ?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6CAED6] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Expertise certifiée
              </h3>
              <p
                className="text-sm text-[#D0E7F5]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                3 ans d'expérience en accompagnement individuel et collectif
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#6CAED6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Approche personnalisée
              </h3>
              <p
                className="text-sm text-[#D0E7F5]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Solutions adaptées à votre secteur d'activité et à vos enjeux
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#6CAED6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                }}
              >
                Impact mesurable
              </h3>
              <p
                className="text-sm text-[#D0E7F5]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Amélioration du bien-être, de la productivité et de la cohésion
                d'équipe
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0A1D35]"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
            }}
          >
            Demandez votre devis
          </h2>

          <div className="max-w-2xl mx-auto">
            <p
              className="text-base md:text-lg text-center text-[#0A1D35] mb-6"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Contactez-nous pour discuter de vos besoins et recevoir un devis
              personnalisé. Nous vous répondrons dans les plus brefs délais.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#D0E7F5] rounded-xl p-4 text-center">
                <Phone size={24} className="text-[#0A1D35] mx-auto mb-2" />
                <h3
                  className="font-semibold text-[#0A1D35] mb-1"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Téléphone
                </h3>
                <a
                  href="tel:0613233343"
                  className="text-sm text-[#0A1D35] hover:text-[#6CAED6] transition-colors"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  06 13 23 33 43
                </a>
              </div>

              <div className="bg-[#D0E7F5] rounded-xl p-4 text-center">
                <Mail size={24} className="text-[#0A1D35] mx-auto mb-2" />
                <h3
                  className="font-semibold text-[#0A1D35] mb-1"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Email
                </h3>
                <a
                  href="mailto:contact@synego.fr"
                  className="text-sm text-[#0A1D35] hover:text-[#6CAED6] transition-colors break-all"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  contact@synego.fr
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#6CAED6] to-[#D0E7F5] rounded-xl p-6 text-center">
              <p
                className="text-[#0A1D35] mb-4 font-semibold"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Horaires de contact
              </p>
              <p
                className="text-sm text-[#0A1D35] mb-2"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                <strong>9h - 12h / 18h - 22h</strong>
              </p>
              <p
                className="text-xs text-[#0A1D35]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Lundi • Mardi • Jeudi • Dimanche
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
