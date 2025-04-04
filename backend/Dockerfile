# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install --production

# Remove the Prisma commands from the build phase:
# RUN npx prisma generate && npx prisma migrate deploy

CMD ["npm","run", "start"]
