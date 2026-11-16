# Journal de bord — Projet « LabBox » (ETML P_Prod)

Ce journal consigne de manière chronologique les séances de travail, les objectifs atteints, les difficultés rencontrées et le temps effectif passé sur le projet (budget total : 130 heures).

---

## Synthèse du Temps Consommé
- **Total prévu :** 130 heures
- **Temps cumulé à ce jour :** 6.0 heures
- **Temps restant :** 124.0 heures

---

## Entrées du Journal

### Séance 04 — Cycle de vie complet & Limites cgroups (Fin du PoC 1)
- **Date :** 16.11.2026
- **Durée effective :** 1h00
- **Phase :** Phase 2 (PoC Dockerode)
- **Travail réalisé :**
  - Nettoyage de l'environnement et implémentation autonome dans `poc/poc-docker/index.ts` de l'attente asynchrone (`Promise` + `setTimeout`), de l'arrêt (`container.stop()`) et de la suppression (`container.remove()`).
  - Ajout de la configuration `HostConfig` (`Memory: 268435456`, `NanoCpus: 500000000`, `PidsLimit: 100`) et vérification via `container.inspect()`.
  - Diagnostic d'un comportement système via `docker info` : sous Docker Desktop 4.10.0 / WSL2, le contrôleur `cgroups` mémoire retourne `WARNING: No memory limit support` (valeur `0` à l'inspection), tandis que `NanoCpus` et `PidsLimit` sont bien appliqués.
- **Prochaine étape :**
  - Démarrer le PoC 2 (`poc/poc-websocket/`) : passerelle WebSocket + terminal web `xterm.js`.

---

### Séance 03 — Infrastructure Docker Portable (VM Linux VirtualBox)
- **Date :** 03.11.2026
- **Durée effective :** 1h30
- **Phase :** Phase 2 (PoC & Environnement d'exécution - 1h30)
- **Travail réalisé :**
  - Analyse des problèmes de portabilité de Docker Desktop entre différents postes de travail scolaires (absence de WSL2 par défaut et restrictions administrateur).
  - Test d'une machine virtuelle Windows 11 (`LabBox-Docker`) sous VirtualBox et identification de la limitation matérielle/système : l'hyperviseur Windows hôte (`HypervisorPresent: True` / VBS) bloque la virtualisation imbriquée (*Nested Virtualization*), rendant WSL2 inutilisable dans une VM Windows.
  - Conception et création d'une machine virtuelle Linux légère et portable (`LabBox-Linux` basée sur `alpine-virt-3.21.3-x86_64.iso`) stockée sur le disque externe afin d'exécuter Docker nativement sur le noyau Linux sans virtualisation imbriquée.
  - Configuration du réseau NAT VirtualBox avec redirections de ports (`127.0.0.1:2375 -> 2375` pour l'API Docker TCP et `127.0.0.1:2222 -> 22` pour SSH) et ajustement du contrôleur graphique (`VBoxVGA`).
  - Mise à jour du fichier `.gitignore` pour exclure les images ISO et les disques virtuels (`.vdi`, `.vbox`).
- **Difficultés rencontrées / Décisions prises :**
  - Impossibilité d'utiliser la virtualisation imbriquée sous VirtualBox sur les postes ETML Windows 11 : bascule vers une VM Linux Alpine dédiée au démon Docker, garantissant en prime une compatibilité native à 100 % avec les restrictions `cgroups` (`Memory`, `NanoCpus`, `PidsLimit`).
- **Prochaine étape :**
  - Finaliser l'installation du service Docker dans `LabBox-Linux` et exposer le port TCP `2375`.
  - Terminer le PoC 1 (`stop`, `remove` et limites `cgroups`).

---

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
