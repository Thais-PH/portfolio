# Guide d'Intégration Grafana Cloud (Observabilité Full-Stack)

Ce document décrit la mise en place du monitoring complet pour l'application Next.js (App Router) en utilisant **Grafana Cloud**.
L'architecture repose sur deux piliers :
1.  **Backend** : OpenTelemetry (Traces, Metrics) via l'instrumentation native de Next.js.
2.  **Frontend** : Grafana Faro Web SDK (Erreurs JS, Web Vitals, Session Replay).

---

## 1. Prérequis

*   Un compte [Grafana Cloud](https://grafana.com/).
*   Une "Stack" active (instance Grafana + Loki + Tempo + Prometheus).
*   Accès administrateur pour récupérer les clés API.

## 2. Configuration des Variables d'Environnement

Pour que l'application puisse envoyer des données, vous devez configurer les variables suivantes.
Ces valeurs se trouvent dans votre portail Grafana Cloud.

### Backend (OpenTelemetry)

Allez dans : **Grafana Cloud Portal** -> **OpenTelemetry** -> **Configure**

*   `OTEL_EXPORTER_OTLP_ENDPOINT` : L'URL de l'endpoint OTLP HTTP.
    *   *Exemple* : `https://otlp-gateway-prod-eu-west-2.grafana.net/otlp`
    *   *Note* : Le code ajoute automatiquement `/v1/traces` à cette URL, ne l'ajoutez pas dans la variable.
*   `OTEL_EXPORTER_OTLP_HEADERS` : L'entête d'authentification.
    *   *Format* : `Authorization="Basic <Base64_Token>"` ou parfois juste `Basic <Base64_Token>` selon la génération.
    *   *Dans le code* : Nous utilisons `Authorization: process.env.OTEL_EXPORTER_OTLP_HEADERS`, donc la variable doit contenir la valeur complète du header (ex: `Basic ...`).

### Frontend (Faro)

Allez dans : **Grafana Cloud Portal** -> **Frontend** (Menu latéral) -> **Web SDK** -> **Add New App**

*   `NEXT_PUBLIC_FARO_URL` : L'URL "Collector" fournie par l'interface Faro.
    *   *Exemple* : `https://faro-collector-prod-eu-west-2.grafana.net/collect/....`

### Fichier `.env.local`

Créez ou modifiez votre fichier `.env.local` :

```bash
# Backend - OpenTelemetry
OTEL_EXPORTER_OTLP_ENDPOINT="https://votre-instance.grafana.net/otlp"
OTEL_EXPORTER_OTLP_HEADERS="Basic VOTRE_TOKEN_BASE64_ICI"

# Frontend - Faro
NEXT_PUBLIC_FARO_URL="https://faro-collector-votre-region.grafana.net/collect/votre-app-id"
```

---

## 3. Architecture Technique

### Backend : OpenTelemetry (`instrumentation.ts`)

Le fichier `instrumentation.ts` à la racine du projet est le point d'entrée pour l'observabilité serveur.
Next.js détecte ce fichier grâce à l'option `experimental.instrumentationHook: true` dans `next.config.js`.

Il initialise le `NodeSDK` d'OpenTelemetry qui intercepte automatiquement :
*   Les requêtes HTTP entrantes et sortantes.
*   Les opérations `fs` (système de fichiers).
*   Les modules supportés (si ajoutés) comme `pg` ou `mysql`.

### Frontend : Faro (`app/components/FaroInitializer.tsx`)

Le composant `FaroInitializer` est un composant client (`"use client"`) qui s'exécute une seule fois au chargement de l'application.

Il capture :
*   **Web Vitals** (LCP, FID, CLS).
*   **Erreurs JavaScript** (console.error, exceptions non gérées).
*   **Traces** (requêtes `fetch` / `XHR` depuis le navigateur).
*   **Session Metadata** (navigateur, OS, version de l'app).

Il est intégré dans le `layout.tsx` pour couvrir toutes les pages.

---

## 4. Vérification et Debug

### Vérifier que cela fonctionne

1.  Lancez l'application : `npm run dev`.
2.  Ouvrez la console développeur du navigateur (F12).
    *   Vous ne devriez **pas** voir d'erreurs liées à Faro.
    *   Dans l'onglet "Network", filtrez sur "collector" ou l'URL Faro. Vous devriez voir des requêtes POST (status 202) envoyant des données de télémétrie.
3.  Générez du trafic (naviguez sur le site).

### Dans Grafana

1.  **Frontend** : Allez dans le menu **Frontend**. Cliquez sur votre application. Vous devriez voir apparaître des données "Real User Monitoring" (Web Vitals) après quelques minutes.
2.  **Backend** : Allez dans **Explore**.
    *   Sélectionnez la source de données **Tempo** (Traces).
    *   Cherchez par Service Name : `portfolio-thais-backend`.
    *   Vous devriez voir les traces des requêtes API/Server Actions.

---

## 5. Création de Dashboards

### Dashboard Frontend (Application Observability)

Grafana fournit un dashboard "out-of-the-box" pour Faro.
1.  Dans le menu **Frontend**, cliquez sur "Overview".
2.  Vous avez accès aux vues : *Performance*, *Errors*, *Sessions*.

### Dashboard Backend (Application Performance)

Pour visualiser les données OpenTelemetry :
1.  Importez le dashboard ID **15983** (OpenTelemetry APM) ou **11155** (Kubernetes / General APM) comme base de départ.
2.  Ou créez un nouveau Dashboard avec des panels basés sur les métriques `traces_span_metrics` (si générées par Tempo) ou directement via les requêtes TraceQL.

---

## 6. Déploiement

Assurez-vous d'ajouter les variables d'environnement (`OTEL_...` et `NEXT_PUBLIC_FARO_...`) dans votre plateforme de déploiement (Vercel, Docker, GitHub Actions, etc.).
