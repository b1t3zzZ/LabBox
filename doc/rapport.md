# Rapport Technique (Brouillon évolutif) — Projet « LabBox »

- **Établissement :** ETML (École Technique - École des Métiers de Lausanne)
- **Module :** Projet de Production (P_Prod — 130 périodes)
- **Orientation visée :** Développement d'applications (DEV)

> Ce document centralise au fil de l'eau les éléments techniques, choix d'architecture et problèmes rencontrés pour la rédaction du rapport final.

---

## 1. Introduction & Contexte
*(À compléter en Phase 7 à partir du Cahier des charges `doc/cahier_des_charges.md`)*

---

## 2. Conception & Modélisation
- **Base de données (Merise) :** Modèle Conceptuel (MCD) et Modèle Logique (MLD) réalisés avec Looping (`doc/conception/`).
- **Entités principales :** `USER`, `TEMPLATE`, `INSTANCE`, `AUDIT_LOG`.
- **Points d'attention résolus :**
  - Cardinalité `1,1` côté `INSTANCE` vers `USER` (un conteneur appartient à un unique étudiant) afin d'éviter une table de jointure inutile.
  - Cardinalité `0,1` côté `AUDIT_LOG` vers `USER` pour autoriser les journaux générés automatiquement par le système (tâche planifiée TTL / Cron) sans utilisateur associé.

---

## 3. Choix Techniques & Réalisation (PoC)

### 3.1. Passage des Callbacks à `async/await` (TypeScript)
Lors du développement du prototype `poc/poc-docker/`, les premiers appels à la bibliothèque `dockerode` ont été testés avec des fonctions de rappel (*callbacks*). Cette approche créait un imbrication complexe (*Callback Hell*). Le code a été refactorisé en TypeScript moderne avec `async/await`, rendant la gestion séquentielle du cycle de vie (`createContainer` → `start` → `inspect` → `stop` → `remove`) lisible, maintenable et plus simple à sécuriser avec `try/catch`.

### 3.2. Sécurisation des conteneurs (`cgroups`)
Pour protéger le serveur hôte (aspects **SER / Sec**), les conteneurs sont créés avec un objet `HostConfig` imposant des limites strictes au noyau Linux :
- `Memory: 268435456` (256 Mo) — limite de RAM.
- `NanoCpus: 500000000` (0.5 CPU) — limite de temps processeur.
- `PidsLimit: 100` — protection contre les attaques par *fork-bomb*.

---

## 4. Problèmes Rencontrés & Diagnostics Techniques

> Cette section documente les obstacles réels rencontrés et la démarche d'investigation menée pour les résoudre.

### 4.1. Incompatibilité de `ts-node` avec Node.js v24
- **Symptôme :** Lors de l'exécution des premiers scripts TypeScript via `npx ts-node index.ts`, une erreur bloquante est survenue (`TypeError: Cannot read properties of undefined (reading 'fileExists')`).
- **Cause :** L'environnement dispose de Node.js v24.18.0 et TypeScript 7, avec lesquels l'outil historique `ts-node` (v10.9.2) présente des incompatibilités internes.
- **Solution retenue :** Adoption de **`tsx`** (`TypeScript Execute`), un exécuteur moderne basé sur `esbuild`, beaucoup plus rapide et pleinement compatible avec Node.js v24.

### 4.2. Portabilité Docker & Virtualisation Imbriquée sur les postes ETML
- **Symptôme :** Sur les postes de travail scolaires (`OptiPlex 7010`), WSL2 n'est pas installé et l'installation est bloquée sans droits administrateur. De plus, une machine virtuelle Windows 11 sous VirtualBox échoue à lancer Docker Desktop (`Nested virtualization is not available`).
- **Cause :** La sécurité de l'hôte Windows (VBS / Hypervisor présent) bloque la virtualisation imbriquée nécessaire à WSL2 à l'intérieur d'une VM Windows.
- **Solution retenue :** Conception d'une VM Linux légère et portable (`LabBox-Linux` basée sur Alpine Linux `alpine-virt`) exécutant nativement le démon Docker sans virtualisation imbriquée, avec redirection de port NAT vers `127.0.0.1:2375`.

### 4.3. Limite `Memory` à `0` lors de l'inspection sous Docker Desktop (Windows)
- **Symptôme :** Dans le PoC 1, malgré la configuration explicite `HostConfig: { Memory: 268435456, NanoCpus: 500000000, PidsLimit: 100 }`, l'appel à `container.inspect()` retournait `Memoire: 0`, alors que `NanoCpus` (`500000000`) et `PidsLimit` (`100`) étaient bien appliqués.
- **Investigation :** L'exécution de la commande `docker info` a révélé les avertissements suivants :
  - `WARNING: No memory limit support`
  - `Cgroup Driver: cgroupfs (Cgroup Version: 1)` sur `Kernel Version: 6.18.33.2-microsoft-standard-WSL2` (Docker Desktop 4.10.0).
- **Conclusion :** Le code TypeScript et les appels à l'API Docker sont conformes. L'absence d'application de la limite mémoire vient uniquement de l'environnement Docker Desktop 4.10.0 sur ce noyau WSL2 récent. Sur le serveur de production Linux (Debian/Ubuntu) ou dans la VM `LabBox-Linux`, le contrôleur mémoire `cgroups` est actif nativement et appliquera la limite de 256 Mo.

### 4.4. Unicité des noms de conteneurs (HTTP 409 Conflict)
- **Symptôme :** La réexécution du script de test avec un nom fixe (`mon-conteneur`) échouait au second lancement.
- **Cause :** Un conteneur arrêté (`Exited`) conserve son nom réservé dans le démon Docker tant qu'il n'est pas supprimé.
- **Solution :** Implémentation systématique d'un cycle de vie complet (`stop` + `remove`) dans le PoC, et utilisation d'identifiants uniques pour les instances en production.

---

## 5. Tests & Validation
*(À compléter en Phase 6)*

## 6. Conclusion
*(À compléter en Phase 7)*
