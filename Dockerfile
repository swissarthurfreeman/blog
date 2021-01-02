FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install && npm prune --production

COPY . .

VOLUME [ "/usr/src/app/uploads" ]

EXPOSE 4000

CMD ["npm", "start"]