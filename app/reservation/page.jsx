"use client";

import { useState } from "react";
import StepIndicator from "../../components/features/reservation/step-indicator";
import DateSelection from "../../components/features/reservation/steps/date-selection";
import TimeSelection from "../../components/features/reservation/steps/time-selection";
import UserInfo from "../../components/features/reservation/steps/user-info";
import Confirmation from "../../components/features/reservation/steps/confirmation";

export default function ReservationPage() {
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
    const fullBookingData = {
      ...formData,
      date: selectedDate,
      time: selectedTime,
      meetingType: meetingType,
    };
    setBookingData(fullBookingData);
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
                  Rendez-vous avec Tahri Youcef
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
