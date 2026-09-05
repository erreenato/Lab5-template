import axios from 'axios'
import type { Post } from '../types/posts'

// El template incluye un servidor local que implementa los mismos endpoints
// descritos en el enunciado. Se levanta con `npm run server`.
const baseUrl = 'http://localhost:3001'

export interface ThreadCreateData {
  content: string
  author?: string
}

export interface CommentCreateData {
  content: string
  author?: string
  parent?: number
}

export interface ThreadAnswer {
  thread: Post
  comments: Post[]
}

// P2: obtiene todos los threads.
// Siguiendo la cátedra, el módulo de servicios extrae response.data para que
// los componentes trabajen directamente con los datos y no con AxiosResponse.
const getAll = (): Promise<Post[]> => {
  return axios
    .get<Post[]>(`${baseUrl}/threads`)
    .then((response) => response.data)
}

// P2/P5: crea un thread. El id, fecha, likes, etc. los completa el servidor.
const create = (data: ThreadCreateData): Promise<Post> => {
  return axios
    .post<Post>(`${baseUrl}/threads`, data)
    .then((response) => response.data)
}

// P3: obtiene un thread y todos sus comentarios.
const getThread = (id: string): Promise<ThreadAnswer> => {
  return axios
    .get<ThreadAnswer>(`${baseUrl}/threads/${id}`)
    .then((response) => response.data)
}

// P3/P5: crea un comentario dentro del thread indicado.
const createComment = (
  data: CommentCreateData,
  threadId: number,
): Promise<Post> => {
  return axios
    .post<Post>(`${baseUrl}/threads/${threadId}`, data)
    .then((response) => response.data)
}

// P6: el endpoint PUT sobrescribe la publicación, por eso recibe una copia
// completa del Post con likes o dislikes ya modificados.
const update = (id: number, newObject: Post): Promise<Post> => {
  return axios
    .put<Post>(`${baseUrl}/posts/${id}`, newObject)
    .then((response) => response.data)
}

export default {
  getAll,
  create,
  getThread,
  createComment,
  update,
}
