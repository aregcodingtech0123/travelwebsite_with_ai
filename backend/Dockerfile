# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies including openssl for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

# Copy prisma schema first to generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl \
    && npm install -g npm@11.11.0

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080

# Run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
