FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

RUN npm run build

COPY . .

CMD [ "node", "dist/main.js" ]