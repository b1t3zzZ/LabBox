# LabBox — Portail Self-Service de Conteneurs d'Apprentissage

[![ETML](https://img.shields.io/badge/ETML-P__Prod%20(130h)-blue)](https://www.etml.ch/)
[![Orientation](https://img.shields.io/badge/Orientation-DEV%20(D%C3%A9veloppement)-green)]()
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6)](https://www.typescriptlang.org/)

## 📌 Présentation du Projet
**LabBox** est une application web conçue dans le cadre du projet de production (P_Prod) de 2ème année en informatique à l'**ETML** (École Technique - École des Métiers de Lausanne).

La plateforme permet aux apprentis de déployer et d'accéder instantanément à des environnements d'apprentissage conteneurisés (Linux/Docker) directement depuis leur navigateur web via un terminal interactif, avec une politique stricte d'allocation de ressources et un nettoyage automatique après expiration du temps alloué (TTL).

---

## 🎯 Objectifs Pédagogiques & Techniques
- **DEV (Majeure) :** Architecture logicielle propre (Controllers / Services), programmation orientée objet en TypeScript, manipulation d'APIs asynchrones, communication temps-réel bidirectionnelle (WebSockets).
- **SER (Systèmes) :** Gestion du moteur Docker via Docker Socket (`/var/run/docker.sock`), cycle de vie des conteneurs, limitation fine des ressources système via les `cgroups` (CPU, RAM, PIDs).
- **NET (Réseaux) :** Isolation réseau des conteneurs (bridge dédié avec `icc=false`), multiplexage de flux de terminal via WebSocket.
- **Sec (Sécurité) :** Authentification robuste (JWT), prévention des dénis de service et attaques par fork-bomb (`PidsLimit: 100`), respect du principe de moindre privilège.

---

## 🛠️ Stack Technologique
- **Langage commun :** [TypeScript](https://www.typescriptlang.org/) (Frontend & Backend)
- **Backend :** Node.js, [Express](https://expressjs.com/), [Prisma ORM](https://www.prisma.io/), [Dockerode](https://github.com/apocas/dockerode), [ws](https://github.com/websockets/ws), [node-cron](https://github.com/node-cron/node-cron)
- **Base de données :** MariaDB
- **Frontend :** Vite, Vue 3 / React, TailwindCSS, [xterm.js](https://xtermjs.org/)
- **Infrastructure :** Docker Engine sur Linux (Debian / Ubuntu Server)

---

## 📂 Structure du Répertoire
```text
LabBox/
├── doc/                  # Documentation officielle ETML (Cahier des charges, Journal, Rapport)
├── poc/                  # Prototypes exploratoires (Tests Dockerode, WebSockets, xterm)
├── infra/                # Fichiers d'infrastructure (Dockerfiles des templates, configs)
├── backend/              # Serveur d'API REST & passerelle WebSocket
└── frontend/             # Application cliente web
```

---

## 📖 Documentation
Les documents officiels du projet sont disponibles dans le dossier [`doc/`](./doc/) :
- [Cahier des charges initial](./doc/cahier_des_charges.md)
- [Journal de bord / Journal de travail](./doc/journal_de_bord.md)
- [Planning prévisionnel & Suivi des 130h](./doc/planning.md)
