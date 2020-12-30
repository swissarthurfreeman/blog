FROM node:latest

WORKDIR /usr/src/app

COPY package*.json /urs/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 4000

CMD ["npm", "start"]