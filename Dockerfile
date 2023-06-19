# Etape 1 : Construire l'application
FROM node:lts as builder

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances de l'application
RUN yarn install

# Construire l'application
RUN yarn build

# Etape 2 : Préparer l'image de NGINX
FROM nginx:stable-alpine

# Copier l'application construite à partir de l'étape de construction
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier le fichier de configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour NGINX
EXPOSE 80
EXPOSE 443

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
