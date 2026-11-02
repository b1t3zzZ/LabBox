# Planning Prévisionnel & Suivi des 130 Heures

Ce document détaille la répartition des 130 périodes du projet de production (P_Prod) selon les phases officielles de gestion de projet à l'ETML.

---

## 1. Répartition Globale des Heures

| Phase | Description de la Phase | Heures Prévues | Heures Réalisées | Statut |
| :---: | :--- | :---: | :---: | :---: |
| **Phase 1** | Analyse, Cahier des charges et Planification | 12 h | 2.0 h | En cours |
| **Phase 2** | Étude préalable, auto-formation et PoC (Bacs à sable) | 24 h | 0 h | À venir |
| **Phase 3** | Conception détaillée (Architecture, MCD/MLD, Wireframes) | 14 h | 0 h | À venir |
| **Phase 4** | Réalisation Backend & Infrastructure Docker | 36 h | 0 h | À venir |
| **Phase 5** | Réalisation Frontend & Intégration Terminal | 22 h | 0 h | À venir |
| **Phase 6** | Tests, Recette et Déploiement serveur | 10 h | 0 h | À venir |
| **Phase 7** | Rapport final de projet et préparation soutenance orale | 12 h | 0 h | À venir |
| **TOTAL** | | **130 h** | **2.0 h** | **Avancement : 1.5%** |

---

## 2. Détail par Lots de Travail (Work Packages)

### Phase 1 : Analyse & Cadrage (12 h)
- [x] Initialisation du dépôt Git et formalisme des commits (1h)
- [x] Rédaction du Cahier des charges et User Stories (US-01 à US-08) (2h)
- [ ] Analyse des risques et matrice de criticité (2h)
- [ ] Diagramme de Gantt prévisionnel et jalons (3h)
- [ ] Validation officielle de la fiche thématique par l'enseignant répondant (4h)

### Phase 2 : Auto-formation & Preuves de Concept (PoC) (24 h)
- [ ] Découverte de l'outillage TypeScript / Node.js moderne (6h)
- [ ] PoC 1 : Dialogue avec Docker Engine via `dockerode` (création, démarrage, suppression) (10h)
- [ ] PoC 2 : Émulation du terminal interactif (`xterm.js` + WebSocket) (8h)

### Phase 3 : Conception (14 h)
- [ ] Modélisation de la base de données (MCD / MLD avec Merise) (5h)
- [ ] Conception de l'architecture réseau Docker (`bridge`, isolation `icc=false`) (3h)
- [ ] Conception de l'API REST (endpoints, codes HTTP, formats JSON) (3h)
- [ ] Wireframes des écrans (Maquettes UI/UX) (3h)

### Phase 4 : Développement Backend & Docker (36 h)
- [ ] Modèles Prisma ORM, migrations et seeds de données (5h)
- [ ] Module d'authentification JWT & Middleware de contrôle d'accès (6h)
- [ ] `DockerService` : encapsulation du cycle de vie des conteneurs avec `cgroups` (12h)
- [ ] Passerelle WebSocket pour le stream du terminal (7h)
- [ ] Planificateur Cron pour l'expiration automatique (TTL) (4h)
- [ ] Endpoints d'administration et journalisation d'audit (2h)

### Phase 5 : Développement Frontend (22 h)
- [ ] Structure Vite + TypeScript + TailwindCSS et router (4h)
- [ ] Page de connexion et gestion du token JWT (3h)
- [ ] Catalogue des templates et actions de lancement (5h)
- [ ] Composant Terminal (`xterm.js` connecté au WebSocket) (6h)
- [ ] Tableau de bord d'administration (4h)

### Phase 6 : Tests & Déploiement (10 h)
- [ ] Tests unitaires critiques (vérification des quotas et du TTL) (4h)
- [ ] Test d'intrusion et de résistance (démonstration anti-fork-bomb) (2h)
- [ ] Déploiement sur serveur Debian/Ubuntu derrière Nginx (Reverse Proxy) (4h)

### Phase 7 : Clôture & Présentation (12 h)
- [ ] Rédaction du rapport technique final ETML (8h)
- [ ] Préparation du diaporama et répétition de la soutenance (4h)
