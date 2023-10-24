# movie_list_postgre_prisma_backend

# Project Setup Guide

This guide will walk you through setting up a Node.js project with a PostgreSQL database using Prisma. It also includes instructions for running your server and testing it with Postman.

## Prerequisites

- Node.js and npm installed.
- PostgreSQL database installed and running.
- Postman for API testing.

## Step 1: Create an Environment File

1. Create a `.env` file in the root of your project.

2. Define the environment variables for your database connection. Here's an example:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   ACCESS_TOKEN=required string
   ADMIN=admin@gmail.com
   ROOT=4000

## Step 2: Install dependencies
- npm install

## Step 3 : Set Up Local PostgreSQL
- Ensure that your local PostgreSQL server is running. You can use a tool like pgAdmin or command line utilities to manage your database

## Step 4: Initialize Prisma
- Run the following command to initialize Prisma in your project:
1. "prisma init " - This command will guide you through the setup process and generate Prisma configuration files.

## Step 5: Create Database Migrations
Generate database migrations by running the following command:

 "prisma migrate dev" - This will create migration files based on your Prisma schema.

 ## Step 6: Start the Server
Start your Node.js server by running:

"npm start" - The server should now be running locally.

## Step 7: Testing API Requests with Postman
https://api.postman.com/collections/19329162-ba65de6e-aafc-49f2-a987-faf4b53431ac?access_key=PMAT-01HDGR86JPF3ARYRAW0304G735


- You can use Postman to send API requests to your local server for testing and development.

- Open Postman.
- Create a new request with the desired HTTP method (GET, POST, PUT, DELETE).
- Set the request URL to http://localhost:your-port/your-endpoint, where your-port is the port your server is running on, and your-endpoint is the specific API endpoint you want to test.
- Set headers, request body, and any other parameters required for your request.
- Click the "Send" button to make the request to your local server.

