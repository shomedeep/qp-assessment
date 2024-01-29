npm init
npm i nodemon, express, body-parser, sequelize, mysql2

npm install -g sequelize-cli
sequelize init

on sql server: create database grocery_booking;


sequelize model:generate --name GroceryItem --attributes name:string,price:float,inventory:integer

sequelize db:migrate

sequelize model:generate --name OrderItem --attributes name:string,itemId:integer,quantity:integer

sequelize db:migrate


# to validate input parameters
npm i fastest-validator 

sequelize model:generate --name User --attributes name:string,email:string,password:string

sequelize db:migrate


# installing dependencies
npm i bcryptjs jsonwebtoken







