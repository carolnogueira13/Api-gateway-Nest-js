FROM node:22.11.0-alpine
WORKDIR /home/node/api

COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY . .


EXPOSE 3000
CMD ["npm", "run", "start:prod"]