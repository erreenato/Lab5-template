import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { PostModel } from "./models/Post.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedDatabase = async () => {
    try {
        const url = process.env.MONGODB_URI;
        if (!url)
            throw new Error("Falta la variable MONGODB_URI");
        await mongoose.connect(url);
        console.log("Conectado a MongoDB para poblar datos...");
        // Leer el archivo threads.json
        const jsonPath = path.join(__dirname, "../data/threads.json");
        const rawData = await fs.readFile(jsonPath, "utf-8");
        const posts = JSON.parse(rawData);
        // Limpiar colección e insertar los de threads.json
        await PostModel.deleteMany({});
        await PostModel.insertMany(posts);
        console.log("¡Datos de threads.json cargados exitosamente en MongoDB!");
        await mongoose.connection.close();
    }
    catch (error) {
        console.error("Error al poblar la base de datos:", error);
    }
};
seedDatabase();
//# sourceMappingURL=seed.js.map