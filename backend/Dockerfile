FROM node:latest
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY package.json ./

RUN npm install

RUN npm install nodemon -g

CMD ["nodemon", "npm", "start"]

