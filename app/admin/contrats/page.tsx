"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Loader2 } from "lucide-react";

import { COMPANY_CONSTANTS } from "@/lib/contract-constants";

// Constantes de l'entreprise
const COMPANY_NAME = COMPANY_CONSTANTS.name;
const COMPANY_SIREN = COMPANY_CONSTANTS.siren;

interface ContractFormData {
  // Informations du prestataire (remplis automatiquement si besoin)
  prestataireNom: string;
  prestataireAdresse: string;
  prestataireEmail: string;
  prestataireTelephone: string;

  // Informations du bénéficiaire
  beneficiaireNom: string;
  beneficiaireAdresse: string;
  beneficiaireEmail: string;
  beneficiaireTelephone: string;

  // Informations du contrat
  dateSignature: string;
  lieuSignature: string;
  dateDebut: string;
  dateFin: string;

  // Détails de la prestation
  typePrestation: string;
  descriptionPrestation: string;
  nombreSeances: string;
  dureeSeance: string;
  prixUnitaire: string;
  prixTotal: string;

  // Conditions particulières
  conditionsParticulieres: string;

  // Lien Qonto
  lienQonto: string;
}

export default function ContratsPage() {
  const [formData, setFormData] = useState<ContractFormData>({
    prestataireNom: COMPANY_NAME,
    prestataireAdresse: COMPANY_CONSTANTS.address,
    prestataireEmail: COMPANY_CONSTANTS.email,
    prestataireTelephone: COMPANY_CONSTANTS.phone,
    beneficiaireNom: "",
    beneficiaireAdresse: "",
    beneficiaireEmail: "",
    beneficiaireTelephone: "",
    dateSignature: new Date().toISOString().split("T")[0],
    lieuSignature: "",
    dateDebut: "",
    dateFin: "",
    typePrestation: "",
    descriptionPrestation: "",
    nombreSeances: "",
    dureeSeance: "",
    prixUnitaire: "",
    prixTotal: "",
    conditionsParticulieres: "",
    lienQonto: COMPANY_CONSTANTS.lienQonto,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ContractFormData, value: string) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      // Calcul automatique du prix total si nombreSeances et prixUnitaire sont remplis
      if (field === "nombreSeances" || field === "prixUnitaire") {
        if (updated.nombreSeances && updated.prixUnitaire) {
          const total =
            parseFloat(updated.nombreSeances) *
            parseFloat(updated.prixUnitaire);
          if (!isNaN(total)) {
            updated.prixTotal = total.toFixed(2);
          }
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      // Préparer les données avec les constantes
      const contractData = {
        ...formData,
        entrepriseNom: COMPANY_NAME,
        entrepriseSiren: COMPANY_SIREN,
      };

      // Appeler l'API pour générer le contrat
      const response = await fetch("/api/generate-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la génération du contrat",
        );
      }

      // Télécharger le fichier
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Contrat_${formData.beneficiaireNom || "Prestation"}_${new Date().toISOString().split("T")[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-secondary">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">
          Génération de contrat de prestation
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations du prestataire */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">
            Informations du prestataire (SYNEGO)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="prestataireNom">Nom de l'entreprise</Label>
              <Input
                id="prestataireNom"
                value={formData.prestataireNom}
                onChange={(e) => handleChange("prestataireNom", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prestataireAdresse">Adresse</Label>
              <Input
                id="prestataireAdresse"
                value={formData.prestataireAdresse}
                onChange={(e) =>
                  handleChange("prestataireAdresse", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prestataireEmail">Email</Label>
              <Input
                id="prestataireEmail"
                type="email"
                value={formData.prestataireEmail}
                onChange={(e) =>
                  handleChange("prestataireEmail", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prestataireTelephone">Téléphone</Label>
              <Input
                id="prestataireTelephone"
                value={formData.prestataireTelephone}
                onChange={(e) =>
                  handleChange("prestataireTelephone", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Informations du bénéficiaire */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">
            Informations du bénéficiaire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="beneficiaireNom">Nom complet</Label>
              <Input
                id="beneficiaireNom"
                value={formData.beneficiaireNom}
                onChange={(e) =>
                  handleChange("beneficiaireNom", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiaireAdresse">Adresse</Label>
              <Input
                id="beneficiaireAdresse"
                value={formData.beneficiaireAdresse}
                onChange={(e) =>
                  handleChange("beneficiaireAdresse", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiaireEmail">Email</Label>
              <Input
                id="beneficiaireEmail"
                type="email"
                value={formData.beneficiaireEmail}
                onChange={(e) =>
                  handleChange("beneficiaireEmail", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiaireTelephone">Téléphone</Label>
              <Input
                id="beneficiaireTelephone"
                value={formData.beneficiaireTelephone}
                onChange={(e) =>
                  handleChange("beneficiaireTelephone", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Informations du contrat */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">
            Informations du contrat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateSignature">Date de signature</Label>
              <Input
                id="dateSignature"
                type="date"
                value={formData.dateSignature}
                onChange={(e) => handleChange("dateSignature", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lieuSignature">Lieu de signature</Label>
              <Input
                id="lieuSignature"
                value={formData.lieuSignature}
                onChange={(e) => handleChange("lieuSignature", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input
                id="dateDebut"
                type="date"
                value={formData.dateDebut}
                onChange={(e) => handleChange("dateDebut", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFin">Date de fin</Label>
              <Input
                id="dateFin"
                type="date"
                value={formData.dateFin}
                onChange={(e) => handleChange("dateFin", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Détails de la prestation */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">
            Détails de la prestation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="typePrestation">Type de prestation</Label>
              <Input
                id="typePrestation"
                value={formData.typePrestation}
                onChange={(e) => handleChange("typePrestation", e.target.value)}
                placeholder="Ex: Accompagnement bien-être, Séances d'acupuncture..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombreSeances">Nombre de séances</Label>
              <Input
                id="nombreSeances"
                type="number"
                min="1"
                max="100"
                value={formData.nombreSeances}
                onChange={(e) => handleChange("nombreSeances", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dureeSeance">
                Durée d'une séance (en minutes)
              </Label>
              <Input
                id="dureeSeance"
                type="number"
                min="1"
                max="120"
                value={formData.dureeSeance}
                onChange={(e) => handleChange("dureeSeance", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prixUnitaire">Prix unitaire (€)</Label>
              <Input
                id="prixUnitaire"
                type="number"
                step="0.01"
                min="0"
                value={formData.prixUnitaire}
                onChange={(e) => handleChange("prixUnitaire", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prixTotal">Prix total HT (€)</Label>
              <Input
                id="prixTotal"
                type="number"
                step="0.01"
                min="0"
                value={formData.prixTotal}
                onChange={(e) => handleChange("prixTotal", e.target.value)}
                required
              />
              {formData.nombreSeances && formData.prixUnitaire && (
                <p className="text-xs text-gray-500 mt-1">
                  Calcul automatique: {formData.nombreSeances} ×{" "}
                  {formData.prixUnitaire} € ={" "}
                  {formData.prixTotal ||
                    (
                      parseFloat(formData.nombreSeances) *
                      parseFloat(formData.prixUnitaire)
                    ).toFixed(2)}{" "}
                  €
                </p>
              )}
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="descriptionPrestation">
                Description détaillée de la prestation
              </Label>
              <Textarea
                id="descriptionPrestation"
                value={formData.descriptionPrestation}
                onChange={(e) =>
                  handleChange("descriptionPrestation", e.target.value)
                }
                rows={4}
                required
              />
            </div>
          </div>
        </div>

        {/* Conditions particulières */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">
            Conditions particulières (optionnel)
          </h2>
          <div className="space-y-2">
            <Label htmlFor="conditionsParticulieres">
              Conditions particulières
            </Label>
            <Textarea
              id="conditionsParticulieres"
              value={formData.conditionsParticulieres}
              onChange={(e) =>
                handleChange("conditionsParticulieres", e.target.value)
              }
              rows={4}
              placeholder="Ajoutez ici toute condition particulière à inclure dans le contrat..."
            />
          </div>
        </div>

        {/* Lien Qonto */}
        <div className="bg-white rounded-lg border px-7 py-4">
          <h2 className="text-xl font-semibold mb-4">Modalités de paiement</h2>
          <div className="space-y-2">
            <Label htmlFor="lienQonto">Lien Qonto pour le paiement</Label>
            <Input
              id="lienQonto"
              type="url"
              value={formData.lienQonto}
              onChange={(e) => handleChange("lienQonto", e.target.value)}
              placeholder="https://pay.qonto.com/..."
            />
            <p className="text-xs text-gray-500">
              Le lien Qonto sera inclus dans le contrat pour permettre au
              bénéficiaire d'effectuer le paiement.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isGenerating}
            className="bg-[#6CAED6] hover:bg-[#5a9bc4] text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Générer et télécharger le contrat
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
