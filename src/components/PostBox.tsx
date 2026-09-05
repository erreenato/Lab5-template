import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Post, PostFormData } from '../types/posts'
import threadsService from '../services/threads'
import PostForm from './PostForm'

// Extender Post hace que content, author y parent lleguen directamente como
// props, tal como pide P1, y además permite reutilizar el resto de los campos.
interface PostBoxProps extends Post {
  clickable?: boolean
  allowReply?: boolean
  onReply?: (data: PostFormData) => void | Promise<void>
}

const PostBox = ({
  clickable = false,
  allowReply = false,
  onReply,
  ...initialPost
}: PostBoxProps) => {
  // P6: guardamos la publicación localmente para que likes/dislikes cambien
  // inmediatamente en el componente cuando el servidor responde.
  const [post, setPost] = useState<Post>(initialPost)
  const [showReply, setShowReply] = useState<boolean>(false)

  const updateReaction = (field: 'likes' | 'dislikes') => {
    // La cátedra muestra este patrón: copiar el objeto con spread y modificar
    // solo el campo deseado antes de hacer PUT.
    const changedPost: Post = {
      ...post,
      [field]: post[field] + 1,
    }

    threadsService.update(post.id, changedPost).then((returnedPost) => {
      setPost(returnedPost)
    })
  }

  const handleReply = async (data: PostFormData) => {
    if (!onReply) return
    await onReply(data)
    setShowReply(false)
  }

  const postContent = (
    <>
      <p className="post-author"><strong>{post.author ?? 'Anónimo'}</strong></p>
      <p>{post.content}</p>
    </>
  )

  return (
    <article className="post-box">
      {/* P4: en el listado principal, el contenido del thread es un Link. */}
      {clickable && post.thread === null ? (
        <Link className="post-link" to={`/threads/${post.id}`}>
          {postContent}
        </Link>
      ) : (
        postContent
      )}

      {/* P1: parent solo se muestra cuando el comentario responde a otro. */}
      {post.parent !== null && (
        <p className="reply-reference">Responde al comentario #{post.parent}</p>
      )}

      <div className="reactions">
        <button type="button" onClick={() => updateReaction('likes')}>
          👍 {post.likes}
        </button>
        <button type="button" onClick={() => updateReaction('dislikes')}>
          👎 {post.dislikes}
        </button>
      </div>

      {/* P5: solo los comentarios de la vista detallada pueden responderse. */}
      {allowReply && post.thread !== null && onReply && (
        <div className="reply-area">
          <button type="button" onClick={() => setShowReply(!showReply)}>
            {showReply ? 'Cancelar respuesta' : 'Responder'}
          </button>

          {showReply && (
            <PostForm
              parent={post.id}
              submitText="Responder comentario"
              onSubmit={handleReply}
            />
          )}
        </div>
      )}
    </article>
  )
}

export default PostBox
