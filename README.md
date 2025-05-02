# Projet AEJ - Backend

## 📋 Description

Ce dépôt contient le **backend** de la plateforme de gestion de projets (NestJS + PostgreSQL) incluant :

* Création et suivi des projets
* Upload et stockage de documents (CNI, pièce d’identité, business plan)
* Génération de PDF et d’export Excel
* Envoi d’emails de notification (statut projet)
* Documentation Swagger

## 🚀 Fonctionnalités

1. **API REST NestJS**

   * Création, récupération, mise à jour de projets
2. **Gestion des fichiers**

   * Upload de 3 types de documents (CNI, pièce d’identité, plan d’affaires)
   * Stockage persistant dans Docker `/uploads`
3. **PDF**

   * `GET /projects/:id/pdf` → Génère un PDF récapitulatif du projet
4. **Excel**

   * `GET /projects/export/excel` → Exporte la liste des projets en XLSX
5. **Emails**

   * Envoi automatique lors de la mise à jour du statut (`Approuvé`, `Rejeté`)
6. **Validation & sécurité**

   * Pipes de validation (`class-validator`)
   * Protection contre les champs non whitelistés
7. **Documentation**

   * Swagger UI disponible sur `/api`

## 📦 Prérequis

* Docker & Docker Compose
* Node.js v18+ (pour développement lokal)
* Un fichier `.env` à la racine :

  ```dotenv
  # Database
  DATABASE_URL=postgresql://postgres:<password>@db:5432/aej?schema=public

  # Email
  EMAIL_HOST=smtp.example.com
  EMAIL_USERNAME=utilisateur
  EMAIL_PASSWORD=motdepasse
  EMAIL_FROM="AEJ" <noreply@aej.com>
  ```

## 💻 Installation

Suivez ces étapes pour installer le projet en local :

```bash
# 1. Cloner le dépôt
git clone https://github.com/Assamoi-Intelligence/aej-backend.git
cd backend

# 2. Créer le dossier 'uploads' pour les fichiers uploadés
mkdir uploads

# 3. Installer les dépendances Node.js (optionnel si vous utilisez Docker)
npm install
```

## 🚀 Lancement avec Docker Compose

Démarrez tous les services (API, base de données, pgAdmin) :

```bash
docker-compose up --build
```

> * Postgres : `localhost:5440`
> * pgAdmin : `http://localhost:5050`
> * API NestJS : `http://localhost:3000`
>
>   * Swagger UI : `http://localhost:3000/api`

## 🏃 Lancement en local (sans Docker)

```bash
# Assurez-vous de remplir .env et d'avoir un Postgres local
npm run start:dev
```

## 📝 Swagger

La documentation interactive est disponible sur :

```
http://localhost:3000/api
```

## 🛠 Commands utiles

* **Rebuild** :

  ```bash
  ```

docker-compose down --volumes && docker-compose up --build

````
- **Voir les logs** :
```bash
docker-compose logs -f backend
````

* **Shell dans le conteneur** :

  ```bash
  ```

docker-compose exec backend sh

```

## 📄 Licence
Ce projet est sous licence MIT. Nous contacter pour plus d’informations.


La documentation interactive est disponible sur :
```

[http://localhost:3000/api](http://localhost:3000/api)

````

## 🛠 Commands utiles

- **Rebuild** :
  ```bash
docker-compose down --volumes && docker-compose up --build
````

* **Logs** :

  ```bash
  ```

docker-compose logs -f backend

````
- **Shell dans le conteneur** :
```bash
docker-compose exec backend sh
````

## 📄 Licence

Ce projet est sous licence MIT. Nous contacter pour plus d’informations.
