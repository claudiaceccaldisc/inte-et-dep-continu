# inte-et-dep-continu

## Objectif du projet

Dans le cadre du TP d'Intégration et Déploiement Continu, j'ai mis en
place :

-   Une publication automatique sur **npm**
-   Une gestion des versions avec **Semantic Versioning**
-   Un pipeline **CI/CD avec GitHub Actions**
-   Une logique de publication conditionnelle (bypass intelligent)

L'objectif était de simuler un workflow professionnel complet : build →
test → publish → deploy.

------------------------------------------------------------------------

## Package NPM

Le package est disponible publiquement sur npm :

 https://www.npmjs.com/package/claudia-ynov-react-form

Installation :

npm install claudia-ynov-react-form

------------------------------------------------------------------------

## Semantic Versioning

Le projet utilise le versioning sémantique :

MAJOR.MINOR.PATCH

Exemples réalisés dans ce TP :

-   0.1.2 → patch
-   0.2.0 → minor
-   1.0.0 → major

Commandes utilisées :

npm version patch\
npm version minor\
npm version major

Chaque version crée automatiquement :

-   Un commit
-   Un tag Git
-   Un déclenchement du workflow CI/CD

------------------------------------------------------------------------

## Pipeline CI/CD

Le workflow GitHub Actions contient trois jobs en cascade :

1.  build-and-test
    -   Installation des dépendances
    -   Lancement des tests
    -   Build du projet
2.  publish-npm
    -   Vérification de la différence entre la version locale et celle
        publiée sur npm
    -   Publication uniquement si la version a changé
    -   Utilisation sécurisée du NPM_TOKEN
3.  deploy
    -   Étape simulée de déploiement

La publication est conditionnelle grâce à un contrôle :

npm view `<package-name>`{=html} version

Si la version est identique → publication ignorée.\
Si la version est différente → publication automatique.

------------------------------------------------------------------------

## Sécurité

La publication npm utilise un token sécurisé :

NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}

Le token est stocké dans les Secrets GitHub et n'est jamais exposé.

------------------------------------------------------------------------

## Validation du bypass

Test réalisé :

-   Modification du README sans changement de version
-   Workflow exécuté
-   Étape Publish to NPM ignorée

Puis :

-   npm version patch
-   Publication déclenchée automatiquement

------------------------------------------------------------------------

## Technologies utilisées

-   React
-   Babel
-   GitHub Actions
-   npm
-   Semantic Versioning

------------------------------------------------------------------------

## Conclusion

Ce TP m'a permis de mettre en place un pipeline CI/CD complet avec :

-   Gestion automatisée des versions
-   Publication conditionnelle sur npm
-   Sécurisation via token
-   Organisation des jobs avec needs

Le projet reproduit un workflow professionnel utilisé en environnement
réel.
