import { useEffect, useState } from 'react'
import PostBox from '../components/PostBox'
import PostForm from '../components/PostForm'
import threadsService from '../services/threads'
import type { Post, PostFormData } from '../types/posts'

const Threads = () => {
  const [threads, setThreads] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  // P2: la petición al servidor se realiza después del primer render.
  // El arreglo vacío hace que este efecto se ejecute solo al montar la página.
  useEffect(() => {
    threadsService.getAll().then((data) => {
      setThreads(data)
      setError(null)
    }).catch(() => {
      setError('No se pudo conectar con el servidor. Ejecuta npm run server en otra terminal.')
    })
  }, [])

  // P5: el mismo formulario reutilizable crea un thread en la página principal.
  const createThread = async (data: PostFormData) => {
    const newThread = await threadsService.create({
      content: data.content,
      ...(data.author !== undefined ? { author: data.author } : {}),
    })

    // Igual que en la cátedra: agregamos el objeto retornado por el servidor al
    // estado, sin recargar la página.
    setThreads((currentThreads) => currentThreads.concat(newThread))
    setError(null)
  }

  return (
    <main className="page">
      <h1>Threads</h1>

      <section className="new-post">
        <h2>Crear thread</h2>
        <PostForm onSubmit={createThread} submitText="Crear thread" />
        {error && <p role="alert">{error}</p>}
      </section>

      <section>
        <h2>Listado</h2>
        {threads.map((thread) => (
          <PostBox key={thread.id} {...thread} clickable />
        ))}
      </section>
    </main>
  )
}

export default Threads
