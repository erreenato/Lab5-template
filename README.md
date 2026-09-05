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

## P2. Creación del Endpoint /api/threads y Conexión Frontend-Backend

### 1. Actualización de los Endpoints del Servidor (```backend/src/index.ts```)

En el archivo principal del backend se declararon los endpoints ```/api/threads``` utilizando Express y Mongoose:

- ```GET /api/threads```: Consulta la base de datos MongoDB mediante ```PostModel.find({})``` para retornar el listado completo de publicaciones.
- ```POST /api/threads```: Valida que la petición incluya el campo obligatorio ```content```, crea una nueva instancia del modelo ```PostModel``` y persiste la publicación en la base de datos respondiendo con código HTTP 201.

### 2. Definición de Tipos en el Backend (```backend/src/types.ts```)

Se creó el archivo de tipos en el servidor para definir la estructura estricta del objeto ```Post```, garantizando coincidencia exacta con la interfaz solicitada en la pauta del laboratorio.

### 3. Modificación de la Capa de Servicios (```src/services/threads.ts```)

Se reestructuraron las peticiones HTTP de la aplicación en el cliente para consumir la ruta relativa ```/api/threads```. Siguiendo el patrón de diseño visto en cátedra, el servicio extrae ```response.data``` directamente en la promesa para abstraer la respuesta de Axios hacia los componentes:

### 4. Configuración del Proxy en Vite (```vite.config.ts```)

Para evitar bloqueos por políticas CORS en entorno de desarrollo y permitir que las llamadas con rutas relativas ```/api``` redirijan hacia el servidor Express en el puerto ```3001```, se editó el archivo de configuración del frontend.

### 5. Integración del Estado en la Vista Principal (```src/pages/Threads.tsx```)

Se utilizó el hook ```useEffect``` con un arreglo de dependencias vacío ```[]``` para realizar la carga inicial de los threads tras el primer render de la página. Al enviar el formulario de creación, la respuesta devuelta por la API se concatena al estado local ```threads``` sin requerir la recarga del sitio.

### 5. Script de Poblamiento Inicial (```backend/src/seed.ts```)

Con el objetivo de cumplir la estructura solicitada para importar datos base locales (data/threads.json) hacia MongoDB, se creó un script utilitario para sembrar la base de datos:

### 7. Comandos de Ejecución y Pruebas

Poblar datos de prueba (Opcional):

```bash
cd backend
npx tsx src/seed.ts
```

Ejecutar Servidor Backend:
```bash
cd backend
npm run dev
```

Ejecutar Servidor Frontend:
```bash
npm run dev
```

Verificación:
- Al abrir ```http://localhost:5173```, el frontend realiza una petición ```GET``` a ```/api/threads``` trayendo las publicaciones persistidas en MongoDB.
- Al ingresar contenido en el formulario y dar clic en Crear thread, la app envía una petición ```POST``` a ```/api/threads``` (código 201), desplegando el nuevo objeto e insiriéndolo de forma permanente en la base de datos.

## P3. Implementación del Endpoint /api/threads/:id y Creación de Comentarios

### 1. Extensión de Endpoints en el Backend (```backend/src/index.ts```)
Se incorporaron los controladores para la ruta parametrizada ```/api/threads/:id``` en el servidor Express:

- ```GET /api/threads/:id```: Recupera un thread específico según su identificador (buscando por su ```_id``` de MongoDB mediante ```findById``` si es un ```ObjectId``` válido, o por su propiedad ```id```). Adicionalmente, consulta y retorna todos los comentarios asociados que tengan guardado dicho ```threadId``` en el campo ```thread```.
- ```POST /api/threads/:id```: Valida la existencia previa del thread principal. Posteriormente, crea y persiste un nuevo comentario asignando el ```threadId``` correspondiente en las propiedades ```thread``` y ```parent``` (si no se especifica un subcomentario).

### 2. Comandos de ejecución y pruebas

Poblar datos de prueba (Opcional):

```bash
cd backend
npx tsx src/seed.ts
```

Ejecutar Servidor Backend:
```bash
cd backend
npm run dev
```

Ejecutar Servidor Frontend:
```bash
npm run dev
```

Verificación:
- Se puede entrar a threads específicos y publicar comentarios.

## P4. Middleware de Manejo de Errores y Control de Excepciones

### 1. Implementación del Middleware Centralizado (backend/src/index.ts)

Se incorporó un middleware de manejo de errores al final de la cadena de rutas en Express para capturar excepciones de validación y solicitudes a rutas inexistentes.

### Comandos de Ejecución y Pruebas

Ejecutar Servidor Backend:
```bash
cd backend
npm run dev
```

Ejecutar Servidor Frontend:
```bash
npm run dev
```

Verificación:

- Validación de Autores Prohibidos / Largo de Texto: Al intentar crear un thread o comentario con autores no permitidos (ej. "Huevito rey") o con un cuerpo superior a 300 caracteres, el servidor responde con un código ```400 Bad Request``` procesado por el ```errorHandler```.

- Estabilidad: La interfaz web en React muestra una alerta controlada sin interrumpir la ejecución ni botar la aplicación Node.js.