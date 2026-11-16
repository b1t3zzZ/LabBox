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

### Total consommé : 6.0 h / 130 h (Reste : 124.0 h)
- **Phase 1 (Analyse & Cadrage) :** 2.0 h
  - Structure Git monorepo initialisée (`e:\P_Prod\LabBox`).
  - Dépôt distant GitHub : `https://github.com/b1t3zzZ/LabBox.git` (branche `main`).
  - Cahier des charges avec 8 User Stories rédigé (`doc/cahier_des_charges.md`).
  - Journal de bord, planning et brouillon du rapport technique initialisés (`doc/journal_de_bord.md`, `doc/planning.md`, `doc/rapport.md`).
- **Phase 3 (Conception BDD — anticipée) :** 0.5 h
  - Modèle Conceptuel (MCD) et Modèle Logique (MLD) créés par l'apprenti avec Looping (`doc/conception/`). 4 tables : `User`, `Template`, `Instance`, `AuditLog`. Cardinalités corrigées et validées.
- **Phase 2 (Bacs à sable / PoC & Infrastructure portable) :** 3.5 h (En cours)
  - **PoC 1 (`poc/poc-docker/`) — TERMINÉ :**
    - Cycle de vie complet en `async/await` (`listContainers`, `createContainer`, `start`, pause, `inspect`, `stop`, `remove`).
    - Limites `HostConfig` implémentées par l'apprenti : `Memory: 268435456`, `NanoCpus: 500000000`, `PidsLimit: 100`.
    - Constatation technique importante pour le rapport : sur le poste Windows avec Docker Desktop 4.10.0 + WSL2 kernel 6.18 (`cgroupfs v1`), `docker info` signale `WARNING: No memory limit support`, donc `Memory` retourne `0` localement alors que `NanoCpus` et `PidsLimit` sont bien appliqués (ceci sera pleinement actif sur le serveur Linux / VM `LabBox-Linux`).
  - **Diagnostic d'infrastructure sur les postes ETML (`OptiPlex 7010`) :**
    - Les postes scolaires n'ont pas WSL installé par défaut et bloquent l'installation sans droits administrateur.
    - Une VM Windows 11 (`LabBox-Docker`) sous VirtualBox ne peut pas exécuter Docker Desktop/WSL 2 car la sécurité Windows de l'hôte (`HypervisorPresent: True` / VBS) empêche la virtualisation imbriquée (`Nested virtualization is not available`).
  - **Mise en place d'une VM Linux portable (`LabBox-Linux`) sur le disque externe :**
    - Téléchargement de `alpine-virt-3.21.3-x86_64.iso` (63 Mo) dans `ISO/`.
    - Création et configuration de la VM VirtualBox `LabBox-Linux` (2 Go RAM, 2 CPU, disque 8 Go, contrôleur graphique `VBoxVGA`).
    - Configuration des redirections de ports NAT : `127.0.0.1:2375 -> 2375` (API Docker TCP) et `127.0.0.1:2222 -> 22` (SSH).
    - Mise à jour de `.gitignore` pour exclure les dossiers lourds (`ISO/`, `LabBox-Docker/`, `LabBox-Linux/`, `*.iso`, `*.vdi`, `*.vbox*`).

---

## 4. Ce Qu'il Faut Faire Immédiatement (Prochaine séance)
1. **Démarrer le PoC 2 (`poc/poc-websocket/` — WebSocket & xterm.js) :**
   - Initialiser `poc/poc-websocket/` avec TypeScript, `tsx`, `ws`, `@types/ws`, `dockerode`.
   - Comprendre le concept de `attach` / `exec` en stream bidirectionnel (`stdin` / `stdout`) sur un conteneur Docker.
   - Connecter un mini serveur WebSocket à un conteneur `alpine` (`sh`) puis afficher un terminal interactif `xterm.js` dans une page HTML simple.
2. **Finaliser `LabBox-Linux` (quand sur poste ETML sans Docker Desktop) :**
   - Terminer l'installation d'Alpine + Docker TCP `0.0.0.0:2375` si besoin sur les PC scolaires.

---

## 5. Commandes Utiles & Astuces Environnement
- **Lancer un script TypeScript :** `npx.cmd tsx <fichier.ts>`
- **Docker via VM Linux (`LabBox-Linux`) :** `new Docker({ host: '127.0.0.1', port: 2375 })`
- **Docker Socket Windows :** `//./pipe/docker_engine`
- **Docker Socket Linux :** `/var/run/docker.sock`
- **Gestion des scripts PowerShell bridés :** Toujours utiliser `npm.cmd` et `npx.cmd` au lieu de `npm`/`npx`.
