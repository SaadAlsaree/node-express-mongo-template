# Build stage
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./src ./src
COPY ./.env ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.json ./
COPY ./jest.config.ts ./

RUN npm install --production=false

RUN npm run build

CMD ["node", "-r","tsconfig-paths/register", "src/app.ts"]

# Production stage
#FROM node:22-alpine
#
#WORKDIR /usr/src/app
#
#COPY --from=build /usr/src/app .
#
#RUN npm install --production=true
#
#EXPOSE 5000
#
#CMD ["node", "app.js"]
