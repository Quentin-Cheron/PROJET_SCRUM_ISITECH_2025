import { NextRequest, NextResponse } from "next/server";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "fs";
import path from "path";
import { COMPANY_CONSTANTS } from "@/lib/contract-constants";

export async function POST(request: NextRequest) {
  try {
    const contractData = await request.json();

    // Lire le modèle de contrat
    // Essayer d'abord le modèle avec variables, sinon l'ancien modèle
    let templatePath = path.join(
      process.cwd(),
      "modele-template-avec-variables.docx"
    );
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: "Modèle de contrat introuvable" },
        { status: 404 }
      );
    }

    // Charger le fichier Word
    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    
    // Vérifier si le document contient des variables
    const docxContent = zip.files['word/document.xml'].asText();
    const hasVariables = /\{[a-zA-Z]+\}/.test(docxContent);
    
    if (!hasVariables) {
      return NextResponse.json(
        { 
          error: "Le modèle Word ne contient pas de variables. Veuillez modifier le fichier Word et remplacer les valeurs statiques par des variables au format {variableName}. Exemple: SYNEGO devient {entrepriseNom}. Utilisez 'npm run check-contract' pour vérifier les variables."
        },
        { status: 400 }
      );
    }
    
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Formater les dates au format français
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      // Éviter les problèmes de timezone en utilisant les composants de la date directement
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
      // Fallback si le format n'est pas YYYY-MM-DD
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };

    // Préparer les données pour le template
    const templateData = {
      // Constantes de l'entreprise
      entrepriseNom: contractData.entrepriseNom || COMPANY_CONSTANTS.name,
      entrepriseSiren: contractData.entrepriseSiren || COMPANY_CONSTANTS.siren,
      lienQonto: contractData.lienQonto || COMPANY_CONSTANTS.lienQonto || "",
      
      // Informations du prestataire
      prestataireNom: contractData.prestataireNom || "",
      prestataireAdresse: contractData.prestataireAdresse || "",
      prestataireEmail: contractData.prestataireEmail || "",
      prestataireTelephone: contractData.prestataireTelephone || "",
      
      // Informations du bénéficiaire
      beneficiaireNom: contractData.beneficiaireNom || "",
      beneficiaireAdresse: contractData.beneficiaireAdresse || "",
      beneficiaireEmail: contractData.beneficiaireEmail || "",
      beneficiaireTelephone: contractData.beneficiaireTelephone || "",
      
      // Informations du contrat
      dateSignature: formatDate(contractData.dateSignature),
      lieuSignature: contractData.lieuSignature || "",
      dateDebut: formatDate(contractData.dateDebut),
      dateFin: formatDate(contractData.dateFin),
      
      // Détails de la prestation
      typePrestation: contractData.typePrestation || "",
      descriptionPrestation: contractData.descriptionPrestation || "",
      nombreSeances: contractData.nombreSeances || "",
      dureeSeance: contractData.dureeSeance || "",
      prixUnitaire: contractData.prixUnitaire
        ? `${contractData.prixUnitaire} €`
        : "",
      prixTotal: contractData.prixTotal ? `${contractData.prixTotal} €` : "",
      prixTotalTTC: contractData.prixTotal
        ? `${(parseFloat(contractData.prixTotal) * 1.2).toFixed(2)} €`
        : "",
      
      // Conditions particulières
      conditionsParticulieres:
        contractData.conditionsParticulieres || "Aucune condition particulière.",
    };

    // Remplir le template
    try {
      doc.setData(templateData);
      doc.render();
    } catch (error) {
      // Gestion des erreurs de docxtemplater
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.error("Erreur docxtemplater:", errorMessage);
        
        if (errorMessage.includes("Unclosed tag")) {
          throw new Error(
            "Erreur dans le modèle : balise non fermée. Vérifiez que toutes les variables utilisent la syntaxe {variableName} (avec accolades)."
          );
        }
        if (errorMessage.includes("Unopened tag")) {
          throw new Error(
            "Erreur dans le modèle : balise non ouverte. Vérifiez que toutes les variables utilisent la syntaxe {variableName} (avec accolades)."
          );
        }
        if (errorMessage.includes("can't find tag")) {
          throw new Error(
            `Variable introuvable dans le modèle: ${errorMessage}. Utilisez 'npm run check-contract' pour voir quelles variables sont présentes.`
          );
        }
        throw new Error(`Erreur lors du remplissage du template: ${errorMessage}`);
      }
      throw error;
    }

    // Générer le fichier
    const buffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    // Retourner le fichier
    return new NextResponse(buffer as any, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="Contrat_${contractData.beneficiaireNom || "Prestation"}.docx"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du contrat:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération du contrat",
      },
      { status: 500 }
    );
  }
}

