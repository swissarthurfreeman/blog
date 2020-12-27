
#je prends l'image de node (locale)
FROM node:latest

#creates a folder /app in filesystem of container
#which will contain all files from cwd. (folder of project)
COPY . /app

#par défaut on est a la racine, faut mettre ou
#notre projet est.
WORKDIR /app

#a la creation de l'image on execute ce qui suit run.
RUN npm install

#afin de lancer node par défaut on peux utiliser
#entrypoint ou CMD (lire la doc)
CMD ["npm", "start"]

#on crée l'image avec docker build.
