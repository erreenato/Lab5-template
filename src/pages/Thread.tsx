import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PostBox from '../components/PostBox'
import PostForm from '../components/PostForm'
import threadsService from '../services/threads'
import type { Post, PostFormData } from '../types/posts'

const Thread = () => {
  // P4: :id es una ruta parametrizada; useParams recupera ese valor de la URL.
  const { id } = useParams<{ id: string }>()
  const [thread, setThread] = useState<Post | null>(null)
  const [comments, setComments] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  // P3/P4: cada vez que cambia el id, pedimos al servidor el thread y sus
  // comentarios. Normalmente ocurre al entrar a /threads/:id.
  useEffect(() => {
    if (!id) return

    threadsService
      .getThread(id)
      .then((data) => {
        setThread(data.thread)
        setComments(data.comments)
        setError(null)
      })
      .catch(() => {
        setError('No se pudo encontrar el thread solicitado.')
      })
  }, [id])

  // P5: formulario superior de la vista detallada -> comentario sin parent.
  const createComment = async (data: PostFormData) => {
    if (!thread) return

    const newComment = await threadsService.createComment(
      {
        content: data.content,
        ...(data.author !== undefined ? { author: data.author } : {}),
        ...(data.parent !== undefined ? { parent: data.parent } : {}),
      },
      thread.id,
    )

    setComments((currentComments) => currentComments.concat(newComment))
  }

  if (error) {
    return (
      <main className="page">
        <Link to="/">← Volver a los threads</Link>
        <p>{error}</p>
      </main>
    )
  }

  if (!thread) {
    return <main className="page"><p>Cargando thread...</p></main>
  }

  return (
    <main className="page">
      <Link to="/">← Volver a los threads</Link>

      <h1>Thread #{thread.id}</h1>
      <PostBox {...thread} />

      <section className="new-post">
        <h2>Comentar</h2>
        <PostForm onSubmit={createComment} submitText="Crear comentario" />
      </section>

      <section>
        <h2>Comentarios</h2>
        {comments.length === 0 ? (
          <p>Este thread todavía no tiene comentarios.</p>
        ) : (
          comments.map((comment) => (
            <PostBox
              key={comment.id}
              {...comment}
              allowReply
              onReply={createComment}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default Thread
