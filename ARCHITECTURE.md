# Architecture finale - TP Final DevOps

## Vue d’ensemble
Le projet repose sur deux infrastructures AWS distinctes en région `eu-west-3` :

1. une EC2 dédiée au registre Docker privé
2. une EC2 dédiée à la stack applicative

L’objectif final est un déploiement “zero touch” déclenché depuis une pipeline GitHub Actions manuelle (`workflow_dispatch`), sans configuration humaine du serveur cible après provisionnement.

## 1. EC2 Registre Docker privé
- Rôle : héberger les images Docker privées du projet
- IP publique : `35.181.151.223`
- Accès : HTTPS
- Services :
  - registre Docker privé
  - interface web du registre
  - reverse proxy Nginx
- Sécurité :
  - authentification au registre
  - TLS/HTTPS
  - accès utilisé par la pipeline et par l’EC2 applicative

## 2. EC2 Applicative
- Rôle : héberger l’application
- IP publique : dynamique (exemple lors des tests : `13.38.93.187`)
- OS : Ubuntu LTS
- User SSH : `ubuntu`

### Services déployés
- Frontend
- Backend API
- MySQL
- Adminer

### Exposition réseau
Services publics :
- Frontend : port `3000`
- API : port `8000`

Services non publics :
- MySQL : non exposé publiquement
- Adminer : accessible uniquement en local serveur / tunnel SSH

## 3. Déploiement applicatif
La stack applicative est déployée via Docker Compose de production.

En production :
- le frontend est tiré depuis le registre privé
- le backend est tiré depuis le registre privé
- la base MySQL tourne sur l’EC2 applicative
- Adminer reste non public

Images utilisées :
- `35.181.151.223:443/frontend:latest`
- `35.181.151.223:443/backend:latest`

## 4. Chaîne CI/CD cible
Le workflow GitHub Actions doit exécuter séquentiellement :

1. build et push des images Docker vers le registre privé
2. provisionnement Terraform de l’EC2 applicative
3. récupération des outputs Terraform :
   - IP publique
   - clé privée
4. génération dynamique d’un `inventory.ini`
5. exécution du playbook Ansible applicatif
6. validation finale avec des `curl`

## 5. Sécurité
- aucune clé AWS ne doit être commitée
- aucune clé SSH ne doit être commitée
- aucun mot de passe ne doit être écrit en dur dans le code versionné
- les secrets doivent être fournis via GitHub Secrets

## 6. État validé à ce jour
- Registry privé opérationnel sur `35.181.151.223`
- EC2 applicative opérationnelle (IP dynamique générée par Terraform)
- Frontend accessible publiquement
- API accessible publiquement
- Adminer non public
- MySQL non public
- Images applicatives présentes dans le bon registre privé

## 7. Arborescence logique attendue
- `.github/` : pipeline CI/CD
- `terraform/` : provisionnement AWS
- `ansible/` : configuration et déploiement applicatif
- documentation :
  - `ARCHITECTURE.md`
  - `.env.sample`
  - `rendu.txt`
