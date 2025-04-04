# Use lightweight Node image
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Compile TypeScript and generate Prisma Client
RUN npm run build && npx prisma generate

# Run migrations and start server at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
