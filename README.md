# SYNEGO - Plateforme de Bien-être

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Fonctionnalités](#fonctionnalités)
3. [Installation](#installation)
4. [Structure du projet](#structure-du-projet)
5. [Système de génération de contrats](#système-de-génération-de-contrats)
6. [Variables disponibles](#variables-disponibles)
7. [API Routes](#api-routes)
8. [Commandes disponibles](#commandes-disponibles)
9. [Configuration](#configuration)
10. [Développement](#développement)

---

## 🎯 Vue d'ensemble

SYNEGO est une plateforme web dédiée aux services de bien-être et d'accompagnement personnalisé. Le projet permet aux prestataires de gérer leurs clients, créer des contrats personnalisés et proposer des services variés (acupuncture, shiatsu, hypnothérapie, sophrologie, etc.).

### Technologies utilisées

- **Framework** : Next.js 16.0.1
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4
- **UI Components** : Radix UI
- **Génération de documents** : Docxtemplater
- **Icons** : Lucide React

---

## ✨ Fonctionnalités

### 1. Site Web Public
- Page d'accueil avec présentation des services
- Système de réservation en ligne
- Blog et articles
- Pages d'information (À propos, Détails des services)

### 2. Dashboard Administrateur
- Interface d'administration avec sidebar
- Gestion du calendrier
- Génération de contrats personnalisés

### 3. Système de Réservation
- Sélection de date et heure
- Choix entre visioconférence ou cabinet
- Formulaire de contact client
- Confirmation de réservation

### 4. Génération de Contrats
- Formulaire complet pour créer des contrats
- Génération automatique de documents Word
- Remplacement automatique des variables
- Téléchargement direct des contrats

---

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou pnpm

### Étapes d'installation

1. **Cloner le projet** (ou naviguer dans le dossier)
```bash
cd projet
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

---

## 📁 Structure du projet

```
projet/
├── app/                          # Pages Next.js (App Router)
│   ├── api/                      # Routes API
│   │   └── generate-contract/    # API de génération de contrats
│   ├── dashboard/                # Dashboard administrateur
│   │   └── contrats/             # Page de génération de contrats
│   ├── admin/                    # Administration
│   ├── reservation/              # Système de réservation
│   ├── blogs/                    # Blog
│   ├── about/                    # Page À propos
│   └── layout.tsx                # Layout principal
├── components/                   # Composants React réutilisables
│   ├── ui/                       # Composants UI (shadcn/ui)
│   ├── features/                 # Composants métier
│   └── app-sidebar.tsx           # Sidebar du dashboard
├── lib/                          # Utilitaires et constantes
│   ├── contract-constants.ts    # Constantes de l'entreprise
│   └── utils.ts                  # Fonctions utilitaires
├── hooks/                        # React Hooks personnalisés
├── scripts/                      # Scripts Node.js
│   ├── check-contract-template.js    # Vérification des variables
│   ├── create-template-with-variables.js  # Création du modèle
│   └── extract-word-content.js  # Extraction du contenu Word
├── public/                       # Fichiers statiques
├── modele-template-avec-variables.docx  # Modèle Word avec variables
└── package.json                  # Dépendances et scripts
```

---

## 📄 Système de génération de contrats

### Vue d'ensemble

Le système permet de générer automatiquement des contrats Word (.docx) à partir d'un formulaire web. Les variables sont remplacées automatiquement dans le modèle Word.

### Workflow

```
1. Utilisateur remplit le formulaire (/dashboard/contrats)
   ↓
2. Clic sur "Générer et télécharger le contrat"
   ↓
3. Formulaire envoie les données à /api/generate-contract
   ↓
4. API charge le modèle Word (modele-template-avec-variables.docx)
   ↓
5. API vérifie que les variables sont présentes
   ↓
6. API remplace les variables avec les données du formulaire
   ↓
7. API génère le fichier Word
   ↓
8. API retourne le fichier au navigateur
   ↓
9. Le fichier est téléchargé automatiquement
```

### Accès au formulaire

**URL** : `/dashboard/contrats`

### Utilisation

1. Accéder à `/dashboard/contrats`
2. Remplir tous les champs du formulaire :
   - Informations du prestataire (pré-remplies avec les constantes)
   - Informations du bénéficiaire
   - Informations du contrat (dates, lieu)
   - Détails de la prestation
   - Conditions particulières (optionnel)
   - Lien Qonto pour le paiement
3. Cliquer sur "Générer et télécharger le contrat"
4. Le fichier Word est généré et téléchargé automatiquement

### Modèle Word

Le modèle Word utilisé est : `modele-template-avec-variables.docx`

**Important** : Ce fichier doit contenir toutes les variables au format `{variableName}`.

---

## 🔧 Variables disponibles

### Constantes de l'entreprise

| Variable | Description | Source |
|----------|-------------|--------|
| `{entrepriseNom}` | Nom de l'entreprise | `COMPANY_CONSTANTS.name` |
| `{entrepriseSiren}` | Numéro SIREN | `COMPANY_CONSTANTS.siren` |
| `{lienQonto}` | Lien de paiement Qonto | Formulaire ou `COMPANY_CONSTANTS.lienQonto` |

### Informations du prestataire

| Variable | Description | Source |
|----------|-------------|--------|
| `{prestataireNom}` | Nom du prestataire | Formulaire |
| `{prestataireAdresse}` | Adresse du prestataire | Formulaire |
| `{prestataireEmail}` | Email du prestataire | Formulaire |
| `{prestataireTelephone}` | Téléphone du prestataire | Formulaire |

### Informations du bénéficiaire

| Variable | Description | Source |
|----------|-------------|--------|
| `{beneficiaireNom}` | Nom complet du bénéficiaire | Formulaire |
| `{beneficiaireAdresse}` | Adresse du bénéficiaire | Formulaire |
| `{beneficiaireEmail}` | Email du bénéficiaire | Formulaire |
| `{beneficiaireTelephone}` | Téléphone du bénéficiaire | Formulaire |

### Informations du contrat

| Variable | Description | Format |
|----------|-------------|--------|
| `{dateSignature}` | Date de signature | Format français (ex: "15 janvier 2024") |
| `{lieuSignature}` | Lieu de signature | Texte |
| `{dateDebut}` | Date de début | Format français |
| `{dateFin}` | Date de fin | Format français |

### Détails de la prestation

| Variable | Description | Format |
|----------|-------------|--------|
| `{typePrestation}` | Type de prestation | Texte |
| `{descriptionPrestation}` | Description détaillée | Texte multiligne |
| `{nombreSeances}` | Nombre de séances | Nombre |
| `{dureeSeance}` | Durée d'une séance (minutes) | Nombre |
| `{prixUnitaire}` | Prix unitaire | Format : "XX €" |
| `{prixTotal}` | Prix total HT | Format : "XX €" |
| `{prixTotalTTC}` | Prix total TTC | Calculé automatiquement (TVA 20%) |

### Conditions particulières

| Variable | Description | Format |
|----------|-------------|--------|
| `{conditionsParticulieres}` | Conditions particulières | Texte multiligne |

---

## 🔌 API Routes

### POST `/api/generate-contract`

Génère un contrat Word à partir des données fournies.

#### Request Body

```typescript
{
  // Constantes
  entrepriseNom?: string;
  entrepriseSiren?: string;
  lienQonto?: string;
  
  // Prestataire
  prestataireNom: string;
  prestataireAdresse: string;
  prestataireEmail: string;
  prestataireTelephone: string;
  
  // Bénéficiaire
  beneficiaireNom: string;
  beneficiaireAdresse: string;
  beneficiaireEmail: string;
  beneficiaireTelephone: string;
  
  // Contrat
  dateSignature: string; // Format: YYYY-MM-DD
  lieuSignature: string;
  dateDebut: string; // Format: YYYY-MM-DD
  dateFin: string; // Format: YYYY-MM-DD
  
  // Prestation
  typePrestation: string;
  descriptionPrestation: string;
  nombreSeances: string;
  dureeSeance: string;
  prixUnitaire: string;
  prixTotal: string;
  
  // Options
  conditionsParticulieres?: string;
}
```

#### Response

- **Success (200)** : Fichier Word (.docx) en téléchargement
- **Error (400)** : Erreur de validation (modèle sans variables, etc.)
- **Error (404)** : Modèle de contrat introuvable
- **Error (500)** : Erreur serveur

#### Exemple d'utilisation

```typescript
const response = await fetch('/api/generate-contract', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(contractData),
});

if (response.ok) {
  const blob = await response.blob();
  // Télécharger le fichier
}
```

---

## 🛠️ Commandes disponibles

### Développement

```bash
npm run dev          # Lance le serveur de développement
npm run build        # Compile le projet pour la production
npm run start        # Lance le serveur de production
npm run lint         # Vérifie le code avec ESLint
```

### Contrats

```bash
npm run check-contract       # Vérifie que toutes les variables sont présentes dans le modèle
npm run create-template      # Régénère le modèle Word avec toutes les variables
npm run extract-word         # Extrait le texte brut du modèle Word
```

---

## ⚙️ Configuration

### Constantes de l'entreprise

Les constantes sont définies dans `lib/contract-constants.ts` :

```typescript
export const COMPANY_CONSTANTS = {
  name: "SYNEGO",
  siren: "984 561 254",
  address: "10 All. des Champs Elysées, Évry-Courcouronnes (91000)",
  email: "contact@synego.fr",
  phone: "06 13 23 33 43",
  lienQonto: "", // Lien Qonto pour le paiement - à remplir
} as const;
```

**Modifier les constantes** : Éditez directement ce fichier.

### Modèle Word

Le modèle Word utilisé est : `modele-template-avec-variables.docx`

**Pour régénérer le modèle** :
```bash
npm run create-template
```

**Pour vérifier les variables** :
```bash
npm run check-contract
```

---

## 🧩 Développement

### Architecture

- **Next.js App Router** : Utilisation du nouveau système de routing de Next.js
- **Server Components** : Par défaut pour de meilleures performances
- **Client Components** : Utilisation de `"use client"` pour l'interactivité
- **API Routes** : Routes API dans `/app/api/`

### Structure des composants

- **UI Components** (`components/ui/`) : Composants réutilisables basés sur Radix UI
- **Feature Components** (`components/features/`) : Composants métier spécifiques
- **Layout Components** : Composants de mise en page (header, footer, sidebar)

### Ajout de nouvelles variables

1. **Ajouter dans l'interface** (`app/dashboard/contrats/page.tsx`)
   ```typescript
   interface ContractFormData {
     // ... autres champs
     nouvelleVariable: string;
   }
   ```

2. **Ajouter dans le formulaire** (champ input)

3. **Ajouter dans l'API** (`app/api/generate-contract/route.ts`)
   ```typescript
   const templateData = {
     // ... autres variables
     nouvelleVariable: contractData.nouvelleVariable || "",
   };
   ```

4. **Ajouter dans le modèle Word** : Utiliser `{nouvelleVariable}`

5. **Ajouter dans le script de vérification** (`scripts/check-contract-template.js`)
   ```javascript
   const requiredVariables = [
     // ... autres variables
     'nouvelleVariable',
   ];
   ```

6. **Régénérer le modèle** :
   ```bash
   npm run create-template
   ```

### Gestion des erreurs

Le système inclut une gestion d'erreurs robuste :

- **Validation du modèle** : Vérifie que le modèle contient des variables
- **Validation des données** : Vérifie que les champs requis sont remplis
- **Messages d'erreur clairs** : Messages explicites pour chaque type d'erreur

### Formatage des dates

Les dates sont automatiquement formatées en français :
- Format d'entrée : `YYYY-MM-DD`
- Format de sortie : `15 janvier 2024`

Le formatage évite les problèmes de timezone en utilisant directement les composants de la date.

### Calcul automatique

- **Prix total** : Calculé automatiquement si `nombreSeances` et `prixUnitaire` sont remplis
- **Prix TTC** : Calculé automatiquement avec une TVA de 20%

---

## 📝 Notes importantes

### Modèle Word

- Le modèle doit utiliser la syntaxe exacte `{variableName}` (avec accolades)
- Les variables sont sensibles à la casse
- Pas d'espaces dans les noms de variables
- Le modèle doit être sauvegardé en format `.docx`

### Compatibilité

- **Next.js** : Version 16.0.1
- **Node.js** : Version 18+ recommandée
- **Navigateurs** : Chrome, Firefox, Safari, Edge (versions récentes)

### Sécurité

- Les constantes sensibles doivent être configurées dans `lib/contract-constants.ts`
- Pour la production, utilisez des variables d'environnement pour les données sensibles

---

## 🐛 Dépannage

### Le contrat ne se génère pas

1. Vérifier que le modèle Word existe : `modele-template-avec-variables.docx`
2. Vérifier les variables : `npm run check-contract`
3. Vérifier la console du navigateur pour les erreurs
4. Vérifier les logs du serveur

### Les variables ne sont pas remplacées

1. Vérifier que le modèle contient les variables : `npm run check-contract`
2. Vérifier la syntaxe : `{variableName}` (avec accolades)
3. Régénérer le modèle : `npm run create-template`

### Erreur "Modèle de contrat introuvable"

- Vérifier que `modele-template-avec-variables.docx` est à la racine du projet
- Régénérer le modèle : `npm run create-template`

### Erreur de formatage des dates

- Vérifier que les dates sont au format `YYYY-MM-DD`
- Le formatage gère automatiquement les timezones

---

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Docxtemplater Documentation](https://docxtemplater.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 👥 Contribution

Pour contribuer au projet :

1. Créer une branche pour votre fonctionnalité
2. Faire vos modifications
3. Tester avec `npm run dev`
4. Vérifier le linting avec `npm run lint`
5. Créer une pull request

---

## 📄 Licence

Ce projet est privé et propriété de SYNEGO.

---

## 📞 Support

Pour toute question ou problème :
- Email : contact@synego.fr
- Téléphone : 06 13 23 33 43

---

**Dernière mise à jour** : 2024
