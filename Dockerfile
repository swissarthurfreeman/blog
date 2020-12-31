FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm prune --production

EXPOSE 4000

CMD ["npm", "start"]