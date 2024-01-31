# Grocery Booking API

This repository contains the code for a Grocery Booking API built with Node.js, Express.js, Sequelize, and MySQL.

## Setup Instructions

```bash
# Initialize npm project
npm init

# Install dependencies
npm install nodemon express body-parser sequelize mysql2 sequelize-cli fastest-validator bcryptjs jsonwebtoken

# Database Setup
Create a MySQL database named grocery_booking on your SQL server.

# Initialize Sequelize project
sequelize init

# Generate GroceryItem model
sequelize model:generate --name GroceryItem --attributes name:string,price:float,inventory:integer

# Run migrations
sequelize db:migrate

# Generate OrderItem model
sequelize model:generate --name OrderItem --attributes name:string,itemId:integer,quantity:integer

# Run migrations
sequelize db:migrate

# Generate User model
sequelize model:generate --name User --attributes name:string,email:string,password:string

# Run migrations
sequelize db:migrate

# Install validation library
npm install fastest-validator

# Install bcryptjs and jsonwebtoken for authentication
npm install bcryptjs jsonwebtoken

# If you're using Docker:
Install Docker and Docker Compose
Run docker-compose up to start the containers.
