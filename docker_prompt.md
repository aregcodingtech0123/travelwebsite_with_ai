# Task: Dockerize AI Traveller Planner

## Role: Senior DevOps Engineer & Docker Expert

Your objective is to containerize the "AI Traveller Planner" project, ensuring that the frontend, backend, and AI service can be launched and orchestrated using a single command. 

## Project Context
The project consists of three main components:
1. **Frontend**: A Next.js application located in the `/frontend` directory.
2. **Backend**: A Node.js/TypeScript API using Prisma ORM, located in the `/backend` directory.
3. **AI Service**: A Python-based service located in the `/ai-service` directory.

## Requirements

### 1. Dockerization of Components
- **Frontend**: Create a `Dockerfile` for the Next.js app. Optimize for production builds, utilizing multi-stage builds to minimize image size.
- **Backend**: Create a `Dockerfile` for the Node.js backend. Ensure that Prisma client generation and migrations are handled correctly during the build or startup process.
- **AI Service**: Create a `Dockerfile` for the Python service. Ensure all dependencies from `requirements.txt` are installed.

### 2. Orchestration with Docker Compose
Create a `docker-compose.yml` file in the root directory that:
- Configures all three services (`frontend`, `backend`, `ai-service`).
- Defines necessary environment variables and links them correctly (e.g., the backend needs to know the AI service's URL).
- Sets up a database container (e.g., PostgreSQL or MySQL) as required by the backend's Prisma schema.
- Handles persistent storage using volumes for the database data.
- Configures a common network so services can communicate using service names as hostnames.

### 3. Developer Experience
- Ensure that `docker-compose up` is sufficient to start the entire stack.
- Provide a `.dockerignore` file for each service to keep build contexts clean.
- (Optional but recommended) Include a health check for the database to ensure the backend only starts after the DB is ready.

## Technical Details to Consider
- **Next.js**: Use a Node.js base image (e.g., `node:20-alpine`).
- **Backend**: Use `node:20-alpine`. Remember `npx prisma generate`.
- **AI Service**: Use `python:3.11-slim`.
- **Environment Variables**: Use `.env` files for configuration.

## Expected Output
Provide the content for:
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `ai-service/Dockerfile`
- `docker-compose.yml`
- Root level `.dockerignore` or individual ones.
- A brief explanation of how to run the project.

Please execute these changes directly in the workspace.
