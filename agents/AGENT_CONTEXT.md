# AGENT_CONTEXT — LabBox (P_Prod ETML 130h)

> **IMPORTANT :** Ce fichier sert de mémoire persistante pour l'agent IA (Antigravity/Gemini) lors du changement de poste ou de session de travail. Il doit être lu en priorité au début de chaque nouvelle session.

---

## 1. Rôle et Règles de Conduite de l'Agent
- **Rôle :** Mentor technique personnel et enseignant senior en informatique à l'ETML (Lausanne, Suisse).
- **Projet :** P_Prod (Projet de Production, 2ème année Informatique), orientation visée : **DEV (Développement logiciel)**.
- **Budget horaire :** Exactement **130 heures**.
- **Règle absolue d'apprentissage :** 
  - L'apprenti écrit le code lui-même (« Pair Programming » / apprentissage pas-à-pas). L'agent explique d'abord le concept avec des analogies simples, propose des gabarits à trous ou de courts morceaux de code, et l'apprenti implémente et teste.
  - L'agent fait la revue de code (Code Review) et pose 1 à 2 questions de vérification de compréhension.
  - Langue d'échange : **Russe** pour les explications avec l'apprenti ; **Français** pour tout ce qui va dans les documents officiels ETML, les commentaires de code et les commits Git.
- **RÈGLE OBLIGATOIRE DE SYNCHRONISATION (CONSTANTE) :**
  - **Après CHAQUE tâche ou micro-étape validée**, l'agent DOIT AUTOMATIQUEMENT mettre à jour ce fichier `AGENT_CONTEXT.md` (mettre à jour la section 3 « État d'Avancement », recalculer les heures restantes et actualiser la section 4 « Ce Qu'il Faut Faire Immédiatement ») SANS que l'utilisateur n'ait besoin de le demander ou de le rappeler !
  - L'agent doit également proposer le message de commit Git correspondant pour sécuriser l'avancement.

---

## 2. Synthèse du Projet « LabBox »
Portail Self-Service de conteneurs d'apprentissage Docker légers avec terminal web interactif (`xterm.js` via WebSocket) et destruction automatique par TTL (Time-To-Live).

### Stack Technique validée :
- **Langage :** TypeScript (strict)
- **Backend :** Node.js (v24), Express (Controllers / Services), Prisma ORM, Dockerode, `ws` (WebSockets), `node-cron`
- **Frontend :** Vite + TypeScript + TailwindCSS + `xterm.js`
- **Base de données :** MariaDB (modélisée sous Merise avec Looping)
- **Outil d'exécution TypeScript :** `tsx` (ne pas utiliser `ts-node` qui est incompatible avec Node v24)
- **Sécurité & Système :** `cgroups` (RAM 256Mo, CPU 0.5), `PidsLimit: 100` (anti fork-bomb), réseau bridge isolé avec `icc=false`.

---

## 3. État d'Avancement Actuel

### Total consommé : 3.5 h / 130 h (Reste : 126.5 h)
- **Phase 1 (Analyse & Cadrage) :** 2.0 h
  - Structure Git monorepo initialisée (`d:\P_Prod\LabBox`).
  - Dépôt distant GitHub : `https://github.com/b1t3zzZ/LabBox.git` (branche `main`).
  - Cahier des charges avec 8 User Stories rédigé (`doc/cahier_des_charges.md`).
  - Journal de bord et planning prévisionnel initialisés (`doc/journal_de_bord.md`, `doc/planning.md`).
- **Phase 3 (Conception BDD — anticipée) :** 0.5 h
  - Modèle Conceptuel (MCD) et Modèle Logique (MLD) créés par l'apprenti avec Looping (`doc/conception/`). 4 tables : `User`, `Template`, `Instance`, `AuditLog`. Cardinalités corrigées et validées.
- **Phase 2 (Bacs à sable / PoC) :** 1.0 h (En cours)
  - Dossier `poc/poc-docker/` créé avec TypeScript et `tsx`.
  - Connexion au Docker Socket Windows réussie.
  - **L'apprenti a écrit lui-même** le code de connexion, de listage des conteneurs (`docker.listContainers`), de création (`docker.createContainer`) avec l'image `alpine` et de démarrage (`container.start()`).
  - Notion comprise : unicité des noms de conteneurs Docker et gestion du cycle de vie (création vs suppression).

---

## 4. Ce Qu'il Faut Faire Immédiatement (Prochaine séance)
1. **Terminer le PoC 1 (Cycle de vie & Sécurité dans Dockerode) :**
   - Implémenter le nettoyage automatique dans `index.ts` : temporisation de 5 secondes, arrêt (`await container.stop()`) et suppression (`await container.remove()`).
   - Tester l'application des limites de sécurité **cgroups** lors du `createContainer` :
     - `HostConfig: { Memory: 256 * 1024 * 1024, NanoCpus: 500000000, PidsLimit: 100 }`.
2. **Démarrer le PoC 2 (WebSocket & xterm.js) :**
   - Transmettre un flux interactif de shell (stdin/stdout) depuis le conteneur Docker vers un terminal web.
3. **Mettre à jour le Journal de bord (`doc/journal_de_bord.md`) et commiter sur Git.**

---

## 5. Commandes Utiles & Astuces Environnement
- **Lancer un script TypeScript :** `npx.cmd tsx <fichier.ts>`
- **Docker Socket Windows :** `//./pipe/docker_engine`
- **Docker Socket Linux :** `/var/run/docker.sock`
- **Gestion des scripts PowerShell bridés :** Toujours utiliser `npm.cmd` et `npx.cmd` au lieu de `npm`/`npx`.
