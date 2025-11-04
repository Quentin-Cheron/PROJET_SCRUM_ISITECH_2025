"use client";

import { useState } from "react";
import { Clock, ChevronLeft, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function TimeSelection({
  selectedDate,
  selectedTime,
  onTimeSelect,
  onNext,
  onBack,
  meetingType,
  onMeetingTypeChange,
}) {
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

  // Génération des créneaux horaires : 9h-12h et 18h-22h
  const generateTimeSlots = () => {
    const slots = [];

    // Matin : 9h - 12h
    for (let hour = 9; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(time);
      }
    }

    // Soir : 18h - 22h
    for (let hour = 18; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(time);
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Simuler des créneaux indisponibles
  const unavailableSlots = [];

  const isSlotAvailable = (time) => {
    return !unavailableSlots.includes(time);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSwitchChange = (checked) => {
    setHasVisitedBefore(checked);
    // Si le switch est activé et qu'aucun type n'est sélectionné, on met visio par défaut
    if (checked && !meetingType) {
      onMeetingTypeChange("visio");
    }
    // Si le switch est désactivé, on force la visio
    if (!checked) {
      onMeetingTypeChange("visio");
    }
  };

  const handleMeetingTypeChange = (type) => {
    onMeetingTypeChange(type);
  };

  // Organiser les créneaux par période de la journée
  const organizeSlotsByPeriod = () => {
    const morning = timeSlots.filter((time) => {
      const hour = parseInt(time.split(":")[0]);
      return hour >= 9 && hour < 12;
    });

    const evening = timeSlots.filter((time) => {
      const hour = parseInt(time.split(":")[0]);
      return hour >= 18 && hour < 22;
    });

    return { morning, evening };
  };

  const { morning, evening } = organizeSlotsByPeriod();

  const renderTimeSlots = (slots, title, icon) => {
    const availableSlots = slots.filter((time) => isSlotAvailable(time));

    if (availableSlots.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {slots.map((time) => {
            const available = isSlotAvailable(time);
            const isSelected = selectedTime === time;

            if (!available) return null;

            return (
              <Button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`
                  px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${isSelected && "shadow-lg scale-105"}
                `}
              >
                {time}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <Clock className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choisissez un horaire
        </h2>
        <p className="text-gray-600">{formatDate(selectedDate)}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        {/* Switch pour savoir si déjà venu */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between p-4 bg-[#f2e8dc]/30 rounded-lg border border-[#d9c9b4]">
            <div className="flex-1">
              <Label
                htmlFor="visited-before"
                className="text-sm font-semibold text-[#0a1d35] cursor-pointer"
              >
                Avez-vous déjà pris rendez-vous ici ?
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                Cela nous permet de vous proposer un rendez-vous en cabinet ou
                en visio
              </p>
            </div>
            <Switch
              id="visited-before"
              checked={hasVisitedBefore}
              onCheckedChange={handleSwitchChange}
              className="ml-4"
            />
          </div>

          {/* Options de type de rendez-vous si le switch est activé */}
          {hasVisitedBefore && (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Type de rendez-vous :
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleMeetingTypeChange("visio")}
                  className={`
                    flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                    ${
                      meetingType === "visio"
                        ? "border-[#6caed6] bg-[#d0e7f5]/30"
                        : "border-[#d9c9b4] hover:border-[#6caed6]/50"
                    }
                  `}
                >
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${meetingType === "visio" ? "bg-[#6caed6]" : "bg-[#d0e7f5]"}
                  `}
                  >
                    <Video
                      className={`w-5 h-5 ${meetingType === "visio" ? "text-white" : "text-[#6caed6]"}`}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0a1d35]">
                      Visioconférence
                    </p>
                    <p className="text-xs text-gray-500">En ligne</p>
                  </div>
                </button>

                <button
                  onClick={() => handleMeetingTypeChange("cabinet")}
                  className={`
                    flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                    ${
                      meetingType === "cabinet"
                        ? "border-[#6caed6] bg-[#d0e7f5]/30"
                        : "border-[#d9c9b4] hover:border-[#6caed6]/50"
                    }
                  `}
                >
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${meetingType === "cabinet" ? "bg-[#6caed6]" : "bg-[#d0e7f5]"}
                  `}
                  >
                    <MapPin
                      className={`w-5 h-5 ${meetingType === "cabinet" ? "text-white" : "text-[#6caed6]"}`}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0a1d35]">Au cabinet</p>
                    <p className="text-xs text-gray-500">Sur place</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Message si pas encore venu (visio par défaut) */}
          {!hasVisitedBefore && (
            <div className="mt-4 p-4 bg-[#d0e7f5]/30 border border-[#6caed6]/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#6caed6]" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Rendez-vous en visioconférence
                  </span>{" "}
                  - Pour votre première visite
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="max-h-[500px] overflow-y-auto pr-2">
          {renderTimeSlots(morning, "Matin (9h - 12h)")}
          {renderTimeSlots(evening, "Soir (18h - 22h)")}
        </div>

        {selectedTime && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
                Retour
              </Button>
              <div className="text-center flex-1">
                <p className="text-sm text-gray-500">Horaire sélectionné</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedTime}
                </p>
              </div>
              <Button
                onClick={onNext}
                className="px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Suivant
              </Button>
            </div>
          </div>
        )}

        {!selectedTime && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Retour
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
