/**
 * Script pour vérifier que le modèle de contrat contient les variables nécessaires
 * Usage: node scripts/check-contract-template.js
 */

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

// Essayer d'abord le modèle avec variables, sinon l'ancien modèle
let templatePath = path.join(
  process.cwd(),
  'modele-template-avec-variables.docx'
);

if (!fs.existsSync(templatePath)) {
  templatePath = path.join(
    process.cwd(),
    'Modèle de contrat de prestation de service pour location.docx'
  );
}

const requiredVariables = [
  'entrepriseNom',
  'entrepriseSiren',
  'prestataireNom',
  'prestataireAdresse',
  'prestataireEmail',
  'prestataireTelephone',
  'beneficiaireNom',
  'beneficiaireAdresse',
  'beneficiaireEmail',
  'beneficiaireTelephone',
  'dateSignature',
  'lieuSignature',
  'dateDebut',
  'dateFin',
  'typePrestation',
  'descriptionPrestation',
  'nombreSeances',
  'dureeSeance',
  'prixUnitaire',
  'prixTotal',
  'prixTotalTTC',
  'conditionsParticulieres',
  'lienQonto',
];

function checkTemplate() {
  if (!fs.existsSync(templatePath)) {
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const docxContent = zip.files['word/document.xml'].asText();

    const foundVariables = [];
    const missingVariables = [];

    requiredVariables.forEach((variable) => {
      const pattern = new RegExp(`\\{${variable}\\}`, 'g');
      if (pattern.test(docxContent)) {
        foundVariables.push(variable);
      } else {
        missingVariables.push(variable);
      }
    });

    if (missingVariables.length > 0) {
      missingVariables.forEach((variable) => {
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du modèle:', error.message);
    process.exit(1);
  }
}

checkTemplate();