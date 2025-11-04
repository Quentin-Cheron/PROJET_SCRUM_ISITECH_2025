"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DateSelection({ selectedDate, onDateSelect, onNext }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek =
      firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateClick = (day) => {
    const selected = new Date(year, month, day);
    onDateSelect(selected);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const isPast = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(year, month, day);
    return date < today;
  };

  // Vérifier si le jour est disponible (Lundi = 1, Mardi = 2, Jeudi = 4, Dimanche = 0)
  const isAvailableDay = (day) => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0 = Dimanche, 1 = Lundi, 2 = Mardi, etc.
    // Jours disponibles : Lundi (1), Mardi (2), Jeudi (4), Dimanche (0)
    return (
      dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 0
    );
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-14"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isCurrentDay = isToday(day);
    const isSelectedDay = isSelected(day);
    const isPastDay = isPast(day);
    const isDayAvailable = isAvailableDay(day);
    const isDisabled = isPastDay || !isDayAvailable;

    days.push(
      <Button
        key={day}
        onClick={() => !isDisabled && handleDateClick(day)}
        disabled={isDisabled}
        className={`
          h-14 w-full rounded-lg flex items-center justify-center text-sm font-medium
          transition-all duration-200
          ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
          ${isSelectedDay ? "text-white shadow-lg scale-105" : ""}
          ${isCurrentDay && !isSelectedDay ? "border-2 border-primary" : ""}
          ${!isDayAvailable && !isPastDay ? "bg-gray-100 text-gray-400" : ""}
        `}
      >
        {day}
      </Button>,
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <CalendarIcon className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Sélectionnez une date
        </h2>
        <p className="text-gray-600">
          Choisissez un jour pour votre rendez-vous
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Disponibilités : Lundi, Mardi, Jeudi et Dimanche
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleNextMonth}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-xs font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">{days}</div>

        {selectedDate && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Date sélectionnée</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
      </div>
    </div>
  );
}
