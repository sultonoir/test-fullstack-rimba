# Setup Guide for Docker, Prisma, and Jest Tests

This guide provides instructions to set up your environment using Docker, Prisma ORM, and running Jest tests for your API.

## Prerequisites

- Docker installed on your machine.
- Node.js installed (for running Jest tests).
- Docker Compose (optional for managing multiple containers).

## Step 1: Setting up Docker for the application

Create a `Dockerfile` for your application:

### `Dockerfile`

```dockerfile
# Use official Node.js image as a base
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port
EXPOSE 5001

# Run the app
CMD ["npm", "run", "dev"]
```

### Step 2: Docker Compose Setup (Optional)

If you want to set up a Docker Compose for easier management of services, create a `docker-compose.yml` file:

### `docker-compose.yml`

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5001:5001"
    environment:
      - PORT=5001
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Step 3: Prisma Setup

1. Install Prisma and initialize it:

```bash
npm install prisma @prisma/client
npx prisma init
```

2. Update the `DATABASE_URL` in `.env` to match the Docker database settings:

### `.env`

```dotenv
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
```

3. Create your Prisma schema in `prisma/schema.prisma` (assuming the schema is for users):

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
  age   Int
}
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Generate the Prisma client:

```bash
npx prisma generate
```

### Step 4: Running the Application with Docker

Run the Docker containers:

```bash
docker-compose up --build
```

This will start your app and PostgreSQL database in separate containers.

### Step 5: Testing with Jest

1. Install Jest and supertest for testing:

```bash
npm install jest supertest
```

2. Create a Jest configuration file (`jest.config.js`):

### `jest.config.js`

```js
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
```

3. Create a Jest setup file (`jest.setup.js`) to enable environment variables for tests:

### `jest.setup.js`

```js
require("dotenv").config();
```

4. Create test files for your routes (e.g., `user.test.ts`):

### `src/tests/user.test.ts`

```ts
import request from "supertest";
import app from "../index"; // Assuming app is exported from index.ts

describe("User API", () => {
  let userId: string;

  it("should fetch all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
    };

    const response = await request(app)
      .post("/users")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    userId = response.body.id; // Store userId for other tests
  });

  it("should fetch a user by ID", async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it("should update a user by ID", async () => {
    const updatedUser = {
      name: "John Updated",
      email: "john.updated@example.com",
      age: 35,
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
  });

  it("should delete a user by ID", async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });
});
```

5. Add test script to `package.json`:

### `package.json`

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Step 6: Running Jest Tests

To run your tests, simply execute the following:

```bash
npm test
```

This will run the Jest tests and verify the functionality of your API.

---

With these steps, you should have your Docker container running the application, Prisma managing the database schema, and Jest running your API tests successfully.
