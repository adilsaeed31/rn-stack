FROM node:latest
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY package.json ./

RUN npm install yarn -g

RUN yarn install

RUN yarn global add nodemon

RUN yarn global add sequelize-cli

CMD ["nodemon", "npm", "start"] 
