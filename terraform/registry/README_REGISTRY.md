# Registre Docker privé AWS

## Infos utiles

- EC2 dédiée au registre
- IP publique : 13.38.244.45
- URL registre : 13.38.244.45:443
- HTTPS via Nginx
- Authentification par mot de passe
- Déploiement validé avec Terraform + Ansible

## Services déployés

- registry
- registry-ui
- nginx

## Usage

- docker login 13.38.244.45:443
- push/pull via HTTPS
