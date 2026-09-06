import mongoose from "mongoose";
const FORBIDDEN_AUTHORS = ["Huevito rey", "Matías Toro", "Memes es mal ramo"];
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "El contenido es obligatorio"],
        minLength: [1, "El comentario debe tener al menos 1 carácter"],
        maxLength: [300, "El comentario no puede exceder los 300 caracteres"],
    },
    author: {
        type: String,
        default: null,
        validate: {
            validator: function (value) {
                if (!value)
                    return true;
                return !FORBIDDEN_AUTHORS.includes(value.trim());
            },
            message: (props) => `El nombre de autor "${props.value}" está prohibido.`,
        },
    },
    thread: {
        type: String,
        default: null,
    },
    parent: {
        type: String,
        default: null,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// Mapeo JSON corrigiendo los tipos de TypeScript
postSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
export const PostModel = mongoose.model("Post", postSchema);
//# sourceMappingURL=Post.js.map