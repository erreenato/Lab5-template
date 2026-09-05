import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PostModel } from "./models/Post.js";

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

if (url) {
  mongoose
    .connect(url)
    .then(() => console.log("Conectado exitosamente a MongoDB"))
    .catch((error) => console.error("Error al conectar a MongoDB:", error.message));
} else {
  console.error("Falta definir la variable MONGODB_URI en el archivo .env");
}

/**
 * GET /api/threads
 * Obtener todos los threads/posts creados
 */
app.get("/api/threads", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await PostModel.find({});
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/threads
 * Crear un thread/post nuevo
 */
app.post("/api/threads", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    if (!body.content) {
      return res.status(400).json({ error: "El contenido (content) es obligatorio" });
    }

    const newPost = new PostModel({
      content: body.content,
      author: body.author || null,
      thread: body.thread || null,
      parent: body.parent || null,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/threads/:id
 * Obtener un thread específico y todos sus comentarios asociados
 */
app.get("/api/threads/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const threadId = String(req.params.id);

    // Si es un ObjectId válido de Mongo, busca por id nativo, de lo contrario busca por la propiedad id
    const mainThread = mongoose.Types.ObjectId.isValid(threadId)
      ? await PostModel.findById(threadId)
      : await PostModel.findOne({ id: threadId });

    if (!mainThread) {
      return res.status(404).json({ error: "Thread no encontrado" });
    }

    const comments = await PostModel.find({ thread: threadId });

    res.json({
      thread: mainThread,
      comments: comments,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/threads/:id
 * Agregar un comentario nuevo dentro de un thread
 */
app.post("/api/threads/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const threadId = String(req.params.id);
    const body = req.body;

    if (!body.content) {
      return res.status(400).json({ error: "El contenido es obligatorio" });
    }

    // Verificar que el thread exista
    const parentThread = mongoose.Types.ObjectId.isValid(threadId)
      ? await PostModel.findById(threadId)
      : await PostModel.findOne({ id: threadId });

    if (!parentThread) {
      return res.status(404).json({ error: "El thread al que intenta comentar no existe" });
    }

    const newComment = new PostModel({
      content: body.content,
      author: body.author || null,
      thread: threadId,
      parent: body.parent ? String(body.parent) : threadId,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

// Middleware de manejo de errores
const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error.message);
  res.status(500).json({ error: "Error interno del servidor" });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});