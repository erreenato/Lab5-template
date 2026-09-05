## P1. Configuración del Servidor Backend y Conexión a MongoDB

### 1. Creación de la estructura del Backend
Desde la raíz del proyecto, creamos la carpeta para el servidor e inicializamos el proyecto de Node.js:

```bash
mkdir backend
cd backend
npm init -y
```

### 2. Configuración de Módulos (ES Modules)
Para habilitar la sintaxis moderna de import/export en Node.js y evitar conflictos con TypeScript, editamos el archivo backend/package.json modificando la propiedad "type": "module" y el script de desarrollo:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",  // Este se modifica
  "main": "src/index.ts",
  "scripts": { // Aca se agrega "dev" y "build"
    "dev": "tsx watch src/index.ts",
    "build": "tsc"
  }
}
```

### 3. Instalación de Dependencias
Dentro de la carpeta backend, instalamos Mongoose para la base de datos, Dotenv para las variables de entorno, Express y CORS:

```bash
# Dependencias de producción
npm install express mongoose dotenv cors

# Dependencias de desarrollo (TypeScript y ejecutor TSX)
npm install --save-dev typescript @types/express @types/node tsx

# Inicialización de la configuración de TypeScript
npx tsc --init
```

### 4. Configuración de Variables de Entorno (.env)
Creamos el archivo .env en la raíz de la carpeta backend/ con la URI de conexión a la base de datos local lab5 y el puerto del servidor:

```
MONGODB_URI=mongodb://127.0.0.1:27017/lab5
PORT=3001
```

### 5. Definición del Esquema y Modelo Mongoose (src/models/Post.ts)
Creamos la estructura del modelo en backend/src/models/Post.ts incorporando las validaciones nativas exigidas:

Largo del comentario entre 1 y 300 caracteres.

Validación de la lista de autores prohibidos (Huevito rey, Matías Toro, Memes es mal ramo).

Formateo del objeto toJSON (conversión de _id a id y eliminación de metadatos __v).

### 6. Archivo Principal del Servidor (src/index.ts)
Creamos el punto de entrada backend/src/index.ts donde se cargan las variables de entorno con dotenv.config() antes que cualquier otra librería, se establece la conexión a MongoDB mediante mongoose.connect() y se inicia la aplicación Express.