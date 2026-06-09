## build stage ##
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

## run stage ##
FROM node:20-alpine

RUN adduser -D nestapp

WORKDIR /run
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

RUN chown -R nestapp:nestapp /run

USER nestapp

EXPOSE 3000

CMD ["node", "dist/main.js"]