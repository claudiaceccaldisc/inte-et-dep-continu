# TP Conteneurisation FastAPI + MySQL (CI/CD)

## Objectif
Ce projet consiste à conteneuriser une API **FastAPI** connectée à une base **MySQL** et à automatiser sa validation grâce à un pipeline **GitHub Actions**.  
Le pipeline vérifie que l’application fonctionne avant de publier l’image Docker sur **Docker Hub**.

---

## Architecture

API FastAPI (Docker)  
↓  
MySQL (Docker)  
↓  
Endpoint `/users`

---

## Structure du projet

```
inte-et-dep-continu
│
├ .github/workflows
│ └ docker-ci.yml
│
├ api
│ ├ main.py
│ ├ requirements.txt
│ ├ Dockerfile
│ └ .dockerignore
│
├ docker-mysql
│ ├ Dockerfile
│ └ sqlfiles
│   ├ migration-v001.sql
│   └ migration-v002.sql
│
└ README.md
```

---

## Dockerfile API

L’image est basée sur **python:3.11-alpine** afin de réduire la taille de l’image et améliorer la rapidité du build.

Une bonne pratique consiste à exécuter le conteneur avec un **utilisateur non-root** pour améliorer la sécurité.

```dockerfile
FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN adduser -D appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn","main:app","--proxy-headers","--host","0.0.0.0","--port","8000"]
```

---

## Pipeline CI/CD

Le pipeline GitHub Actions réalise automatiquement les étapes suivantes :

1. Build de l'image MySQL contenant les migrations SQL  
2. Build de l'image de l'API FastAPI  
3. Création d’un réseau Docker  
4. Lancement du conteneur MySQL  
5. Attente de l’initialisation de la base de données  
6. Lancement du conteneur API  
7. Test d’intégration via l’endpoint `/users`  

Si le test réussit, l’image Docker de l’API est automatiquement **publiée sur Docker Hub**.

---

## Test local

Une fois les conteneurs lancés :

curl http://localhost:8000/users

Réponse attendue :

{"utilisateurs":[[1,"Claudia","claudia@test.com"]]}

---

## Image Docker

https://hub.docker.com/r/claudiaynov/ynov-api

---

## Repository GitHub

https://github.com/claudiaceccaldisc/inte-et-dep-continu
