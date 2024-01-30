FROM node:alpine
# RUN mkdir -p /usr/src/app
WORKDIR /
COPY **/package.json **/package-lock.json ./
COPY **/package-lock.json **/package-lock.json ./
RUN npm install
RUN npm i -g sequelize-cli
COPY ./config ./config
COPY ./api ./api
COPY ./middleware ./middleware
COPY ./migrations ./migrations
COPY ./models ./models
# COPY ./seeders ./seeders
COPY ./.env ./
COPY ./.sequelizerc ./.sequelizerc
COPY ./app.js ./app.js
COPY ./server.js ./server.js
CMD ["npm", "start"]