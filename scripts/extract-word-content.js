/**
 * Script pour extraire le contenu texte du modèle Word
 * et montrer où placer les variables
 */

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

const templatePath = path.join(
  process.cwd(),
  'Modèle de contrat de prestation de service pour location.docx'
);

function extractText() {
  if (!fs.existsSync(templatePath)) {
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const docxContent = zip.files['word/document.xml'].asText();
    
    // Extraire le texte brut (enlever les balises XML)
    let text = docxContent
      .replace(/<[^>]+>/g, ' ') // Enlever les balises XML
      .replace(/\s+/g, ' ') // Normaliser les espaces
      .trim();

    // Sauvegarder dans un fichier texte pour référence
    const outputPath = path.join(process.cwd(), 'modele-texte-extrait.txt');
    fs.writeFileSync(outputPath, text, 'utf-8');
  } catch (error) {
    process.exit(1);
  }
}

extractText();

