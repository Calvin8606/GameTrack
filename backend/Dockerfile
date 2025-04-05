# Use lightweight Node image
FROM node:22.14.0-alpine

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json pnpm-lock.yaml ./

# Install dependencies (will run postinstall automatically if allowed)
RUN pnpm install

# Copy the rest of the app
COPY . .

# Generate Prisma Client before build to ensure TS types exist
RUN pnpm prisma generate

# Compile TypeScript
RUN pnpm run build

# Run migrations & start the app
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run start"]
