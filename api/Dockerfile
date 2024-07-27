# Usa una imagen base de Node.js
FROM node:20.5.1

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 8800

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]