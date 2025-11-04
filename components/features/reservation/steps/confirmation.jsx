"use client";

import {
  Check,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  Video,
  MapPin,
  Download,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Confirmation({ bookingData }) {
  const [copied, setCopied] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rendez-vous confirmé",
          text: `Rendez-vous le ${formatDate(bookingData.date)} à ${bookingData.time}`,
        })
        .catch(() => {});
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    // Simulation de l'ajout au calendrier
    const event = {
      title: "Rendez-vous",
      description: bookingData.notes || "Rendez-vous",
      start: bookingData.date,
      duration: 15,
    };
    console.log("Ajout au calendrier:", event);
  };

  const getMeetingTypeLabel = () => {
    return bookingData.meetingType === "cabinet"
      ? "Au cabinet"
      : "Visioconférence";
  };

  const getMeetingTypeIcon = () => {
    return bookingData.meetingType === "cabinet" ? (
      <MapPin className="w-6 h-6 text-[#6caed6]" />
    ) : (
      <Video className="w-6 h-6 text-[#6caed6]" />
    );
  };

  const getMeetingTypeDescription = () => {
    return bookingData.meetingType === "cabinet"
      ? "Adresse : 123 Rue de la République, 75001 Paris"
      : "Le lien de connexion vous sera envoyé par email";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8 mt-5">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d0e7f5] rounded-full mb-4">
          <Check className="w-12 h-12 text-[#6caed6]" />
        </div>
        <h2 className="text-4xl font-bold text-[#0a1d35] mb-2">
          Réservation confirmée !
        </h2>
        <p className="text-lg text-gray-600">
          Votre rendez-vous a été enregistré avec succès
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white rounded-xl shadow-xl border border-[#d9c9b4] overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-[#0a1d35] px-6 py-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Détails du rendez-vous</h3>
          <p className="text-[#d0e7f5]">
            Un email de confirmation vous a été envoyé
          </p>
        </div>

        {/* Booking Information */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-[#6caed6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="text-lg font-semibold text-[#0a1d35]">
                {formatDate(bookingData.date)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#6caed6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Heure</p>
              <p className="text-lg font-semibold text-[#0a1d35]">
                {bookingData.time} (1 heure)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-[#6caed6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Participant</p>
              <p className="text-lg font-semibold text-[#0a1d35]">
                {bookingData.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#6caed6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-base font-medium text-[#0a1d35] break-all">
                {bookingData.email}
              </p>
            </div>
          </div>

          {bookingData.phone && (
            <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
              <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#6caed6]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="text-base font-medium text-[#0a1d35]">
                  {bookingData.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="w-12 h-12 bg-[#d0e7f5] rounded-lg flex items-center justify-center flex-shrink-0">
              {getMeetingTypeIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Type de rendez-vous</p>
              <p className="text-base font-medium text-[#0a1d35]">
                {getMeetingTypeLabel()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {getMeetingTypeDescription()}
              </p>
            </div>
          </div>

          {bookingData.notes && (
            <div className="p-4 bg-[#d0e7f5]/30 border border-[#6caed6]/30 rounded-lg">
              <p className="text-sm font-semibold text-[#0a1d35] mb-2">
                Notes :
              </p>
              <p className="text-sm text-gray-600">{bookingData.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-[#d0e7f5]/30 border border-[#6caed6]/30 rounded-lg p-6">
        <h4 className="font-semibold text-[#0a1d35] mb-3 flex items-center gap-2">
          <span className="text-lg">📧</span>
          Prochaines étapes
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#6caed6] mt-0.5">•</span>
            <span>
              Vous recevrez un email de confirmation à{" "}
              <strong>{bookingData.email}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6caed6] mt-0.5">•</span>
            <span>Un rappel vous sera envoyé 24h avant le rendez-vous</span>
          </li>
          {bookingData.meetingType === "visio" && (
            <li className="flex items-start gap-2">
              <span className="text-[#6caed6] mt-0.5">•</span>
              <span>
                Le lien de visioconférence sera disponible 15 minutes avant
                l&apos;heure prévue
              </span>
            </li>
          )}
          {bookingData.meetingType === "cabinet" && (
            <li className="flex items-start gap-2">
              <span className="text-[#6caed6] mt-0.5">•</span>
              <span>
                Pensez à vous présenter 5 minutes avant l&apos;heure prévue au
                cabinet
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Return to Homepage */}
      <div className="text-center mt-8 hover:underline text-sm">
        <Link href="/">← Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
