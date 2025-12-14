# Utiliser une image légère Node.js
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du code
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 5000

# CapRover injecte automatiquement les variables d'environnement configurées dans le dashboard

# Lancer l'application
CMD ["npm", "start"]
