# Architecture finale

## EC2 1 — Registre Docker privé

- héberge le registre privé Docker
- sécurisé avec Nginx
- HTTPS / SSL
- authentification par mot de passe

## EC2 2 — Projet applicatif

- hébergera frontend
- backend
- base de données
- adminer

## Pipeline

- build des images
- push sur le registre privé
- provisionnement EC2 applicative
- génération inventory.ini
- déploiement Ansible
- tests finaux
