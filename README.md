# Movie List PostgreSQL Prisma Backend

## Project Setup Guide

Welcome to the setup guide for creating a Node.js project with a PostgreSQL database using Prisma. This guide will help you get your project up and running, along with instructions on how to start your server and test it using Postman.

### Prerequisites

Before you get started, make sure you have the following prerequisites in place:

- Node.js and npm installed.
- PostgreSQL database installed and running.
- Postman for API testing.

### Step 1: Create an Environment File

1. Start by creating a `.env` file in the root of your project.

2. Define the necessary environment variables for your database connection. Here's an example of what your `.env` file should look like:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   ACCESS_TOKEN=your-secret-token
   ADMIN=admin@gmail.com
   ROOT=4000
   ```

### Step 2: Install Dependencies

Run the following command to install project dependencies:

```bash
npm install
```

### Step 3: Set Up Local PostgreSQL

Ensure that your local PostgreSQL server is up and running. You can use tools like pgAdmin or command-line utilities to manage your database.

### Step 4: Initialize Prisma

To set up Prisma in your project, run the following command:

```bash
 prisma init
```

This command will guide you through the setup process and generate Prisma configuration files.

### Step 5: Create Database Migrations

Generate database migrations by running the following command:

```bash
 prisma migrate dev
```

This will create migration files based on your Prisma schema.

### Step 6: Start the Server

Start your Node.js server locally by running:

```bash
npm start
```

Your server should now be up and running.

### Step 7: Testing API Requests with Postman

You can use Postman to send API requests to your local server for testing and development. Here's how to do it:

- Open Postman.
- Create a new request with the desired HTTP method (GET, POST, PUT, DELETE).
- Set the request URL to `http://localhost:your-port/your-endpoint`, where `your-port` is the port your server is running on, and `your-endpoint` is the specific API endpoint you want to test.
- Set headers, request body, and any other parameters required for your request.
- Click the "Send" button to make the request to your local server.

For a ready-to-use Postman collection, you can find it [here](https://api.postman.com/collections/19329162-ba65de6e-aafc-49f2-a987-faf4b53431ac?access_key=PMAT-01HDGR86JPF3ARYRAW0304G735).

Now you're all set to develop your Node.js project with a PostgreSQL database using Prisma! Happy coding!