FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

