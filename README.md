# Mi Aplicación React

Esta es una aplicación React con una API backend. Sigue las instrucciones a continuación para configurar y ejecutar el proyecto.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Configuración

### Cliente (Frontend)

1. Navega a la carpeta del cliente:
    ```sh
    cd client
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

### API (Backend)

1. Navega a la carpeta de la API:
    ```sh
    cd api
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea un archivo `.env` en la carpeta `api` con el siguiente contenido:
    ```sh
    JWT_SECRET = "]K@l9w6SnF3"
    ```

### Base de datos

Asegúrate de utilizar la base de datos proporcionada en la carpeta `base de datos`.

## Ejecución de la aplicación

1. Inicia el servidor API (desde la carpeta `api`):
    ```sh
    npm start
    ```

2. En otra terminal, inicia el cliente React (desde la carpeta `client`):
    ```sh
    npm start
    ```

La aplicación debería estar ahora funcionando. El cliente React generalmente se ejecuta en [https://localhost:3000](https://localhost:3000), y la API en otro puerto (comúnmente [https://localhost:8800](https://localhost:8800), pero verifica la configuración de tu proyecto).

## Notas adicionales

- Asegúrate de que la API esté configurada correctamente para conectarse a la base de datos proporcionada.
- Verifica que las variables de entorno en el archivo `.env` de la API estén correctamente configuradas para tu entorno de desarrollo.

Si tienes algún problema durante la configuración o ejecución, revisa los logs de error para obtener más información.
