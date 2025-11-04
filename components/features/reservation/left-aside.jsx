import { Clock, Video, User } from "lucide-react";

export default function LeftAside() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Organisateur</p>
          <p className="font-medium text-gray-900">Tahry Youcef</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Rendez-vous</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">15 minutes</p>
            <p className="text-sm text-gray-500">Durée du rendez-vous</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Cal Video</p>
            <p className="text-sm text-gray-500">Visioconférence en ligne</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          À propos de cette réunion
        </h3>
        <p className="text-sm text-gray-600">
          Réservez un créneau pour discuter de votre projet. Vous recevrez un
          lien de visioconférence par email après confirmation.
        </p>
      </div>
    </div>
  );
}
