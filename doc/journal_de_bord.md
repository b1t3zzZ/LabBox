# Journal de bord — Projet « LabBox » (ETML P_Prod)

Ce journal consigne de manière chronologique les séances de travail, les objectifs atteints, les difficultés rencontrées et le temps effectif passé sur le projet (budget total : 130 heures).

---

## Synthèse du Temps Consommé
- **Total prévu :** 130 heures
- **Temps cumulé à ce jour :** 3.5 heures
- **Temps restant :** 126.5 heures

---

## Entrées du Journal

### Séance 02 — Conception BDD & Début PoC Dockerode
- **Date :** 02.11.2026
- **Durée effective :** 1h30
- **Phases :** Phase 3 (Conception - 0h30) et Phase 2 (PoC - 1h00)
- **Travail réalisé :**
  - Modélisation du MCD et génération du MLD avec le logiciel Looping dans `doc/conception/`.
  - Correction des cardinalités Merise (passage à `1,1` pour `User ↔ Instance` et `0,1` pour `User ↔ AuditLog`).
  - Configuration de l'environnement TypeScript moderne avec `tsx` (résolution de l'incompatibilité Node v24).
  - Écriture autonome par l'apprenti du premier script `poc/poc-docker/index.ts` en TypeScript avec `async/await`.
  - Test réussi de connexion à Docker Desktop, listage des conteneurs, téléchargement de l'image `alpine` et premier démarrage de conteneur en code TypeScript.
- **Difficultés rencontrées / Notions acquises :**
  - Transition du style "callback hell" vers la syntaxe moderne "async/await".
  - Compréhension de l'unicité des noms de conteneurs dans Docker Engine (erreur HTTP 409 en cas de réutilisation).
- **Prochaine étape :**
  - Implémentation de l'arrêt (`stop`) et de la suppression (`remove`) automatique.
  - Ajout des contraintes de sécurité cgroups (`Memory`, `PidsLimit: 100`).

---

### Séance 01 — Initialisation & Cadrage
- **Date :** 02.11.2026
- **Durée effective :** 2h00
- **Phase :** 1. Analyse et planification (Cahier des charges)
- **Objectifs de la séance :**
  - Clarification des exigences pédagogiques de l'orientation DEV.
  - Définition du périmètre strict (In-Scope / Out-of-Scope) pour respecter les 130 heures.
  - Initialisation de la structure du dépôt Git (Monorepo, `.gitignore`, `README.md`).
  - Rédaction du Cahier des charges initial au format ETML (`doc/cahier_des_charges.md`).
- **Travail réalisé :**
  - Création de l'arborescence standardisée du projet.
  - Identification des 8 User Stories principales (US-01 à US-08).
  - Formalisation des contraintes de sécurité (`cgroups`, `PidsLimit: 100`, isolation réseau `icc=false`).
- **Difficultés rencontrées / Décisions prises :**
  - Décision d'exclure les volumes partagés distants (NFS) pour éviter tout risque de glissement de planning (*Scope Creep*).
- **Prochaine étape :**
  - Validation du Cahier des charges par le maître d'apprentissage / répondant technique.
  - Phase 2 : Démarrage du bac à sable (PoC) — Connexion à l'API Docker en TypeScript.
