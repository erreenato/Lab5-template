import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Conexión a MongoDB
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
if (url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Conectado exitosamente a MongoDB");
    })
    .catch((error) => {
      console.error("Error al conectar a MongoDB:", error.message);
    });
} else {
  console.error("Falta definir la variable MONGODB_URI en el archivo .env");
}

// ... aquí defines tus rutas (/api/threads, /api/posts, etc.)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});