"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Video, MapPin, Calendar, Clock, X } from "lucide-react";

export default function BookerWithModal({
  username = "cheron-quentin-jaw3bn",
  eventSlugVisio = "visio",
  eventSlugCabinet = "cabinet",
  layout = "month_view",
}) {
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const [isVisioModalOpen, setIsVisioModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);

  const handleVisioClick = () => {
    setIsVisioModalOpen(true);
  };

  const handleCabinetClick = () => {
    setIsCabinetModalOpen(true);
  };

  const getEmbedUrl = (eventSlug) => {
    const calLink = `https://cal.com/${username}/${eventSlug}`;
    return `${calLink}?embed=true&layout=${layout}&hide-branding=true`;
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#6caed6] to-[#4a9dc7] rounded-2xl mb-6 shadow-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a1d35] mb-4">
            Réserver votre rendez-vous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez le mode de consultation qui vous convient le mieux
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#d9c9b4]/50 overflow-hidden backdrop-blur-sm">
          {/* Switch Section with gradient background */}
          <div className="bg-gradient-to-r from-[#0a1d35] to-[#1a3d5f] p-8">
            <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex-1">
                <Label
                  htmlFor="visited-before"
                  className="text-lg font-bold text-white cursor-pointer flex items-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Avez-vous déjà consulté ici ?
                </Label>
                <p className="text-sm text-[#d0e7f5] mt-2">
                  Selon votre réponse, nous vous proposerons les options
                  adaptées
                </p>
              </div>
              <Switch
                id="visited-before"
                checked={hasVisitedBefore}
                onCheckedChange={setHasVisitedBefore}
                className="ml-6 scale-125"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Message par défaut - Première visite */}
            {!hasVisitedBefore && (
              <div className="space-y-6">
                <div className="relative overflow-hidden p-6 bg-gradient-to-br from-[#d0e7f5] to-[#6caed6]/20 rounded-2xl border-2 border-[#6caed6]/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#6caed6]/10 rounded-full -mr-16 -mt-16" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Video className="w-6 h-6 text-[#6caed6]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#0a1d35] mb-2">
                        Première consultation en visioconférence
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Pour votre première visite, nous vous proposons un
                        rendez-vous en ligne. C&apos;est pratique, rapide et
                        vous pouvez consulter depuis chez vous.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleVisioClick}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-[#6caed6] to-[#5a9dc5] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5a9dc5] to-[#4a8db5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-between p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Video className="w-8 h-8" />
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold mb-1">
                          Réserver en Visioconférence
                        </p>
                        <p className="text-white/90 text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Durée : 1 heure • En ligne
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block text-4xl group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Options pour les clients récurrents */}
            {hasVisitedBefore && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#0a1d35] mb-2">
                    Choisissez votre mode de consultation
                  </h3>
                  <p className="text-gray-600">
                    Sélectionnez l&apos;option qui vous convient le mieux
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Card Visio */}
                  <button
                    onClick={handleVisioClick}
                    className="group relative overflow-hidden bg-gradient-to-br from-white to-[#d0e7f5]/20 border-2 border-[#d9c9b4] rounded-2xl hover:border-[#6caed6] transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#6caed6]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#6caed6] to-[#5a9dc5] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Video className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-[#0a1d35] mb-2">
                          Visioconférence
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Consultez depuis chez vous
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d0e7f5] rounded-full text-sm font-medium text-[#0a1d35]">
                          <Clock className="w-4 h-4" />1 heure • En ligne
                        </div>
                      </div>
                      <div className="pt-4 text-[#6caed6] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Réserver →
                      </div>
                    </div>
                  </button>

                  {/* Card Cabinet */}
                  <button
                    onClick={handleCabinetClick}
                    className="group relative overflow-hidden bg-gradient-to-br from-white to-[#f2e8dc]/30 border-2 border-[#d9c9b4] rounded-2xl hover:border-[#6caed6] transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#6caed6]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#0a1d35] to-[#1a3d5f] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <MapPin className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-[#0a1d35] mb-2">
                          Au Cabinet
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Consultation sur place
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2e8dc] rounded-full text-sm font-medium text-[#0a1d35]">
                          <Clock className="w-4 h-4" />1 heure • Présentiel
                        </div>
                      </div>
                      <div className="pt-4 text-[#6caed6] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Réserver →
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Vous recevrez un email de confirmation après votre réservation
          </p>
        </div>
      </div>

      {/* Modal Visio */}
      <Dialog open={isVisioModalOpen} onOpenChange={setIsVisioModalOpen}>
        <DialogContent className="!max-w-6xl max-h-[95vh] p-0 overflow-hidden border-2 border-[#6caed6]/30 bg-gray-50">
          <div className="bg-gradient-to-r from-[#6caed6] to-[#5a9dc5] p-6">
            <div className="flex items-center justify-between">
              <DialogHeader className="flex-1">
                <DialogTitle className="flex items-center gap-3 text-2xl text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  Rendez-vous en Visioconférence
                </DialogTitle>
                <DialogDescription className="text-white/80 text-base mt-2">
                  Sélectionnez votre créneau pour une consultation en ligne
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
          <div className="w-full h-[700px] overflow-y-auto p-6 bg-gray-50">
            <iframe
              src={getEmbedUrl(eventSlugVisio)}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full min-h-[700px] rounded-xl shadow-lg bg-white"
              title="Calendrier de réservation - Visioconférence"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Cabinet */}
      <Dialog
        open={isCabinetModalOpen}
        onOpenChange={setIsCabinetModalOpen}
        className="!bg-red-500"
      >
        <DialogContent className="!max-w-6xl max-h-[95vh] p-0 overflow-hidden border-2 border-[#0a1d35]/30 bg-gray-50">
          <div className="bg-gradient-to-r from-[#0a1d35] to-[#1a3d5f] p-6">
            <div className="flex items-center justify-between">
              <DialogHeader className="flex-1">
                <DialogTitle className="flex items-center gap-3 text-2xl text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  Rendez-vous au Cabinet
                </DialogTitle>
                <DialogDescription className="text-white/80 text-base mt-2">
                  Sélectionnez votre créneau pour une consultation sur place
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
          <div className="w-full h-[700px] overflow-y-auto p-6 bg-gray-50">
            <iframe
              src={getEmbedUrl(eventSlugCabinet)}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full min-h-[700px] rounded-xl shadow-lg bg-white"
              title="Calendrier de réservation - Cabinet"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
