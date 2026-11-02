# Cahier des charges — Projet « LabBox »

- **Auteur :** Apprenti Informaticien (2ème année)
- **Établissement :** ETML (École Technique - École des Métiers de Lausanne)
- **Module / Épreuve :** Projet de Production (P_Prod)
- **Volume horaire :** 130 périodes
- **Orientation visée :** Développement d'applications (DEV)
- **Version :** 1.0 (Initial)

---

## 1. Contexte et Problématique
Dans le cadre de l'apprentissage informatique à l'ETML, les apprentis doivent régulièrement exécuter des travaux pratiques nécessitant des environnements Linux configurés (Python, bases de données, outils réseau). Actuellement, la mise en place de machines virtuelles locales (VMware / VirtualBox) présente plusieurs inconvénients :
- Consommation élevée de ressources disques et RAM sur les postes clients.
- Temps de configuration long et disparités de configuration entre les étudiants.
- Risque d'oubli de machines virtuelles actives surchargeant les hyperviseurs.

**LabBox** répond à ce besoin en offrant un portail web en libre-service (*Self-Service Portal*). Chaque étudiant peut démarrer en un clic un bac à sable (conteneur Docker isolé), y accéder directement via un terminal interactif dans son navigateur, et voir ses ressources nettoyées automatiquement après l'expiration de son temps de travail.

---

## 2. Objectifs du Projet

### 2.1. Objectifs Principaux
1. Permettre aux utilisateurs authentifiés de choisir un environnement parmi un catalogue de 3 modèles (*Alpine Sandbox*, *Ubuntu Python*, *MariaDB TP*).
2. Fournir un accès direct en ligne de commande via le navigateur avec un émulateur de terminal interactif (`xterm.js` via WebSocket).
3. Garantir la sécurité du serveur hôte via des restrictions strictes de ressources (*cgroups*, limitation de processus à 100 contre les *fork-bombs*).
4. Assurer l'isolation réseau entre les conteneurs des étudiants (`icc=false`).
5. Automatiser le cycle de vie des conteneurs via un mécanisme de suppression par expiration de durée de vie (*Time-To-Live / TTL*).

### 2.2. Objectifs d'Apprentissage (Orientation DEV)
- Maîtriser l'écosystème **TypeScript** de bout en bout (typage statique strict, POO).
- Concevoir une architecture Backend propre en couches (Contrôleurs, Services, Accès aux données).
- Manipuler des flux asynchrones complexes (Streams Node.js, WebSockets bidirectionnels).
- Exploiter une API système bas-niveau (Docker Engine API via Socket Unix/Named Pipe).

---

## 3. Périmètre du Projet (Scope)

### 3.1. Dans le périmètre (In-Scope — Livrables obligatoires / MVP)
- [x] **Authentification & Gestion des rôles :** Connexion sécurisée (JWT), rôles `Student` et `Admin`.
- [x] **Gestion des quotas :** Limite stricte de 2 conteneurs actifs simultanés par étudiant.
- [x] **Catalogue de templates :** Déploiement de 3 images spécifiques préparées avec `Dockerfile`.
- [x] **Cycle de vie du conteneur :** Démarrage, arrêt manuel, suppression manuelle et suppression automatique par tâche de fond planifiée (`node-cron`).
- [x] **Console web interactive :** Connexion shell interactive (TTY + Stdin/Stdout) intégrée au navigateur.
- [x] **Espace d'administration :** Visualisation de l'ensemble des conteneurs actifs sur l'hôte et arrêt forcé.

### 3.2. Hors périmètre (Out-of-Scope — Risques de dépassement des 130h)
- ❌ Stockage persistant complexe sur volumes distants partagés (NFS/Ceph).
- ❌ Intégration LDAP/Active Directory de l'école (l'authentification reste locale dans la base du projet).
- ❌ Émulation graphique (VNC / RDP dans le navigateur).
- ❌ Clustering multi-nœuds (Kubernetes ou Docker Swarm).

---

## 4. Spécifications Fonctionnelles (User Stories)

| Réf. | En tant que... | Je souhaite... | Afin de... | Critère d'acceptation |
| :--- | :--- | :--- | :--- | :--- |
| **US-01** | Étudiant | Me connecter avec mon identifiant et mot de passe | Accéder à mon espace personnel | Un token JWT valide est retourné en cas de succès. |
| **US-02** | Étudiant | Consulter le catalogue des environnements | Choisir un environnement adapté à mon TP | 3 templates s'affichent avec leur description. |
| **US-03** | Étudiant | Démarrer un conteneur en un clic | Obtenir immédiatement un bac à sable fonctionnel | Le conteneur démarre en < 5s si l'image est locale et si le quota ≤ 2. |
| **US-04** | Étudiant | Ouvrir le terminal dans mon navigateur | Exécuter des commandes sans installer de logiciel client | Les frappes au clavier et sorties de commande s'affichent en temps réel. |
| **US-05** | Étudiant | Voir le temps restant avant suppression | Sauvegarder mon travail avant la coupure | Un décompte visuel est affiché sur le tableau de bord. |
| **US-06** | Système | Supprimer automatiquement les conteneurs expirés | Libérer la mémoire vive et le disque du serveur | Une tâche périodique nettoie les instances avec `expiresAt < now`. |
| **US-07** | Administrateur | Visualiser tous les conteneurs en cours d'exécution | Surveiller la charge globale de la machine | Une table récapitulative liste l'ensemble des conteneurs et leur propriétaire. |
| **US-08** | Administrateur | Forcer l'arrêt/suppression d'un conteneur | Intervenir en cas d'abus ou de saturation | Bouton d'action immédiate avec trace dans les journaux d'audit. |

---

## 5. Spécifications Techniques & Sécurité

### 5.1. Sécurité Système et Isolation (SER / Sec)
- **Cgroups Memory :** Limite fixée à 256 Mo par conteneur.
- **Cgroups CPU :** Limite fixée à 0.5 cœur (50% d'un CPU).
- **Protection Fork-Bomb :** `PidsLimit = 100` (bloque la création infinie de processus récursifs).
- **Sécurité réseau (NET) :** Réseau Docker de type `bridge` dédié avec option `com.docker.network.bridge.enable_icc=false` (empêche le scan ou le sniffing réseau entre conteneurs étudiants).

### 5.2. Architecture Données (Prisma / MariaDB)
Quatre tables principales :
1. `User` (id, username, passwordHash, role, createdAt)
2. `Template` (id, name, description, dockerImage, defaultDurationMinutes)
3. `Instance` (id, userId, templateId, containerId, status, createdAt, expiresAt)
4. `AuditLog` (id, userId, action, details, timestamp)

---

## 6. Critères d'Évaluation et Validation
Le projet sera considéré comme réussi si :
1. Les 8 User Stories du périmètre sont validées par des tests documentés.
2. Une démonstration en direct de la protection anti-fork-bomb est exécutée avec succès sans impact sur le serveur hôte.
3. Le code source est structuré selon les normes DEV (TypeScript strict, séparation en couches, documentation du code).
4. Le dossier documentaire (Rapport technique de ~25-35 pages) respecte la charte graphique de l'ETML.
