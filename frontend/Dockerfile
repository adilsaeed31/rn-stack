FROM node:latest as base
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY package.json ./

FROM base as development
ENV NODE_ENV development
RUN npm install
CMD ["npm", "start"]

FROM base as production
ENV NODE_ENV=production
RUN npm install --production
CMD ["npm", "run", "build"]
