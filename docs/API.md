# Documentation API - SYNEGO

## Endpoints disponibles

### POST `/api/generate-contract`

Génère un contrat Word (.docx) à partir des données fournies dans le body de la requête.

#### Description

Cette route API traite un modèle Word, remplace les variables par les valeurs fournies, et retourne le fichier généré.

#### Headers

```
Content-Type: application/json
```

#### Body (JSON)

```json
{
  "entrepriseNom": "SYNEGO",
  "entrepriseSiren": "984 561 254",
  "lienQonto": "https://pay.qonto.com/...",
  "prestataireNom": "Jean Dupont",
  "prestataireAdresse": "10 All. des Champs Elysées, Évry-Courcouronnes (91000)",
  "prestataireEmail": "contact@synego.fr",
  "prestataireTelephone": "06 13 23 33 43",
  "beneficiaireNom": "Marie Martin",
  "beneficiaireAdresse": "123 Rue Example, Paris (75001)",
  "beneficiaireEmail": "marie.martin@example.com",
  "beneficiaireTelephone": "06 12 34 56 78",
  "dateSignature": "2024-01-15",
  "lieuSignature": "Paris",
  "dateDebut": "2024-02-01",
  "dateFin": "2024-03-31",
  "typePrestation": "Accompagnement bien-être",
  "descriptionPrestation": "Séances d'acupuncture et de shiatsu pour améliorer le bien-être général.",
  "nombreSeances": "10",
  "dureeSeance": "60",
  "prixUnitaire": "80",
  "prixTotal": "800",
  "conditionsParticulieres": "Les séances doivent être réservées au moins 48h à l'avance."
}
```

#### Paramètres

Tous les champs sont optionnels, mais certains sont requis pour générer un contrat complet :

**Requis** :
- `beneficiaireNom`
- `prestataireNom`
- `prestataireAdresse`
- `prestataireEmail`
- `prestataireTelephone`
- `dateSignature`
- `lieuSignature`
- `dateDebut`
- `dateFin`
- `typePrestation`
- `descriptionPrestation`
- `nombreSeances`
- `dureeSeance`
- `prixUnitaire`
- `prixTotal`

**Optionnels** :
- `entrepriseNom` (utilise `COMPANY_CONSTANTS.name` par défaut)
- `entrepriseSiren` (utilise `COMPANY_CONSTANTS.siren` par défaut)
- `lienQonto` (utilise `COMPANY_CONSTANTS.lienQonto` par défaut)
- `conditionsParticulieres` (défaut : "Aucune condition particulière.")

#### Réponses

##### Succès (200)

**Headers** :
```
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
Content-Disposition: attachment; filename="Contrat_[beneficiaireNom].docx"
```

**Body** : Fichier binaire Word (.docx)

##### Erreur 400 - Modèle sans variables

```json
{
  "error": "Le modèle Word ne contient pas de variables. Veuillez modifier le fichier Word et remplacer les valeurs statiques par des variables au format {variableName}. Exemple: SYNEGO devient {entrepriseNom}. Utilisez 'npm run check-contract' pour vérifier les variables."
}
```

##### Erreur 404 - Modèle introuvable

```json
{
  "error": "Modèle de contrat introuvable"
}
```

##### Erreur 500 - Erreur serveur

```json
{
  "error": "Erreur lors de la génération du contrat: [détails de l'erreur]"
}
```

#### Exemples

##### JavaScript / TypeScript

```typescript
const contractData = {
  beneficiaireNom: "Marie Martin",
  beneficiaireAdresse: "123 Rue Example, Paris (75001)",
  beneficiaireEmail: "marie.martin@example.com",
  beneficiaireTelephone: "06 12 34 56 78",
  dateSignature: "2024-01-15",
  lieuSignature: "Paris",
  dateDebut: "2024-02-01",
  dateFin: "2024-03-31",
  typePrestation: "Accompagnement bien-être",
  descriptionPrestation: "Séances d'acupuncture et de shiatsu",
  nombreSeances: "10",
  dureeSeance: "60",
  prixUnitaire: "80",
  prixTotal: "800",
  prestataireNom: "SYNEGO",
  prestataireAdresse: "10 All. des Champs Elysées, Évry-Courcouronnes (91000)",
  prestataireEmail: "contact@synego.fr",
  prestataireTelephone: "06 13 23 33 43",
};

const response = await fetch('/api/generate-contract', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(contractData),
});

if (response.ok) {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Contrat_${contractData.beneficiaireNom}.docx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
} else {
  const error = await response.json();
  console.error('Erreur:', error.error);
}
```

##### cURL

```bash
curl -X POST http://localhost:3000/api/generate-contract \
  -H "Content-Type: application/json" \
  -d '{
    "beneficiaireNom": "Marie Martin",
    "prestataireNom": "SYNEGO",
    "dateSignature": "2024-01-15",
    "lieuSignature": "Paris",
    "dateDebut": "2024-02-01",
    "dateFin": "2024-03-31",
    "typePrestation": "Accompagnement bien-être",
    "descriptionPrestation": "Séances d'acupuncture",
    "nombreSeances": "10",
    "dureeSeance": "60",
    "prixUnitaire": "80",
    "prixTotal": "800"
  }' \
  --output contrat.docx
```

#### Traitement des dates

Les dates sont automatiquement formatées en français :
- **Entrée** : `YYYY-MM-DD` (ex: `2024-01-15`)
- **Sortie** : Format français (ex: `15 janvier 2024`)

Le formatage évite les problèmes de timezone en utilisant directement les composants de la date.

#### Calcul automatique

- **Prix TTC** : Calculé automatiquement avec une TVA de 20%
  - Formule : `prixTotal * 1.2`
  - Format : `"960.00 €"`

#### Gestion des erreurs

L'API gère plusieurs types d'erreurs :

1. **Modèle sans variables** : Le modèle Word ne contient pas de variables au format `{variableName}`
2. **Variables manquantes** : Le modèle contient des variables non définies dans les données
3. **Erreurs de syntaxe** : Problèmes dans le formatage du modèle Word
4. **Erreurs de fichier** : Le modèle Word n'existe pas ou est corrompu

Tous les messages d'erreur sont retournés dans le format JSON avec un champ `error`.

