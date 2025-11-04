"use client";

import { useState } from "react";
import StepIndicator from "../../components/features/reservation/step-indicator";
import DateSelection from "../../components/features/reservation/steps/date-selection";
import TimeSelection from "../../components/features/reservation/steps/time-selection";
import UserInfo from "../../components/features/reservation/steps/user-info";
import Confirmation from "../../components/features/reservation/steps/confirmation";

export default function ReservationStepsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [meetingType, setMeetingType] = useState("visio"); // Par défaut en visio
  const [bookingData, setBookingData] = useState(null);

  const steps = [
    { label: "Date", component: "date" },
    { label: "Horaire", component: "time" },
    { label: "Informations", component: "info" },
    { label: "Confirmation", component: "confirmation" },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleMeetingTypeChange = (type) => {
    setMeetingType(type);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (formData) => {
    console.log("🔵 Données du formulaire reçues:", formData);
    console.log("🔵 Date sélectionnée (selectedDate):", selectedDate);
    console.log("🔵 Heure sélectionnée (selectedTime):", selectedTime);
    console.log("🔵 Type de rendez-vous:", meetingType);

    const fullBookingData = {
      ...formData,
      date: selectedDate,
      time: selectedTime,
      meetingType: meetingType,
    };

    console.log("🔵 fullBookingData avant sauvegarde:", fullBookingData);

    // Sauvegarder dans le localStorage
    try {
      // Récupérer les réservations existantes
      const existingBookings = localStorage.getItem("bookings");
      let bookings = existingBookings ? JSON.parse(existingBookings) : [];

      // Formater la date pour éviter les problèmes de fuseau horaire
      // On utilise le format YYYY-MM-DD au lieu de ISO pour garder la date locale
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      console.log("🟡 Date formatée pour sauvegarde:", formattedDate);

      // Créer un objet de réservation avec un ID unique et la date de création
      const bookingWithMetadata = {
        id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        notes: formData.notes || "",
        date: formattedDate, // Format YYYY-MM-DD
        time: selectedTime,
        meetingType: meetingType,
      };

      console.log("🟡 Réservation avec métadonnées:", bookingWithMetadata);

      // Ajouter la nouvelle réservation
      bookings.push(bookingWithMetadata);

      console.log("🟡 Toutes les réservations:", bookings);

      // Sauvegarder dans le localStorage
      localStorage.setItem("bookings", JSON.stringify(bookings));

      console.log("✅ Réservation sauvegardée dans le localStorage!");
      console.log(
        "✅ Vérification - localStorage.bookings:",
        JSON.parse(localStorage.getItem("bookings")),
      );

      // Pour l'affichage, on recrée un objet Date à partir de la date formatée
      const bookingForDisplay = {
        ...bookingWithMetadata,
        date: new Date(formattedDate + "T00:00:00"), // Ajouter le temps pour éviter les décalages
      };

      setBookingData(bookingForDisplay);
    } catch (error) {
      console.error(
        "❌ Erreur lors de la sauvegarde dans le localStorage:",
        error,
      );
      setBookingData(fullBookingData);
    }

    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateSelection
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <TimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            meetingType={meetingType}
            onMeetingTypeChange={handleMeetingTypeChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <UserInfo
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            meetingType={meetingType}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 4:
        return <Confirmation bookingData={bookingData} />;
      default:
        return null;
    }
  };

  const getMeetingTypeLabel = () => {
    return meetingType === "cabinet" ? "Au cabinet" : "Visioconférence";
  };

  return (
    <div className="min-h-screen bg-primary-foreground">
      {/* Header with event info - Only show before confirmation */}
      {currentStep < 4 && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rendez-vous avec Tahry Youcef
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Durée : 1 heure • {getMeetingTypeLabel()}
                </p>
              </div>
              {selectedDate && currentStep > 1 && (
                <div className="hidden md:block bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500">Date sélectionnée</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedDate.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {selectedTime && ` à ${selectedTime}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator - Only show before confirmation */}
      {currentStep < 4 && (
        <StepIndicator
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="transition-all duration-300 ease-in-out">
          {renderStep()}
        </div>
      </div>

      {/* Footer - Only show before confirmation */}
      {currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 md:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Retour
                </button>
              ) : (
                <div></div>
              )}
              <div className="text-sm text-gray-500">
                Étape {currentStep} / {steps.length - 1}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
