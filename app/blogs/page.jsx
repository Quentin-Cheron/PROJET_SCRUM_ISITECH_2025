"use client";

import React, { useState } from "react";

const SAMPLE_IMAGES = [
  {
    src: "/asset/instagram/acupuncture.png",
    title: "Séance d'acupuncture",
    description: "Retour sur une séance apaisante — techniques et bienfaits.",
    favorites: 128,
    time: "3h",
  },
  {
    src: "/asset/instagram/Bien.png",
    title: "Mieux-être",
    description: "Conseils pour améliorer son bien-être au quotidien.",
    favorites: 92,
    time: "2j",
  },
  {
    src: "/asset/instagram/coach.png",
    title: "Séance coaching",
    description: "Extraits d'une séance de coaching motivante.",
    favorites: 210,
    time: "1w",
  },
  {
    src: "/asset/instagram/etre.png",
    title: "Être présent",
    description: "Exercice de pleine conscience à pratiquer chaque matin.",
    favorites: 76,
    time: "3w",
  },
  {
    src: "/asset/instagram/seance.png",
    title: "Séance collective",
    description: "Ambiance et moments clés de la séance collective.",
    favorites: 54,
    time: "1m",
  },
  {
    src: "/asset/instagram/stress.png",
    title: "Gérer le stress",
    description: "Techniques rapides pour diminuer le stress en 5 minutes.",
    favorites: 140,
    time: "4m",
  },
];

export default function BlogsPage() {
  const [images] = useState(SAMPLE_IMAGES);
  const [preview, setPreview] = useState(null);

  return (
    <div style={{ minHeight: "100vh" }} className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-black">
            Dernier post Instagram
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Un aperçu des derniers posts. Clique sur le post pour y voir les
            détails.
          </p>
        </header>

        <section className="grid gap-4 grid-cols-2">
          {images.map((img, idx) => (
            <article
              key={idx}
              className="relative rounded-lg overflow-hidden bg-gray-100 shadow-sm"
              aria-label={`Image ${idx + 1}`}
            >
              <button
                onClick={() => setPreview({ ...img, idx })}
                className="block w-full h-48 sm:h-56 md:h-48 lg:h-56 focus:outline-none"
              >
                <img
                  src={img.src}
                  alt={img.title || `Post ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3 flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-semibold">{img.title}</div>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-95">
                  <span className="flex items-center gap-1">
                    ❤️ {img.favorites}
                  </span>
                  <span className="text-xs">• {img.time}</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {preview && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <div className="bg-white rounded-md overflow-hidden max-w-[95%] max-h-[95%] shadow-lg">
              <img
                src={preview.src}
                alt={preview.title || `Preview ${preview.idx + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="max-w-[70%]">
                  <div className="font-semibold">{preview.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {preview.description}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-muted-foreground">
                    ❤️ {preview.favorites} • {preview.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
