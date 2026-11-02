# Journal de bord — Projet « LabBox » (ETML P_Prod)

Ce journal consigne de manière chronologique les séances de travail, les objectifs atteints, les difficultés rencontrées et le temps effectif passé sur le projet (budget total : 130 heures).

---

## Synthèse du Temps Consommé
- **Total prévu :** 130 heures
- **Temps cumulé à ce jour :** 2.0 heures
- **Temps restant :** 128.0 heures

---

## Entrées du Journal

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
