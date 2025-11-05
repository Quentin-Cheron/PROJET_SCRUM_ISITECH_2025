# Guide des Variables - Système de Contrats

## 📋 Liste complète des variables

### Variables de l'entreprise (Constantes)

Ces variables sont automatiquement remplies depuis `lib/contract-constants.ts` si non fournies.

| Variable | Type | Exemple | Description |
|----------|------|---------|-------------|
| `{entrepriseNom}` | string | "SYNEGO" | Nom de l'entreprise |
| `{entrepriseSiren}` | string | "984 561 254" | Numéro SIREN |
| `{lienQonto}` | string | "https://pay.qonto.com/..." | Lien de paiement Qonto |

### Variables du prestataire

| Variable | Type | Exemple | Description |
|----------|------|---------|-------------|
| `{prestataireNom}` | string | "SYNEGO" | Nom du prestataire |
| `{prestataireAdresse}` | string | "10 All. des Champs Elysées..." | Adresse complète |
| `{prestataireEmail}` | string | "contact@synego.fr" | Email de contact |
| `{prestataireTelephone}` | string | "06 13 23 33 43" | Téléphone de contact |

### Variables du bénéficiaire

| Variable | Type | Exemple | Description |
|----------|------|---------|-------------|
| `{beneficiaireNom}` | string | "Marie Martin" | Nom complet |
| `{beneficiaireAdresse}` | string | "123 Rue Example, Paris" | Adresse complète |
| `{beneficiaireEmail}` | string | "marie.martin@example.com" | Email |
| `{beneficiaireTelephone}` | string | "06 12 34 56 78" | Téléphone |

### Variables du contrat

| Variable | Type | Format Entrée | Format Sortie | Exemple |
|----------|------|---------------|---------------|---------|
| `{dateSignature}` | string | YYYY-MM-DD | Format français | "15 janvier 2024" |
| `{lieuSignature}` | string | Texte | Texte | "Paris" |
| `{dateDebut}` | string | YYYY-MM-DD | Format français | "1er février 2024" |
| `{dateFin}` | string | YYYY-MM-DD | Format français | "31 mars 2024" |

### Variables de la prestation

| Variable | Type | Format Sortie | Exemple | Description |
|----------|------|---------------|---------|-------------|
| `{typePrestation}` | string | Texte | "Accompagnement bien-être" | Type de service |
| `{descriptionPrestation}` | string | Texte multiligne | "Séances d'acupuncture..." | Description détaillée |
| `{nombreSeances}` | string | Nombre | "10" | Nombre de séances |
| `{dureeSeance}` | string | Nombre | "60" | Durée en minutes |
| `{prixUnitaire}` | string | "XX €" | "80 €" | Prix d'une séance |
| `{prixTotal}` | string | "XX €" | "800 €" | Prix total HT |
| `{prixTotalTTC}` | string | "XX €" | "960.00 €" | Prix total TTC (calculé) |

### Variables optionnelles

| Variable | Type | Valeur par défaut | Description |
|----------|------|-------------------|-------------|
| `{conditionsParticulieres}` | string | "Aucune condition particulière." | Conditions spécifiques |

---

## 📝 Utilisation dans le modèle Word

### Syntaxe

Les variables doivent utiliser la syntaxe exacte avec des accolades :

```
✅ Correct : {entrepriseNom}
❌ Incorrect : { entrepriseNom }
❌ Incorrect : {entreprise Nom}
❌ Incorrect : entrepriseNom
❌ Incorrect : {{entrepriseNom}}
```

### Exemples dans le modèle

```docx
CONTRAT DE PRESTATION DE SERVICE

ENTRE

La société {entrepriseNom}, immatriculée au RCS sous le numéro {entrepriseSiren},
dont le siège social est situé à {prestataireAdresse},
représentée par {prestataireNom},
Email : {prestataireEmail}
Téléphone : {prestataireTelephone}

Ci-après dénommée "le Prestataire",

ET

{beneficiaireNom},
demeurant à {beneficiaireAdresse},
Email : {beneficiaireEmail}
Téléphone : {beneficiaireTelephone}

Ci-après dénommé "le Bénéficiaire",

IL A ÉTÉ CONVENU ET ARRÉTÉ CE QUI SUIT :

ARTICLE 1 - OBJET

Le présent contrat a pour objet la prestation de services de {typePrestation}.

Description détaillée : {descriptionPrestation}

ARTICLE 2 - DURÉE

Le présent contrat prend effet le {dateDebut} et se termine le {dateFin}.

ARTICLE 3 - MODALITÉS DE PRESTATION

Le Prestataire s'engage à fournir au Bénéficiaire :
- Nombre de séances : {nombreSeances}
- Durée d'une séance : {dureeSeance} minutes
- Prix unitaire : {prixUnitaire}
- Prix total HT : {prixTotal}
- Prix total TTC : {prixTotalTTC}

Modalités de paiement :
Le paiement s'effectue via le lien Qonto suivant : {lienQonto}

ARTICLE 6 - CONDITIONS PARTICULIÈRES

{conditionsParticulieres}

Fait à {lieuSignature}, le {dateSignature}

Le Prestataire                           Le Bénéficiaire

_________________                        _________________
{prestataireNom}                         {beneficiaireNom}
```

---

## 🔄 Formatage automatique

### Dates

Les dates sont automatiquement formatées en français :

- **Entrée** : `2024-01-15`
- **Sortie** : `15 janvier 2024`

**Note** : Le formatage évite les problèmes de timezone.

### Prix

Les prix sont automatiquement formatés avec le symbole € :

- **Entrée** : `"80"`
- **Sortie** : `"80 €"`

### Prix TTC

Le prix TTC est calculé automatiquement :

- **Formule** : `prixTotal * 1.2` (TVA 20%)
- **Entrée** : `prixTotal = "800"`
- **Sortie** : `"960.00 €"`

---

## ✅ Validation

### Vérifier les variables dans le modèle

```bash
npm run check-contract
```

Cette commande vérifie que toutes les variables sont présentes dans le modèle Word.

### Résultat attendu

```
✅ {entrepriseNom} - trouvé
✅ {entrepriseSiren} - trouvé
✅ {prestataireNom} - trouvé
...
✅ {lienQonto} - trouvé

📊 Résumé:
  Variables trouvées: 23/23
  Variables manquantes: 0

🎉 Toutes les variables sont présentes dans le modèle!
```

---

## 🆕 Ajouter une nouvelle variable

### 1. Ajouter dans l'interface TypeScript

`app/dashboard/contrats/page.tsx` :

```typescript
interface ContractFormData {
  // ... autres champs
  nouvelleVariable: string;
}
```

### 2. Ajouter dans le state initial

```typescript
const [formData, setFormData] = useState<ContractFormData>({
  // ... autres champs
  nouvelleVariable: "",
});
```

### 3. Ajouter dans le formulaire

```tsx
<Input
  id="nouvelleVariable"
  value={formData.nouvelleVariable}
  onChange={(e) => handleChange("nouvelleVariable", e.target.value)}
/>
```

### 4. Ajouter dans l'API

`app/api/generate-contract/route.ts` :

```typescript
const templateData = {
  // ... autres variables
  nouvelleVariable: contractData.nouvelleVariable || "",
};
```

### 5. Ajouter dans le modèle Word

Utiliser `{nouvelleVariable}` dans le document Word.

### 6. Ajouter dans le script de vérification

`scripts/check-contract-template.js` :

```javascript
const requiredVariables = [
  // ... autres variables
  'nouvelleVariable',
];
```

### 7. Mettre à jour le modèle généré

`scripts/create-template-with-variables.js` :

```javascript
const templateLines = [
  // ... autres lignes
  `Nouvelle variable : {nouvelleVariable}`,
];
```

### 8. Régénérer le modèle

```bash
npm run create-template
```

---

## 🐛 Problèmes courants

### Variable non remplacée

**Cause** : Syntaxe incorrecte dans le modèle Word

**Solution** :
- Vérifier la syntaxe : `{variableName}` (avec accolades)
- Vérifier la casse : `{entrepriseNom}` ≠ `{EntrepriseNom}`
- Vérifier les espaces : Pas d'espaces dans `{variableName}`

### Variable non trouvée

**Cause** : Variable non définie dans les données

**Solution** :
- Vérifier que la variable est dans `templateData` dans l'API
- Vérifier que la variable est envoyée depuis le formulaire
- Vérifier le nom exact de la variable

### Date au mauvais format

**Cause** : Format d'entrée incorrect

**Solution** :
- Utiliser le format `YYYY-MM-DD` (ex: `2024-01-15`)
- Le formatage est automatique en français

---

**Dernière mise à jour** : 2024

