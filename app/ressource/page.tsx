"use client";

import React, { useState } from "react";

export default function ressourcePage() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "" });
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isValid =
    form.prenom.trim().length > 0 &&
    form.nom.trim().length > 0 &&
    validateEmail(form.email);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  async function downloadPdf(path = "/asset/livret-blanc.pdf", filename = "livret_blanc.pdf") {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("PDF non trouvé");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      return false;
    }
  }  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ prenom: true, nom: true, email: true });
    setError(null);
    if (!isValid) return;
    setSubmitting(true);

    // Téléchargement du PDF
    const ok = await downloadPdf("/asset/livret-blanc.pdf", "livret_blanc.pdf");

    setSubmitting(false);

    if (ok) {
      setDownloaded(true);
      // optionnel : stocker l'objet complet aussi sous une clé globale si besoin
      try {
        // ex : liste de tous les emails enregistrés
        const listKey = "livret_dependance_list";
        const listRaw = localStorage.getItem(listKey);
        const list: string[] = listRaw ? JSON.parse(listRaw) : [];
        if (!list.includes(form.email.toLowerCase())) {
          list.push(form.email.toLowerCase());
          localStorage.setItem(listKey, JSON.stringify(list));
        }
      } catch {}
    } else {
      setError("Le téléchargement a échoué. Tu peux réessayer ou ouvrir le livret dans un nouvel onglet.");
    }
  }

  return (
    <div className="bg-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Ressources</h1>
          <p className="text-sm text-muted-foreground">
            Bienvenue sur la page des ressources. Ici, tu pourras trouver diverses ressources utiles.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md" noValidate>
          <h2 className="text-xl font-semibold mb-2">Dépendance affective — reprendre le contrôle</h2>

          <p className="mb-4 text-sm text-muted-foreground">
            La dépendance affective peut t'empêcher de vivre sereinement tes relations : anxiété constante, peur de
            l'abandon, perte d'estime de soi. Notre livret blanc explique simplement comment reconnaître les mécanismes,
            poser des limites saines et retrouver autonomie émotionnelle.
          </p>

          <ul className="list-disc pl-5 mb-4 text-sm">
            <li>Comprendre les causes et signaux d'alerte</li>
            <li>Exercices pratiques pour renforcer l'estime de soi</li>
            <li>Un plan d'action concret en plusieurs étapes</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="prenom">
                Prénom
              </label>
              <input
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ton prénom"
                required
              />
              {touched.prenom && form.prenom.trim() === "" && (
                <p className="text-xs text-red-500 mt-1">Le prénom est requis.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="nom">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ton nom"
                required
              />
              {touched.nom && form.nom.trim() === "" && (
                <p className="text-xs text-red-500 mt-1">Le nom est requis.</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="exemple@domaine.com"
              required
            />
            {touched.email && !validateEmail(form.email) && (
              <p className="text-xs text-red-500 mt-1">Merci de saisir une adresse email valide.</p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6 justify-center">
            <button
              type="submit"
              disabled={!isValid || submitting}
              className={`inline-block bg-[#6CAED6] text-white font-semibold px-4 py-2 rounded-md shadow transition ${
                !isValid || submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5a9bc4]"
              }`}
              aria-disabled={!isValid || submitting}
            >
              {submitting ? "Envoi..." : "Je veux le livret blanc — gratuit"}
            </button>

          </div>

          {/* Message de succès / erreur */}
          <div className="mt-6">
            {downloaded && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center justify-between">
                <div>
                  <strong>Téléchargement terminé :</strong> Le document a bien été téléchargé. Vérifie ton dossier de téléchargements.
                </div>
                <button
                  onClick={() => setDownloaded(false)}
                  className="ml-4 text-sm px-3 py-1 bg-green-100 rounded-md hover:bg-green-200"
                >
                  Fermer
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}