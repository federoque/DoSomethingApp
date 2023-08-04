## IMAGEN BASE DE NODE
FROM node:20-alpine3.17 as BUILD_IMAGE

## DIRECTORIO DE TRABAJO EN EL CONTENENEDOR
WORKDIR /app/do-something-app

## SE COPIA package-json y packaje-lock.json al directorio de trabajo (/app/do-something-app).
COPY package*.json ./

## SE INSTALA DEPENDENCIAS
RUN npm install 

# SE COPIAN TODOS LOS ARCHIVOS Y CARPETAS DEL DIRECTORIO DEL CONTEXTO AL DIRECTORIO DE TRABAJO DEL CONTENDDOR EXCEPTO LOS DEL DOCKERFILE
COPY . .
## SE HACE BUILD DE VITE
RUN npm run build

FROM node:20-alpine3.17 as PRODUCTION_IMAGE

WORKDIR /app/do-something-app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=BUILD_IMAGE /app/do-something-app/dist/ /app/do-something-app/dist/ 

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript
## Especifica el punto de entrada del contenedor como el script entrypoint.sh, que se ejecutará cuando el contenedor se inicie.
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8080

CMD ["npm", "run", "preview"]

