FROM node:18 as build-stage
WORKDIR /usr/src/docker/test/seopt/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.24
COPY src/configuration/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/docker/test/seopt/client/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]