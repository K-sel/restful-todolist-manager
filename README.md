# Application Todo Multi-Utilisateur

Cette application front-end Todo permet à plusieurs utilisateurs de gérer leurs tâches en ligne grâce à une API REST. Ce projet a été conçu pour approfondir les compétences en programmation web, avec une forte emphase sur la programmation asynchrone, la sécurité des échanges client-serveur, et les bonnes pratiques de développement.

## Fonctionnalités principales

- **Inscription et authentification sécurisée via JWT**
- **Ajout, affichage et suppression de tâches**
- **Gestion des requêtes HTTP avec `async/await`**
- **Respect des principes RESTful pour les communications réseau**

## Objectifs pédagogiques

- Comprendre et appliquer les concepts de la programmation asynchrone en JavaScript
- Manipuler des API REST avec des requêtes HTTP (GET, POST, DELETE)
- Gérer des opérations sécurisées avec les JSON Web Tokens (JWT)
- Créer des interfaces utilisateurs réactives pour des applications web interactives
- Renforcer les compétences en gestion d’erreurs et en optimisation du code

## Technologies utilisées

- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Fetch API**
- **JSON pour les échanges de données**
- **Postman pour tester les requêtes API**

## API utilisée

L'application interagit avec une API REST disponible à l'adresse suivante :
```
https://progweb-todo-api.onrender.com
```

### Endpoints principaux

- **POST** `/auth/register` : inscription des utilisateurs
- **POST** `/auth/login` : connexion des utilisateurs
- **GET** `/todos` : récupérer la liste des tâches
- **POST** `/todos` : créer une nouvelle tâche
- **DELETE** `/todos/:id` : supprimer une tâche

## Guide d’utilisation

1. **Inscription et connexion :**
   - Créez un compte avec une adresse e-mail et un mot de passe.
   - Connectez-vous pour accéder à vos tâches.

2. **Gestion des tâches :**
   - Ajoutez de nouvelles tâches via le formulaire dédié.
   - Visualisez les tâches déjà créées.
   - Supprimez les tâches obsolètes.

## Points forts techniques

- **Asynchronisme simplifié avec `async/await` :** Permet une gestion fluide des requêtes réseau.
- **JWT pour la sécurité :** Garantit une authentification sécurisée et maintient la confidentialité des données utilisateur.
- **Respect des normes REST :** Assure des échanges structurés et cohérents entre le client et le serveur.

## Ressources supplémentaires

- [Documentation de l'API (Swagger)](https://progweb-todo-api.onrender.com/swagger)
- [Principes de l'architecture REST](https://developer.mozilla.org/fr/docs/Glossary/REST)
- [Guide JSON Web Tokens (JWT)](https://jwt.io/)

---

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des *issues* ou à proposer des *pull requests* pour améliorer ce projet.
