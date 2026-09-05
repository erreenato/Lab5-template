import { useState } from 'react'
import type { PostFormData } from '../types/posts'

interface PostFormProps {
  onSubmit: (data: PostFormData) => void | Promise<void>
  parent?: number
  submitText?: string
}

// P5: formulario controlado reutilizable.
// La página que lo usa decide si los datos crean un thread o un comentario.
const PostForm = ({ onSubmit, parent, submitText = 'Publicar' }: PostFormProps) => {
  const [content, setContent] = useState<string>('')
  const [author, setAuthor] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // El contenido es obligatorio. El autor vacío se omite para que el
    // servidor lo guarde como null y luego PostBox muestre "Anónimo".
    if (content.trim() === '') return

    const data: PostFormData = {
      content: content.trim(),
      ...(author.trim() !== '' ? { author: author.trim() } : {}),
      ...(parent !== undefined ? { parent } : {}),
    }

    await onSubmit(data)
    setContent('')
    setAuthor('')
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        Contenido
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </label>

      <label>
        Autor (opcional)
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>

      <button type="submit">{submitText}</button>
    </form>
  )
}

export default PostForm
