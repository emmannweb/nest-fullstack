FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

RUN npm run build
COPY . .


CMD [ "npm ", "run", "start:prod" ]