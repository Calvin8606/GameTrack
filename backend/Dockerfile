# Use lightweight Node image
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app
COPY . .

# Compile TypeScript and generate Prisma Client
RUN pnpm run build && pnpm prisma generate

# Run migrations and start server at runtime
CMD ["node dist/server.js"]
