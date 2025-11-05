/**
 * Script pour créer un modèle Word avec toutes les variables déjà en place
 * Ce script génère un nouveau fichier modèle-template.docx avec les variables
 */

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');

// Contenu du modèle avec toutes les variables - format simplifié pour Word
const templateLines = [
  'CONTRAT DE PRESTATION DE SERVICE DE BIEN-ÊTRE',
  '',
  'ENTRE',
  '',
  `La société {entrepriseNom}, immatriculée au RCS sous le numéro {entrepriseSiren},`,
  `dont le siège social est situé à {prestataireAdresse},`,
  `représentée par {prestataireNom},`,
  `Email : {prestataireEmail}`,
  `Téléphone : {prestataireTelephone}`,
  '',
  'Ci-après dénommée "le Prestataire",',
  '',
  "D'une part,",
  '',
  'ET',
  '',
  `{beneficiaireNom},`,
  `demeurant à {beneficiaireAdresse},`,
  `Email : {beneficiaireEmail}`,
  `Téléphone : {beneficiaireTelephone}`,
  '',
  'Ci-après dénommé "le Bénéficiaire",',
  '',
  "D'autre part,",
  '',
  'IL A ÉTÉ CONVENU ET ARRÉTÉ CE QUI SUIT :',
  '',
  'ARTICLE 1 - OBJET',
  '',
  'Le présent contrat de prestation de services a pour objet la fourniture de prestations de bien-être et d\'accompagnement personnalisé.',
  '',
  `Type de prestation : {typePrestation}`,
  '',
  `Description détaillée : {descriptionPrestation}`,
  '',
  'ARTICLE 2 - DURÉE',
  '',
  `Le présent contrat prend effet le {dateDebut} et se termine le {dateFin}.`,
  '',
  'ARTICLE 3 - MODALITÉS DE PRESTATION',
  '',
  'Le Prestataire s\'engage à fournir au Bénéficiaire :',
  `- Nombre de séances : {nombreSeances}`,
  `- Durée d'une séance : {dureeSeance} minutes`,
  `- Prix unitaire : {prixUnitaire}`,
  `- Prix total HT : {prixTotal}`,
  `- Prix total TTC : {prixTotalTTC}`,
  '',
  'Modalités de paiement :',
  `Le paiement s\'effectue via le lien Qonto suivant : {lienQonto}`,
  '',
  'ARTICLE 4 - OBLIGATIONS DU PRESTATAIRE',
  '',
  'Le Prestataire s\'engage à :',
  '- Fournir les prestations convenues dans le respect des règles déontologiques',
  '- Respecter la confidentialité des informations communiquées par le Bénéficiaire',
  '- Informer le Bénéficiaire de toute modification des conditions de prestation',
  '',
  'ARTICLE 5 - OBLIGATIONS DU BÉNÉFICIAIRE',
  '',
  'Le Bénéficiaire s\'engage à :',
  '- Respecter les horaires convenus',
  '- Informer le Prestataire en cas d\'empêchement',
  "- S'acquitter des sommes dues dans les délais convenus",
  '',
  'ARTICLE 6 - CONDITIONS PARTICULIÈRES',
  '',
  `{conditionsParticulieres}`,
  '',
  'ARTICLE 7 - RÉSILIATION',
  '',
  'Le présent contrat peut être résilié par l\'une ou l\'autre des parties moyennant un préavis de 15 jours, notifié par lettre recommandée avec accusé de réception.',
  '',
  'ARTICLE 8 - LITIGES',
  '',
  'Tout litige relatif au présent contrat sera soumis à la compétence exclusive des tribunaux compétents du ressort du siège social du Prestataire.',
  '',
  `Fait à {lieuSignature}, le {dateSignature}`,
  '',
  'En deux exemplaires originaux.',
  '',
  'Le Prestataire                           Le Bénéficiaire',
  '',
  '_________________                        _________________',
  `{prestataireNom}                         {beneficiaireNom}`,
];

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createWordParagraph(text) {
  if (!text) {
    return '<w:p><w:r><w:t></w:t></w:r></w:p>';
  }
  
  // Pour docxtemplater, les variables doivent être dans le même flux de texte
  // On échappe juste les caractères XML spéciaux mais on garde les variables telles quelles
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  
  return `<w:p><w:r><w:t xml:space="preserve">${escapedText}</w:t></w:r></w:p>`;
}

function createTemplateDocument() {
  try {
    const zip = new PizZip();
    
    // Créer le document XML
    const paragraphs = templateLines.map(line => createWordParagraph(line)).join('\n');
    
    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se wp14">
  <w:body>
${paragraphs}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>`;

    zip.file('word/document.xml', documentXml);
    
    // Content Types
    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

    // Relationships
    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);

    // Générer le fichier
    const buffer = zip.generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // Sauvegarder le nouveau modèle
    const outputPath = path.join(process.cwd(), 'modele-template-avec-variables.docx');
    fs.writeFileSync(outputPath, buffer);
  } catch (error) {
    process.exit(1);
  }
}

createTemplateDocument();
