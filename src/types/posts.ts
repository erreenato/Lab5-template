// Forma en que el servidor entrega threads y comentarios.
// Un thread tiene `thread: null`; un comentario lleva el id del thread.
export interface Post {
  id: number
  content: string
  author: string | null
  thread: number | null
  parent: number | null
  createdAt: string
  updatedAt: string
  likes: number
  dislikes: number
}

// Datos que escribe el usuario en los formularios.
// `author` es opcional y `parent` solo aparece al responder un comentario.
export interface PostFormData {
  content: string
  author?: string
  parent?: number
}
