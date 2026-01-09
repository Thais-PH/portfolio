# Stratégie de Tests Unitaires - Portfolio Thaïs

Ce document décrit le plan d'action pour la mise en place des tests unitaires sur le projet Portfolio.

## 1. Objectifs
- Garantir le bon affichage de la page d'accueil et de ses sections.
- Prévenir les régressions visuelles ou fonctionnelles lors des futures mises à jour.
- Intégrer l'exécution des tests dans le workflow CI/CD (GitHub Actions).

## 2. Stack Technique
- **Framework de Test :** [Jest](https://jestjs.io/) - Le standard pour React/Next.js.
- **Utilitaires de Test :** [React Testing Library](https://testing-library.com/react) - Pour tester les composants du point de vue de l'utilisateur.
- **Environnement :** `jest-environment-jsdom` - Pour simuler le DOM navigateur.

## 3. Plan d'Action

### Phase 1 : Installation & Configuration (Immédiat)
1. Installation des dépendances de développement (`jest`, `@testing-library/react`, `@testing-library/jest-dom`, etc.).
2. Configuration de Jest via `next/jest` (gestion automatique du compilateur SWC de Next.js).
3. Création du fichier de setup `jest.setup.ts` pour étendre les matchers (ex: `toBeInTheDocument`).

### Phase 2 : Écriture des Tests (Immédiat)
Puisque les sections (Navbar, Hero, Skills) sont actuellement définies dans `app/page.tsx`, nous testerons le rendu global de la page d'accueil.
- **Fichier cible :** `__tests__/Home.test.tsx`
- **Cas de test :**
  - Vérifier la présence du titre principal ("Développeuse Full Stack").
  - Vérifier la présence de la barre de navigation.
  - Vérifier que les sections "À propos", "Compétences", "Projets" sont accessibles.

### Phase 3 : Intégration CI/CD (Immédiat)
- Ajout d'une étape `test` dans le fichier `.github/workflows/main.yml`.
- Cette étape s'exécutera avant le build et le déploiement Docker.

### Phase 4 : Améliorations Futures (À prévoir)
- Refactoring : Extraire les composants (`Navbar`, `Hero`, `Skills`) dans des fichiers séparés pour permettre des tests unitaires isolés plus précis.
- Tests E2E : Ajouter Playwright ou Cypress pour tester la navigation et les interactions réelles.
- Tests de snapshots : Pour figer le rendu visuel HTML.

## 4. Structure des Dossiers
```
.
├── __tests__/          # Contient les tests unitaires et d'intégration
│   └── Home.test.tsx
├── specs/              # Documentation et spécifications (ce dossier)
├── app/
├── jest.config.ts      # Configuration Jest
└── jest.setup.ts       # Setup global des tests
```
