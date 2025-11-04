"use client";

import { useState } from "react";
import {
  MessageSquare,
  ChevronLeft,
  UserCircle,
  Video,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon } from "lucide-react";

export default function UserInfo({
  selectedDate,
  selectedTime,
  meetingType = "visio",
  onSubmit,
  onBack,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
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

  const getMeetingTypeLabel = () => {
    return meetingType === "cabinet" ? "Au cabinet" : "Visioconférence";
  };

  const getMeetingTypeIcon = () => {
    return meetingType === "cabinet" ? (
      <MapPin className="w-5 h-5" />
    ) : (
      <Video className="w-5 h-5" />
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <UserCircle className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Vos informations
        </h2>
        <p className="text-gray-600">
          Dernière étape pour confirmer votre rendez-vous
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        {/* Récapitulatif de la réservation */}
        <div className="bg-[#f2e8dc]/30 border border-[#d9c9b4] rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-[#0a1d35] mb-2">
            Récapitulatif
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Date :</span>{" "}
              {formatDate(selectedDate)}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Heure :</span> {selectedTime}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Durée :</span> 1 heure
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="font-medium">Type :</span>
              <span className="flex items-center gap-1 text-[#6caed6]">
                {getMeetingTypeIcon()}
                {getMeetingTypeLabel()}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nom complet <span className="text-red-500">*</span>
            </Label>

            <InputGroup>
              <InputGroupInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`
                  text-gray-400
                `}
                placeholder="Jean Dupont"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Adresse email <span className="text-red-500">*</span>
            </Label>
            <InputGroup>
              <InputGroupInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`
                  text-gray-400
                `}
                placeholder="jean.dupont@example.com"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone{" "}
              <span className="text-gray-400 text-xs">(optionnel)</span>
            </Label>
            <InputGroup>
              <InputGroupInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`
                  text-gray-400
                  ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"}
                `}
                placeholder="+33 6 12 34 56 78"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <span className="text-xs">⚠️</span> {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes supplémentaires{" "}
              <span className="text-gray-400 text-xs">(optionnel)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="text-gray-400"
              placeholder="Ajoutez toute information utile pour votre rendez-vous..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Retour
            </Button>

            <Button
              type="submit"
              className="
                px-8 py-3 rounded-lg cursor-pointer
                font-semibold
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                shadow-lg hover:shadow-xl
              "
            >
              Confirmer la réservation
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center pt-2">
            En confirmant, vous acceptez de recevoir un email de confirmation
          </p>
        </form>
      </div>
    </div>
  );
}
