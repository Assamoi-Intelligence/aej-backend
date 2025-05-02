# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dev dependencies (for build)
COPY package*.json .
RUN npm install --production=false

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Copy production dependencies
COPY package*.json .
RUN npm install --production

# Copy built application and Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Ensure uploads directory exists
RUN mkdir -p /app/uploads

# Expose application port
EXPOSE 3000

# Run database migrations then start application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]